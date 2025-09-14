"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Menu from '@/components/general/Menu';
import TicketCenter from '@/components/tickets/TicketCenter';
import Loading from '@/components/general/Loading';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  user_id: string;
  [key: string]: any;
}

const TicketsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/');
      return;
    }
    try {
      const userParam = searchParams.get('user');
      if (userParam) {
        const sessionUser = JSON.parse(decodeURIComponent(userParam));
        setUser(sessionUser.user);
        setAdmin(sessionUser.admin);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error parsing user data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, [searchParams]);

  if (loading || !user) {
    return <Loading color="black" size={20} />;
  }

  return (
    <div className='w-[90%] mx-auto'>
        <TicketCenter admin={admin} user={user}/>
    </div>
  );
};

export default TicketsPage;