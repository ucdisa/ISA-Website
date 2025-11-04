import Loading from '@/components/general/Loading';
import { formatDate, formatTime } from '@/lib/functions';
import { Modal, Textarea, TextInput } from '@mantine/core';
import { IconCheck, IconFlag, IconFlagFilled, IconMessage, IconSearch, IconX } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import CommentBox from './CommentBox';

interface PendingProps {
    tickets: any;
    getApprovedTickets: () => void;
    setTickets: (tickets: any) => void;
}

const Pending = ({ tickets, getApprovedTickets, setTickets }: PendingProps) => {
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [ticketLoad, setTicketLoad] = useState(-1);
    const [searchInput, setSearchInput] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [openedHello, { open: openHello, close: closeHello }] = useDisclosure(false);
    const [openedComment, { open: openComment, close: closeComment }] = useDisclosure(false);
    const [targetTicket, setTargetTicket] = useState<any>();
    const [ticketReceipt, setTicketReceipt] = useState('');
    
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
            subject: `Ticket Approved - ${event.name}`,
            text: `Hi ${ticket.name},\n\nYour ticket has been approved for ${event.name}.\nDate: ${formattedDate} at ${formattedTime}.\nLocation: ${event.location}.\n\nThank you!`
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
                event_id: ticket.event_id,
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

        closeHello();
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
                    className='max-w-[1200px] w-[100%]'
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={handleFilter}
                    leftSection={<IconSearch size={20} />}
                />
            </div>
            {
                filteredTickets.length > 0 ?
                    filteredTickets.map((ticket: any, index: number) => (
                        <div key={ticket.id} className={`flex items-center justify-between p-[10px] rounded-md max-w-[1200px] w-[100%] shadow ${ticket.flagged && 'outline-[1px] outline-[#e75c5c]'}`}>
                            <div className='flex items-center gap-[20px] '>
                                <button onClick={() => handleFlag(ticket.flagged,ticket, index)}>
                                    {ticket.flagged ? <IconFlagFilled className='text-[#e75c5c] hover:opacity-60 duration-200 transition-all cursor-pointer' /> : <IconFlag className='text-[#e75c5c] hover:opacity-60 duration-200 transition-all cursor-pointer' /> }
                                </button>
                                <h1><b>{highlightText(ticket?.user?.displayName ?? ticket?.name ?? '—', searchInput)}</b></h1>
                            </div>
                            <p><b>{highlightText(ticket?.user?.email ?? ticket?.email ?? '—', searchInput)}</b></p>
                            <h1>{highlightText(ticket.name ?? '—', searchInput)}</h1>
                            {/* <p>{highlightText(ticket.email ?? '—', searchInput)}</p> */}

                            <div className='flex items-center justify-center gap-[40px]'>
                                <button onClick={() => {
                                    openComment();
                                    setTargetTicket(ticket)
                                }}>
                                    <IconMessage className='text-[#646464] hover:opacity-60 duration-200 transition-all cursor-pointer'/>
                                </button>

                                <button onClick={() => {
                                    setTicketReceipt(ticket.receipt);
                                    open();
                                }} className='hover:opacity-60 transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#646464] text-white px-[12px] h-[30px] rounded-md'>
                                    <p className='text-sm'>payment</p>
                                </button>

                                <div className='flex items-center justify-center gap-[10px]'>
                                    <button onClick={() => handleApprove(ticket)} className='hover:opacity-60 transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#262626] text-white w-[27px] h-[27px] rounded-sm'>
                                        {
                                            approveLoading && ticketLoad == ticket.id ? <Loading color='white' size={15} /> : <IconCheck size={20} />
                                        }
                                    </button>
                                    <button onClick={() => {
                                        openHello();
                                        setTargetTicket(ticket);
                                    }} className='hover:opacity-60 transition-all duration-200 cursor-pointer flex items-center justify-center bg-[#262626] text-white w-[27px] h-[27px] rounded-sm'>
                                        <IconX size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                :
                    <div className='flex justify-start mt-[20px]'>
                        <h1 className='text-2xl font-semibold'>No pending tickets</h1>
                    </div>
            }
            <Modal overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }} opened={opened} size="auto" onClose={close} centered withCloseButton={false}>
                <div className='w-[230px] flex flex-col justify-center items-center gap-[5px]'>
                    <img src={ticketReceipt} alt="Receipt" className=' object-contain' />
                </div>
            </Modal>
            <Modal overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }} opened={openedHello} size="auto" onClose={closeHello} centered withCloseButton={false}>
                <div className='w-[200px] flex flex-col justify-center items-center gap-[5px]'>
                    {/* <InfoOutlineIcon className='text-red-500'/> */}
                    <p className='text-center'>
                        Are you sure you want to reject this ticket?
                    </p>
                    
                    <div className='flex justify-between items-center w-full gap-[10px]'>
                        <button onClick={closeHello} className='bg-black w-full h-[40px] mt-[10px] text-white rounded-md hover:opacity-80 transition-all duration-200 shadow cursor-pointer'>
                            <div className='flex items-center justify-center gap-[5px]'>
                                <IconX stroke={1.5} size={20} color='white' />
                                <p className='text-sm'>cancel</p>
                            </div>
                        </button>
                        <button onClick={() => handleReject(targetTicket)} className='bg-red-400 w-full h-[40px] mt-[10px] text-white rounded-md hover:opacity-80 transition-all duration-200 shadow cursor-pointer'>
                            <div className='flex items-center justify-center gap-[5px]'>
                                
                                {
                                    rejectLoading ? <Loading color='white' size={15} />
                                    :
                                        <>
                                            <IconCheck stroke={1.5} size={20} color='white' />
                                            <p className='text-sm'>confirm</p>
                                        </>
                                }
                            </div>
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                opened={openedComment}
                size="auto"
                onClose={closeComment}
                closeOnClickOutside={false}
                centered
                withCloseButton={false}
            >
                {targetTicket && <CommentBox ticket_id={targetTicket.id} closeComment={closeComment}/>}
            </Modal>
        </div>
    )
}

export default Pending