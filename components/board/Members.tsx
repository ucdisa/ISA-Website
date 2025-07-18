"use client"
import React, { useState } from 'react'
import MemberCard from './MemberCard';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

interface MembersProps {
    type: string;
    members: any[];
}

const Members = (props: MembersProps) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState<any>();

  return (
    <div className='w-full mt-[20px]'>
        <div className=''>
            <p className='w-full text-2xl text-[#787878] border-b-[1px] border-b-[#cbcbcb]'>{props.type}</p>
            <div className={`flex justify-start gap-[50px] items-center flex-wrap`}>
                {
                    props.members.map((member, index: number) => {
                        return (
                            <MemberCard key={index} openModal={() => setModalOpen(true)} setModalInfo={setModalInfo} member={member} />
                        )
                    })
                }
            </div>
            {
                modalInfo &&
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <div className='bg-white w-[550px] h-[500px] outline-none rounded-md py-[10px] px-[15px] flex flex-col'>
                        <div className='flex w-full justify-between items-center'>
                            <p className='text-2xl'>{modalInfo.name}</p>
                            <p className='text-2xl font-semibold'>{modalInfo.position}</p>
                        </div>
                        <Image src='/assets/member-example.png' alt={`${modalInfo.name}'s picture`} className='rounded-md mt-[15px]' width={270} height={280}/>
                    </div>
                </Modal>
            }
        </div>
    </div>
  )
}

export default Members