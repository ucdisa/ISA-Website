import Back from '@/components/buttons/Back';
import Loading from '@/components/general/Loading';
import Menu from '@/components/general/Menu';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Approved from './Approved';
import Pending from './Pending';

interface EventAttendeesProps {
    user: any;
    admin: boolean;
    event_id: string;
}

const EventAttendees = ({ user, admin, event_id }: EventAttendeesProps) => {

    const getInitialTab = () => {
        if (typeof window !== "undefined") {
            return sessionStorage.getItem("eventAttendeesTab") || "Approved";
        }
        return "Approved";
    };

    const [tab, setTab] = useState<string>("");
    const [pendingTickets, setPendingTickets] = useState([]);
    const [approvedTickets, setApprovedTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleTabChange = (newTab: string) => {
        sessionStorage.setItem("eventAttendeesTab", newTab);
        setTab(newTab);
    };

    const getPendingTickets = async () => {
        const data = await axios.post("/api/events/getTickets", {
            event_id: event_id,
            status: "pending"
        })
        
        setPendingTickets(data.data.tickets);
    }

    const getApprovedTickets = async () => {
        const data = await axios.post("/api/events/getTickets", {
            event_id: event_id,
            status: "approved"
        })

        const dataT = await axios.post("/api/events/getTickets", {
            event_id: event_id,
            status: "checked in"
        })

        const combinedTickets = [
            ...data.data.tickets,
            ...dataT.data.tickets,
        ];
        setApprovedTickets(combinedTickets as never[]);
    }

    useEffect(() => {
        getPendingTickets();
        getApprovedTickets();
        setTab(getInitialTab());

        setLoading(false);
    }, []);


    if (loading) {
        return <Loading color='black' size={20} />
    }

    return (
        <div className='w-[90%] mx-auto mt-[40px] pb-[50px]'>
            <div className='flex items-center justify-start mb-[15px]'>
                <Back link={{
                        pathname: '/tickets',
                        query: { user: encodeURIComponent(JSON.stringify({
                            user,
                            admin
                        }))}
                    }}
                />
                <h1 className='text-4xl ml-[20px] font-semibold'>
                    Event Attendees
                </h1>
            </div>
            
            <Menu tab={tab} setTab={handleTabChange} tabs={["Approved", `Pending (${pendingTickets.length})`]}/>
            <div className='mt-[10px]'>
                {
                    tab == "Approved" ?
                        <Approved getPendingTickets={getPendingTickets} setTickets={setApprovedTickets} tickets={approvedTickets} />
                    :
                        <Pending setTickets={setPendingTickets} getApprovedTickets={getApprovedTickets} tickets={pendingTickets} />
                }
            </div>
        </div>
    );
}

export default EventAttendees