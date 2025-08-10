"use client"

import React, { useEffect, useState } from 'react'
import Menu from '../general/Menu'
import Loading from '../general/Loading'
import Link from 'next/link';
import {Button, ButtonGroup} from "@heroui/react";
import axios from 'axios';
import EventCard from '../homepage/EventCard';
import TicketCard from './TicketCard';

interface TicketCenterProps {
    admin: boolean;
    user: any;
}

const TicketCenter = ({ admin, user }: TicketCenterProps) => {
    const [tab, setTab] = useState("My Tickets");
    const [myTickets, setMyTickets] = useState<any>(null);
    const [events, setEvents] = useState<any>(null);
    const [eventsLoading, setEventsLoading] = useState(false);
    const [ticketsLoading, setTicketsLoading] = useState(false);

    const getTickets = async() => {
        setTicketsLoading(true);
        const payload = await axios.post('/api/tickets/getAll', {
            user_id: user.user_id
        });

        console.log(payload.data)

        // // sort events chronologically by date (earliest first)
        // const sortedEvents = rawEvents.sort(
        //     (a: any, b: any) =>
        //         new Date(a.date).getTime() - new Date(b.date).getTime()
        // );

        setMyTickets(payload.data.tickets);
        setTicketsLoading(false);
    }

    const getEvents = async() => {
        setEventsLoading(true);
        const payload = await axios.get('/api/events/getAll');
        const rawEvents = payload.data.events;

        // sort events chronologically by date (earliest first)
        const sortedEvents = rawEvents.sort(
            (a: any, b: any) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setEvents(sortedEvents);
        setEventsLoading(false);
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
                user,
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
            <div className='flex flex-col items-start justify-center'>
            {
                (() => {
                    switch(tab) {
                        case "My Tickets":
                            if (ticketsLoading || !myTickets) {
                                return <Loading color="black" size={20}/>
                            } else {
                                return (
                                    myTickets.length != 0 ?
                                        <div className='w-full mt-[20px] gap-[40px] flex flex-wrap justify-stat items-center'>
                                            {
                                                myTickets.map((ticket: any, index: number) => (
                                                    <TicketCard ticket={ticket} key={ticket.id} />
                                                ))
                                            }
                                        </div>
                                    :
                                    <p>No Tickets right now check back later...</p>
                                )
                            }
                        case "Events":
                            if (eventsLoading || !events) {
                                return <Loading color="black" size={20}/>
                            } else {
                                return (
                                    events && events.length != 0 ?
                                        <div className='w-full mt-[20px] gap-[40px] flex flex-wrap justify-stat items-center'>
                                            {
                                                events.map((event: any) => (
                                                    <EventCard reload={onLoad} user={user} admin={admin} key={event.id} event={event} />
                                                ))
                                            }
                                        </div>
                                    :
                                        <p>No Events right now check back later...</p>
                                )
                            }
                    }
                })()
            }
            </div>
        </div>
    )
}

export default TicketCenter