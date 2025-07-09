"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const page = () => {

    const [tab, setTab] = useState<string>("Academics")

  return (
    <div className='h-full w-full mt-[50px] flex flex-col items-center justify-center gap-[5px]'>
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
                Resources
                </p>
            </motion.div>
            <motion.p
                className='w-[90%] text-xl'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            >
                Choose below to view...
            </motion.p>
            <motion.div 
                className='w-[90%] mt-[10px]'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            >
                <div className='inline-flex justify-around items-center px-[5px] gap-[5px] bg-[#f4f4f4] rounded-md font-medium py-[5px]'>
                    <button onClick={() => setTab("Academics")} className={`cursor-pointer rounded-sm py-[5px] px-[7px] ${tab == "Academics" && 'bg-[#fff] shadow-sm'} transition-all duration-75 ease-in-out`}>Academics</button>
                    <button onClick={() => setTab("Housing")} className={`cursor-pointer rounded-sm py-[5px] w-[110px] ${tab == "Housing" && 'bg-[#fff] shadow-sm'} transition-all duration-75 ease-in-out`}>Housing</button>
                    <button onClick={() => setTab("Student Life")} className={`cursor-pointer rounded-sm py-[5px] px-[7px] ${tab == "Student Life" && 'bg-[#fff] shadow-sm'} transition-all duration-75 ease-in-out`}>Student Life</button>
                </div>
            </motion.div>
        </div>
  )
}

export default page