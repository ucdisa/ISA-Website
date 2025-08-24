import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

const bucketName = 'events-images';

export async function POST(request: Request) {
  try {
    const { event_id, status } = await request.json();

    if (!event_id) {
      return NextResponse.json(
        { error: "Missing event_id" },
        { status: 400 }
      );
    }

    // Fetch all tickets for the given event_id
    const { data: tickets, error } = await supabaseAdmin
      .from("tickets")
      .select("*")
      .eq("event_id", event_id)
      .eq("status", status);

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
