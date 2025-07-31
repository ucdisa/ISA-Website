"use client"

import React, { useEffect, useState } from 'react'
import Menu from '../general/Menu'
import Loading from '../general/Loading'
import Link from 'next/link';
import {Button, ButtonGroup} from "@heroui/react";

interface TicketCenterProps {
    admin: boolean;
    user: object;
}

const TicketCenter = ({ admin, user }: TicketCenterProps) => {
    const [tab, setTab] = useState("My Tickets");
    const [myTickets, setMyTickets] = useState<any>(null);
    const [events, setEvents] = useState<any>(null);

    const getTickets = async() => {
        // Get tickets from supabase route
        setMyTickets(1)
    }

    const getEvents = async() => {
        // Get events from supabase route
        setEvents(1)
    }

    const onLoad = () => {
        getTickets();
        getEvents();
    }

    useEffect(() => {
        onLoad();
    }, [])

    const AddEventButton = () => (
        <Link 
            href={{
                pathname: '/tickets/newEvent',
                query: { user: encodeURIComponent(JSON.stringify({
                ...user,
                admin
                }))}
            }}
            >
            <Button className='cursor-pointer rounded-sm shadow px-[12px] h-[35px] bg-[#000] text-white hover:opacity-80 duration transition-all duration-200 ease-in-out'>+ New Event</Button>
        </Link>
    )
  
    return (
        <div className='w-full'>
            <div className='w-full flex justify-start items-center gap-[10px]'>
                <Menu tab={tab} setTab={setTab} tabs={["My Tickets", "Events"]}/>
                {
                    admin &&
                    <AddEventButton />
                }
            </div>

            <div className='mt-[10px]'/>
            {
                (() => {
                    switch(tab) {
                        case "My Tickets":
                            return (
                                myTickets ?
                                    null
                                :
                                    <Loading />
                            )
                        case "Events":
                            return (
                                events ?
                                    <div className='w-full mt-[20px]'>

                                    </div>
                                :
                                    <Loading />
                            )
                    }
                })()
            }
        </div>
    )
}

export default TicketCenter