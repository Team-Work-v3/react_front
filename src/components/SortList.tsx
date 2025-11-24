import { useEffect, useRef, useState } from "react";
import { SortingName } from "../models/sorting.enum";

export default function SortList({ sorting, setSorting }: { sorting: string, setSorting: (value: string) => void }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    const conteinerChoiseRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (arrowRef.current && conteinerChoiseRef.current && buttonRef.current) {
            if (isOpen) {
                openList();
                return;
            }

            closeList();
        }
    }, [isOpen]);

    const openList = (): void => {
        if (arrowRef.current && conteinerChoiseRef.current && buttonRef.current && containerRef.current) {
            buttonRef.current.style.border = "1px solid #C7C7C7";
            arrowRef.current.style.rotate = "180deg";
            conteinerChoiseRef.current.style.display = "flex";
            containerRef.current.style.marginLeft = "0px";
        }
    }

    const closeList = (): void => {
        if (arrowRef.current && conteinerChoiseRef.current && buttonRef.current && containerRef.current) {
            buttonRef.current.style.border = "none";
            conteinerChoiseRef.current.style.display = "none";
            arrowRef.current.style.rotate = "0deg";
            containerRef.current.style.marginLeft = "2px";
        }
    }

    const clickChoiceButton = (value: string): void => {
        setSorting(value);
        setIsOpen(prev => !prev);
    }

    return (
        <div className="sorting-conteiner" ref={containerRef}>
            <button className="main-sorting unbounded-regular" onClick={() => setIsOpen(prev => !prev)} ref={buttonRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path d="M3.49992 16L3.49992 1M3.49992 16L0.999918 13.5M3.49992 16L5.99992 13.5M9.33325 3.5L11.8333 1M11.8333 1L14.3333 3.5M11.8333 1L11.8333 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Сортировка
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" ref={arrowRef}>
                    <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="sorting-choice" ref={conteinerChoiseRef}>
                <button className="sorting-choice-button unbounded-regular" onClick={() => clickChoiceButton(SortingName.Nearest)}>
                    {SortingName.Nearest}
                    {sorting === SortingName.Nearest && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
                            <path d="M1 5.16667L5.16667 9.33333L13.5 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
                <button className="sorting-choice-button unbounded-regular" onClick={() => clickChoiceButton(SortingName.Cheaper)}>
                    {SortingName.Cheaper}
                    {sorting === SortingName.Cheaper && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
                            <path d="M1 5.16667L5.16667 9.33333L13.5 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
                <button className="sorting-choice-button unbounded-regular" onClick={() => clickChoiceButton(SortingName.Expensive)}>
                    {SortingName.Expensive}
                    {sorting === SortingName.Expensive && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
                            <path d="M1 5.16667L5.16667 9.33333L13.5 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}