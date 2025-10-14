import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticket_id = searchParams.get("ticket_id");

    if (!ticket_id || ticket_id.trim() === "") {
      return NextResponse.json(
        { error: "ticket_id query parameter is required" },
        { status: 400 }
      );
    }

    // If ticket_id is numeric in your schema, coerce as needed
    // const parsedId = Number(ticket_id);

    const { data, error } = await supabaseAdmin
      .from("comments")
      .select("*")
      .eq("ticket_id", ticket_id)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to fetch comment", details: error.details ?? null },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json({ comment: '' }, { status: 200 });
    }

    return NextResponse.json({ comment: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
