import React from "react";
import styles from "./Content.module.scss";
// import { ContentType, MetadataType, ContentTypes } from "@/app/types";
import Markdown from "../../util/Markdown";
import Linked from "../../util/Linked";
import SoundCloudEmbed from "../../util/SoundCloudEmbed";
import List from "../../view/ListComponent";
import DateContainer from "../design/DateContainer";
import ListComponent from "../../view/ListComponent";
import { ContentType, MetadataType } from "@/exports/interfaces";
import { ContentTypes } from "@/exports/enums";
// import DateContainer from "../../util/DateContainer";

interface ContentComponentProps {
  content: ContentType;
  onConnectionClick: (entry: string | MetadataType) => void;
  isScrolling: boolean;
  isOverlay: boolean;
  onCardClick: () => void;
  onDetailsButtonClick: (e: React.MouseEvent) => void;
  onContextMenu: (e?: React.MouseEvent) => void;
  onFileClick: (e: React.MouseEvent) => void;
  onShareClick: () => void;
  onClose: () => void;
}

const ContentComponent: React.FC<ContentComponentProps> = ({
  content,
  onConnectionClick,
  isScrolling,
  isOverlay,
  onCardClick,
  onDetailsButtonClick,
  onContextMenu,
  onFileClick,
  onShareClick,
  onClose,
}) => {
  const { metadata, category, context } = content ?? {};
  const { name, date, image, trackUrl, location } = metadata ?? {};

  return (
    <div
      className={`${styles.card} ${isOverlay ? styles.isOverlay : ""}`}
      onClick={onCardClick}
      onContextMenu={onContextMenu}
    >
      <div className={styles.header}>
        <h2 className={styles.titleContainer}>
          <Linked text onClick={onFileClick} type={category} href={name as string} />
          {isOverlay && (
            <div className={styles.buttons}>
              <Linked text onClick={onShareClick} type={ContentTypes.share} />
              <Linked text onClick={onClose} type={ContentTypes.close} />
            </div>
          )}
        </h2>
        {isOverlay && <DateContainer date={date as string} />}
        <ListComponent items={Object.values(metadata ?? {}) as string[]}  types={Object.keys(metadata ?? {}) as string[]} />
      </div>
      {trackUrl && <SoundCloudEmbed trackUrl={trackUrl as string} active={false} />}
      <div className={`${styles.contentContainer} ${isScrolling ? styles.scrollable : ""}`}>
        {context && <Markdown content={context} active={isScrolling} />}
      </div>
      {image && (
        <div className={styles.imageContainer}>
          <img
            src={image as string}
            alt=""
            onLoad={() =>
              document.querySelector(`.${styles.imageContainer} img`)?.classList.add(styles.imageLoaded)
            }
          />
        </div>
      )}
      { location && <LocationComponent location={location as string} />}
    </div>
  );
};

export default ContentComponent;


// Location Component

interface LocationComponentProps {
  location: string;
}


const LocationComponent = ({ location }: LocationComponentProps) => {
  // location is [[collectives/2|RESET]]
  // we want to get category / id and name

  const [category, id, name] = location.replaceAll('|', '/').replaceAll(/\[\[/gm, '').replaceAll(/\]\]/gm, '').split("/");

  return (
    <div className={styles.locationContainer}>
      <Linked text type={category as any} href={name} id={Number(id)} />
    </div>
  );
};