"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const page = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
        <motion.div
                className='w-[90%]'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <p
                    className="text-7xl font-bold"
                >
                Community & Involvement
                </p>
        </motion.div>
    </div>
  )
}

export default page