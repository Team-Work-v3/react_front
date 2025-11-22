import { useEffect, useRef, useState } from "react";

export default function SortList() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    useEffect(() => {
        if (arrowRef.current) {
            if (isOpen) {
                arrowRef.current.style.rotate = "180deg";
                return;
            }
            arrowRef.current.style.rotate = "0deg";
        }
    }, [isOpen]);

    return (
        <button className="main-sorting unbounded-regular" onClick={() => setIsOpen(prev => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3.49992 16L3.49992 1M3.49992 16L0.999918 13.5M3.49992 16L5.99992 13.5M9.33325 3.5L11.8333 1M11.8333 1L14.3333 3.5M11.8333 1L11.8333 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Сортировка
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none" ref={arrowRef}>
                <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}