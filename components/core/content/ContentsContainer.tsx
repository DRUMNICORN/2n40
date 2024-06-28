"use client";

import React, { useEffect, useMemo } from 'react';
import { ContentTypes } from '@/app/types';
// import { useContents } from '@/hooks/useContent';
import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import CalendarDays from '../../view/CalendarDays';
import ContentsComponent from './ContentsComponent';
import { useContents } from '@/hooks/useContents';

interface ContentsContainerProps {
    contentType: ContentTypes;
}

const ContentsContainer: React.FC<ContentsContainerProps> = ({ contentType: mode }) => {
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
    }, [contentFiles]);

    useEffect(() => {
        if (isVisible) setVisible(false);
    }, [param.name]);

    useEffect(() => {
        setParam('category', mode as ContentTypes || ContentTypes.collaborations);
    }, [isLoading]);

    return (
        <ContentsComponent
            contentFiles={contentFiles}
            isLoading={isLoading}
            loadError={loadError}
            isClosed={isClosed}
            MemoizedViewComponent={MemoizedViewComponent}
        />
    );
}

export default React.memo(ContentsContainer);
