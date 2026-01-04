import { useLayoutEffect } from "react";

const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth; // yaha pe scroll bar ka acutal width nikal rhe hai.
};

export const useScrollLock = (lock: boolean) => {
    useLayoutEffect(() => {
        if (lock) {
            const scrollbarWidth = getScrollbarWidth();

            document.body.style.overflow = "hidden";

            // most important line hai yeh right side me scroll ke width ka padding add krega jisse layout shift nahi hoga.
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }, [lock]);
};
