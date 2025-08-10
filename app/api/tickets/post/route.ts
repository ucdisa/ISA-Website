import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { user_id, event_id, name, email } = await request.json();

    if (!user_id || !event_id || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("tickets")
      .insert([
        {
          user_id,
          event_id,
          name,
          email,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ticket: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}