import type IEvent from "../models/event.interface";
import { SortingName } from "../models/sorting.enum";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import SortList from "../components/SortList";

export default function MainPage() {
    const [sorting, setSorting] = useState<string>(SortingName.Nearest);
    const [sortedEvents, setSortedEvents] = useState<IEvent[]>([]);

    const events: IEvent[] = [
        {
            name: "Мероприятие 1",
            date: "02.01.2026",
            time: "09:00",
            registration: true,
            price: 0
        },
        {
            name: "Шампупуни от пупуни",
            date: "19.01.2026",
            time: "12:10",
            registration: true,
            price: 100
        },
        {
            name: "Мероприятие 2",
            date: "15.12.2025",
            time: "20:45",
            registration: false,
            price: 50
        },
        {
            name: "Мероприятие 3",
            date: "01.01.2025",
            time: "15:40",
            registration: true,
            price: 150
        },
    ];

    useEffect(() => {
        const sortEvents = () => {
            const eventsCopy = [...events];

            switch (sorting) {
                case SortingName.Nearest:
                    return eventsCopy.sort((a, b) => {
                        const dateA = new Date(a.date.split('.').reverse().join('-'));
                        const dateB = new Date(b.date.split('.').reverse().join('-'));
                        return dateA.getTime() - dateB.getTime();
                    });

                case SortingName.Cheaper:
                    return eventsCopy.sort((a, b) => a.price - b.price);

                case SortingName.Expensive:
                    return eventsCopy.sort((a, b) => b.price - a.price);

                default:
                    return eventsCopy;
            }
        };

        setSortedEvents(sortEvents());
    }, [sorting]);

    return (
        <main className="main">
            <section className="greeting">
                <Wrapper>
                    <img src="./iteen.png" alt="iteen" className="greeting-iteen" />
                    <div className="greeting-texts">
                        <span className="unbounded-bold greeting-heading">Мероприятия<br />от IT-Academy</span>
                        <span className="unbounded-regular greeting-text">список мероприятий</span>
                    </div>
                </Wrapper>
            </section>
            <section className="main-head-name">
                <Wrapper>
                    <p className="main-text-event unbounded-bold">Мероприятия</p>
                    <div className="main-text-block">
                        <div className="main-text">
                            <div className="search-block">
                                <div className="fix-div">
                                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                        viewBox="0 0 17 17" fill="none">
                                        <path
                                            d="M16 16L11 11M1 6.83333C1 7.59938 1.15088 8.35792 1.44404 9.06565C1.73719 9.77339 2.16687 10.4164 2.70854 10.9581C3.25022 11.4998 3.89328 11.9295 4.60101 12.2226C5.30875 12.5158 6.06729 12.6667 6.83333 12.6667C7.59938 12.6667 8.35792 12.5158 9.06565 12.2226C9.77339 11.9295 10.4164 11.4998 10.9581 10.9581C11.4998 10.4164 11.9295 9.77339 12.2226 9.06565C12.5158 8.35792 12.6667 7.59938 12.6667 6.83333C12.6667 6.06729 12.5158 5.30875 12.2226 4.60101C11.9295 3.89328 11.4998 3.25022 10.9581 2.70854C10.4164 2.16687 9.77339 1.73719 9.06565 1.44404C8.35792 1.15088 7.59938 1 6.83333 1C6.06729 1 5.30875 1.15088 4.60101 1.44404C3.89328 1.73719 3.25022 2.16687 2.70854 2.70854C2.16687 3.25022 1.73719 3.89328 1.44404 4.60101C1.15088 5.30875 1 6.06729 1 6.83333Z"
                                            stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input type="text" id="search" className="search unbounded-light" placeholder="Поиск" />
                                </div>
                            </div>
                        </div>
                        <div className="buttons-block">
                            <button className="main-filter unbounded-regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M1 1H14.3333V2.81C14.3332 3.25199 14.1576 3.67585 13.845 3.98833L10.1667 7.66667V13.5L5.16667 15.1667V8.08333L1.43333 3.97667C1.15454 3.66994 1.00004 3.27033 1 2.85583V1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Фильтр
                            </button>
                            <SortList sorting={sorting} setSorting={setSorting} />
                        </div>
                    </div>
                </Wrapper>
            </section>
            <section className="main-events">
                <Wrapper>
                    <div className="main-events-container">
                        {sortedEvents.map((event, index) => (
                            <Card event={event} key={index} />
                        ))}
                    </div>
                </Wrapper>
            </section>
            <Footer />
        </main >
    );
}


//react-multi-carousel