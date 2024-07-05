import { useState } from 'react';
import { useContentOverlay } from '@/providers/OverlayProvider';
import useContent from '@/hooks/useContent';
import { ContentTypes } from '@/exports/enums';
import { ContentType } from '@/exports/interfaces';

interface UseLinkedProps {
    id?: number;
    type?: ContentTypes;
    href?: string;
    spinOnClick?: boolean;
    disableClick?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const useLinked = ({
    id,
    type,
    href,
    spinOnClick = false,
    disableClick = false,
    onClick,
}: UseLinkedProps) => {
    const [iconAnimated, setIconAnimated] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingHref, setPendingHref] = useState<string | null>(null);
    const { setContent: setOverlayContent, setVisible: setOverlayVisible } = useContentOverlay();
    const { contentFile } = useContent(id, type as ContentTypes);

    const handleRedirect = (value: string, key: string): void => {
        const actions: Record<string, () => void> = {
            mail: () => window.open(`mailto:${value}`),
            address: () => window.open(`https://www.google.com/maps/search/?api=1&query=${value}`),
            tel: () => window.open(`tel:${value}`),
            website: () => window.open(value.startsWith('https://') ? value : `https://${value}`, '_blank'),
            form: () => window.open(value, '_blank'),
        };

        actions[key]?.();
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        if (disableClick) {
            console.warn('Linked: disableClick is set to true, skipping click handling.');
            return;
        }

        if (spinOnClick) {
            setIconAnimated(true);
            setTimeout(() => setIconAnimated(false), 500);
        }

        if (id) {
            e.preventDefault();
            e.stopPropagation();
            const fetchedContent: ContentType = contentFile as ContentType;
            setOverlayContent(fetchedContent);
            setOverlayVisible(true);
            return;
        }

        if ((type === 'address' || type === 'website' || (href && href.startsWith('http'))) && !disableClick) {
            e.preventDefault();
            e.stopPropagation();
            setPendingHref(href || '');
            setConfirmOpen(true);
        } else {
            onClick?.(e);
            handleRedirect(href || '', type || '');
        }
    };

    const handleConfirmNavigation = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, confirm: boolean): void => {
        if (!confirm) {
            e.preventDefault();
            e.stopPropagation();
        }

        setConfirmOpen(false);
        setPendingHref(null);
    };

    const extractDomain = (url: string): string => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url.replace('/', '');
        }
    };

    return {
        iconAnimated,
        confirmOpen,
        handleClick,
        handleConfirmNavigation,
        extractDomain,
    };
};

export default useLinked;
