"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Footer } from "@/components/general/Footer";
import { useState } from "react";
import EventCard from "@/components/homepage/EventCard";

export default function Home() {

  const [events, setEvents] = useState([
    {
      name: 'Dhwani After Party',
      date: new Date().toLocaleDateString(),
      time: '10:00 AM',
      location: '2916 Moore Ave, Davis, CA',
      description: 'Dhwani is a cultural festival organized by the Indian Student Association at UC Davis. It is a platform for students to showcase their talents and cultures.',
      image: '/assets/party.png',
      link: '/events/dhwani'
    },
    {
      name: 'Holi',
      date: new Date().toLocaleDateString(),
      time: '8:00 PM',
      location: 'Sacramento',
      description: 'Dhwani is a cultural festival organized by the Indian Student Association at UC Davis. It is a platform for students to showcase their talents and cultures.',
      image: '/assets/summer.png',
      link: '/events/dhwani'
    },
    {
      name: 'Garba',
      date: new Date().toLocaleDateString(),
      time: '9:00 PM',
      location: 'Arc Ballroom A',
      description: 'Dhwani is a cultural festival organized by the Indian Student Association at UC Davis. It is a platform for students to showcase their talents and cultures.',
      image: '/assets/party.jpg',
      link: '/events/dhwani'
    },
  ])

  return (
    <div className="h-full w-full mt-[50px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full gap-[5px]">
        <h1 className="text-8xl font-bold">Welcome to the ISA</h1>
        <h4 className="text-3xl">UC Davis's Indian Student Association</h4>
      </div>
      <div className="w-[85%] mt-[40px] bg-blue-100 rounded-md">
        <Swiper
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-[700px]"
        >
          <SwiperSlide className="h-full">Slide 1</SwiperSlide>
          <SwiperSlide className="h-full">Slide 2</SwiperSlide>
          <SwiperSlide className="h-full">Slide 3</SwiperSlide>
          <SwiperSlide className="h-full">Slide 4</SwiperSlide>
          <SwiperSlide className="h-full">Slide 5</SwiperSlide>
          <SwiperSlide className="h-full">Slide 6</SwiperSlide>
          <SwiperSlide className="h-full">Slide 7</SwiperSlide>
          <SwiperSlide className="h-full">Slide 8</SwiperSlide>
          <SwiperSlide className="h-full">Slide 9</SwiperSlide>
        </Swiper>
      </div>
      <div className="w-[85%] mt-[60px] flex items-center justify-between gap-[20px] h-[30vh]">
        <div className="w-[85%] flex flex-col justify-center gap-[10px]">
          <h1 className="text-7xl font-bold">Our Mission</h1>
          <p className="text-xl">
          The Indian Student Association at UC Davis is an undergraduate student run organization at UCD that allows for Indian as well as other students interested in Indian cultures and traditions to unite under one common organization. Our main goals are to bring the UC Davis community closer through holding social events for cultural awareness, fundraising for the underprivileged community, and working in conjunction with other South Asian organizations.
          </p>
        </div>

        <div className="w-[1px] h-[60%] bg-[#acacac]" />
        
        <div className="flex flex-col justify-center items-center rounded-md gap-[5px]">
          <p className="text-3xl font-semibold">35+</p>
          <p className="text-lg">Members</p>
        </div>
      </div>
      
      <div className="w-[85%] mt-[40px] flex flex-col justify-center gap-[20px]">
          <p className="text-7xl font-bold">Upcoming Events</p>
          <div className="flex items-center justify-start gap-[20px] overflow-x-auto w-[100%] flex-nowrap pb-[10px]">
            {
              events.map((event, index) => {
                return (
                  <EventCard key={index} event={event}/>
                )
              })
            }
          </div>
      </div>
    </div>
  );
}
