import {useEffect, useRef} from 'react';

export const useInfiniteScroll = (props) => {
    const { callback, triggerRef } = props;
    const hasIntersectedOnce = useRef(false);

    useEffect(() => {
        const triggerElement = triggerRef.current;

        let observer;
        if (callback) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    if (hasIntersectedOnce.current) {
                        callback();
                    } else {
                        hasIntersectedOnce.current = true;
                    }
                }
            }, options);

            observer.observe(triggerElement);
        }

        return () => {
            if (observer) {
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef]);
};
