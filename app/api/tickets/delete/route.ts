import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function DELETE(request: Request) {
  try {
    const { ticket_id } = await request.json();

    if (!ticket_id) {
      return NextResponse.json(
        { error: "Missing ticket_id parameter" },
        { status: 400 }
      );
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