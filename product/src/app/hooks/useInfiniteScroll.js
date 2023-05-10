import {useEffect} from 'react';

export const useInfiniteScroll = (props) => {
    const { callback, triggerRef } = props;

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
                    callback();
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
