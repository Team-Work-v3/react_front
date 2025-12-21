import { useRef } from "react";

export const useScrollLock = () => {
    const scrollYRef = useRef<number>(0);
    const isLockedRef = useRef<boolean>(false);

    const lockScroll = () => {
        if (isLockedRef.current) return;

        scrollYRef.current = window.scrollY;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollYRef.current}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';

        isLockedRef.current = true;
    };

    const unlockScroll = () => {
        if (!isLockedRef.current) return;

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';

        window.scrollTo(0, scrollYRef.current);

        isLockedRef.current = false;
    };

    return { lockScroll, unlockScroll };
};
