"use client"

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Menu from '@/components/general/Menu';
import TicketCenter from '@/components/tickets/TicketCenter';

const TicketsPage = () => {
  const searchParams = useSearchParams();
  const userParam = searchParams.get('user');
  const sessionUser = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;
  const user = sessionUser.user_metadata;
  const admin = sessionUser.admin;

  console.log(sessionUser)

  return (
    <div className='w-[90%] m-auto'>
        <p className='text-5xl mb-[20px]'><b>Welcome,</b>  {user.name}</p>
        <TicketCenter admin={admin} user={user}/>
    </div>
  );
};

export default TicketsPage;