import React from 'react'
import { IconTicket } from '@tabler/icons-react';

const TicketCard = ({ ticket }: any) => {

    console.log(ticket.event)

    return (
        <div className='flex justify-between items-center py-[10px] gap-[20px] bg-[#f7f7f7] border-black border-[1px] px-[10px] rounded-md'>
            <IconTicket stroke={1.1} size={30} color="#000"/>
            <p>{ticket.event.name}</p>
            <p>{ticket.name}</p>
            <p>{ticket.email}</p>
            <p>status: {ticket.status}</p>
        </div>
    )
}

export default TicketCard