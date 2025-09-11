import Loading from '@/components/general/Loading';
import { formatDate, formatTime } from '@/lib/functions';
import { TextInput } from '@mantine/core';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
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
    const [searchInput, setSearchInput] = useState('');
    
    const handleReject = async (ticket: any) => {
        setTicketLoad(ticket.id);
        setRejectLoading(true);

        await axios.delete("/api/tickets/delete", {
            data: {
                ticket_id: ticket.id,
            }
        })

        const pl = await axios.post(`/api/events/get`, {
            event_id: ticket.event_id
        });
        const event = pl.data.event;

        await axios.post("/api/sendEmail", {
            to: ticket.email,
            subject: `Ticket Rejected - ${event.name}`,
            text: `Hi ${ticket.name},\n\nYour ticket has been rejected for ${event.name}. Please contact us at isa.atucd@gmail.com for any questions about your ticket.\n\nThank you!`
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

    return (
        <div className='flex flex-col gap-[10px] mt-[20px]'>
            <div>
                <TextInput
                    className='w-[900px]'
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={handleFilter}
                    leftSection={<IconSearch size={20} />}
                />
            </div>
            {
                filteredTickets.length > 0 ?
                    filteredTickets.map((ticket: any) => (
                        <div key={ticket.id} className='flex items-center justify-between p-[10px] rounded-md w-[900px] shadow'>
                           <h1><b>{highlightText(ticket?.user?.displayName ?? ticket?.name ?? '—', searchInput)}</b></h1>
                            <p><b>{highlightText(ticket?.user?.email ?? ticket?.email ?? '—', searchInput)}</b></p>
                            <h1>{highlightText(ticket.name ?? '—', searchInput)}</h1>
                            <p>{highlightText(ticket.email ?? '—', searchInput)}</p>
                            <div className='flex items-center justify-center gap-[10px]'>
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