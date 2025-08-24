import Loading from '@/components/general/Loading';
import { formatDate, formatTime } from '@/lib/functions';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState } from 'react'

interface ApprovedProps {
    tickets: any;
    getPendingTickets: () => void;
    setTickets: (tickets: any) => void;
}

const Approved = ({ tickets, setTickets, getPendingTickets }: ApprovedProps) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [ticketLoad, setTicketLoad] = useState(-1);

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
            subject: `Ticket Rejected for ${event.name}`,
            text: `Your ticket has been rejected for ${event.name}. Please contact us at isa.atucd@gmail.com for any questions about your ticket.`
        })

        setTickets(tickets.filter((t: any) => t.id !== ticket.id));
        setRejectLoading(false);
    }

    return (
        <div className='flex flex-col gap-[10px] mt-[20px]'>
            {
                tickets.length > 0 ?
                    tickets.map((ticket: any) => (
                        <div key={ticket.id} className='flex items-center justify-between p-[10px] rounded-md w-[500px] shadow'>
                            <h1>{ticket.name}</h1>
                            <p>{ticket.email}</p>
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
                    <div className='flex items-center justify-center h-[50vh]'>
                        <h1 className='text-2xl font-semibold'>No approved attendees</h1>
                    </div>
            }
        </div>
    )
}

export default Approved