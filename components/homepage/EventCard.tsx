import Image from 'next/image';
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface EventCardProps {
    event: {
        name: string;
        date: string;
        time: string;
        location: string;
        description: string;
        image: string;
        link: string;
    };
}

const EventCard = ({ event }: EventCardProps) => {

    const [cardExpanded, setCardExpanded] = useState(false);
    const expandCard = () => {
        setCardExpanded(!cardExpanded);
    }

  return (
    <div className='p-[12px] bg-[#fbfbfb] w-[400px] rounded-sm shadow-sm flex-none'>
        <div className='flex items-center justify-between mb-[10px] '>
            <p className='font-medium text-[20px]'>{event.name}</p>
            <p className='font-medium text-lg'>{event.date.toLocaleString()}</p>
        </div>
        <div className="w-[100%] h-[400px] relative">
          <Image
            src={event.image}
            alt={event.name}
            fill
            style={{ objectFit: 'cover', borderRadius: 5 }}
          />
        </div>

        <div className='flex justify-between items-start text-[16px] font-medium mt-[10px]'>
            <p>{event.location}</p>
            <p>{event.time}</p>
        </div>

        {
            cardExpanded && (
                <div>
                    <p>{event.description}</p>
                </div>
            )
        }

        <div className='flex justify-between items-center'>
            <div />
            <button className='' onClick={expandCard}>
                <ExpandMoreIcon className='text-[#848484]' sx={{ fontSize: "30px" }} />
            </button>
        </div>
    </div>
  )
}

export default EventCard