"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Menu from '@/components/general/Menu';

interface InfoCardProps {
    link: string;
    title: string;
    description: string;
}

const InfoCard = ({ link, title, description }: InfoCardProps) => (
    <div className='flex flex-col items-start max-w-[48%]'>
        <div>
            <Link href={link} className='cursor-pointer' target='_blank'><p className='text-3xl font-semibold underline text-blue-900'>{title}</p></Link>
            <p className='mt-[5px] text-lg'>{description}</p>
        </div>
    </div>
)

const LifeCard = ({ link, title, description }: InfoCardProps) => (
    <Link target='_blank' href={link} className='flex max-w-[49%] flex-col items-start cursor-pointer shadow-sm rounded-sm h-[220px] px-[20px] justify-start pt-[20px] hover:scale-[1.02] transition-all ease-in-out duration-200'>
        <div className=''>
            <p className='text-3xl font-semibold'>{title}</p>
            <p className='mt-[5px] text-lg'>{description}</p>
        </div>
    </Link>
)

const page = () => {

    const [tab, setTab] = useState<string>("Academics")

    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-[5px]'>
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
                    Resources
                    </p>
                </motion.div>
                <motion.div 
                    className='w-[90%] mt-[10px]'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                >
                    <Menu tab={tab} setTab={setTab} tabs={["Academics", "Housing", "Student Life"]}/>
                </motion.div>
                <motion.div
                    className='w-[90%] mt-[20px]'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                >
                    {
                        (() => {
                            switch(tab) {
                                case "Academics":
                                    return (
                                        <div className=''>
                                            <div className='flex w-full justify-between gap-[40px]'>
                                                <InfoCard link="https://careercenter.ucdavis.edu/" title="Career Center" description="The UC Davis Internship and Career Center (ICC) helps students find internships, jobs, and career paths. From résumé reviews to mock interviews and career fairs, the ICC is your go-to place to prepare for life after college."/>
                                                
                                                <InfoCard link="https://registrar.ucdavis.edu/" title="Office of the University Registrar" description="The Office of the University Registrar handles all things academic — class registration, transcripts, important deadlines, degree progress, and enrollment verification. Keep this bookmarked during pass times!"/>
                                            </div>

                                            <div className='flex w-full justify-between mt-[50px] gap-[40px]'>
                                                <InfoCard link="https://sdc.ucdavis.edu/" title="Student Disability Center" description="The Student Disability Center (SDC) is the campus unit designated to receive requests for accommodation, approve services, and coordinate support for students with disabilities to create equitable access to the University’s educational programs."/>
                                                
                                                <InfoCard link="https://ossja.ucdavis.edu/?utm_source=sja&utm_medium=redirect-hostname" title="Student support and Judicial Affairs" description="The Office of Student Support and Judicial Affairs (OSSJA) supports the university's educational mission by upholding standards of academic honesty and responsible behavior, promoting student development, and assisting students in need. "/>
                                            </div>
                                        </div>
                                    )
                                case "Housing":
                                    return (
                                        <div className=''>
                                            <div className='flex items-center justify-start gap-[20px]'>
                                                <p className='text-3xl font-semibold'>UC Davis Housing</p>
                                                <Link className='py-[7px] px-[10px] bg-[#000] shadow-sm text-sm hover:opacity-60 text-white rounded-sm font-medium flex justify-center items-center' href='https://www.ucdavis.edu/campus-life/housing' target='_blank'>More Info</Link>
                                            </div>
                                            <p className='mt-[10px] w-[50%] text-lg'>{'The UC Davis Housing website provides info on on-campus and university-managed apartments, residence halls, move-in details, and housing applications. Whether you\'re a freshman or a transfer student, it\'s the best place to start your housing search.'}</p>
                                        </div>
                                    )
                                case "Student Life":
                                    return (
                                        <div className=''>
                                            <div className='flex w-full justify-between gap-[20px]'>
                                                <LifeCard link='https://www.ucdavis.edu/campus-life' title='Campus Life' description="Campus life at UC Davis is vibrant and diverse, with over 800 student clubs, cultural orgs, events, and traditions. From Picnic Day to farmers markets on the Quad, there's always something happening!"/>

                                                <LifeCard link='https://www.ucdavis.edu/campus-life/clubs-and-communities' title='Clubs and Communities' description='You can find your community here, whether you are interested in cultural identity, outdoor exploration, religion, a future profession, artistic expression or community service. Choose from more than 800 student clubs on campus.'/>
                                            </div>

                                            <div className='flex w-full justify-between gap-[20px] mt-[20px]'>
                                                <LifeCard link='https://www.ucdavis.edu/campus-life/dining-food' title='Food' description="Whether you're looking for a refreshing beverage, a quick bite to eat, or a complete meal, there are a number of eateries located at UC Davis to satisfy just about any craving."/>

                                                <LifeCard link='https://ucdavisstores.com/home' title='Stores' description='The UC Davis Stores offer everything from textbooks and school supplies to Aggie gear and snacks. You can also shop online or rent books to save money. There’s a store location right in the Memorial Union (MU)!'/>
                                            </div>

                                            <div className='flex w-full justify-between gap-[20px] mt-[20px]'>
                                                <LifeCard link='https://aggielife.ucdavis.edu/home_login' title='Aggie Life' description="Aggie Life is UC Davis’s student organization hub. It’s where you can browse all campus clubs, RSVP to events, track your involvement, and even start your own org! If you’re looking to get involved or stay updated with club events, this is the place to be. Use your UCDavis email id and password to login!"/>

                                            </div>

                                        </div>
                                    )
                            }
                        })()
                    }
                </motion.div>
            </div>
    )
}

export default page