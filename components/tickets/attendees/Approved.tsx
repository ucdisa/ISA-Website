import Loading from '@/components/general/Loading';
import { formatDate, formatTime } from '@/lib/functions';
import { TextInput, Tooltip } from '@mantine/core';
import { IconCheck, IconFlag, IconFlagFilled, IconSearch, IconX } from '@tabler/icons-react';
import axios from 'axios';
import React, { useMemo, useState } from 'react'

interface ApprovedProps {
    tickets: any;
    getPendingTickets: () => void;
    setTickets: (tickets: any) => void;
}

const Approved = ({ tickets, setTickets, getPendingTickets }: ApprovedProps) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [ticketLoad, setTicketLoad] = useState(-1);
    const [checkLoading, setCheckLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    
    const handleReject = async (ticket: any) => {
        setTicketLoad(ticket.id);
        setRejectLoading(true);

        await axios.delete("/api/tickets/delete", {
            data: {
                ticket_id: ticket.id,
                event_id: ticket.event_id,
            }
        })

        const pl = await axios.post(`/api/events/get`, {
            event_id: ticket.event_id
        });
        const event = pl.data.event;

        await axios.post("/api/sendEmail", {
            to: ticket.email,
            subject: `Request for ${event.name} has been Denied`,
            text: `Hi ${ticket.name},\n\nThank you so much for your interest in ${event.name}.\nWe were unable to approve your ticket because we did not receive your complete payment. Please double check if you’ve got the right ticket (member/ nonmember) and paid the right cost for each ticket.\nIf you believe this was a mistake or you already sent the payment, please reach out to us immediately with proof of payment, and we’ll be happy to review your request again.\n\nThank you for understanding,\nISA at UC Davis`
        })

        setTickets(tickets.filter((t: any) => t.id !== ticket.id));
        setRejectLoading(false);
    }

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
    }

    const filteredTickets = useMemo(() => {
        const q = searchInput.trim().toLowerCase();
        if (!q) return tickets;
        return tickets.filter((t: any) => {
            const fields = [
                t?.user?.email,
                t?.user?.displayName,
                t?.name,
                t?.email,
            ];
            return fields.some((val) =>
                typeof val === 'string' && val.toLowerCase().includes(q)
            );
        });
    }, [tickets, searchInput]);

    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);
        return (
            <>
                {parts.map((part, i) =>
                    regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
                )}
            </>
        );
    };

    const checkIn = async (ticket: any) => {
        setTicketLoad(ticket.id);
        setCheckLoading(true);
        await axios.post("/api/tickets/changeStatus", {
            ticket_id: ticket.id,
            event_id: ticket.event_id,
            status: "checked in"
        })

        const pl = await axios.post(`/api/events/get`, {
            event_id: ticket.event_id
        });
        const event = pl.data.event;
        
        await axios.post("/api/sendEmail", {
            to: ticket.email,
            subject: `You’re Checked In — Welcome to ${event.name}!`,
            text: `Hi ${ticket.name},\n\nYou’re all set! We’ve successfully checked you in for ${event.name}.\nWe’re thrilled to have you with us — and we hope you enjoy (event) ! Feel free to reach out to any ISA board member if you need assistance during the program.\n\nHave an amazing time!\nISA at UC Davis`
        })

        setTickets(
            tickets.map((t: any) =>
              t.id === ticket.id ? { ...t, status: "checked in" } : t
            )
        );
        setCheckLoading(false);
    }

    const handleFlag = async (flagged: boolean, ticket: any, index: number) => {
        setTickets(tickets.map((t: any, i: number) => i === index ? { ...t, flagged: !flagged } : t))
        await axios.post("/api/tickets/changeFlag", {
            ticket_id: ticket.id,
            event_id: ticket.event_id,
            flagged: !flagged
        })
    }

    return (
        <div className='flex flex-col gap-[10px] mt-[20px]'>
            <div>
                <TextInput
                    className='max-w-[1000px] w-[100%]'
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={handleFilter}
                    leftSection={<IconSearch size={20} />}
                />
            </div>
            {
                filteredTickets.length > 0 ?
                    filteredTickets.map((ticket: any, index: number) => (
                        <div key={ticket.id} className={`flex items-center justify-between p-[10px] rounded-md max-w-[1000px] w-[100%] shadow ${ticket.status == "checked in" ? 'border-[1px] border-green-500' : ticket.flagged && 'outline-[1px] outline-[#e75c5c]'}`}>
                            <div className='flex items-center gap-[20px] '>
                                <button onClick={() => handleFlag(ticket.flagged,ticket, index)}>
                                    {ticket.flagged ? <IconFlagFilled className='text-[#e75c5c] hover:opacity-60 duration-200 transition-all cursor-pointer' /> : <IconFlag className='text-[#e75c5c] hover:opacity-60 duration-200 transition-all cursor-pointer' /> }
                                </button>
                                <h1><b>{highlightText(ticket?.user?.displayName ?? ticket?.name ?? '—', searchInput)}</b></h1>
                            </div>
                            <p><b>{highlightText(ticket?.user?.email ?? ticket?.email ?? '—', searchInput)}</b></p>
                            <h1>{highlightText(ticket.name ?? '—', searchInput)}</h1>
                            <p>{highlightText(ticket.email ?? '—', searchInput)}</p>
                            <div className='flex items-center justify-center gap-[20px]'>
                                <div className='w-[80px] h-[30px] flex justify-center items-center'>
                                    {
                                        ticket?.status == "checked in" ?
                                        <Tooltip openDelay={500} label="checked in">
                                            <IconCheck size={22} color='green' />
                                        </Tooltip>
                                        :
                                        <button onClick={() => checkIn(ticket)} className='w-full h-full rounded-md text-white bg-green-600 hover:opacity-80 cursor-pointer transition-all duration-100'>
                                            {checkLoading && ticketLoad == ticket.id ? <Loading color='white' size={15} /> : <p className='text-sm'>check in</p>}
                                        </button>
                                    }
                                </div>

                                <button onClick={() => handleReject(ticket)} className='hover:opacity-60 transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#262626] text-white w-[27px] h-[27px] rounded-sm'>
                                    {
                                        rejectLoading && ticketLoad == ticket.id ? <Loading color='white' size={15} /> : <IconX size={20} />
                                    }
                                </button>
                            </div>
                        </div>
                    ))
                :
                    <div className='flex justify-start mt-[20px]'>
                        <h1 className='text-2xl font-semibold'>No approved attendees</h1>
                    </div>
            }
        </div>
    )
}

export default Approved