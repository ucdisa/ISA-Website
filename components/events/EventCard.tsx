import React, { useState, useEffect } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from 'next/link';
import { IconEdit, IconTrash, IconTicket, IconUserCog } from '@tabler/icons-react';
import axios from 'axios';
import Loading from '../general/Loading';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import GetTicket from '../tickets/GetTicket';
import { eventType } from '@/lib/types';

interface EventCardProps {
    event: eventType
    admin?: boolean;
    user?: object;
    reload?: any;
}

const EventCard = ({ event, admin, user, reload }: EventCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>('https://marketplace.canva.com/EAGqA67zGKE/1/0/1131w/canva-teal-and-white-playful-summer-party-flyer-s5KPUv2jKmI.jpg');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ticketLoading, setTicketLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete('/api/events/delete', {
        data: { id: event.id },
      });

      if (reload) reload();
    } catch (err) {
      console.error('Delete failed:', err);
    }
    setDeleteLoading(false);
  }

  const handleTicket = async () => {
    open();
  }

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

            {
              admin && admin == true ?
              <div className='flex gap-[10px] justify-center items-center  '>
                <Link
                  className='hover:opacity-80 transition-all flex items-center justify-center duration-200 cursor-pointer w-[25px] h-[25px]' 
                  href={{
                      pathname: '/tickets/eventAttendees',
                      query: { user: encodeURIComponent(JSON.stringify({
                        user,
                        event_id: event.id,
                        admin
                      }))}
                  }}
                >
                  <IconUserCog size={23} color='white' stroke={1.5}/>
                </Link>
                <Link
                  className='hover:opacity-80 transition-all flex items-center justify-center duration-200 cursor-pointer w-[25px] h-[25px]' 
                  href={{
                      pathname: '/tickets/editEvent',
                      query: { user: encodeURIComponent(JSON.stringify({
                        user,
                        event_id: event.id,
                        admin
                      }))}
                  }}
                >
                  <IconEdit size={23} color='white' stroke={1.5}/>
                </Link>
                <button onClick={handleDelete} className='hover:opacity-80 transition-all flex items-center justify-center duration-200 cursor-pointer w-[25px] h-[25px]'>
                  {
                    deleteLoading ?
                    <Loading size={19} color="#f77474"/>
                    :
                    <IconTrash stroke={1.5} size={23} color='#f77474'/>
                  }
                </button>
              </div>
              :
              <button onClick={handleTicket} className='hover:opacity-80 transition-all flex items-center justify-center duration-200 cursor-pointer w-[25px] h-[25px]'>
                  {
                    ticketLoading ?
                    <Loading size={19} color="#FFFFFF"/>
                    :
                    <IconTicket stroke={1.5} size={23} color='#FFF'/>
                  }
                </button>
            }
        </div>
      </div>
      <Modal overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }} opened={opened} onClose={close} title={event.name} centered>
        <GetTicket closeModal={close} event={event} admin={admin} user={user} reload={reload} />
      </Modal>
    </div>
  )
}

export default EventCard