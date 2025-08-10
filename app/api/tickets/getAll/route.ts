import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { user_id } = await request.json();

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id query parameter" },
        { status: 400 }
      );
    }

    // Fetch tickets for the user and join the related event via FK (tickets.event_id -> events.id)
    const { data: tickets, error } = await supabaseAdmin
      .from("tickets")
      .select("*, event:events(*)") // embedded select (left join by default)
      .eq("user_id", user_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { tickets: tickets ?? [] },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
