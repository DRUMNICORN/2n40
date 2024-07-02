import React from "react";
import styles from "./ContentColumns.module.scss";
import ContentContainer from "../core/content/ContentContainer";
import { ContentType } from "@/exports/interfaces";

interface CardsProps {
  contents: ContentType[];
}

const ContentColumns: React.FC<CardsProps> = ({ contents }) => {
  return (
    <div className={styles.cardGrid}>
      {contents.map((content: ContentType, index: number) => (
        !content ? <div key={index}></div> : (<div key={`card-${content.id || index}`} className={styles.cardWrapper}>
          <ContentContainer content={content} isScrollable={true} onConnectionClick={() => {} } />
        </div>)
      )
      )}
    </div>
  );
}

export default ContentColumns;