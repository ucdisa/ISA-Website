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
import EventCard from '@/components/homepage/EventCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/general/Loading';
import { useDisclosure } from '@mantine/hooks';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

interface GetTicketProps {
    event: {
        name: string;
        date: Date;
        time: string;
        location: string;
        description: string;
        image: File | string | null;
        link?: string;
        id?: string;
    };
    admin?: boolean;
    user?: any;
    reload?: any;
    closeModal: any;
}

const GetTicket = ({event, admin, user, reload, closeModal}: GetTicketProps) => {

    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    const handleSubmit = async(values: any) => {
        setLoading(true);
        try {
            setLoading(true);
            console.log(values);

            const dta = await axios.post("/api/events/claimSpot", {
                event_id: event.id
            })

            console.log(dta)
            const spots = dta.data.spots;

            if (spots == 0) {
                open();
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

                            <button type="submit" className='bg-black text-black w-[90px] h-[30px] text-white rounded-xs hover:opacity-80 transition-all duration-200 shadow'>
                                {loading ? <Loading color="white" size={18}/> : <p className='text-sm'>Confirm</p>}
                            </button>
                    </form>
                    <Modal overlayProps={{
                            backgroundOpacity: 0.55,
                            blur: 3,
                        }} opened={opened} size="auto" onClose={close} centered withCloseButton={false}>
                        <div className='w-[200px] flex flex-col justify-center items-center gap-[5px]'>
                            <InfoOutlineIcon />
                            <p className='text-red-500 text-center'>
                                Sorry, no more tickets are being sold at this time...
                            </p>
                        </div>
                    </Modal>
        </div>
    )
}

export default GetTicket