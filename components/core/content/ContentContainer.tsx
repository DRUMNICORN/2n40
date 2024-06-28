import React, { useCallback, useState } from "react";
import { ContentType, MetadataType } from "@/app/types";
import { useContentOverlay } from "@/providers/OverlayProvider";
import ContentComponent from "./ContentComponent";

interface ContentContainerProps {
  content: ContentType;
  onConnectionClick: (entry: string | MetadataType) => void;
  showDetailsOverlay?: boolean;
  isOverlay?: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  content,
  onConnectionClick,
  showDetailsOverlay = false,
  isOverlay = false,
}) => {
  const { setContent, toggleVisibility, setVisible, setClosed } = useContentOverlay();
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
