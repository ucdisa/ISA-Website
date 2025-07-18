import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-[20px] py-[5px] mb-[50px]'>
            <Link href="/">
                <Image src="/assets/isa_logo.png" alt="ISA Logo" width={60} height={60} />
            </Link>
            <div className='flex items-center justify-center gap-[50px] font-medium'>
                <Link className='cursor-pointer hover:opacity-60 transition-all duration-200' href="/">Home</Link>
                <Link className='cursor-pointer hover:opacity-60 transition-all duration-200' href="/board">Meet the Board</Link>
                <Link className='cursor-pointer hover:opacity-60 transition-all duration-200' href="/dhwani">Dhwani</Link>
                <Link className='cursor-pointer hover:opacity-60 transition-all duration-200' href="/resources">Resources</Link>
                <Link className='cursor-pointer hover:opacity-66 transition-all duration-200' href="/community">Community & Involvement</Link>
                <Link className='cursor-pointer hover:opacity-60 transition-all duration-200' href="/interns">Interns</Link>
                <Link href="/login" className='bg-green-500 text-black px-4 py-[5px] rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm'>
                    Login
                </Link>
            </div>
    </div>
  )
}

export default Navbar