import { useEffect, useMemo } from 'react';
import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import { useContents } from '@/hooks/useContents';
import { ContentTypes } from '@/utils/enums';
import CalendarDays from '@/components/view/CalendarDays';

interface UseContentsContainerProps {
    contentType: ContentTypes;
}

const useContentsContainer = ({ contentType: mode }: UseContentsContainerProps) => {
    const ViewComponent = CalendarDays;

    const { param, setParam } = useQuery();
    const { contentFiles, isLoading, loadError } = useContents();
    const { setContent, setVisible, isVisible, content, setClosed, isClosed } = useContentOverlay();

    const MemoizedViewComponent = useMemo(() => (
        <ViewComponent contents={contentFiles} />
    ), [contentFiles, param]);

    useEffect(() => {
        if (contentFiles.length === 1 && !isClosed) {
            if (content?.id !== contentFiles[0]?.id) {
                setContent(contentFiles[0]);
                setClosed(false);
            }
            if (!isVisible) setVisible(true);
        }
    }, [contentFiles, content, isClosed, isVisible, setContent, setClosed, setVisible]);

    useEffect(() => {
        if (isVisible) setVisible(false);
    }, [param.name, setVisible]);

    useEffect(() => {
        setParam('category', mode || ContentTypes.collaborations);
    }, [isLoading, mode, setParam]);

    return {
        contentFiles,
        isLoading,
        loadError,
        isClosed,
        MemoizedViewComponent
    };
};

export default useContentsContainer;
