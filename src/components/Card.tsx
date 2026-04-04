import { Link } from "react-router-dom";
import type { IEventReduced } from "../models/event.interface";

export default function Card({ event, categories }: { event: IEventReduced, categories: Record<string, string> }) {
    // document.addEventListener("DOMContentLoaded", () => console.log(categories));

    // Определяем, является ли дата мероприятия будущей
    const isFuture = new Date(event.date_event) < new Date();
    
    // Текст кнопки: для будущих событий всегда "Подробнее",
    // для прошлых/текущих – оставляем исходную логику
    const buttonText = isFuture 
        ? "Подробнее" 
        : (event.is_active === 1 ? "Записаться" : "Подробнее");

    const LabelText = isFuture 
        ? "" 
        : (event.is_active === 1 ? "Идет регистрация" : "Закрыто");
    return (
        <article className="event-item">
            <div className="event-left">
                <div className="event-left-up">
                    <Link to={`/event/${event.event_id}`}>
                        <h3 className="event-name unbounded-bold">{event.name_event}</h3>
                    </Link>
                    <div>
                        <p className="special unbounded-regular">
                            {new Date(event.date_event).toLocaleDateString("ru-RU")}
                        </p>
                        <p className="special unbounded-regular">{event.time_event}</p>
                        <p className="special unbounded-regular">{categories[event.event_category]}</p>
                        <p className="special unbounded-regular border-red"
                            style={{ display: `${event.remaining_seats > 10 ? "none" : "block"}` }}>Осталось мест:{event.remaining_seats}</p>
                    </div>
                </div>
                <div className="event-left-down">
                    <h4 className="event-cost unbounded-regular">{event.price_event === 0 ? "Бесплатно" : `${event.price_event} руб`}</h4>
                    <Link to={`/event/${event.event_id}#registration`}>
                        <button className="event-btn unbounded-regular">{buttonText}</button>
                    </Link>
                </div>
            </div>
            <div className="event-img">
                <div className="event-img-gradient"></div>
                <img src={`http://62.109.16.129:5000${event.images_events}`} alt="" srcSet="" className="event-img-img" />
                <span className="event-img-text unbounded-regular">{LabelText}</span>
            </div>
        </article>
    );
}