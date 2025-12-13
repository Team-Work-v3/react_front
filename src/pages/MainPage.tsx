import type { IEventReduced } from "../models/event.interface";
import { SortingName } from "../models/sorting.enum";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import Footer from "../components/Footer";
import { useEffect, useMemo, useState } from "react";
import SortList from "../components/SortList";

export default function MainPage() {
    const [events, setEvents] = useState<IEventReduced[]>([]);
    const [sorting, setSorting] = useState<string>(SortingName.Nearest);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchEvents = async (): Promise<void> => {
            const response = await fetch("http://62.109.16.129:5000/api/getShortenedEvents");

            setEvents(await response.json());
        }
        fetchEvents();
    }, []);

    const sortAndFilterEvents = useMemo(() => {
        if (!Array.isArray(events) || events.length === 0) {
            return [];
        }

        let eventsCopy = [...events];

        eventsCopy = eventsCopy.filter(event =>
            event.name_event.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        );

        switch (sorting) {
            case SortingName.Nearest:
                return eventsCopy.sort((a, b) => {
                    const dateA = new Date(`${a.date_event}T${a.time_event}`);
                    const dateB = new Date(`${b.date_event}T${b.time_event}`);
                    return dateA.getTime() - dateB.getTime();
                });

            case SortingName.Cheaper:
                return eventsCopy.sort((a, b) => a.price_event - b.price_event);

            case SortingName.Expensive:
                return eventsCopy.sort((a, b) => b.price_event - a.price_event);

            default:
                return eventsCopy;
        }
    }, [events, sorting, searchQuery]);

    return (
        <main className="main">
            <section className="greeting">
                <Wrapper>
                    <img src="http://62.109.16.129:5000/index/iteen.png" alt="iteen" className="greeting-iteen" />
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
                                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M16 16L11 11M1 6.83333C1 7.59938 1.15088 8.35792 1.44404 9.06565C1.73719 9.77339 2.16687 10.4164 2.70854 10.9581C3.25022 11.4998 3.89328 11.9295 4.60101 12.2226C5.30875 12.5158 6.06729 12.6667 6.83333 12.6667C7.59938 12.6667 8.35792 12.5158 9.06565 12.2226C9.77339 11.9295 10.4164 11.4998 10.9581 10.9581C11.4998 10.4164 11.9295 9.77339 12.2226 9.06565C12.5158 8.35792 12.6667 7.59938 12.6667 6.83333C12.6667 6.06729 12.5158 5.30875 12.2226 4.60101C11.9295 3.89328 11.4998 3.25022 10.9581 2.70854C10.4164 2.16687 9.77339 1.73719 9.06565 1.44404C8.35792 1.15088 7.59938 1 6.83333 1C6.06729 1 5.30875 1.15088 4.60101 1.44404C3.89328 1.73719 3.25022 2.16687 2.70854 2.70854C2.16687 3.25022 1.73719 3.89328 1.44404 4.60101C1.15088 5.30875 1 6.06729 1 6.83333Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input type="text" id="search" className="search unbounded-light" placeholder="Поиск" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    <svg className="clear-search" style={{ display: searchQuery ? "block" : "none" }} xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" onClick={() => setSearchQuery("")}>
                                        <path d="M1.16667 8.33333L4.16667 5.33333L7.16667 8.33333L8.33333 7.16667L5.33333 4.16667L8.33333 1.16667L7.16667 0L4.16667 3L1.16667 0L0 1.16667L3 4.16667L0 7.16667L1.16667 8.33333Z" fill="#1D1B20" />
                                    </svg>
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
                        {sortAndFilterEvents.length !== 0 ?
                            sortAndFilterEvents.map((event, index) => (
                                <Card event={event} key={index} />
                            )) :
                            (<p>Мероприятий нема</p>)
                        }
                    </div>
                </Wrapper>
            </section>
            <Footer />
        </main >
    );
}


//react-multi-carousel