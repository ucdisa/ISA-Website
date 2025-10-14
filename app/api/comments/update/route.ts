import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

// Update an existing comment
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { ticket_id, comment } = body ?? {};

    // Require both ticket_id and comment
    if (ticket_id === undefined || ticket_id === null || ticket_id === "") {
      return NextResponse.json(
        { error: "ticket_id is required" },
        { status: 400 }
      );
    }

    // Try to update existing comment by ticket_id
    const { data: updatedRows, error: updateError } = await supabaseAdmin
      .from("comments")
      .update({ comment })
      .eq("ticket_id", ticket_id)
      .select();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Failed to update comment", details: updateError.details ?? null },
        { status: 400 }
      );
    }

    // If nothing was updated, insert a new row
    if (!updatedRows || updatedRows.length === 0) {
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("comments")
        .insert({ ticket_id, comment })
        .select()
        .maybeSingle();

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message || "Failed to insert comment", details: insertError.details ?? null },
          { status: 400 }
        );
      }

      return NextResponse.json({ comment: inserted }, { status: 200 });
    }

    // Updated at least one row; return the first updated row
    return NextResponse.json({ comment: updatedRows[0] }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}