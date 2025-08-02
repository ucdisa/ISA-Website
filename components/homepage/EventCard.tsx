import React from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

interface EventCardProps {
    event: {
        name: string;
        date: Date;
        time: string;
        location: string;
        description: string;
        image: string | null;
        link?: string;
    };
}

const EventCard = ({ event }: EventCardProps) => {
  const getImageUrl = () => {
    if (!event.image) return 'https://marketplace.canva.com/EAGqA67zGKE/1/0/1131w/canva-teal-and-white-playful-summer-party-flyer-s5KPUv2jKmI.jpg';
    return event.image;
  };

  return (
    <div
      className="relative w-[400px] h-[400px] rounded-sm shadow-sm flex-none bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${getImageUrl()})` }}
    >
      {/* Gradient overlay on bottom half */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {/* Text content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="font-semibold text-[22px]">{event.name == "" ? "Event Name" : event.name}</p>
        <div className='flex items-center justify-start gap-[5px]'>
            <PlaceOutlinedIcon sx={{ fontSize: "20px" }} />
            <p className="text-[15px]">{event.location == "" ? "Event Location" : event.location}</p>
        </div>
        <div className="mt-2 text-xs flex justify-start items-center gap-[5px]">
            <CalendarMonthOutlinedIcon sx={{ fontSize: "20px" }}/>
            <p className='text-[15px]'>{event.date.toLocaleDateString()}</p>
            <p className='text-[15px]'>@</p>
            <p className='text-[15px]'>{event.time == "" ? "Event Time" : event.time}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard