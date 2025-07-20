"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Bullet = ({ text }: any) => (
    <div className='flex flex-row pl-[40px] items-center gap-[10px] justify-start'>
        <div className='w-[10px] h-[10px] rounded-full bg-black'/>
        <p className=' text-lg'>{text}</p>
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
                <p
                    className="text-7xl font-bold"
                >
                Intern Program
                </p>
        </motion.div>
        <motion.div
            className='w-[90%] mt-[20px] text-xl pr-[20%] gap-[20px] flex flex-col'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
            <p>ISA Interns are a year-long leadership development opportunity for UC Davis students who are interested in being part of the Indian Student Association, but aren't on the board (yet!).</p>
            <p>It’s designed for students who want to get more involved in the <b>South Asian community</b> on campus, gain hands-on experience with event planning and cultural programming, and eventually grow into future board leaders. Whether you're a freshman finding your community, a transfer student trying something new,or someone who wants to get involved behind the scenes, or just loves organizing events and meeting people — being an isa intern is a great way to start your ISA journey.
            </p>
        </motion.div>
        <motion.div
            className='w-[90%] mt-[50px]'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        >
            <p className='text-5xl font-bold'>What they do</p>
            <div className='mt-[20px]'>
                <p className='text-xl'>As an <b>intern</b>, you'll:</p>
                <div className='mt-[15px] flex flex-col gap-[15px]'>
                    <Bullet text="Work closely with board members and shadow their roles" />
                    <Bullet text="Help plan and organize events (from Diwali to Holi and everything in between!)" />
                    <Bullet text="Support marketing, logistics, outreach, or tech — depending on your interests" />
                    <Bullet text="Bring fresh ideas and help shape ISA’s impact on campus" />
                    <Bullet text="Gain leadership experience, meet new people, and have fun!" />
                </div>
            </div>
        </motion.div>

        <motion.div
            className='w-[90%] mt-[50px]'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0, duration: 0.6, ease: 'easeOut' }}
        >
            <p className='text-5xl font-bold'>How to Apply</p>
            <div className='mt-[20px]'>
                <p className='text-xl'>We usually recruit interns at the <b>start of Fall Quarter.</b></p>
                <div className='mt-[15px] gap-[20px] flex'>
                    <div className='shadow-md w-[300px] p-[10px] justify-center items-center flex rounded-md'>
                        <p>Keep an eye on our Instagram <a className='text-blue-800 underline' target='_blank' href='https://www.instagram.com/ucdisa/'>@isa.ucd</a> and newsletters for announcements.</p>
                    </div>
                    <div className='shadow-md w-[300px] p-[10px] justify-center items-center rounded-md flex'>
                        <p>Fill out the <b>ISA Intern Application Form</b> (Google Form link will be provided during recruitment).</p>
                    </div>
                    <div className='shadow-md w-[300px] p-[10px] justify-center items-center rounded-md flex'>
                        <p>Selected applicants may be invited for a casual interview/chat with board members.</p>
                    </div>
                </div>
            </div>
            <p className='text-lg mt-[20px]'>No prior experience needed <b>—</b> just enthusiasm and a willingness to learn!</p>
        </motion.div>
    </div>
  )
}

export default page