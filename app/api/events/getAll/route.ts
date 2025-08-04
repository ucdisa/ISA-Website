import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

const bucketName = 'events-images';

export async function GET() {
  try {
    // Fetch all events from the "events" table
    const { data, error } = await supabaseAdmin
      .from("events")
      .select("*");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Generate public URLs for each event's image path
    const eventsWithImages = data.map((event: any) => {
      const { data: urlData } = supabaseAdmin
        .storage
        .from(bucketName)
        .getPublicUrl(event.image);
      return { ...event, image: urlData.publicUrl };
    });

    return NextResponse.json(
      { events: eventsWithImages },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
