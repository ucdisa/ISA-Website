import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function DELETE(request: Request) {
  try {
    const { ticket_id, event_id } = await request.json();

    if (!ticket_id) {
      return NextResponse.json(
        { error: "Missing ticket_id parameter" },
        { status: 400 }
      );
    }

    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('events')
      .select('spots')
      .eq('id', event_id)
      .single();

      if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
      }

      if (!existing) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      const { data: updated, error: updErr } = await supabaseAdmin
        .from("events")
        .update({ spots: existing.spots + 1 })
        .eq("id", event_id)
        .select("spots")
        .single();

    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }

    // Delete the ticket from the database
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .delete()
      .eq("id", ticket_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Ticket deleted successfully", deleted: data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}