import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function PATCH(request: Request) {
  try {
    const form = await request.formData();

    let updates: any = {};
    for (const key of ["name", "date", "time", "location", "description", "spots", "buyLimit", "memberPrice", "regularPrice"]) {
      const value = form.get(key);
      if (value !== null) updates[key] = value;
    }

    console.log(updates)

    const id = form.get("id") as string;
    const file = form.get("image") as Blob;

    console.log(id)
    console.log(file)

    if (file instanceof File) {
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

        updates = {
            ...updates,
            image: uploadData.path
        }
    }
    

    console.log("HELLO WORLD")

    const { data, error } = await supabaseAdmin
      .from("events")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ event: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}