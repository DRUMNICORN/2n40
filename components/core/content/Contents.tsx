"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import CalendarDays from '../../view/CalendarDays';
import styles from "./Contents.module.scss";
import { ContentTypes } from '@/exports/enums';
import { useContentContext } from '../../../providers/ContentProvider';
import Logo from '../design/Logo';
import { ContentType } from '@/exports/interfaces';

interface ContentsContainerProps {
    contentType: ContentTypes;
}

const Contents: React.FC<ContentsContainerProps> = ({ contentType: mode }) => {
    const ViewComponent = CalendarDays;
    const { param, setParam } = useQuery();
    const { isLoading, loadError, fetchNodesByCategory, getCachedNodes } = useContentContext();
    const { setContent, setVisible, isVisible, content, setClosed, isClosed } = useContentOverlay();
    const [contentFiles, setContentFiles] = useState<ContentType[]>([]);

    useEffect(() => {
        const loadContent = async () => {
            try {
                await fetchNodesByCategory(param.category as ContentTypes);
                const files = getCachedNodes(param.category as ContentTypes);
                setContentFiles(files);
                
            } catch (error) {
                console.error('Error fetching content:', error);
                setContentFiles([]);
            }
        };

        if (param.category) {
            loadContent();
        }
    }, [param.category, fetchNodesByCategory]);

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
        setParam('category', mode as ContentTypes);
    }, [isLoading]);

    return (
        (loadError && contentFiles.length === 0 && !isLoading)
            ? <div className={styles.container}>
                <Logo rotating size={420} />
            </div>
            : <div className={styles.container}>
                {MemoizedViewComponent}
            </div>
    );
};

export default React.memo(Contents);
