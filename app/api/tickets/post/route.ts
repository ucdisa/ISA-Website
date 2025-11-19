import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabaseClient";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const user_id = form.get("user_id") as string;
    const event_id = form.get("event_id") as string;
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const receipt = form.get("receipt") as File;
    const member = form.get("member") as unknown as boolean;

    const file = receipt;
    const buffer = Buffer.from(await file.arrayBuffer());

    const compressed = await sharp(buffer)
        .resize({ width: 1024, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

    const path = `${event_id}/${crypto.randomUUID()}.jpg`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from("payments")
        .upload(path, compressed, {
            contentType: "image/jpeg",
            upsert: false,
    });

    if (uploadError) {
        throw uploadError
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
          receipt: uploadData.path,
          member,
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