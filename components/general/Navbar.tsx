"use client"

import Image from 'next/image'
import Link from 'next/link'
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'

const Navbar = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [tab, setTab] = useState("Home");
    const Tab = ({ title, link }: any) => (
        <Link className={`cursor-pointer hover:opacity-60 transition-all duration-200`} href={link}>{title}</Link>
    )

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
        console.log(session)
        return () => subscription.unsubscribe()
    }, [])

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }
    }

    const signInWithGoogle = async () => {
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/`
            }
        })
        console.log(data, error)
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
    };

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
                                    ...session.user,
                                    admin: session.user.email == "isa.atucd@gmail.com" ? true : false
                                  })) }
                                }}
                            >
                                Tickets
                            </Link>
                            <button onClick={handleClick}>
                                <Avatar className='hover:opacity-60 transition-all duration-200 ease-in-out' sx={{ border: 'solid black 2px' }} src={session.user.user_metadata.avatar_url}/>
                            </button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                list: {
                                    'aria-labelledby': 'basic-button',
                                },
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={signOut}>Logout</MenuItem>
                                <MenuItem onClick={deleteAccount}>Delete Account</MenuItem>
                            </Menu>
                        </>
                    )
                }
            </div>
    </div>
  )
}

export default Navbar