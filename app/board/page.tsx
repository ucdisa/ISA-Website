"use client"

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion';
import Members from '@/components/board/Members';

const MEMBERS = [
    // Leadership
    { name: "Aniruddh Sekar Sivaram Sekar", title: "President", group: "Leadership", image: "/src/assets/board/aniruddh.jpg" },
    { name: "Surya Balamurugan", title: "Vice-President", group: "Leadership", image: "/src/assets/board/surya.jpg" },
    { name: "Sahana Narayan", title: "Dhwani Director", group: "Leadership", image: "/src/assets/board/sahana-narayan.jpg" },
  
    // Directors
    { name: "Arvind Karthik Senthilkumar", title: "Director of Finance", group: "Directors", image: "/src/assets/board/arvind.jpg" },
    { name: "Kirrthana Srinivasa", title: "Director of Operations", group: "Directors", image: "/src/assets/board/kirrthana.jpg" },
    { name: "Mahathi Karra", title: "Director of Hospitality", group: "Directors", image: "/src/assets/board/mahathi.jpg" },
    { name: "Sahana Gottipati", title: "Director of Fundraising", group: "Directors", image: "/src/assets/board/sahana-gottipati.jpg" },
    { name: "Krenil Patel", title: "Director of Internal Affairs", group: "Directors", image: "/src/assets/board/krenil.jpg" },
    { name: "Aryan Sharma", title: "Director of External Affairs", group: "Directors", image: "/src/assets/board/aryan.jpg" },
    { name: "Nanda Kishore Vijayakannan", title: "Co-Director of Community Affairs", group: "Directors", image: "/src/assets/board/nanda.jpg" },
    { name: "Advait Karthik", title: "Co-Director of Community Affairs", group: "Directors", image: "/src/assets/board/advait.jpg" },
    { name: "Yash Gupta", title: "Co-Director of Marketing", group: "Directors", image: "/src/assets/board/yash.jpg" },
    { name: "Hriday Kadiwala", title: "Co-Director of Marketing", group: "Directors", image: "/src/assets/board/hriday.jpg" },
    { name: "Sara Koshy", title: "Co-Director of Design", group: "Directors", image: "/src/assets/board/sara.jpg" },
    { name: "Maya Panjwani", title: "Co-Director of Design", group: "Directors", image: "/src/assets/board/maya.jpg" },
    { name: "Abhimanyu Warrier", title: "Director of Technology", group: "Directors", image: "/src/assets/board/abhimanyu.jpg" },
  
    // Advisors
    { name: "Saanvi Bapu", title: "Club Advisor", group: "Advisors", image: "/src/assets/board/saanvi.jpg" },
    { name: "Komal Purohit", title: "Club Advisor", group: "Advisors", image: "/src/assets/board/komal.jpg" },
    { name: "Tanisha Iyer", title: "Club Advisor", group: "Advisors", image: "/src/assets/board/tanisha.jpg" },
  ];
  
  /** --- Styling tokens (Tailwind defaults) --- */
  const CARD_BG = "bg-white";
  const CARD_BORDER = "border border-slate-200";
  const CARD_SHADOW = "shadow-md hover:shadow-lg transition";
  const NAME_CLS = "mt-3 text-base font-semibold text-slate-900 text-center";
  const TITLE_CLS = "text-sm text-slate-600 text-center";
  
  /** Initials avatar helpers (subtle orange/blue accents) */
  const BADGE_VARIANTS = [
    "bg-orange-100 text-orange-800",
    "bg-blue-100 text-blue-800",
    "bg-slate-200 text-slate-800",
  ];
  const initialsOf = (full: string) =>
    full
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s: string) => s[0]?.toUpperCase())
      .join("");
  const colorOf = (str: string) => BADGE_VARIANTS[Math.abs(hashCode(str)) % BADGE_VARIANTS.length];
  function hashCode(s: string) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
    return h;
  }
  
  /** Avatar component w/ graceful image fallback */
  function Avatar({ name, src }: { name: string, src: string }) {
    const [ok, setOk] = useState(true);
    const onErr = () => setOk(false);
  
    if (src && ok) {
      return (
        <img
          src={src}
          alt={name}
          onError={onErr}
          className="w-28 h-28 object-cover rounded-full ring-4 ring-white mx-auto shadow-sm"
        />
      );
    }
    return (
      <div
        className={`w-28 h-28 rounded-full mx-auto grid place-items-center ring-4 ring-white shadow-sm ${colorOf(
          name
        )}`}
        aria-label={name}
        title={name}
      >
        <span className="text-2xl font-bold">{initialsOf(name)}</span>
      </div>
    );
  }
  

const page = () => {
    const [filter, setFilter] = useState("All");
  const groups = ["All", "Leadership", "Directors", "Advisors"];

  const list = useMemo(() => {
    return filter === "All" ? MEMBERS : MEMBERS.filter((m) => m.group === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Header: blue gradient band + thin orange bar */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold">2025–2026 Board</h1>
          <p className="text-blue-100/90 mt-1">Indian Student Association @ UC Davis</p>
        </div>
        <div className="h-[3px] bg-orange-400" />
      </header>

      {/* Filter pills */}
      <div className="max-w-6xl mx-auto px-6 mt-6 mb-2 flex flex-wrap gap-2">
        {groups.map((g: string) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition shadow-sm
              ${
                filter === g
                  ? "bg-orange-400 text-slate-900 border-orange-400"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m: any) => (
            <article
              key={`${m.title}-${m.name}`}
              className={`${CARD_BG} ${CARD_BORDER} ${CARD_SHADOW} rounded-2xl p-6 text-center`}
            >
              <Avatar name={m.name} src={m.image} />
              <h3 className={NAME_CLS}>{m.name}</h3>
              <p className={TITLE_CLS}>{m.title}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default page