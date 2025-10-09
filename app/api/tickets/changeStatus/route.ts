import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { ticket_id, event_id, status, receipt } = await request.json();

    if (!ticket_id || !event_id || !status) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    if (status == "approved") {
      if (receipt) {
        const { error: removeError } = await supabaseAdmin
          .storage
          .from("payments")
          .remove([receipt]);
        if (removeError) {
          return NextResponse.json({ error: removeError.message }, { status: 500 });
        }
      }
    }

    // Update the ticket status in the database
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .update({ status: status })
      .eq("id", ticket_id)
      .eq("event_id", event_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Ticket status updated successfully", data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}