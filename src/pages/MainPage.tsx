import type { IEventReduced } from "../models/event.interface";
import { SortingName } from "../models/sorting.enum";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import Footer from "../components/Footer";
import { useEffect, useMemo, useRef, useState } from "react";
import SortList from "../components/SortList";
import { useScrollLock } from "../hooks/useScrollLock";
import type { Filters } from "../models/filters.interface";

type Category = {
    category_id: number;
    category_name: string;
};

export default function MainPage() {
    const [events, setEvents] = useState<IEventReduced[]>([]);
    const [eventsBack, setEventsBack] = useState<IEventReduced[]>([]);
    const [sorting, setSorting] = useState<string>(SortingName.Nearest);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [category, setCategory] = useState<Set<string>>(new Set());
    const [categories, setCategories] = useState<Category[]>([]);

    const dialogWindowFilterRef = useRef<HTMLDialogElement | null>(null);
    const { lockScroll, unlockScroll } = useScrollLock();

    const [draftFilters, setDraftFilters] = useState<Filters>({
        isFree: false,
        categories: new Set(),
    });

    const [appliedFilters, setAppliedFilters] = useState<Filters>({
        isFree: false,
        categories: new Set(),
    });

    const typeOfEvents = {
        pastButton: useRef<HTMLSpanElement | null>(null),
        presentButton: useRef<HTMLSpanElement | null>(null),
        pastContainer: useRef<HTMLDivElement | null>(null),
        presentContainer: useRef<HTMLDivElement | null>(null)
    };

    const openTypeEventPresent = () => {
        typeOfEvents.pastButton.current?.classList.remove("active");
        typeOfEvents.presentButton.current?.classList.add("active");

        typeOfEvents.pastContainer.current?.classList.remove("active");
        typeOfEvents.presentContainer.current?.classList.add("active");
        clearFilters();
        setSearchQuery("");
    }

    const openTypeEventPast = () => {
        typeOfEvents.presentButton.current?.classList.remove("active");
        typeOfEvents.pastButton.current?.classList.add("active");

        typeOfEvents.presentContainer.current?.classList.remove("active");
        typeOfEvents.pastContainer.current?.classList.add("active");
        clearFilters();
        setSearchQuery("");
    }

    const handleApplyFilters = () => {
        setAppliedFilters({
            ...draftFilters,
            categories: new Set(draftFilters.categories),
        });

        dialogWindowFilterRef.current?.close();
        unlockScroll();
    };

    const clearFilters = () => {
        const emptyFilters: Filters = {
            isFree: false,
            categories: new Set(category),
            priceFrom: undefined,
            priceTo: undefined,
            dateFrom: undefined,
            dateTo: undefined,
            timeFrom: undefined,
            timeTo: undefined,
        };

        setDraftFilters(emptyFilters);
        setAppliedFilters(emptyFilters);

        dialogWindowFilterRef.current?.close();
        unlockScroll();
    };

    const closeDialogWindowFilter = () => {
        dialogWindowFilterRef.current?.close();
        unlockScroll();
    }

    useEffect(() => {
        const fetchEvents = async (): Promise<void> => {
            const response = await fetch("http://62.109.16.129:5000/api/getShortenedEvents");
            const responseBack = await fetch("http://62.109.16.129:5000/api/getShortenedEvents?state=back");

            const data = await response.json();
            const dataBack = await responseBack.json();

            setEvents(data.events);
            setEventsBack(dataBack.events);

            const categoriesRes = await fetch("http://62.109.16.129:5000/api/getCategory");
            const dataCategories = await categoriesRes.json();

            setCategories(dataCategories.category);
        }
        fetchEvents();
    }, []);

    useEffect(() => {
        const next = new Set<string>();
        events.forEach(event => next.add(event.event_category));
        setCategory(next);

        setDraftFilters(prev => ({ ...prev, categories: next }));
        setAppliedFilters(prev => ({ ...prev, categories: next }));
    }, [events]);

    const filterAndSort = (list: IEventReduced[]) => {
        if (!Array.isArray(list) || list.length === 0) return [];

        let eventsCopy = [...list];

        eventsCopy = eventsCopy.filter(event =>
            event.name_event.toLowerCase().includes(searchQuery.toLowerCase())
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.isFree ? event.price_event === 0 : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.priceFrom !== undefined
                ? event.price_event >= appliedFilters.priceFrom
                : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.priceTo !== undefined
                ? event.price_event <= appliedFilters.priceTo
                : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.dateFrom ? event.date_event >= appliedFilters.dateFrom : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.dateTo ? event.date_event <= appliedFilters.dateTo : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.timeFrom ? event.time_event >= appliedFilters.timeFrom : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.timeTo ? event.time_event <= appliedFilters.timeTo : true
        );

        eventsCopy = eventsCopy.filter(event =>
            appliedFilters.categories.size > 0
                ? appliedFilters.categories.has(event.event_category)
                : false
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
    };

    const sortAndFilterEvents = useMemo(
        () => filterAndSort(events),
        [events, appliedFilters, sorting, searchQuery]
    );

    const sortAndFilterEventsBack = useMemo(
        () => filterAndSort(eventsBack),
        [eventsBack, appliedFilters, sorting, searchQuery]
    );

    return (
        <main className="main">

            {/* --- остальной JSX страницы не изменялся --- */}

            <dialog className="dialog-window-filter" ref={dialogWindowFilterRef}>
                <div className="dialog-window-filter-conteiner" onClick={(e) => {
                    if (e.target === document.querySelector(".dialog-window-filter-conteiner")) {
                        closeDialogWindowFilter();
                    }
                }}>
                    <div className="dialog-window-filter-content">

                        <span className="unbounded-bold dialog-window-filter-main-text">Фильтры</span>

                        {/* категории */}

                        <div className="dialog-window-filter-conteiner-for">
                            <span className="unbounded-regular dialog-window-filter-subtext">Категории</span>

                            <div className="dialog-window-filter-conteiner-for spans unbounded-regular">

                                {categories.map((cat) => (
                                    <label
                                        key={cat.category_id}
                                        className={`dialog-window-filter-checkbox-category ${
                                            draftFilters.categories.has(cat.category_name) ? "active" : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="dialog-window-filter-checkbox-category-input"
                                            value={cat.category_name}
                                            checked={draftFilters.categories.has(cat.category_name)}
                                            onChange={() => {

                                                const next = new Set(draftFilters.categories);

                                                if (next.has(cat.category_name)) {
                                                    next.delete(cat.category_name);
                                                } else {
                                                    next.add(cat.category_name);
                                                }

                                                setDraftFilters({
                                                    ...draftFilters,
                                                    categories: next,
                                                });
                                            }}
                                        />

                                        {cat.category_name}

                                    </label>
                                ))}

                            </div>
                        </div>

                        <div className="dialog-window-filter-conteiner-buttons">
                            <button className="inter-medium dialog-window-filter-button red" onClick={handleApplyFilters}>
                                Показать
                            </button>

                            <button className="inter-medium dialog-window-filter-button white" onClick={clearFilters}>
                                Очистить
                            </button>
                        </div>

                    </div>
                </div>
            </dialog>

            <Footer />

        </main>
    );
}