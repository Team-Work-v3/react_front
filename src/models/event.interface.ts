export interface IEventReduced {
    event_id: number;
    image: string;
    name_event: string;
    date: string;
    time: string;
    is_active: number;
    price: number;
    category: string;
}

export interface IEvent extends IEventReduced {
    info: string;
    location: string;
    max_places: number;
}