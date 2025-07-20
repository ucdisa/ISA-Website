"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {

    const [tab, setTab] = useState("Home");
    const Tab = ({ title, link }: any) => (
        <Link className={`cursor-pointer hover:opacity-60 transition-all duration-200`} href={link}>{title}</Link>
    )

  return (
    <div className='flex justify-between items-center px-[20px] py-[5px] mb-[50px]'>
            <Link href="/">
                <Image src="/assets/isa_logo.png" alt="ISA Logo" width={60} height={60} />
            </Link>
            <div className='flex items-center justify-center gap-[50px] font-medium'>
                <Tab title="Home" link="/"/>
                <Tab title="Meet the Board" link="/board"/>
                <Tab title="Dhwani" link="/dhwani"/>
                <Tab title="Resources" link="/resources"/>
                <Tab title="Community & Involvement" link="/community"/>
                <Tab title="Interns" link="/interns"/>
                <Link href="/login" className='bg-green-500 text-black px-4 py-[5px] rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm'>
                    Login
                </Link>
            </div>
    </div>
  )
}

export default Navbar