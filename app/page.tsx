"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState } from "react";
import EventCard from "@/components/homepage/EventCard";

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } }
};
const letter = {
  hidden: { opacity: 0, y: 20 },
  show:  { opacity: 1, y: 0 }
};

export default function Home() {

  const [events, _] = useState([
    {
      name: 'Dhwani After Party',
      date: new Date(),
      time: '10:00 AM',
      location: '2916 Moore Ave, Davis, CA',
      description: 'Dhwani is a cultural festival organized by the Indian Student Association at UC Davis. It is a platform for students to showcase their talents and cultures.',
      image: '/assets/party.png',
      link: '/events/dhwani'
    },
    {
      name: 'Holi',
      date: new Date(),
      time: '8:00 PM',
      location: 'Sacramento',
      description: 'Dhwani is a cultural festival organized by the Indian Student Association at UC Davis. It is a platform for students to showcase their talents and cultures.',
      image: '/assets/summer.png',
      link: '/events/dhwani'
    },
    {
      name: 'Garba',
      date: new Date(),
      time: '9:00 PM',
      location: 'Arc Ballroom A',
      description: 'Dhwani is a cultural festival organized by the Indian Student Association at UC Davis. It is a platform for students to showcase their talents and cultures.',
      image: '/assets/party.jpg',
      link: '/events/dhwani'
    },
  ])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full gap-[5px]">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-8xl font-bold"
        >
          {Array.from("Namaste and welcome to ISA").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-3xl"
        >
          {'UC Davis\'s Indian Student Association'}
        </motion.h4>
      </div>
      <div className="w-[90%] mt-[40px] rounded-md">
        <Swiper
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-[700px] rounded-md"
        >
          <SwiperSlide className="h-full">
            <Image src="/assets/swiper-images/img1.jpg" alt="img1" fill style={{ objectFit: 'cover' }}/>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <Image src="/assets/swiper-images/img2.png" alt="img2" fill style={{ objectFit: 'cover' }}/>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <Image src="/assets/swiper-images/img3.png" alt="img3" fill style={{ objectFit: 'cover' }}/>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <Image src="/assets/swiper-images/img4.jpg" alt="img4" fill style={{ objectFit: 'cover' }}/>
          </SwiperSlide>
          <SwiperSlide className="h-full">
            <Image src="/assets/swiper-images/img5.jpg" alt="img5" fill style={{ objectFit: 'cover' }}/>
          </SwiperSlide>
          <SwiperSlide className="h-full">Slide 6</SwiperSlide>
          <SwiperSlide className="h-full">Slide 7</SwiperSlide>
          <SwiperSlide className="h-full">Slide 8</SwiperSlide>
          <SwiperSlide className="h-full">Slide 9</SwiperSlide>
        </Swiper>
      </div>
      <motion.div
        className="w-[90%] mt-[60px] flex items-center justify-between gap-[20px] h-[30vh]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="w-[90%] flex flex-col justify-center gap-[10px]">
          <h1
            className="text-7xl font-bold"
          >
            Our Mission
          </h1>
          <p
            className="text-xl"
          >
          The Indian Student Association at UC Davis is an undergraduate student run organization at UCD that allows for Indian as well as other students interested in Indian cultures and traditions to unite under one common organization. Our main goals are to bring the UC Davis community closer through holding social events for cultural awareness, fundraising for the underprivileged community, and working in conjunction with other South Asian organizations.
          </p>
        </div>

        <div className="w-[1px] h-[60%] bg-[#acacac]" />
        
        <div className="flex flex-col justify-center items-center rounded-md gap-[5px]">
          <p className="text-3xl font-semibold">35+</p>
          <p className="text-lg">Members</p>
        </div>
      </motion.div>
      
      <motion.div
        className="w-[90%] mt-[40px] flex flex-col justify-center gap-[20px]"
        initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p
          className="text-7xl font-bold"
        >
          Upcoming Events
        </p>
        <div className="flex items-center justify-start gap-[30px] overflow-x-auto w-[100%] flex-nowrap pb-[10px]">
          {
            events.map((event, index) => {
              return (
                <EventCard key={index} event={event}/>
              )
            })
          }
        </div>
      </motion.div>
    </div>
  );
}
