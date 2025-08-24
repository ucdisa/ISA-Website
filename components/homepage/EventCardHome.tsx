import React, { useState, useEffect } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from 'next/link';
import { IconEdit, IconTrash, IconTicket } from '@tabler/icons-react';
import axios from 'axios';
import Loading from '../general/Loading';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import GetTicket from '../tickets/GetTicket';

interface EventCardHomeProps {
    event: {
        name: string;
        date: Date;
        time: string;
        location: string;
        description: string;
        image: File | string | null;
        link?: string;
        id?: string;
    };
}

const EventCardHome = ({ event }: EventCardHomeProps) => {
  const [imageUrl, setImageUrl] = useState<string>('https://marketplace.canva.com/EAGqA67zGKE/1/0/1131w/canva-teal-and-white-playful-summer-party-flyer-s5KPUv2jKmI.jpg');

  useEffect(() => {
    if (event.image instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(event.image);
    } else if (typeof event.image === 'string' && event.image.length > 0) {
      setImageUrl(event.image);
    }
  }, [event.image]);

  const formatTime = (time: string) => {
      if (!time) return "";
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div
      className="relative w-[400px] h-[400px] rounded-sm shadow-sm flex-none bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {/* Text content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="font-semibold text-[22px]">{event.name == "" ? "Event Name" : event.name}</p>
        <div className='flex items-center justify-start gap-[5px]'>
            <PlaceOutlinedIcon sx={{ fontSize: "20px" }} />
            <p className="text-[15px]">{event.location == "" ? "Event Location" : event.location}</p>
        </div>
        <div className="mt-2 text-xs flex justify-between items-center w-full">
            <div className='flex justify-start items-center gap-[5px]'>
              <CalendarMonthOutlinedIcon sx={{ fontSize: "20px" }}/>
              <p className='text-[15px]'>{new Date(event.date).toLocaleDateString()}</p>
              <p className='text-[15px]'>@</p>
              <p className='text-[15px]'>{event.time == "" ? "Event Time" : formatTime(event.time)}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EventCardHome