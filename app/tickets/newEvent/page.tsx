"use client"

import Back from '@/components/buttons/Back';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const page = () => {

    const searchParams = useSearchParams();
    const userParam = searchParams.get('user');
    const sessionUser = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

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

        </div>
    )
}

export default page