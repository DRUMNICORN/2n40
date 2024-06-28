"use client";

import React, { useEffect, useMemo } from 'react';
import styles from "./Contents.module.scss";
// import Loading from "../design/Loading";
import { MetadataTypes } from '@/app/types';
import { useContent } from '@/hooks/useContent';
import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import CalendarDays from '../../view/CalendarDays';
// import Soon from '../Soon';
import Logo from '../design/Logo';
// import { useQuery } from '@/providers/QueryProvider';

const Contents = ({ mode }: { mode: MetadataTypes }) => {
  const ViewComponent = CalendarDays;

  const { param, setParam } = useQuery()
  const { contentFiles, isLoading, loadError } = useContent();
  const { setContent, setVisible, isVisible, content, setClosed, isClosed } = useContentOverlay();
 
  const MemoizedViewComponent = useMemo(() => (
    <ViewComponent contents={contentFiles} />
  ), [contentFiles, param]);

  useEffect(() => {
    if (contentFiles.length == 1 && !isClosed) {
      if (content?.id != contentFiles[0]?.id) {
        setContent(contentFiles[0])
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
  }, []);

  return (
    (loadError && contentFiles.length == 0 && !isLoading)
      ?
      <div className={styles.container}>
        <Logo rotating size={420} />
      </div>
      :
      <div className={styles.container}>
        {MemoizedViewComponent}
      </div>
  );
}

export default React.memo(Contents);