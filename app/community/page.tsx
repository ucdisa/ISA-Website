"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Bullet = ({ text }: any) => (
    <div className='flex flex-row pl-[40px] items-center gap-[10px] justify-start'>
        <div className='w-[10px] h-[10px] rounded-full bg-black'/>
        <p className='font-medium'>{text}</p>
    </div>
)

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
            <div>
                    <p
                        className="text-5xl font-bold"
                    >
                    How to join ISA
                    </p>
            </div>
            <div className='w-[90%] pr-[20%] mt-[20px] flex flex-col gap-[15px] text-xl'>
                <p className=''>Whether you’re new to UC Davis or simply looking to connect with a vibrant and welcoming community, joining the Indian Student Association (ISA) is easy and open to all students, regardless of background!</p>
                <p className='font-semibold'>
                    Being part of ISA is as simple as attending our events!
                </p>
                <p>Come meet fellow students, celebrate Indian festivals, join game nights, study socials, and much more. Events are usually posted on Instagram and sent through email as well.</p>
            </div>
        </motion.div>

        <motion.div
            className='w-[90%] mt-[40px]'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
            <div>
                    <p
                        className="text-5xl font-bold"
                    >
                    Want to do more?
                    </p>
            </div>
            <div className='w-[90%] pr-[20%] mt-[20px] flex flex-col gap-[15px] text-xl'>
                <p className=''>Want to do more? We offer many ways to get involved:</p>
                <Bullet text="Feel free to reach out regarding any idea or suggestion you may have." />
                <Bullet text="Apply to be an Intern!" />
                <Bullet text="Apply for board positions during the end of the school year!" />
                <Bullet text="Collaborate with us if you're part of another student org!" />
                <p>Come meet fellow students, celebrate Indian festivals, join game nights, study socials, and much more. Events are usually posted on Instagram and sent through email as well.</p>
            </div>
        </motion.div>

        <motion.div
            className='w-[90%] mt-[40px]'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div>
                    <p
                        className="text-5xl font-bold"
                    >
                    Where to Find Us 📍
                    </p>
            </div>
            <div className='w-[90%] pr-[20%] mt-[20px] flex flex-col gap-[15px] text-xl'>
                <p className=''>Follow us on Instagram @ucdisa, check your email, and visit our booth during tabling weeks in the MU or the Silo tables. Don’t hesitate to DM or email us with questions!</p>
                <p className='font-semibold'>
                    Testimonials from past members
                </p>
            </div>
        </motion.div>
    </div>
  )
}

export default page