import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

const bucketName = 'events-images';

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  // get existing image path
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('events')
    .select('image')
    .eq('id', id)
    .single();
  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  // Remove the image from storage
  if (existing.image) {
    const { error: removeError } = await supabaseAdmin
      .storage
      .from(bucketName)
      .remove([existing.image]);
    if (removeError) {
      return NextResponse.json({ error: removeError.message }, { status: 500 });
    }
  }

  const { data, error } = await supabaseAdmin
    .from("events")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ deleted: data }, { status: 200 });
}