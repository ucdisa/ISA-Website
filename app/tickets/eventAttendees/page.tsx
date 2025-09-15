"use client"

import Loading from '@/components/general/Loading';
import EventAttendees from '@/components/tickets/attendees/EventAttendees';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

const EventAttendeesPageInner = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const userParam = searchParams.get('user');
    const params = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;
    const user = params.user;
    const admin = params.admin;
    const event_id = params.event_id;

    return (
        <EventAttendees user={user} admin={admin} event_id={event_id} />
    )
}

const Page = () => (
  <Suspense fallback={<Loading color='black' size={20} />}> 
    <EventAttendeesPageInner />
  </Suspense>
);

export default Page;