import { Link } from "react-router-dom";
import type { IEventReduced } from "../models/event.interface";

export default function Card({ event }: { event: IEventReduced }) {
    return (
        <article className="event-item">
            <div className="event-left">
                <div className="event-left-up">
                    <Link to={`/event/${event.event_id}`}>
                        <h3 className="event-name unbounded-bold">{event.name_event}</h3>
                    </Link>
                    <div>
                        <p className="special unbounded-regular">{event.date_event.split("-").reverse().join(".")}</p>
                        <p className="special unbounded-regular">{event.time_event}</p>
                        <p className="special unbounded-regular">Мастер-класс</p>
                    </div>
                </div>
                <div className="event-left-down">
                    <h4 className="event-cost unbounded-regular">{event.price_event === 0 ? "Бесплатно" : `${event.price_event} BYN`}</h4>
                    <Link to={`/event/${event.event_id}#registration`}>
                        <button className="event-btn unbounded-regular">Записаться</button>
                    </Link>
                </div>
            </div>
            <div className="event-img">
                <div className="event-img-gradient"></div>
                <img src={`http://62.109.16.129:5000${event.images_events}`} alt="" srcSet="" className="event-img-img" />
                <span className="event-img-text unbounded-regular">{event.is_active === 1 ? "Идет регистрация" : "Закрыто"}</span>
            </div>
        </article>
    );
}