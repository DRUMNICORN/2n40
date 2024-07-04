import { useCallback, useState } from "react";
import { useContentOverlay } from "@/providers/OverlayProvider";
import { ContentType, MetadataType } from "@/utils/interfaces";

interface UseContentContainerProps {
    content: ContentType;
    onConnectionClick: (entry: string | MetadataType) => void;
    isScrollable?: boolean;
    isOverlay?: boolean;
}

const useContentContainer = ({
    content,
    isScrollable = false,
    isOverlay = false,
}: UseContentContainerProps) => {
    const { setContent, toggleVisibility, setVisible, setClosed } = useContentOverlay();
    const [isScrolling, setScrolling] = useState(true && isOverlay);

    const handleClick = useCallback(() => {
        if (isScrollable && isOverlay) return;
        toggleVisibility();
        setContent(content);
    }, [toggleVisibility, content, isScrollable, isOverlay]);

    const handleDetailsButtonClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            toggleVisibility();
            setContent(content);
            setScrolling(false);
        },
        [toggleVisibility, content]
    );

    const handleContextMenu = useCallback(
        (e?: React.MouseEvent) => {
            e?.preventDefault();
            if (isScrollable) setScrolling(isScrollable);
            if (isOverlay) {
                setVisible(false);
            }
        },
        [isScrollable, isOverlay, setVisible]
    );

    const handleFileClick = useCallback(
        (e: React.MouseEvent) => {
            if (isScrollable) return;
            e.stopPropagation();
            toggleVisibility();
            setContent(content);
            setScrolling(false);
        },
        [toggleVisibility, content, isScrollable]
    );

    const handleShareClick = useCallback(() => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
    }, []);

    const handleClose = useCallback(() => {
        setVisible(false);
        setClosed(true);
    }, [setVisible, setClosed]);

    return {
        isScrolling,
        handleClick,
        handleDetailsButtonClick,
        handleContextMenu,
        handleFileClick,
        handleShareClick,
        handleClose,
    };
};

export default useContentContainer;
