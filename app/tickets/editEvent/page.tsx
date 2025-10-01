"use client"

import Back from '@/components/buttons/Back';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Checkbox, Group, Notification, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { TimePicker } from '@mantine/dates';
import { IconCheck, IconClock, IconFile } from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { FileInput } from '@mantine/core';
import EventCard from '@/components/events/EventCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/general/Loading';
import { notifications } from '@mantine/notifications';

const EditEventInner = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const userParam = searchParams.get('user');
    const params = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;
    const user = params.user;
    const admin = params.admin;
    const event_id = params.event_id;
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [event, setEvent] = useState({
        name: '',
        date: new Date(),
        time: '',
        location: '',
        description: '',
        image: null as File | null,
        spots: 0,
        buyLimit: 0,
        memberPrice: 0,
        regularPrice: 0
    });

    useEffect(() => {
        const getEvent = async () => {
            const res = await axios.post('/api/events/get', {
                event_id
            })

            const event = res.data.event;

            form.setValues({
                name: event.name ?? '',
                location: event.location ?? '',
                description: event.description ?? '',
                spots: Number(event.spots ?? 0),
                buyLimit: Number(event.buyLimit ?? 0),
                memberPrice: Number(event.memberPrice ?? 0),
                regularPrice: Number(event.regularPrice ?? 0),
                image: event.image,
                date: event.date,
                time: event.time
              });

            setEvent(event);
            setPageLoading(false);
        }

        getEvent();
    }, [])

    const handleSubmit = async(values: any) => {
        setLoading(true);
        try {
            setLoading(true);
            console.log(values);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("time", values.time);
            formData.append("location", values.location);
            formData.append("date", values.date);
            formData.append("description", values.description);
            formData.append("spots", values.spots);
            formData.append("buyLimit", values.buyLimit);
            formData.append("memberPrice", values.memberPrice);
            formData.append("regularPrice", values.regularPrice);
            formData.append("image", values.image);
            formData.append("id", event_id)

            if (values.image instanceof File) {
                formData.append("image", values.image);
            }

            const res = await fetch("/api/events/update", {
                method: "PATCH",
                body: formData
            });
        } catch (err: any) {
            console.error('Error updating event:', err);
        } finally {
            notifications.show({
                title: "Success!",
                message: "Event was updated.",
                color: "teal",
                icon: <IconCheck size={16} stroke={1.5} />,
                autoClose: 2000
            });
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
            name: event.name,
            date: new Date(event.date),
            time: event.time,
            location: event.location,
            description: event.description,
            image: event.image,
            spots: event.spots,
            buyLimit: event.buyLimit,
            memberPrice: event.memberPrice,
            regularPrice: event.regularPrice
        },
    
        validate: {
            name: (value) => value != "" ? null : 'Event name is required',
            time: (value) => value.trim() ? null : 'Time is required',
            location: (value) => value.trim() ? null : 'Location is required',
            date: (value) => value != null ? null : 'Date is required',
            spots: (value) => value > 0 ? null : 'Available Tickets cannot be 0',
            buyLimit: (value) => value > 0 ? null : 'Ticket Limit cannot be 0',
            memberPrice: (value) => value > 0 ? null : 'Ticket Price cannot be 0',
            regularPrice: (value) => value > 0 ? null : 'Ticket Price cannot be 0',
        },
    });

    if (pageLoading) {
        return <Loading color='black' size={20} />
    }
    
    return (
        <div className='w-[90%] m-auto'>
            <div className='w-[100%] flex justify-between items-start mt-[10px]'>
                <div className='w-[47%] flex flex-col justify-center items-start'>
                    <div className='flex items-center justify-start'>
                        <Back link={{
                                pathname: '/tickets',
                                query: { user: encodeURIComponent(JSON.stringify({
                                    user,
                                    admin
                                }))}
                            }}
                        />
                        <p className='text-2xl ml-[20px] font-semibold'>
                            Edit Event
                        </p>
                    </div>

                    <form className='flex flex-col justify-center w-[100%] mt-[10px]' onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <div className='flex items-center justify-between'>
                        <TextInput
                            className='w-[48%]'
                            withAsterisk
                            label="Name"
                            placeholder="Enter name..."
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            className='w-[48%]'
                            withAsterisk
                            label="Location"
                            placeholder="Enter location..."
                            key={form.key('location')}
                            {...form.getInputProps('location')}
                        />
                    </div>

                    <div className='flex items-center justify-between mt-[20px]'>
                        <DatePickerInput
                            label="Date"
                            className='w-[48%]'
                            placeholder="Pick date"
                            value={form.values.date}
                            onChange={(value) => {
                                if (value) {
                                    // Parse the date string and create a Date object at midnight local time
                                    const [year, month, day] = value.split('-').map(Number);
                                    const localDate = new Date(year, month - 1, day);
                                    form.setFieldValue('date', localDate);
                                }
                            }}
                            />
                            <TimePicker 
                                value={form.values.time} 
                                onChange={(value) => form.setFieldValue('time', value)} 
                                className='w-[48%]' 
                                format="12h" 
                                minutesStep={5} 
                                withDropdown 
                                label="Time" 
                                leftSection={<IconClock size={16} stroke={1.5} />} 
                            />
                    </div>
                    
                    <div className='flex items-center justify-between mt-[20px]'>
                        <NumberInput
                            label="Available Tickets"
                            className='w-[48%]'
                            placeholder="Enter number..."
                            value={form.values.spots}
                            onChange={(value) => form.setFieldValue('spots', Number(value))}
                            allowNegative={false}
                            allowDecimal={false}
                        />

                        <NumberInput
                            label="Ticket Limit"
                            className='w-[48%]'
                            placeholder="Enter number..."
                            value={form.values.buyLimit}
                            onChange={(value) => form.setFieldValue('buyLimit', Number(value))}
                            allowNegative={false}
                            allowDecimal={false}
                        />
                    </div>

                    <Textarea 
                        value={form.values.description} 
                        onChange={(event) => form.setFieldValue('description', event.target.value)} 
                        className='mt-[20px]' 
                        resize="vertical" 
                        label="Description" 
                        placeholder="Enter description..." 
                    />

                    <div className='flex items-center justify-between mt-[20px]'>

                        <NumberInput
                            label="$ Member Price"
                            className='w-[48%]'
                            placeholder="Enter member price..."
                            value={form.values.memberPrice}
                            onChange={(value) => form.setFieldValue('memberPrice', Number(value))}
                            allowNegative={false}
                            allowDecimal={true}
                        />
                        <NumberInput
                            label="$ Regular Price"
                            className='w-[48%]'
                            placeholder="Enter regular price..."
                            value={form.values.regularPrice}
                            onChange={(value) => form.setFieldValue('regularPrice', Number(value))}
                            allowNegative={false}
                            allowDecimal={true}
                        />
                    </div>

                    <div className='mt-[20px] flex justify-between items-end'>

                        <FileInput 
                            onChange={(value) => {
                                form.setFieldValue('image', value)
                            }} 
                            className='w-[40%]' 
                            accept="image/png,image/jpeg" 
                            clearable 
                            label="Upload Cover Image" 
                            leftSection={<IconFile size={16} stroke={1.5} />} 
                            placeholder="Upload..." 
                        />
                            <button onClick={() => console.log("HELL")} type="submit" className='bg-black w-[140px] h-[35px] text-white rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm'>
                                {loading ? <Loading color="white" size={18}/> : "Update Event"}
                            </button>
                    </div>
                    </form>
                </div>

                <div className='flex flex-col justify-center items-start w-[47%]'>
                    <p className='text-2xl font-semibold'>
                        Preview
                    </p>
                    <div className='w-full flex justify-start items-start mt-[10px]'>
                        <EventCard user={user} event={form.values}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Page = () => (
  <Suspense fallback={<Loading color='black' size={20} />}> 
    <EditEventInner />
  </Suspense>
);

export default Page;