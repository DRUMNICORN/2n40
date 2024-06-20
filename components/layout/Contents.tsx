"use client";

import React, { useEffect, useMemo } from 'react';
import styles from "./Contents.module.scss";
import Loading from "../design/Loading";
import Controls from "./Controls";
import { useViewMode } from '@/hooks/useViewMode';
import { useViewComponent } from '@/hooks/useViewComponent';
import { ContentType } from '@/app/types';
import { useContentControllerWithSearchParams } from '@/hooks/useContentControllerWithSearchParams';
import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQueryParam } from '@/providers/QueryParamProvider';

const Contents: React.FC = () => {
  
  const { param  } = useQueryParam();
  const {  contentFiles, isLoading} = useContentControllerWithSearchParams();
  const { setContent, setVisible, isVisible, content, setClosed, isClosed } = useContentOverlay();
  const { mode } = useViewMode();
  const ViewComponent = useViewComponent(mode) as React.FC<{ contents: ContentType[] }>;

  // const MemoizedControls = useMemo(() => (
  // ), [mode]);

  const MemoizedViewComponent = useMemo(() => (
    <ViewComponent contents={contentFiles} />
  ), [contentFiles, param]); // Ensure param is included in dependencies if it affects rendering logic

  // if content files is one set content and toggle overlay once
  useEffect(() => {
    if (contentFiles.length == 1 && !isClosed) {
      if (content?.id != contentFiles[0]?.id) {
        setContent(contentFiles[0])
        setClosed(false);
      }
      if (!isVisible) setVisible(true);
    }
  }, [contentFiles, isVisible]);

  // if name changed setVisible to false
  useEffect(() => {
    if (isVisible) setVisible(false);
  }, [param.name]);

  return (
    <div className={styles.filterCardsContainer}>
      {/* {MemoizedControls} */}
      <div className={styles.cardsContainer}>
        {isLoading ? <Loading /> : MemoizedViewComponent}
      </div>
    </div>
  );
}

export default React.memo(Contents);
