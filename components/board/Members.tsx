"use client"
import React, { useState } from 'react'
import MemberCard from './MemberCard';

interface MembersProps {
    type: string;
    members: any;
}

const Members = (props: MembersProps) => {

    const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='w-full mt-[20px]'>
        <div className=''>
            <p className='w-full text-2xl text-[#787878] border-b-[1px] border-b-[#cbcbcb]'>{props.type}</p>
            <div className={`flex justify-start gap-[50px] items-center flex-wrap`}>
                {
                    props.members.map((member: any, index: number) => {
                        return (
                            <MemberCard key={index} openModal={() => setModalOpen(true)} member={member} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Members