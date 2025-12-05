import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import banner from "../../public/assets/dhwani-banner.png"
import dhwaniCover from "../../public/assets/dhwani-cover.jpg";

const page = () => {
    const teams = [
        { name: "Raaga A Cappella", school: "UC Berkeley" },
        { name: "Sur a Cappella", school: "UCLA" },
        { name: "Spicmacay A Cappella", school: "Stanford" },
        { name: "Dil Se", school: "UC San Diego" },
        { name: "Blue Notes", school: "UC Irvine" },
        { name: "Awaaz", school: "USC" },
      ];
    
      const roles = [
        { icon: "🧭", title: "Liaison", blurb: "Primary contact for a competing team—arrival, tech time, hospitality, smooth experience.", time: "4–6 hrs in show week", apply: "#" },
        { icon: "🎛️", title: "Stage Crew", blurb: "Backstage transitions, props, mics & monitors, keep the show flowing.", time: "Dress rehearsal + show night", apply: "#" },
        { icon: "📸", title: "Media", blurb: "Photo/video coverage, short interviews, quick highlight edits for socials.", time: "2–4 hrs day of", apply: "#" },
        { icon: "🍱", title: "Hospitality", blurb: "Green rooms, water/snacks, signage, team check-in and support.", time: "3–5 hrs show day", apply: "#" },
        { icon: "🙌", title: "Volunteers", blurb: "Front-of-house, ushers, ticket scanning, answering attendee questions.", time: "2–3 hrs show night", apply: "#" },
      ];
    
      const faqs = [
        { q: "What is Dhwani?", a: "ISA’s annual South Asian a cappella showcase at UC Davis — a celebration of voice, rhythm, and community." },
        { q: "Do I need experience to help?", a: "No. Quick training is provided for each role. Enthusiasm and reliability matter most." },
        { q: "Is there a time commitment?", a: "Most roles are concentrated in show week (rehearsal + show night). Liaisons start a bit earlier." },
      ];
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white">
            <div className="max-w-6xl mx-auto px-6 py-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold">Dhwani</h1>
              <p className="mt-2 text-blue-100/90 max-w-2xl">
                UC Davis’s annual South Asian a cappella showcase — a night of harmonies, mashups, and electric energy.
              </p>
            </div>

            <div className="w-full bg-slate-800">
              <Image
                src={dhwaniCover}
                alt="ISA @ UC Davis — Board group photo"
                className="w-full max-h-[80vh] object-contain mx-auto"
              />
            </div>
    
            {/* orange accent bar */}
            <div className="h-[3px] bg-orange-400" />
          </header>
    
          {/* About Dhwani */}
          <section id="about" className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid gap-[150px] md:grid-cols-2">
              <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                <h2 className="text-2xl font-extrabold text-slate-900">What is Dhwani?</h2>
                <p className="mt-3">
                  Dhwani brings top collegiate South Asian a cappella teams to UC Davis for one unforgettable show.
                  Expect tight harmonies, creative arrangements, and big crowd moments.
                </p>
                <ul className="mt-4 list-disc list-inside text-slate-600">
                  <li>Teams from across the West Coast</li>
                  <li>Professional sound & lighting</li>
                  <li>Community partners and sponsors</li>
                  <li>Volunteer opportunities for students</li>
                </ul>
              </article>

              {/* Optional banner image */}
              {banner && (
                <div className="w-[300px]">
                  <Image src={banner} alt="Dhwani banner" className="w-full max-h-[40vh] object-contain mx-auto" />
                </div>
              )}
    
              {/* <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                <h3 className="text-lg font-semibold">At a glance</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="text-slate-500">Venue</div>
                    <div className="font-semibold">ARC Pavilion</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="text-slate-500">Next tentative date</div>
                    <div className="font-semibold">Nov 2026 (TBD)</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="text-slate-500">Teams</div>
                    <div className="font-semibold">6–8 collegiate teams</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="text-slate-500">Audience</div>
                    <div className="font-semibold">800–1,500 seats</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">* Replace with official details once confirmed.</p>
              </article> */}
            </div>
          </section>
    
          {/* Mock lineup */}
          {/* <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Mock Lineup</h2>
            <p className="text-center text-slate-600 max-w-2xl mx-auto mt-2">
              Placeholder teams to visualize layout. Swap with the confirmed lineup later.
            </p>
    
            <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((t) => (
                <article
                  key={t.name}
                  className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition"
                >
                  <div className="absolute left-0 right-0 -top-[1px] h-[4px] bg-orange-400 rounded-t-2xl" />
                  <div className="text-3xl">🎶</div>
                  <h3 className="mt-2 text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-slate-600">{t.school}</p>
                </article>
              ))}
            </div>
          </section> */}
    
          {/* Roles & Applications */}
          {/* <section id="roles" className="bg-gradient-to-r from-blue-50 via-white to-slate-100 border-y border-slate-200/60">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Roles & Applications</h2>
              <p className="text-center text-slate-600 max-w-2xl mx-auto mt-2">
                Pick a role that matches your vibe. Training provided — no experience required.
              </p>
    
              <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
                {roles.map((r) => (
                  <article key={r.title} className="relative rounded-2xl p-6 border border-slate-200 bg-white shadow-md">
                    <div className="absolute left-0 right-0 -top-[1px] h-[3px] bg-orange-400 rounded-t-2xl" />
                    <div className="text-3xl">{r.icon}</div>
                    <h3 className="mt-2 text-lg font-semibold">{r.title}</h3>
                    <p className="text-sm text-slate-700 mt-1">{r.blurb}</p>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs bg-slate-100 text-slate-800 px-2.5 py-1.5 rounded-md border border-slate-200">
                      ⏱ {r.time}
                    </div>
                    <div className="mt-5">
                      <Link
                        href={r.apply}
                        className="inline-block px-5 py-2.5 rounded-md bg-orange-400 text-slate-900 font-bold hover:bg-orange-300 shadow-md transition"
                      >
                        Apply
                      </Link>
                    </div>
                  </article>
                ))}
              </div> */}
    
              {/* General forms */}
              {/* <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Liaison Interest Form", href: "#" },
                  { label: "Team Participation Interest", href: "#" },
                  { label: "Volunteer Sign-Up", href: "#" },
                ].map((f) => (
                  <a
                    key={f.label}
                    href={f.href}
                    className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition text-center font-semibold"
                  >
                    {f.label}
                  </a>
                ))}
              </div>
            </div>
          </section> */}
    
          {/* Schedule / Timeline (mock) */}
          {/* <section id="schedule" className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Mock Schedule</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                <h3 className="text-lg font-semibold">Show Week</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li><span className="font-semibold">Mon:</span> Team arrivals, venue walkthroughs</li>
                  <li><span className="font-semibold">Tue:</span> Tech checks, mic tests</li>
                  <li><span className="font-semibold">Wed:</span> Dress rehearsal</li>
                  <li><span className="font-semibold">Thu:</span> Media day, final run</li>
                  <li><span className="font-semibold">Fri:</span> Show night 🎤</li>
                </ul>
              </article>
    
              <article className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                <h3 className="text-lg font-semibold">Key Roles Timeline</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li><span className="font-semibold">Liaisons:</span> Intro call (1–2 wks prior) → Show week support</li>
                  <li><span className="font-semibold">Stage Crew:</span> Dress rehearsal → Show night</li>
                  <li><span className="font-semibold">Media:</span> Tech day + Show night</li>
                  <li><span className="font-semibold">Hospitality:</span> Day-of prep + Show night</li>
                  <li><span className="font-semibold">Volunteers:</span> Call-time 1 hr before doors</li>
                </ul>
              </article>
            </div>
          </section> */}
    
          {/* FAQ */}
          <section id="faq" className="bg-white border-y border-slate-200/60">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center">FAQ</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm">
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