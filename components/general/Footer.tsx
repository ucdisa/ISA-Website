import Link from 'next/link'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className='w-[100%] flex justify-between items-center h-[75px] mt-[50px] px-[20px] border-t-[1px] border-[#ececec]'>
        <div className='flex items-center gap-[30px] w-[30%]'>
            <Link href="/" className='cursor-pointer hover:opacity-60 transition-all duration-200 bg-[#161616] px-[15px] py-[7px] rounded-sm shadow-sm'>
                <p className='text-[15px] font-medium text-white'>Contact Us</p>
            </Link>
            <Link href="/events" className="hover:opacity-60 transition-all duration-200 underline text-[16px]">Join our email list</Link>
        </div>
        <p className='text-[16px] text-[#a0a0a0] font-medium'>UCD ISA 2025 ©</p>
        <div className='flex items-center gap-[10px] justify-end w-[30%]'>
            <a href="https://www.instagram.com/ucdisa?igsh=NTc4MTIwNjQ2YQ==" target='_blank' className='cursor-pointer opacity-60 hover:opacity-40 transition-all duration-200'>
                <InstagramIcon className='text-black drop-shadow-sm' sx={{ fontSize: "30px" }} />
            </a>
            <a href="https://www.tiktok.com/@ucdisa?_t=ZP-8xmx6s5wEfu&_r=1" target='_blank'>
                <Image src="/assets/tiki.png" alt="TikTok" width={27} height={20} className='opacity-60 hover:opacity-40 transition-all duration-200' />
            </a>
            <a href="https://www.tiktok.com/@ucdisa?_t=ZP-8xmx6s5wEfu&_r=1" target='_blank'>
                <Image src="/assets/disco.png" alt="Discord" width={35} height={20} className='opacity-60 hover:opacity-40 transition-all duration-200' />
            </a>
            <a href="https://chat.whatsapp.com/J7ocoxHL3CfK505KOTXwdY" target='_blank' className='cursor-pointer opacity-60 hover:opacity-40 transition-all duration-200'>
                <WhatsAppIcon className='text-[#000] drop-shadow-sm' sx={{ fontSize: "30px" }} />
            </a>
        </div>
    </div>
  )
}
