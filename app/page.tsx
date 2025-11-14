"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import boardCover from "../public/assets/board-cover.jpg";
import axios from "axios";
import EventCardHome from "@/components/homepage/EventCardHome";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } }
};
const letter = {
  hidden: { opacity: 0, y: 20 },
  show:  { opacity: 1, y: 0 }
};

export default function Home() {
  const highlights = [
    { t: "Dhwani 2025 announced", d: "Teams from across the West Coast are coming to UC Davis.", date: "Nov 16, 2025" },
  ];

  const [events, setEvents] = useState<any>([
    { title: "Diwali", date: "November 22, 2025", iso: "2025-11-22", time: "12:00 PM – 3:00 PM", loc: "UC Davis Quad", blurb: "Color play, music, and food stalls. Wear white!", cta: "#" },
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      const payload = await axios.get('/api/events/getAll');
        const rawEvents = payload.data.events;

        // sort events chronologically by date (earliest first)
        const sortedEvents = rawEvents.sort(
            (a: any, b: any) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setEvents(sortedEvents);
    };
    fetchEvents();
  }, [])

  // const galleryImages = ["/media/past-1.jpg", "/media/past-2.jpg", "/media/past-3.jpg"];
  // const galleryVideos = ["/media/clip-1.mp4", "/media/clip-2.mp4"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="inline-block text-xs sm:text-sm px-4 py-1 rounded-md bg-white/20 border border-white/30 tracking-wide">
            Culture • Community • Creativity
          </div>

          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold leading-tight">
            Indian Student Association
            <br />
            <span className="text-orange-300">UC Davis</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-blue-100/90">
            Celebrations, service, mentorship, and Dhwani—our annual a cappella showcase.
          </p>
        </div>

        <div className="w-full bg-slate-800">
          <Image
            src={boardCover}
            alt="ISA @ UC Davis — Board group photo"
            className="w-full max-h-[80vh] object-contain mx-auto"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap justify-center gap-4">
          <Link href="/membership" className="px-7 py-3 rounded-lg bg-orange-400 text-slate-900 font-bold text-lg shadow-lg hover:bg-orange-300 transition">
            Become a Member
          </Link>
          <Link href="/dhwani" className="px-7 py-3 rounded-lg border-2 border-white text-white font-bold text-lg shadow-lg hover:bg-white/10 transition">
            Explore Dhwani
          </Link>
        </div>

        <div className="h-[3px] bg-orange-400" />
      </section>

      <main id="content" className="scroll-mt-16">
        {/* ===== PILLARS ===== */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🎉", t: "Culture & Events", d: "Diwali Night, Holi, mixers, showcases." },
              { icon: "🤝", t: "Community", d: "Volunteer, collaborate, give back." },
              { icon: "🧭", t: "Mentorship", d: "Peer support for classes & careers." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl p-6 bg-gradient-to-br from-slate-50 to-slate-100 shadow-md border border-slate-200 hover:shadow-lg transition">
                <div className="text-2xl">{c.icon}</div>
                <h3 className="mt-2 text-lg font-semibold">{c.t}</h3>
                <p className="text-sm mt-1 text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HIGHLIGHTS ===== */}
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-extrabold">Highlights</h2>
              <Link href="/resources" className="text-blue-700 font-semibold hover:underline">View all →</Link>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {highlights.map((n, i) => (
                <article key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-md hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold">{n.t}</h3>
                  <p className="text-xs text-slate-500 mt-1">{n.date}</p>
                  <p className="text-sm text-slate-700 mt-2">{n.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== UPCOMING EVENTS ===== */}
        <section className="bg-gradient-to-r from-blue-50 via-white to-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Upcoming Events</h2>
            <div className="mt-6 flex items-center justify-start gap-[30px] overflow-auto">
              {events.length > 0 ? events.map((e: any) => (
                <EventCardHome key={e.id} event={e} />
              )) : <p className="text-slate-500 text-lg">More coming soon... Stay tuned!</p>}
            </div>
          </div>
        </section>

        {/* ===== EVENTS CALENDAR ===== */}
        {/* <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Events Calendar</h2>
            <div className="mt-6">
              <EventsCalendar events={events} />
            </div>
          </div>
        </section> */}

        {/* ===== CTA FOOTER ===== */}
        <section className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-extrabold">Ready to join the community?</h3>
              <p className="mt-2 text-blue-100/90">Follow us, join a committee, or apply as an intern.</p>
            </div>
            <div className="flex gap-3 justify-start md:justify-end flex-wrap">
              <Link className="bg-orange-400 text-slate-900 px-5 py-2.5 rounded-md font-semibold hover:bg-orange-300 transition" href="/membership">Membership</Link>
              <Link className="border border-white/70 px-5 py-2.5 rounded-md hover:bg-white/10 transition" href="/interns">Interns</Link>
            </div>
          </div>
          <div className="h-[3px] bg-orange-400" />
        </section>
      </main>
    </div>
  );
}


function EventsCalendar({ events }: { events: any[] }) {
  const eventMap = useMemo(() => {
    const m = new Map();
    events.forEach((e: any) => {
      if (!m.has(e.iso)) m.set(e.iso, []);
      m.get(e.iso).push(e);
    });
    return m;
  }, [events]);

  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const monthMeta = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const first = new Date(y, m, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ d, iso, items: eventMap.get(iso) || [] });
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const label = first.toLocaleString(undefined, { month: "long", year: "numeric" });
    return { label, cells };
  }, [cursor, eventMap]);

  return (
    <div className="rounded-2xl bg-white shadow-md border border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))} className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 transition">← Prev</button>
        <div className="text-lg font-semibold">{monthMeta.label}</div>
        <button onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))} className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 transition">Next →</button>
      </div>

      <div className="grid grid-cols-7 text-xs uppercase tracking-wide text-slate-500 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => <div key={w} className="px-2 py-2">{w}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden">
        {monthMeta.cells.map((cell: any, i: number) =>
          cell ? (
            <div key={i} className="h-20 bg-white p-2 relative">
              <div className="text-xs text-slate-700">{cell.d}</div>
              {cell.items.length > 0 && (
                <div className="absolute bottom-2 left-2 right-2 space-y-1">
                  {cell.items.map((ev: any, idx: number) => (
                    <div key={idx} className="truncate rounded px-2 py-0.5 text-[11px] bg-orange-400 text-slate-900 font-medium">
                      {ev.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div key={i} className="h-20 bg-slate-50" />
          )
        )}
      </div>
    </div>
  );
}