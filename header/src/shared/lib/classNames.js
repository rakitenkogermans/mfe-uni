export const classNames = (
    cls,
    mods = {},
    additionalClasses = [],
) => {
    return [
        cls,
        ...additionalClasses.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
};
