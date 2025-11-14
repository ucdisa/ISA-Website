"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Bullet = ({ text }: any) => (
    <div className='flex flex-row pl-[40px] items-center gap-[10px] justify-start'>
        <div className='w-[10px] h-[10px] rounded-full bg-black'/>
        <p className='font-medium'>{text}</p>
    </div>
)

const page = () => {
    const membershipHref = "https://forms.gle/wx6KpcW6MdeLbKQ6A"; // or paste a Google Form URL here
  
    const faqs = [
      { q: "Do I need prior experience?", a: "No—interest and consistency matter most. We’ll help you ramp up." },
      { q: "How many hours do I commit?", a: "Most committees are ~2–4 hrs/week; it increases around major events." },
      { q: "Can I join multiple committees?", a: "Yes, but start with one so you don’t get overloaded." },
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
        {/* MEMBERSHIP HERO — FIRST THING USERS SEE */}
        <section className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 border border-white/25 tracking-wide">
              New for this year
            </span>
  
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
              Become an ISA Member
            </h1>
            <p className="mt-2 text-blue-100/90 max-w-2xl">
              Members get <span className="font-semibold text-orange-300">discounted tickets</span>,
              <span className="font-semibold text-orange-300"> exclusive event passes</span>, and ongoing
              <span className="font-semibold text-orange-300"> perks</span> throughout the year.
            </p>
  
            {/* perks row */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: "🎟️", t: "Discounted Tickets", d: "Save on Holi, Diwali Night, Garba, and more." },
                { icon: "✨", t: "Exclusive Access", d: "Early/VIP entry to select mixers & showcases." },
                { icon: "🎁", t: "Member Perks", d: "Giveaways, raffles, partner discounts." },
              ].map((p) => (
                <div key={p.t} className="rounded-xl p-4 bg-white/5 border border-white/15">
                  <div className="text-2xl">{p.icon}</div>
                  <div className="mt-1 font-semibold">{p.t}</div>
                  <div className="text-sm text-blue-100/90">{p.d}</div>
                </div>
              ))}
            </div>
  
            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                target='_blank'
                href={membershipHref}
                className="px-6 py-3 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
              >
                Apply to Become a Member
              </Link>
              <Link
                href="#faq"
                className="px-6 py-3 rounded-md border border-white/70 text-white hover:bg-white/10 transition"
              >
                Membership FAQ
              </Link>
            </div>
          </div>
          <div className="h-[3px] bg-orange-400" />
        </section>
  
        {/* Weekly schedule & expectations */}
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 py-12 grid gap-6 md:grid-cols-2">
            <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
              <h3 className="text-lg font-semibold">What we look for</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-slate-700">
                <li>Consistency over perfection</li>
                <li>Clear communication & kindness</li>
                <li>Willingness to learn and try things</li>
                <li>Ownership of small tasks end-to-end</li>
              </ul>
              <div className="mt-5">
                <Link
                  href="/interns"
                  className="inline-block px-5 py-2.5 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
                >
                  Apply as an Intern
                </Link>
              </div>
            </article>
          </div>
        </section>
  
        {/* FAQ */}
        <section id="faq" className="bg-white border-y border-slate-200/60">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Membership & Involvement FAQ</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="text-sm text-slate-600 mt-1">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href={membershipHref}
                className="px-6 py-3 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
              >
                Become a Member
              </Link>
            </div>
          </div>
        </section>
  
        {/* Final CTA */}
        <section className="bg-gradient-to-r from-slate-800 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="rounded-2xl p-6 border border-white/20 bg-white/5 backdrop-blur-sm shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold">Ready to join the community?</h3>
                <p className="text-blue-100/90">Membership unlocks discounts and access all year.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href={membershipHref}
                  className="px-5 py-2.5 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
                >
                  Apply for Membership
                </Link>
                <Link
                  href="/resources"
                  className="px-5 py-2.5 rounded-md border border-white/70 hover:bg-white/10 transition"
                >
                  View Resources
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