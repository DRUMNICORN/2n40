import React from "react";
import styles from "./Content.module.scss";
import Linked from "../../util/Linked";
import SoundCloudEmbed from "../../util/SoundCloudEmbed";
import DateContainer from "../design/DateContainer";
import ListComponent from "../../view/ListComponent";
import { ContentTypes } from "@/exports/enums";
import { ContentType, MetadataType } from "@/exports/interfaces";
import useContent from "./Content.hook";
import Markdown from "@/components/util/Markdown";

interface ContentContainerProps {
  content: ContentType;
  onConnectionClick: (entry: string | MetadataType) => void;
  isScrollable?: boolean;
  isOverlay?: boolean;
}

const Content: React.FC<ContentContainerProps> = ({
  content,
  onConnectionClick,
  isScrollable = false,
  isOverlay = false,
}) => {
  const {
    isScrolling,
    handleClick,
    handleDetailsButtonClick,
    handleContextMenu,
    handleFileClick,
    handleShareClick,
    handleClose,
  } = useContent({ content, isScrollable, isOverlay, onConnectionClick});


  const { metadata, category, context } = content ?? {};
  const { name, date, image, trackUrl, location } = metadata ?? {};

  return (
    <div
      className={`${styles.card} ${isOverlay ? styles.isOverlay : ""}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.header}>
        <h2 className={styles.titleContainer}>
          <Linked text onClick={handleClick} type={category} href={name as string} />
          {isOverlay && (
            <div className={styles.buttons}>
              <Linked text onClick={handleShareClick} type={ContentTypes.share} />
              <Linked text onClick={handleClose} type={ContentTypes.close} />
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

export default Content;

interface LocationComponentProps {
  location: string;
}

const LocationComponent = ({ location }: LocationComponentProps) => {
  const [category, id, name] = (location.replaceAll('|', '/').replaceAll(/\[\[/gm, '').replaceAll(/\]\]/gm, '') as string || '').split("/");

  return (
    <div className={styles.locationContainer}>
      <Linked text type={category as any} href={name} id={Number(id)} />
    </div>
  );
};