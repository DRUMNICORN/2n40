import React from "react";
import styles from "./ContentOverlay.module.scss";
import { useContentOverlay } from "@/providers/OverlayProvider";
import ContentContainer from "../core/content/ContentContainer";

interface ContentOverlayProps { }

const ContentOverlay: React.FC<ContentOverlayProps> = () => {
  const {
    content,
    isVisible,
  } = useContentOverlay();

  return (
    <div className={`${styles.popup} ${isVisible ? styles.show : styles.hide}`}>
      <div className={styles.contentContainer}>
        <ContentContainer content={content} isOverlay isScrollable onConnectionClick={() => { }} />
      </div>
    </div>
  );
};

export default ContentOverlay;
