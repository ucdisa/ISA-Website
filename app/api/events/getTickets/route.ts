import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { event_id, status } = await request.json();

    if (!event_id) {
      return NextResponse.json(
        { error: "Missing event_id" },
        { status: 400 }
      );
    }

    // 1) Fetch all tickets for the given event_id
    const { data: tickets, error: ticketsError } = await supabaseAdmin
      .from("tickets")
      .select("*")
      .eq("event_id", event_id)
      .eq("status", status);

    if (ticketsError) {
      return NextResponse.json(
        { error: ticketsError.message },
        { status: 500 }
      );
    }

    const safeTickets = tickets ?? [];

    // 2) Collect unique user IDs
    const userIds = Array.from(new Set(safeTickets.map((t: any) => t.user_id).filter(Boolean)));

    // 3) Fetch auth users in parallel via Admin API
    const usersArr = await Promise.all(
      userIds.map(async (uid) => {
        try {
          const { data, error } = await supabaseAdmin.auth.admin.getUserById(uid);
          if (error || !data?.user) return { id: uid, email: null, displayName: null };
          const u = data.user as any;
          const meta = u.user_metadata || {};
          const displayName = meta.full_name ?? meta.name ?? meta["Display Name"] ?? meta.displayName ?? null;
          return { id: u.id, email: u.email ?? null, displayName };
        } catch {
          return { id: uid, email: null, displayName: null };
        }
      })
    );

    // 4) Index users by id for quick lookup
    const usersById = new Map(usersArr.map(u => [u.id, u]));

    // 5) Merge tickets with user info
    const ticketsWithUsers = safeTickets.map((t: any) => {
      const u = usersById.get(t.user_id);
      return {
        ...t,
        user: u ? { email: u.email, displayName: u.displayName } : null,
      };
    });

    const ticketsWithImages = ticketsWithUsers.map((ticket: any) => {
      const { data: image } = supabaseAdmin
        .storage
        .from("payments")
        .getPublicUrl(ticket.receipt);
      ticket.receipt = image.publicUrl;
      return ticket;
    });

    // 6) Return merged result
    return NextResponse.json(
      { tickets: ticketsWithImages },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
