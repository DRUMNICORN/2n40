import React, { useCallback, useState } from "react";
import styles from "./Content.module.scss";
import { ContentType, MetadataType } from "@/app/types";
import { IoMdEye } from "react-icons/io";
import Markdown from "../util/Markdown";
import Link from "../design/Link";
import SoundCloudEmbed from "../util/SoundCloudEmbed";
import List from "./ContentList";
import { useContentOverlay } from "@/providers/OverlayProvider";
// import { useContentControllerWithSearchParams } from "@/hooks/useContentControllerWithSearchParams";
import ContentActions from "./ContentActions";
import { CATEGORY_ICONS } from "@/app/defaults";
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
  const { metadata, category, context, id } = content ?? {};
  const { name, date, image, trackUrl } = metadata ?? {};
  const { setContent, toggleVisibility, setVisible , setClosed} = useContentOverlay();
  const [isScrolling, setScrolling] = useState(showDetailsOverlay);

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
        // toggleVisibility();
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

  return (
    <div
      className={`${styles.card} ${showDetailsOverlay ? styles.detailsOverlay : ""}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {isOverlay && <ContentActions handleClose={handleClose} handleShare={handleShareClick} />}
      <div className={styles.header}>
       {/* { isOverlay && <DateContainer date={date as string} />} */}
        <h2 className={styles.titleContainer}>
          <Link noBorder noStyle>
            {CATEGORY_ICONS[category ?? "default"]}
          </Link>
          <Link fittingText shortenedText onClick={handleFileClick}>
            {name}
          </Link>
          {!showDetailsOverlay && (
            <Link onClick={handleDetailsButtonClick}>
              <IoMdEye />
            </Link>
          )}
        </h2>
        <List metadataEntries={metadata} onEntryClick={onConnectionClick} />
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
    </div>
  );
};

export default Content;
