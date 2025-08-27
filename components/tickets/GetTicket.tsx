"use client"

import Back from '@/components/buttons/Back';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Group, TextInput, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { TimePicker } from '@mantine/dates';
import { IconClock, IconFile } from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { FileInput } from '@mantine/core';
import EventCard from '@/components/events/EventCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/general/Loading';
import { useDisclosure } from '@mantine/hooks';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { eventType } from '@/lib/types';

interface GetTicketProps {
    event: eventType;
    admin?: boolean;
    user?: any;
    reload?: any;
    closeModal: any;
}

const GetTicket = ({event, admin, user, reload, closeModal}: GetTicketProps) => {

    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState("");
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    const handleSubmit = async(values: any) => {
        setLoading(true);
        try {
            setLoading(true);
            console.log(user.user_id, event.buyLimit, event.id);

            let spots = 0;

            await axios.post("/api/tickets/claimSpot", {
                user_id: user.user_id,
                buyLimit: event.buyLimit,
                event_id: event.id
            }).then(data => {
                spots = data.data.spots;
            }).catch(error => {
                console.log(error)
                return;
            })

            if (spots < 0) {
                open();
                setModalText("Sorry, you have bought the maximum allowed tickets for this event...")
                setLoading(false);
                return;
            } else if (spots == 0) {
                open();
                setModalText("Sorry, no more tickets are being sold at this time...")
                setLoading(false);
                return;
            }

            await axios.post("/api/tickets/post", 
                {
                    user_id: user!!.user_id,
                    event_id: event.id,
                    name: values.name,
                    email: values.email,
                }
            )

            await axios.post("/api/sendEmail", {
                to: values.email,
                subject: `Ticket Succesfully Claimed - ${event.name}`,
                text: `Hi ${values.name},\n\nYour ticket has been succesfully claimed for ${event.name}. Your ticket status is now pending. It will be valid once it is approved.\n\nThank you!`
            })

            reload();
            closeModal();
        } catch (err: any) {
            console.error('Error buying ticket:', err);
        } finally {
            router.push(
                `/tickets?user=${encodeURIComponent(
                        JSON.stringify({
                            user,
                            admin
                        })
                    )}`
                );
        }
    }

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            email: '',
            select: false
        },
    
        validate: {
            name: (value) => value != "" ? null : 'Attendee name is required',
            email: (value) => value != "" ? null : 'Attendee email is required',
            select: (value) => value ? null : 'Must accept this',
        },
    });
    return (
        <div className='w-[90%] m-auto'>

                    <form className='flex flex-col justify-center w-[100%] gap-[10px]' onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Attendee name..."
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="Attendee email..."
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <Checkbox
                            className='mt-[10px]'
                            description="No payment? Ticket will be denied*"
                            label="I have paid for my ticket"
                            onChange={(event) => form.setFieldValue("select", event.currentTarget.checked)}
                        />
                            <button type="submit" className='bg-black w-[90px] h-[30px] mt-[10px] text-white rounded-xs hover:opacity-80 cursor-pointer transition-all duration-200 shadow'>
                                {loading ? <Loading color="white" size={18}/> : <p className='text-sm'>Confirm</p>}
                            </button>
                    </form>
                    <Modal overlayProps={{
                            backgroundOpacity: 0.55,
                            blur: 3,
                        }} opened={opened} size="auto" onClose={close} centered withCloseButton={false}>
                        <div className='w-[200px] flex flex-col justify-center items-center gap-[5px]'>
                            <InfoOutlineIcon className='text-red-400'/>
                            <p className='text-center'>
                                {modalText}
                            </p>
                        </div>
                    </Modal>
        </div>
    )
}

export default GetTicket