import React from "react";
import styles from "./ContentColumns.module.scss";
import Content from "../core/content/Content";
import { ContentType } from "@/utils/interfaces";

interface CardsProps {
  contents: ContentType[];
}

const ContentColumns: React.FC<CardsProps> = ({ contents }) => {
  return (
    <div className={styles.cardGrid}>
      {contents.map((content: ContentType, index: number) => (
        !content ? <div key={index}></div> : (<div key={`card-${content.id || index}`} className={styles.cardWrapper}>
          <Content content={content} isScrollable={true} onConnectionClick={() => {} } />
        </div>)
      )
      )}
    </div>
  );
}

export default ContentColumns;