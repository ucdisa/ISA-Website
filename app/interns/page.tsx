"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Bullet = ({ text }: any) => (
    <div className='flex flex-row pl-[40px] items-center gap-[10px] justify-start'>
        <div className='w-[10px] h-[10px] rounded-full bg-black'/>
        <p className=' text-lg'>{text}</p>
    </div>
)

const page = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        year: "",
        major: "",
        interests: [],
        availability: "",
        statement: "",
        links: "",
        consent: false,
      });
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100 text-slate-900">
          {/* HERO */}
          <header className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold">ISA Interns</h1>
              <p className="mt-2 text-blue-100/90 max-w-2xl">
                Learn by doing with design, media, marketing, events, tech, and community teams.
              </p>
            </div>
            <div className="h-[3px] bg-orange-400" />
          </header>
    
          {/* MAIN: two-column — left content, right sticky application */}
          <main className="max-w-8xl mx-auto px-6 py-10 w-[70%]">
            {/* LEFT: overview + tracks + steps */}
            <div className="space-y-8">
              {/* Why join */}
              <section className="bg-white rounded-2xl px-6 py-[50px] border border-slate-200 shadow-md">
                <h2 className="text-2xl font-extrabold">Why become an ISA intern?</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: "🎯", t: "Real impact", d: "Ship visible work: flyers, reels, photos, websites, logistics." },
                    { icon: "🧭", t: "Mentored on-ramps", d: "Clear onboarding, starter tasks, and helpful leads." },
                    { icon: "📈", t: "Portfolio ready", d: "Turn deliverables into strong resume projects." },
                  ].map((c) => (
                    <article
                      key={c.t}
                      className="relative bg-white rounded-xl p-4 border border-slate-200"
                    >
                      <div className="absolute left-0 right-0 -top-[1px] h-[3px] bg-orange-400 rounded-t-xl" />
                      <div className="text-2xl">{c.icon}</div>
                      <div className="mt-1 font-semibold">{c.t}</div>
                      <p className="text-sm text-slate-600">{c.d}</p>
                    </article>
                  ))}
                </div>
              </section>
    
              {/* Tracks */}
              <section className="bg-white rounded-2xl px-6 py-[50px] border border-slate-200 shadow-md">
                <h2 className="text-2xl font-extrabold">Tracks</h2>
                <p className="text-slate-600 mt-1">
                  Pick the areas you’re most curious about—rotate later if you want.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { icon: "🎨", t: "Design", d: "Brand visuals, posters, carousels, event assets." },
                    { icon: "🎬", t: "Media", d: "Photo/video shoots, edits, highlight reels." },
                    { icon: "📣", t: "Marketing", d: "Captions, reels, campaigns, collabs." },
                    { icon: "🎤", t: "Events", d: "Run-of-show, ops, day-of execution." },
                    { icon: "💻", t: "Tech", d: "Website updates, forms, automations." },
                    { icon: "🤝", t: "Community", d: "Volunteering, partnerships, mentorship." },
                    { icon: "💵", t: "Finance", d: "Fundraising, management, payments." },
                  ].map((x) => (
                    <article
                      key={x.t}
                      className="relative bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition"
                    >
                      <div className="absolute left-0 right-0 -top-[1px] h-[3px] bg-blue-500 rounded-t-xl" />
                      <div className="text-2xl">{x.icon}</div>
                      <h3 className="mt-2 text-lg font-semibold">{x.t}</h3>
                      <p className="text-sm text-slate-600 mt-1">{x.d}</p>
                    </article>
                  ))}
                </div>
              </section>
    
              {/* How it works */}
              <section className="bg-gradient-to-r from-blue-50 via-white to-slate-100 rounded-2xl px-6 py-[50px] border border-slate-200/70">
                <h2 className="text-2xl font-extrabold text-slate-900 text-center">
                  How it works
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {[
                    { n: "1", t: "Apply", d: "Share interests, availability, and what you want to learn." },
                    { n: "2", t: "Onboard", d: "Get Slack access, docs, and a starter task." },
                    { n: "3", t: "Build", d: "Collaborate with your lead, ship work, and level up." },
                  ].map((s) => (
                    <div
                      key={s.n}
                      className="rounded-xl p-6 border border-slate-200 bg-white"
                    >
                      <div className="h-9 w-9 rounded-full bg-orange-400 text-slate-900 font-extrabold grid place-items-center">
                        {s.n}
                      </div>
                      <h3 className="mt-3 font-semibold">{s.t}</h3>
                      <p className="text-sm text-slate-600 mt-1">{s.d}</p>
                    </div>
                  ))}
                </div>
              </section>
    
              {/* FAQ teaser */}
              <section className="bg-white rounded-2xl px-6 py-[50px] border border-slate-200 shadow-md">
                <h2 className="text-2xl font-extrabold">Quick FAQ</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    { q: "Do I need experience?", a: "No—enthusiasm and consistency matter most." },
                    { q: "Time commitment?", a: "Typically 2–4 hrs/week; more near big events." },
                    { q: "Can I switch tracks?", a: "Yes. Start with one, rotate as you grow." },
                  ].map((f) => (
                    <div key={f.q} className="rounded-lg border border-slate-200 p-4">
                      <div className="font-semibold">{f.q}</div>
                      <div className="text-sm text-slate-600 mt-1">{f.a}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      );
}

export default page