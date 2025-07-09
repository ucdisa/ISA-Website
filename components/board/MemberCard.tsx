"use client"
import React from 'react'
import Image from 'next/image';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';

interface MemberCardProps {
    member: {
        name: string;
        position: string;
        photo: string;
    };
    openModal: any;
    setModalInfo: any;
}

const MemberCard = (props: MemberCardProps) => {
  return (
    <div onClick={() => {
        props.setModalInfo(props.member);
        props.openModal();
    }} className='mt-[20px] cursor-pointer flex flex-col items-center justify-center gap-[10px] py-[10px] px-[5px]'>
        <Image src='/assets/member-example.png' alt={`${props.member.name}'s picture`} className='rounded-md' width={250} height={280}/>
        <div className='flex  w-full justify-between items-end px-[5px]'>
            <div className='flex flex-col items-start justify-center'>
                <p className='font-semibold text-xl'>{props.member.name}</p>
                <p className='text-[#464646] text-[17px]'>{props.member.position}</p>
            </div>
        </div>
    </div>
  )
}

export default MemberCard