import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { ticket_id, event_id, flagged } = await request.json();

    if (!ticket_id || !event_id) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Update the ticket flagged in the database
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .update({ flagged: flagged })
      .eq("id", ticket_id)
      .eq("event_id", event_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Ticket flagged updated successfully", data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}