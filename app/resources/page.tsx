"use client"
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Menu from '@/components/general/Menu';

const ALL_RESOURCES = [
    // Members
    {
      id: "m-001",
      title: "Join ISA Membership (Form)",
      desc: "Become an official member — unlock discounted tickets and exclusive passes.",
      kind: "form",
      href: "https://forms.gle/wx6KpcW6MdeLbKQ6A", // or a Google Form URL
      tags: ["Members"],
      badge: "New",
      external: true
    },
  ];
  
  const CATEGORIES = ["All", "Members"];
  
  const KIND_ICON = {
    pdf: "📄",
    doc: "📝",
    sheet: "📊",
    figma: "🎨",
    md: "📘",
    zip: "🗂️",
    form: "🖊️",
    link: "🔗",
  };

const page = () => {

    const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_RESOURCES.filter((r) => {
      const matchesCat = cat === "All" || r.tags.includes(cat);
      const matchesQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.tags.join(" ").toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, cat]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Resources</h1>
          <p className="mt-2 text-blue-100/90 max-w-2xl">
            Templates, guides, and links for members, officers, and volunteers.
          </p>

          {/* quick links */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="px-5 py-2.5 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
            >
              Become a Member
            </Link>
            <Link
              href="/membership"
              className="px-5 py-2.5 rounded-md border border-white/70 hover:bg-white/10 transition"
            >
              Join a Committee
            </Link>
            <Link
              href="/interns"
              className="px-5 py-2.5 rounded-md border border-white/70 hover:bg-white/10 transition"
            >
              Apply as an Intern
            </Link>
          </div>
        </div>
        <div className="h-[3px] bg-orange-400" />
      </header>

      {/* Filters + Search */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition shadow-sm ${
                  cat === c
                    ? "bg-orange-400 text-slate-900 border-orange-400"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grow md:ml-auto">
            <label className="sr-only" htmlFor="resource-search">
              Search resources
            </label>
            <input
              id="resource-search"
              type="text"
              placeholder="Search by title, tag, or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Resource grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {list.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">
            No resources found. Try a different search or category.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => (
              <article
                key={r.id}
                className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition"
              >
                {/* accent bar */}
                <div className="absolute left-0 right-0 -top-[1px] h-[4px] bg-orange-400 rounded-t-2xl" />
                <div className="flex items-start justify-between gap-3">
                  <div className="text-3xl" aria-hidden>
                    {KIND_ICON[r.kind as keyof typeof KIND_ICON] ?? "📁"}
                  </div>
                  {r.badge ? (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {r.badge}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{r.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    Open
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                      <path d="M5 5h5V3H3v7h2V5zm0 14h14v-5h2v7H3v-7h2v5z"></path>
                    </svg>
                  </a>

                  {/* Secondary: download when local file type */}
                  {r.href.startsWith("/resources/") && (
                    <a
                      href={r.href}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition"
                    >
                      Download
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FAQ (compact) */}
      <section id="faq" className="bg-white border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center">FAQ</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "Where do I find member perks?",
                a: (
                  <>
                    See <Link href="/membership" className="text-blue-700 hover:underline">Community & Involvement</Link> and the{" "}
                    <Link href="/membership" className="text-blue-700 hover:underline">Membership page</Link>.
                  </>
                ),
              },
              {
                q: "How do I add a new resource?",
                a: "Officers can PR a new card by editing ALL_RESOURCES in Resources.jsx, or add files under /public/resources/ and link them.",
              },
              {
                q: "Do links have to be public?",
                a: "Prefer public view links (Google Drive/Docs/Sheets) or static /public files so members don’t hit permissions issues.",
              },
            ].map((f) => (
              <div key={typeof f.q === "string" ? f.q : "faq"} className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="text-sm text-slate-600 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default page