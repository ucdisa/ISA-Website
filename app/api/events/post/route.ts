import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";
import sharp from "sharp";

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

    const file = form.get("image") as File;
    const buffer = Buffer.from(await file.arrayBuffer());

    const compressed = await sharp(buffer)
        .resize({ width: 1024, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

    const path = `${crypto.randomUUID()}.jpg`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from("events-images")
        .upload(path, compressed, {
            contentType: "image/jpeg",
            upsert: false,
    });

    if (uploadError) {
        throw uploadError
    }

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