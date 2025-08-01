"use client"

import Back from '@/components/buttons/Back';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const page = () => {

    const searchParams = useSearchParams();
    const userParam = searchParams.get('user');
    const sessionUser = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;
    const [action, setAction] = useState<any>(null);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            date: '',
            time: '',
            location: '',
            description: '',
            image: '',
            spots: 0,
            termsOfService: false,
        },
    
        validate: {
          
        },
    });

    return (
        <div className='w-[90%] m-auto'>
            <Back link={{
                        pathname: '/tickets',
                        query: { user: encodeURIComponent(JSON.stringify({
                        user_metadata: sessionUser,
                        admin: sessionUser.admin
                        }))}
                    }}
            />
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
                withAsterisk
                label="Event Name"
                placeholder="enter name here..."
                key={form.key('email')}
                {...form.getInputProps('email')}
            />

            <Group justify="flex-end" mt="md">
                    <button type="submit" className='bg-black text-black px-4 py-[5px] text-white rounded-xs hover:opacity-80 transition-all duration-200 shadow-sm'>
                        Create Events
                    </button>
            </Group>
            </form>
        </div>
    )
}

export default page