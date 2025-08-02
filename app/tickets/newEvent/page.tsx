"use client"

import Back from '@/components/buttons/Back';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { TimePicker } from '@mantine/dates';
import { IconClock, IconFile } from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import { FileInput } from '@mantine/core';
import EventCard from '@/components/homepage/EventCard';

const page = () => {

    const searchParams = useSearchParams();
    const userParam = searchParams.get('user');
    const sessionUser = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;
    const [action, setAction] = useState<any>(null);

    const handleSubmit = async(values: any) => {
        console.log(values);

    }

    const formatTime = (time: string) => {
        if (!time) return "";
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            date: new Date(),
            time: '',
            location: '',
            description: '',
            image: null as string | null,
            spots: 0,
            buyLimit: 0,
        },
    
        validate: {
            name: (value) => value != "" ? null : 'Event name is required',
            time: (value) => value.trim() ? null : 'Time is required',
            location: (value) => value.trim() ? null : 'Location is required',
            date: (value) => value != null ? null : 'Date is required',
            image: (value) => value != null ? null : 'Image is required',
            spots: (value) => value > 0 ? null : 'Available Tickets cannot be 0',
            buyLimit: (value) => value > 0 ? null : 'Ticket Limit cannot be 0',
        },
    });

    return (
        <div className='w-[90%] m-auto'>
            
            <div className='w-[100%] flex justify-between items-start mt-[10px]'>
                <div className='w-[47%] flex flex-col justify-center items-start'>
                    <div className='flex items-center justify-start'>
                        <Back link={{
                                pathname: '/tickets',
                                query: { user: encodeURIComponent(JSON.stringify({
                                user_metadata: sessionUser,
                                admin: sessionUser.admin
                                }))}
                            }}
                        />
                        <p className='text-2xl ml-[20px] font-semibold'>
                            New Event
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
                                onChange={(value) => form.setFieldValue('time', formatTime(value))} 
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

                    <Textarea className='mt-[20px]' resize="vertical" label="Disabled" placeholder="Enter description..." />

                    <div className='mt-[20px] flex justify-between items-end'>
                        <FileInput 
                            onChange={(value) => {
                                if (value instanceof File) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        form.setFieldValue('image', e.target?.result as string);
                                    };
                                    reader.readAsDataURL(value);
                                } else {
                                    form.setFieldValue('image', value);
                                }
                            }} 
                            className='w-[40%]' 
                            accept="image/png,image/jpeg" 
                            clearable 
                            label="Upload Cover Image" 
                            leftSection={<IconFile size={16} stroke={1.5} />} 
                            placeholder="Upload..." 
                        />

                            <button type="submit" className='bg-black text-black px-4 py-[5px] text-white rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm'>
                                Create Events
                            </button>
                    </div>
                    </form>
                </div>

                <div className='flex flex-col justify-center items-start w-[47%]'>
                    <p className='text-2xl font-semibold'>
                        Preview
                    </p>
                    <div className='w-full flex justify-start items-start mt-[10px]'>
                        <EventCard event={form.values}/>
                    </div>
                </div>
            </div>
            {/* <button onClick={() => console.log(form.values)}>
                rrgrgr
            </button> */}
        </div>
    )
}

export default page