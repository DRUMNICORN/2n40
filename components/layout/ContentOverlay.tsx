import React from "react";
import styles from "./ContentOverlay.module.scss";
import Loading from "../design/Loading";
import Content from "./Content";
import { useContentOverlay } from "@/providers/OverlayProvider";

interface ContentOverlayProps { }

const ContentOverlay: React.FC<ContentOverlayProps> = () => {
  const {
    content,
    isVisible,
  } = useContentOverlay();

  return (
    <div className={`${styles.popup} ${isVisible ? styles.show : styles.hide}`}>
      {content ? (
        <div className={styles.contentContainer}>
          <Content content={content} isOverlay showDetailsOverlay onConnectionClick={() => { }} />
        </div>
      ) : (
        <div className={styles.noContentMessage}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ContentOverlay;
