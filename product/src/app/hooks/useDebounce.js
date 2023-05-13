import { useCallback, useRef } from 'react';

export const useDebounce = (cb, delay) => {
    const timerRef = useRef(null);

    return useCallback(
        (...args) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                cb(...args);
            }, delay);
        },
        [cb, delay],
    );
};
