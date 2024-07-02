import React, { useCallback, useState } from "react";
import { useContentOverlay } from "@/providers/OverlayProvider";
import ContentComponent from "./ContentComponent";
import { ContentType, MetadataType } from "@/exports/interfaces";

interface ContentContainerProps {
  content: ContentType;
  onConnectionClick: (entry: string | MetadataType) => void;
  isScrollable?: boolean;
  isOverlay?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  content,
  onConnectionClick,
  isScrollable: isScrollable = false,
  isOverlay = false,
}) => {
  const { setContent, toggleVisibility, setVisible, setClosed } = useContentOverlay();
  const [isScrolling, setScrolling] = useState(true && isOverlay);

  const handleClick = useCallback(() => {
    if (isScrollable && isOverlay) return;
    toggleVisibility();
    setContent(content);
  }, [toggleVisibility, content, isScrollable, isOverlay]);

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
      if (isScrollable) setScrolling(isScrollable);
      if (isOverlay) {
        setVisible(false);
      }
    },
    [isScrolling, toggleVisibility, isScrollable, isOverlay]
  );

  const handleFileClick = useCallback(
    (e: React.MouseEvent) => {
      if (isScrollable) return;
      e.stopPropagation();
      toggleVisibility();
      setContent(content);
      setScrolling(false);
    },
    [toggleVisibility, content, isScrollable]
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
    <ContentComponent
      content={content}
      onConnectionClick={onConnectionClick}
      isScrolling={isScrolling}
      isOverlay={isOverlay}
      onCardClick={handleClick}
      onDetailsButtonClick={handleDetailsButtonClick}
      onContextMenu={handleContextMenu}
      onFileClick={handleFileClick}
      onShareClick={handleShareClick}
      onClose={handleClose}
    />
  );
};

export default ContentContainer;
