import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

const bucketName = 'events-images';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const eventId = body.event_id;

    if (!eventId) {
      return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
    }

    const { data: event, error } = await supabaseAdmin
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Optionally add a signed URL for the image if present
    const { data: image } = supabaseAdmin
        .storage
        .from(bucketName)
        .getPublicUrl(event.image);

    const img = image.publicUrl
    const eventWithImage = {
        ...event,
        image: img
    }

    return NextResponse.json({ event: eventWithImage }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
