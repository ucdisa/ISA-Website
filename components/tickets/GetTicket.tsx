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
    user?: object;
    reload?: any;
}

const GetTicket = ({event, admin, user, reload}: GetTicketProps) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(values: any) => {
        setLoading(true);
        try {
            setLoading(true);
            console.log(values);
            const formData = new FormData();
            formData.append("name", values.name);

            const res = await fetch("/api/events/update", {
                method: "PATCH",
                body: formData
            });
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
        },
    
        validate: {
            name: (value) => value != "" ? null : 'Event name is required',
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
                            key={form.key('location')}
                            {...form.getInputProps('location')}
                        />
                        <Checkbox
                            className='mt-[10px]'
                            description="No payment? Ticket will be denied*"
                            label="I have paid for my ticket"
                        />
                    </form>
            <button onClick={() => console.log(form.values)}>
                rrgrgr
            </button>
        </div>
    )
}

export default GetTicket