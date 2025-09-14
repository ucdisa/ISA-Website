"use client"

import Image from 'next/image'
import Link from 'next/link'
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import { MantineProvider, Menu, NavLink } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { X } from "lucide-react";
import { Menu as MenuLucide} from 'lucide-react';


const Navbar = () => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const linkBase = "block px-4 py-2 rounded-md text-base font-semibold transition-colors";

    const toggleMenu = () => setMobileOpen((prev) => !prev);

    const router = useRouter();
    

    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            console.log(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }

        router.push('/')
    }

    const signInWithGoogle = async () => {
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/`,
            }
        })
    }

    const deleteAccount = async () => {
        if (!session) return;
        try {
            const response = await axios.delete('/api/users/delete', {
                data: { userId: session.user.id }
            });
            if (response.data.error) {
                console.error('Account deletion failed:', response.data.error);
                return;
            }
            await supabase.auth.signOut();
        } catch (err) {
            console.error('Error deleting account:', err);
        }
        
        router.push('/')
    };

    const pathname = usePathname();
    const isActive = (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    };

    return (
        <div className="bg-[#0b1b3b] text-ivory shadow-md text-white outline-1 border-[#6a1121] border-solid border-b-[3px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo / Brand */}
              <Link href="/" className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-ivory p-1 border-2 border-accent shadow-md">
                  <img
                    src={"/assets/isa_logo.png"}
                    alt="ISA Logo"
                    className="h-full w-full object-contain rounded-full"
                  />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide">
                  ISA @ UC Davis
                </span>
              </Link>
    
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-2">
                <Link href="/" className={isActive('/') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Home</Link>
                <Link href="/board" className={isActive('/board') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Board</Link>
                <Link href="/membership" className={isActive('/membership') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Membership</Link>
                <Link href="/dhwani" className={isActive('/dhwani') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Dhwani</Link>
                <Link href="/interns" className={isActive('/interns') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Interns</Link>
                <Link href="/resources" className={isActive('/resources') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Resources</Link>
    
                <span className="mx-1 h-6 w-px bg-white/15" aria-hidden="true" />
                {
                    !session ? (
                        <div onClick={signInWithGoogle} className='font-bold text-blue-950 bg-yellow-500 px-4 py-[7px] rounded-md cursor-pointer hover:opacity-80 transition-all duration-200 shadow-sm'>
                            Login
                        </div>
                    ) : (
                        <div className='flex items-center gap-[20px]'>
                            <Link
                                className={`text-blue-950 bg-yellow-500 ${linkBase}`}
                                href={{
                                  pathname: '/tickets',
                                  query: { user: encodeURIComponent(JSON.stringify({
                                    user: {
                                        ...session.user.user_metadata,
                                        user_id: session.user.id
                                    },
                                    admin: session.user.email == "isa.atucd@gmail.com" ? true : false
                                  })) }
                                }}
                            >
                                Tickets
                            </Link>
                            
                            <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <button>
                                    <Avatar className='hover:opacity-60 cursor-pointer transition-all duration-200 ease-in-out' sx={{ border: 'solid grey 2px' }} src={session.user.user_metadata.avatar_url}/>
                                </button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item>
                                    Profile
                                </Menu.Item>
                                <Menu.Item onClick={signOut}>
                                    Logout
                                </Menu.Item>
                                <Menu.Item onClick={deleteAccount}>
                                    Delete Account
                                </Menu.Item>
                            </Menu.Dropdown>
                            </Menu>
                        </div>
                    )
                }
              </nav>
    
              {/* Mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={28} /> : <MenuLucide size={28} />}
              </button>
            </div>
          </div>
    
          {/* Mobile Nav (slide-down) */}
          {mobileOpen && (
            <div className="md:hidden bg-blue-950 border-t border-white/10">
              <nav className="flex flex-col p-4 space-y-2">
                <Link href="/" onClick={() => {
                    toggleMenu()
                }} className={isActive('/') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Home</Link>
                <Link href="/board" onClick={() => {
                    toggleMenu()
                }} className={isActive('/board') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Board</Link>
                <Link href="/membership" onClick={() => {
                    toggleMenu()
                }} className={isActive('/membership') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Membership</Link>
                <Link href="/dhwani" onClick={() => {
                    toggleMenu()
                }} className={isActive('/dhwani') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Dhwani</Link>
                <Link href="/interns" onClick={() => {
                    toggleMenu()
                }} className={isActive('/interns') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Interns</Link>
                <Link href="/resources" onClick={() => {
                    toggleMenu()
                }} className={isActive('/resources') ? `${linkBase} text-blue-950 bg-yellow-500` : `${linkBase} text-ivory/90 hover:bg-white/10`}>Resources</Link>
                {
                    !session ? (
                        <button onClick={signInWithGoogle} className='bg-green-500 text-black px-4 py-[5px] rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm'>
                            Login
                        </button>
                    ) : (
                        <>
                            <Link
                                className="bg-green-500 text-black px-4 py-[5px] rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm"
                                href={{
                                  pathname: '/tickets',
                                  query: { user: encodeURIComponent(JSON.stringify({
                                    user: {
                                        ...session.user.user_metadata,
                                        user_id: session.user.id
                                    },
                                    admin: session.user.email == "isa.atucd@gmail.com" ? true : false
                                  })) }
                                }}
                            >
                                Tickets
                            </Link>
                            
                            <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <button>
                                    <Avatar className='hover:opacity-60 transition-all duration-200 ease-in-out' sx={{ border: 'solid black 2px' }} src={session.user.user_metadata.avatar_url}/>
                                </button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item>
                                    Profile
                                </Menu.Item>
                                <Menu.Item onClick={signOut}>
                                    Logout
                                </Menu.Item>
                                <Menu.Item onClick={deleteAccount}>
                                    Delete Account
                                </Menu.Item>
                            </Menu.Dropdown>
                            </Menu>
                        </>
                    )
                }
              </nav>
            </div>
          )}
    
          {/* underline */}
          <div className="h-[4px] bg-maroon" />
        </div>
      );
}

export default Navbar