import Loading from '@/components/general/Loading';
import { formatDate, formatTime } from '@/lib/functions';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState } from 'react'

interface PendingProps {
    tickets: any;
    getApprovedTickets: () => void;
    setTickets: (tickets: any) => void;
}

const Pending = ({ tickets, getApprovedTickets, setTickets }: PendingProps) => {
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [ticketLoad, setTicketLoad] = useState(-1);

    const handleApprove = async (ticket: any) => {
        setTicketLoad(ticket.id);
        setApproveLoading(true);
        await axios.post("/api/tickets/changeStatus", {
            ticket_id: ticket.id,
            event_id: ticket.event_id,
            status: "approved"
        })

        const pl = await axios.post(`/api/events/get`, {
            event_id: ticket.event_id
        });
        const event = pl.data.event;
        
        const formattedDate = formatDate(event.date);
        const formattedTime = formatTime(event.time);
        
        await axios.post("/api/sendEmail", {
            to: ticket.email,
            subject: `Ticket Approved for ${event.name}`,
            text: `Your ticket has been approved for ${event.name}.\nDate: ${formattedDate} at ${formattedTime}.\nLocation: ${event.location}.`
        })
        getApprovedTickets();
        setTickets(tickets.filter((t: any) => t.id !== ticket.id));
        setApproveLoading(false);
    }

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
                                <button onClick={() => handleApprove(ticket)} className='hover:opacity-60 transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#262626] text-white w-[27px] h-[27px] rounded-sm'>
                                    {
                                        approveLoading && ticketLoad == ticket.id ? <Loading color='white' size={15} /> : <IconCheck size={20} />
                                    }
                                </button>
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
                        <h1 className='text-2xl font-semibold'>No pending tickets</h1>
                    </div>
            }
        </div>
    )
}

export default Pending