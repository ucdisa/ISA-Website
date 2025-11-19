"use client"

import Back from '@/components/buttons/Back';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Group, TextInput, Modal, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/general/Loading';
import { useDisclosure } from '@mantine/hooks';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { eventType } from '@/lib/types';
import zelle from '@/public/assets/zelle.png'
import venmo from '@/public/assets/venmo.jpg'
import Image from 'next/image';
import { IconFile } from '@tabler/icons-react';
import { Switch } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

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
        // Validate email format before proceeding
        const emailVal = (values?.email ?? '').trim();
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailVal)) {
            if (typeof form?.setFieldError === 'function') {
                form.setFieldError('email', 'Enter a valid email address');
            }
            return;
        }

        try {
            setLoading(true);

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

            const formData = new FormData();
            formData.append("user_id", user!!.user_id);
            formData.append("event_id", event.id!!);
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("receipt", values.receipt);
            formData.append("member", values.member);

            await axios.post("/api/tickets/post", formData).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
                return;
            })

            try {
                await axios.post("/api/sendEmail", {
                    to: values.email,
                    subject: `We’ve Received Your Ticket Request for ${event.name}`,
                    text: `Hi ${values.name},\n\nThank you for your interest for ${event.name} hosted by the Indian Student Association at UC Davis.\nWe’ve successfully received your tickets request, and it is now under review. You will receive a confirmation email once your payment has been reviewed and ticket has been approved.\nIf you have any questions in the meantime, feel free to reach out to us at isa.atucd@gmail.com or our instagram!\n\nLooking forward to seeing you soon!\nISA at UC Davis`
                })
            } catch (err: any) {
                const msg = "Failed to get ticket. Please try again.";
                setModalText(msg);
                open();
                setLoading(false);
                return;
            }

            reload();
            closeModal();
        } catch (err: any) {
            console.error('Error buying ticket:', err);
        }

        router.push(
            `/tickets?user=${encodeURIComponent(
                JSON.stringify({
                    user,
                    admin
                })
            )}`
        );
    }

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            email: '',
            select: false,
            receipt: null as File | null,
            member: false,
        },
    
        validate: {
            name: (value) => value != "" ? null : 'Attendee name is required',
            email: (value) => value != "" ? null : 'Attendee email is required',
            select: (value) => value ? null : 'Must accept this',
            receipt: (value) => value ? null : 'Proof of payment is required',
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
                        <div className='flex justify-start gap-[20px] items-center'>
                            
                        </div>

                        <div className='w-full flex flex-col justify-center items-center py-[20px]'>
                            <div className='flex justify-center items-center gap-[30px]'>
                                <p className='text-[14px]'>Members - <b>${event.memberPrice}</b></p>
                                <p className='text-[14px]'>Regular - <b>${event.regularPrice}</b></p>
                            </div>
                            <Image 
                                src={zelle}
                                alt='zelle'
                                className='w-[300px] shadow rounded-md p-[10px] mb-[30px]'
                            />
                            <Image 
                                src={venmo}
                                alt='venmo'
                                className='w-[300px] shadow rounded-md p-[10px]'
                            />
                        </div>

                        <Switch
                            checked={form.values.member}
                            className='mt-[20px] mb-[5px]'
                            onChange={(event) => form.setFieldValue("member", event.currentTarget.checked)}
                            color="teal"
                            size="md"
                            label="Are you a member?"
                            thumbIcon={
                                form.values.member ? (
                                <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                                ) : (
                                <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                                )
                            }
                        />

                        <FileInput 
                            onChange={(value) => {
                                form.setFieldValue('receipt', value)
                            }} 
                            className='w-[40%]' 
                            accept="image/png,image/jpeg" 
                            clearable 
                            label="Proof of payment" 
                            leftSection={<IconFile size={16} stroke={1.5} />} 
                            placeholder="Upload..." 
                        />
                        
                        <Checkbox
                            className='mt-[20px]'
                            description="No payment? Ticket will be denied*"
                            label="I have paid for my ticket"
                            onChange={(event) => form.setFieldValue("select", event.currentTarget.checked)}
                        />
                        
                        <button disabled={loading} type="submit" className='bg-black w-[90px] h-[30px] mt-[10px] mb-[10px] text-white rounded-xs hover:opacity-80 cursor-pointer transition-all duration-200 shadow'>
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