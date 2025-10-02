import Loading from '@/components/general/Loading';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState } from 'react'

interface CancelsProps {
    tickets: any;
    setTickets: (tickets: any) => void;
}

const Cancels = ({ tickets, setTickets }: CancelsProps) => {
    const [approveLoading, setApproveLoading] = useState(false);
    const [ticketLoad, setTicketLoad] = useState(-1);

    const handleApprove = async (ticket: any) => {
        setTicketLoad(ticket.id);
        setApproveLoading(true);
        console.log(ticket)

        const pl = await axios.post(`/api/events/get`, {
            event_id: ticket.event_id
        });
        const event = pl.data.event;

        console.log(event)

        await axios.delete("/api/tickets/delete", {
            data: {
                ticket_id: ticket.id,
            }
        })

        await axios.post("/api/sendEmail", {
            to: ticket.email,
            subject: `Ticket Succesfully Cancelled - ${event.name}`,
            text: `Hi ${ticket.name},\n\nYour ticket has been succesfully cancelled for ${event.name}. If this was a mistake, please contact us at isa.atucd@gmail.com. You will be refunded for your ticket within 48 hours.\n\nThank you!`
        })

        alert("er")
        setTickets(tickets.filter((t: any) => t.id !== ticket.id));
        setApproveLoading(false);
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
                                <button onClick={() => handleApprove(ticket)} className='hover:opacity-60 transition-all duration-200 cursor-pointer flex items-center justify-center bg-red-400 text-white w-[27px] h-[27px] rounded-sm'>
                                    {
                                        approveLoading && ticketLoad == ticket.id ? <Loading color='white' size={15} /> : <IconCheck size={20} />
                                    }
                                </button>
                            </div>
                        </div>
                    ))
                :
                    <div className='flex justify-start mt-[20px]'>
                        <h1 className='text-2xl font-semibold'>No cancel requests</h1>
                    </div>
            }
        </div>
    )
}

export default Cancels