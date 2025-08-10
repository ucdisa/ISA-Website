import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { event_id } = await request.json();

    if (!event_id) {
      return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
    }

    // Optimistic concurrency loop: read current spots, try to set to spots-1
    // If a concurrent update happens, retry a few times
    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      // Read current spots
      const { data: row, error: readErr } = await supabaseAdmin
        .from("events")
        .select("spots")
        .eq("id", event_id)
        .single();

      if (readErr) {
        return NextResponse.json({ error: readErr.message }, { status: 500 });
      }
      if (!row) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      const current = row.spots as number;
      if (current <= 0) {
        return NextResponse.json({ spots: 0 }, { status: 200 });
      }

      const next = current - 1;

      // Update only if spots is still `current` (optimistic lock)
      const { data: updated, error: updErr } = await supabaseAdmin
        .from("events")
        .update({ spots: next })
        .eq("id", event_id)
        .eq("spots", current)
        .select("spots")
        .single();

      if (!updErr && updated) {
        // Success
        return NextResponse.json({ spots: 1 }, { status: 200 });
      }

      // If no row was updated because spots changed concurrently, retry
      // For other errors, exit early
      if (updErr && updErr.code && updErr.code !== "PGRST116") {
        return NextResponse.json({ error: updErr.message }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: "Conflict: could not claim spot after several attempts" },
      { status: 409 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
