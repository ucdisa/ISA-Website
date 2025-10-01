export type eventType = {
    name: string;
    date: Date;
    time: string;
    location: string;
    description: string;
    image: File | string | null;
    link?: string;
    buyLimit: number;
    id?: string;
    memberPrice: number;
    regularPrice: number;
}