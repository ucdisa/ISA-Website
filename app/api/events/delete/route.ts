import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";


const bucketName = 'events-images';

async function deleteFolderRecursive(bucket: string, folder: string) {
  // Normalize: remove leading/trailing slashes
  const base = folder.replace(/^\/+|\/+$/g, "");
  const filesToDelete: string[] = [];

  let offset = 0;
  const limit = 100;

  while (true) {
    const { data, error } = await supabaseAdmin
      .storage
      .from(bucket)
      .list(base, { limit, offset, sortBy: { column: "name", order: "asc" } });

    if (error) throw new Error(`List failed for ${bucket}/${base}: ${error.message}`);
    if (!data || data.length === 0) break;

    for (const entry of data) {
      // Heuristic: entries with metadata are files; entries without are subfolders
      if (entry.metadata && typeof entry.metadata.size === "number") {
        filesToDelete.push(`${base}/${entry.name}`);
      } else {
        // Recurse into subfolder
        await deleteFolderRecursive(bucket, `${base}/${entry.name}`);
      }
    }

    // paginate
    offset += data.length;
  }

  if (filesToDelete.length > 0) {
    const { error: removeErr } = await supabaseAdmin
      .storage
      .from(bucket)
      .remove(filesToDelete);
    if (removeErr) {
      throw new Error(`Remove failed for ${bucket}/${base}: ${removeErr.message}`);
    }
  }
}

export async function DELETE(request: Request) {
  const { id, name } = await request.json();
  if (!id || !name) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  // Delete all objects within the folder named by event.name in events-images
  try {
    await deleteFolderRecursive(bucketName, name);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to remove event images" }, { status: 500 });
  }

  // Delete all objects within the folder named by event.id in payments
  try {
    await deleteFolderRecursive("payments", String(id));
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to remove payment files" }, { status: 500 });
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