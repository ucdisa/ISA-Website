"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Members from '@/components/board/Members';

const page = () => {

    const [exec, setExec] = useState([
        {
            name: 'Ani Lastname',
            position: 'Vice President',
            photo: 'member-example.png'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Dhwani Director',
            photo: 'temp'
        },
    ])

    const [board, setBoard] = useState([
        {
            name: 'Ani Lastname',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Dhwani Director',
            photo: 'temp'
        },
        {
            name: 'Ani Lastname',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Dhwani Director',
            photo: 'temp'
        },
        {
            name: 'Ani Lastname',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Vice President',
            photo: 'temp'
        },
        {
            name: 'Surya Balamurugan',
            position: 'Dhwani Director',
            photo: 'temp'
        },
    ])

    return (
        <div className='h-full w-full mt-[50px] flex flex-col items-center justify-center'>
            <motion.div
                className='w-[90%]'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <p
                    className="text-7xl font-bold"
                >
                Meet the Board
                </p>
            </motion.div>
            <motion.div 
                className='w-[90%]'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            >
                <Members type={'Exec'} members={exec}/>
                <Members type={'Board'} members={board}/>
            </motion.div>
        </div>
    )
}

export default page