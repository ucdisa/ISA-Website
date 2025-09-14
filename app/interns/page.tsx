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
      const [errors, setErrors] = useState<any>({});
      const [submitted, setSubmitted] = useState(false);
    
      const committees = ["Design", "Media", "Marketing", "Events", "Tech", "Community"];
      const years = ["Freshman", "Sophomore", "Junior", "Senior", "Grad"];
      const availability = ["1–2 hrs/week", "2–4 hrs/week", "4–6 hrs/week", "6–8 hrs/week"];
    
      const setField = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
      const toggleInterest = (val: any) =>
        setForm((f: any) =>
          f.interests.includes(val)
            ? { ...f, interests: f.interests.filter((i: any) => i !== val) }
            : { ...f, interests: [...f.interests, val] }
        );
    
      const validate = () => {
        const e: any = {};
        if (!form.name.trim()) e.name = "Your full name is required.";
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
        if (!form.year) e.year = "Select your year.";
        if (form.interests.length === 0) e.interests = "Pick at least one interest.";
        if (!form.availability) e.availability = "Tell us your weekly availability.";
        if (!form.statement.trim()) e.statement = "Write a short statement.";
        if (!form.consent) e.consent = "Please confirm the information is accurate.";
        return e;
      };
    
      const onSubmit = (ev: any) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;
        console.log("Intern application:", form);
        setSubmitted(true);
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100 text-slate-900">
          {/* HERO */}
          <header className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold">ISA Interns</h1>
              <p className="mt-2 text-blue-100/90 max-w-2xl">
                Learn by doing with design, media, marketing, events, tech, and community teams.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#apply"
                  className="px-5 py-2.5 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
                >
                  Apply Now
                </a>
                <Link
                  href="/membership"
                  className="px-5 py-2.5 rounded-md border border-white/70 hover:bg-white/10 transition"
                >
                  Explore Committees
                </Link>
              </div>
            </div>
            <div className="h-[3px] bg-orange-400" />
          </header>
    
          {/* MAIN: two-column — left content, right sticky application */}
          <main className="max-w-6xl mx-auto px-6 py-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT: overview + tracks + steps */}
            <div className="space-y-8">
              {/* Why join */}
              <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
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
              <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
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
              <section className="bg-gradient-to-r from-blue-50 via-white to-slate-100 rounded-2xl p-6 border border-slate-200/70">
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
              <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
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
                <div className="mt-5">
                  <Link
                    href="/membership"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Explore committees →
                  </Link>
                </div>
              </section>
            </div>
    
            {/* RIGHT: application (sticky on desktop) */}
            <aside id="apply" className="lg:sticky lg:top-6 self-start">
              <form
                onSubmit={onSubmit}
                noValidate
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    Application
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold">Apply as an Intern</h2>
                  <p className="text-sm text-slate-600">
                    We welcome all experience levels. You’ll hear back by email.
                  </p>
                </div>
    
                {submitted && (
                  <div className="mb-4 rounded-md border border-green-200 bg-green-50 text-green-800 p-3">
                    <div className="font-semibold">Application received!</div>
                    <div className="text-sm">We’ll reach out with next steps soon.</div>
                  </div>
                )}
    
                {/* name */}
                <label className="block text-sm font-medium mt-2">Full Name *</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="First Last"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
    
                {/* email */}
                <label className="block text-sm font-medium mt-3">Email *</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@ucdavis.edu"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
    
                {/* year + availability */}
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium">Year *</label>
                    <select
                      className="mt-1 w-full rounded-md border-slate-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                      value={form.year}
                      onChange={(e) => setField("year", e.target.value)}
                    >
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Availability *</label>
                    <select
                      className="mt-1 w-full rounded-md border-slate-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                      value={form.availability}
                      onChange={(e) => setField("availability", e.target.value)}
                    >
                      <option value="">Select range</option>
                      {availability.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    {errors.availability && <p className="mt-1 text-sm text-red-600">{errors.availability}</p>}
                  </div>
                </div>
    
                {/* major */}
                <label className="block text-sm font-medium mt-3">Major (optional)</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  value={form.major}
                  onChange={(e) => setField("major", e.target.value)}
                  placeholder="Computer Science, Design, etc."
                />
    
                {/* interests */}
                <div className="mt-3">
                  <div className="text-sm font-medium">Areas of Interest *</div>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {committees.map((c) => {
                      const id = `interest-${c}`;
                      const checked = (form.interests as string[]).includes(c);
                      return (
                        <label
                          key={c}
                          htmlFor={id}
                          className={`flex items-center gap-2 rounded-md border p-2 cursor-pointer ${
                            checked
                              ? "border-orange-400 bg-orange-50"
                              : "border-slate-300 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <input
                            id={id}
                            type="checkbox"
                            className="accent-orange-500"
                            checked={checked}
                            onChange={() => toggleInterest(c)}
                          />
                          <span className="text-sm">{c}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
                </div>
    
                {/* statement */}
                <label className="block text-sm font-medium mt-3">
                  Why do you want to intern with ISA? *
                </label>
                <textarea
                  rows={5}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  value={form.statement}
                  onChange={(e) => setField("statement", e.target.value)}
                  placeholder="A few sentences about your motivation, interests, and what you hope to learn."
                />
                {errors.statement && <p className="mt-1 text-sm text-red-600">{errors.statement}</p>}
    
                {/* links */}
                <label className="block text-sm font-medium mt-3">
                  Portfolio / Links (optional)
                </label>
                <input
                  type="url"
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  value={form.links}
                  onChange={(e) => setField("links", e.target.value)}
                  placeholder="Linktree, Google Drive folder, GitHub, etc."
                />
    
                {/* consent */}
                <div className="mt-4 flex items-start gap-2">
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-1 accent-orange-500"
                    checked={form.consent}
                    onChange={(e) => setField("consent", e.target.checked)}
                  />
                  <label htmlFor="consent" className="text-sm">
                    I confirm the information provided is accurate and agree to be contacted about ISA internships. *
                  </label>
                </div>
                {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
    
                {/* actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({
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
                      setErrors({});
                      setSubmitted(false);
                    }}
                    className="px-6 py-3 rounded-md border border-slate-300 hover:bg-slate-50"
                  >
                    Reset
                  </button>
                </div>
    
                <p className="mt-3 text-xs text-slate-500">
                  We review applications on a rolling basis and will email you with next steps.
                </p>
              </form>
            </aside>
          </main>
    
          {/* Final CTA */}
          <section className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="rounded-2xl p-6 border border-white/20 bg-white/5 backdrop-blur-sm shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold">Questions about the internship?</h3>
                  <p className="text-blue-100/90">
                    Check tracks, apply above, and we’ll help you get started.
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="#apply"
                    className="px-5 py-2.5 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
                  >
                    Apply Now
                  </a>
                  <Link
                    href="/membership"
                    className="px-5 py-2.5 rounded-md border border-white/70 hover:bg-white/10 transition"
                  >
                    Explore Committees
                  </Link>
                </div>
              </div>
            </div>
            <div className="h-[3px] bg-orange-400" />
          </section>
        </div>
      );
}

export default page