export type Mods = Record<string, string | boolean | undefined>;

export const classNames = (
    cls: string,
    mods: Mods = {},
    additionalClasses: Array<string | undefined> = [],
): string => {
    return [
        cls,
        ...additionalClasses.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
};
