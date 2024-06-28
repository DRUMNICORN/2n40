"use client";

import React, { useEffect, useMemo } from 'react';
import { MetadataTypes } from '@/app/types';
import { useContent } from '@/hooks/useContent';
import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import CalendarDays from '../../view/CalendarDays';
import ContentsComponent from './ContentsComponent';

interface ContentsContainerProps {
    mode: MetadataTypes;
}

const ContentsContainer: React.FC<ContentsContainerProps> = ({ mode }) => {
    const ViewComponent = CalendarDays;

    const { param, setParam } = useQuery();
    const { contentFiles, isLoading, loadError } = useContent();
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
    }, [contentFiles, isVisible]);

    useEffect(() => {
        if (isVisible) setVisible(false);
    }, [param.name]);

    useEffect(() => {
        if (!mode) return;
        setParam('category', mode as MetadataTypes);
    }, [mode]);

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
