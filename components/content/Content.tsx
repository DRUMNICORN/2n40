import React, { useCallback, useState } from "react";
import styles from "./Content.module.scss";
import { ContentType, MetadataType, MetadataTypes } from "@/app/types";
import Markdown from "../util/Markdown";
import Linked from "../design/Linked";
import SoundCloudEmbed from "../util/SoundCloudEmbed";
import List from "../layout/ContentList";
import { useContentOverlay } from "@/providers/OverlayProvider";
import ContentActions from "../layout/ContentActions";
import { REACT_ICONS } from "@/app/Icons";
import DateContainer from "../design/DateContainer";

interface ContentProps {
  content: ContentType;
  onConnectionClick: (entry: string | MetadataType) => void;
  showDetailsOverlay?: boolean;
  isOverlay?: boolean;
}

const Content: React.FC<ContentProps> = ({
  content,
  onConnectionClick,
  showDetailsOverlay = false,
  isOverlay = false,
}) => {
  // Destructure content object
  const { metadata, category, context, id } = content ?? {};
  const { name, date, image, trackUrl } = metadata ?? {};

  // State management
  const { setContent, toggleVisibility, setVisible, setClosed } = useContentOverlay();
  const [isScrolling, setScrolling] = useState(showDetailsOverlay);

  // Event handlers
  const handleClick = useCallback(() => {
    if (showDetailsOverlay && isOverlay) return;
    toggleVisibility();
    setContent(content);
  }, [toggleVisibility, content, showDetailsOverlay, isOverlay]);

  const handleDetailsButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleVisibility();
      setContent(content);
      setScrolling(false);
    },
    [toggleVisibility, content]
  );

  const handleContextMenu = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      if (showDetailsOverlay) setScrolling(showDetailsOverlay);
      if (isOverlay) {
        setVisible(false);
      }
    },
    [isScrolling, toggleVisibility, showDetailsOverlay, isOverlay]
  );

  const handleFileClick = useCallback(
    (e: React.MouseEvent) => {
      if (showDetailsOverlay) return;
      e.stopPropagation();
      toggleVisibility();
      setContent(content);
      setScrolling(false);
    },
    [toggleVisibility, content, showDetailsOverlay]
  );

  const handleShareClick = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setClosed(true);
  }, []);

  // Component rendering
  return (
    <div
      className={`${styles.card} ${showDetailsOverlay ? styles.detailsOverlay : ""}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Header section */}
      <div className={styles.header}>
        <h2 className={styles.titleContainer}>
          {/* Category Icon */}
          <Linked type={MetadataTypes.name}>
            {REACT_ICONS[category as keyof typeof REACT_ICONS]}
          </Linked>
          {/* Name */}
          <Linked onClick={handleFileClick} type={MetadataTypes.name}>
            {name}
          </Linked>
          {/* Actions for overlay */}
          {isOverlay && <ContentActions handleClose={handleClose} handleShare={handleShareClick} />}
        </h2>
        {/* Date information */}
        {isOverlay && <DateContainer date={date as string} />}
        {/* List of metadata entries */}
        <List metadataEntries={metadata} onEntryClick={onConnectionClick} />
      </div>

      {/* Embedded SoundCloud player */}
      {trackUrl && <SoundCloudEmbed trackUrl={trackUrl as string} active={false} />}

      {/* Content container with optional scroll */}
      <div className={`${styles.contentContainer} ${isScrolling ? styles.scrollable : ""}`}>
        {/* Markdown content */}
        {context && <Markdown content={context} active={isScrolling} />}
      </div>

      {/* Image container */}
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
    </div>
  );
};

export default Content;
