import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";

export const runtime = "nodejs";
export async function POST(request: Request) {
    const form = await request.formData();
    const name = form.get("name")
    const date = form.get("date");
    const time = form.get("time")
    const location = form.get("location")
    const description = form.get("description")
    const spots = form.get("spots")
    const buyLimit = form.get("buyLimit")

    const file = form.get("image") as Blob;
    const arrayBuffer = await new Response(file).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.type.split("/")[1];
    const path = `${crypto.randomUUID()}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from("events-images")
        .upload(path, buffer, { contentType: file.type });

    if (uploadError) {
        throw uploadError
    }

    console.log("MADE IT HERE", uploadData.path)

    // Insert new event into the "events" table
    const { data, error } = await supabaseAdmin
      .from("events")
      .insert([{ 
        name,
        date,
        time,
        location,
        description,
        image: uploadData.path,
        spots,
        buyLimit
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(data);

    return NextResponse.json({ event: data }, { status: 201 });
}