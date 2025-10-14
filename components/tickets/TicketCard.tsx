import React, { useState } from 'react'
import { IconCancel, IconCheck, IconTicket, IconTrash, IconX } from '@tabler/icons-react';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import Loading from '../general/Loading';
import axios from 'axios';

interface TicketCardProps {
    ticket: any;
    getTickets: any;
}

const TicketCard = ({ ticket, getTickets }: TicketCardProps) => {
    return (
        <div>
            <div className='hidden md:flex justify-between items-center py-[10px] gap-[20px] bg-[#f7f7f7] border-black border-[1px] px-[10px] rounded-md'>
                <IconTicket stroke={1.1} size={30} color="#000"/>
                <p>{ticket.event.name}</p>
                <p>{ticket.name}</p>
                <p>{ticket.email}</p>

                <p className={`rounded-md shadow-sm text-white text-[14px] px-[5px] py-[2px] flex justify-center items-center ${ticket.status == 'pending' ? 'bg-yellow-400' : ticket.status == 'approved' || ticket.status == "checked in" ? 'bg-green-400' : 'bg-red-400'}`}>{ticket.status == 'cancel' ? 'cancel requested' : ticket.status}</p>
            </div>

            <div className='flex md:hidden justify-between items-center w-[340px] py-[10px] gap-[20px] bg-[#f7f7f7] border-black border-[1px] px-[10px] rounded-md'>
                <IconTicket stroke={1.1} size={30} color="#000"/>
                <p>{ticket.event.name}</p>
                <p>{ticket.name}</p>

                <p className={`rounded-md shadow-sm text-white text-[14px] px-[5px] py-[2px] flex justify-center items-center ${ticket.status == 'pending' ? 'bg-yellow-400' : ticket.status == 'approved' || ticket.status == "checked in" ? 'bg-green-400' : 'bg-red-400'}`}>{ticket.status == 'cancel' ? 'cancel requested' : ticket.status}</p>
            </div>
        </div>
    )
}

export default TicketCard