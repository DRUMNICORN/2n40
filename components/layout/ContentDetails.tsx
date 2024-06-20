import React from 'react';
import styles from "./ContentOverlay.module.scss";
import { ContentType } from '@/app/types';
import Title from '../design/Title';
// import Title from "./Title";

interface ContentDetailsProps {
  shownContent: ContentType;
  isEditing: boolean;
  setHasChanged: (hasChanged: boolean) => void;
  setContent: (content: ContentType) => void;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({ shownContent, isEditing, setHasChanged, setContent }) => {
  return (
    <div className={styles.detailsContainer}>
      <Title title={(shownContent?.metadata?.name as string || "").split(/[\\/]/).pop()} />
      <h4 className={styles.subtitle}>{shownContent?.category || ""}</h4>
    </div>
  );
};

export default ContentDetails;
