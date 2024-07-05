import React, { useEffect, useContext } from 'react';
import { useQuery } from './QueryProvider';
import { useSearchParams } from 'next/navigation';

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { param } = useQuery();
    const searchParams = useSearchParams();

    useEffect(() => {
        const syncSearchParams = () => {
            const params = new URLSearchParams();
            const path = window.location.pathname.split('/').filter(p => p)[0];
            const hash = window.location.hash || '';

            for (const [key, value] of Object.entries(param)) {
                if (!value) continue;
                if (key === 'category' && value === path) continue;
                if (Array.isArray(value) && value.length) {
                    params.set(key, value.join(','));
                } else if (typeof value === 'string' && value.trim()) {
                    params.set(key, value);
                }
            }

            const newUrl = `${window.location.pathname}?${params}${hash}`;
            window.history.replaceState({}, '', newUrl);
        };

        syncSearchParams();
    }, [param]);

    return <>{children}</>;
};
