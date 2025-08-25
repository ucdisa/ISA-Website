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

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);

    const handleCancelRequest = async () => {
        setLoading(true);
        await axios.post("/api/tickets/changeStatus", {
            ticket_id: ticket.id,
            event_id: ticket.event_id,
            status: "cancel"
        })
        getTickets();
        close();
    }

    return (
        <div className='flex justify-between items-center py-[10px] gap-[20px] bg-[#f7f7f7] border-black border-[1px] px-[10px] rounded-md'>
            <IconTicket stroke={1.1} size={30} color="#000"/>
            <p>{ticket.event.name}</p>
            <p>{ticket.name}</p>
            <p>{ticket.email}</p>
            <p className={ticket.status == 'pending' ? 'text-yellow-300' : ticket.status == 'approved' ? 'text-green-400' : 'text-red-400'}>{ticket.status == 'cancel' ? 'cancel requested' : ticket.status}</p>
            <button onClick={open} className='hover:opacity-60 transition-all flex items-center justify-center duration-200 cursor-pointer w-[25px] h-[25px]'>
                <IconTrash stroke={1.5} size={20} color='red'/>
            </button>
            <Modal overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }} opened={opened} size="auto" onClose={close} centered withCloseButton={false}>
                <div className='w-[230px] flex flex-col justify-center items-center gap-[5px]'>
                    {/* <InfoOutlineIcon className='text-red-500'/> */}
                    <p className='text-center'>
                        You are about to cancel your ticket for <b>{ticket.event.name}</b>
                    </p>
                    
                    <div className='flex justify-between items-center w-full gap-[10px]'>
                        <button onClick={handleCancelRequest} className='bg-black w-full h-[40px] mt-[10px] text-white rounded-md hover:opacity-80 transition-all duration-200 shadow cursor-pointer'>
                            {loading ? <Loading color="white" size={18}/> : 
                                <div className='flex items-center justify-center gap-[5px]'>
                                    <IconCheck stroke={1.5} size={20} color='white' />
                                    <p className='text-sm'>confirm</p>
                                </div>
                            }
                        </button>
                        <button onClick={close} className='bg-black w-full h-[40px] mt-[10px] text-white rounded-md hover:opacity-80 transition-all duration-200 shadow cursor-pointer'>
                            <div className='flex items-center justify-center gap-[5px]'>
                                <IconX stroke={1.5} size={20} color='white' />
                                <p className='text-sm'>cancel</p>
                            </div>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TicketCard