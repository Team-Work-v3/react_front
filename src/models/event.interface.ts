export interface IEventReduced {
    event_id: number;
    name_event: string;
    date_event: string;
    time_event: string;
    price_event: number;
    images_events: string;
    event_category: string;
    is_active: number;
}

export interface IEvent extends IEventReduced {
    description_event: string;
    fullDescription_event: string;
    location_event: string;
    organizers_event: string;
    program_event: string;
    seats_event: number;
}