import { ContentType } from '@/utils/interfaces';
import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';

interface EntityContextInterface {
  content: ContentType;
  setContent: (content: ContentType) => void;
  isClosed: boolean;
  setClosed: (isClosed: boolean) => void;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  toggleVisibility: () => void;
}

const OverlayContext = createContext<EntityContextInterface>({} as EntityContextInterface);

interface EntityProviderProps {
  children: React.ReactNode;
}

export const OverlayProvider: React.FC<EntityProviderProps> = ({ children }: EntityProviderProps) => {
  const [content, setContent] = useState<ContentType>({} as ContentType);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isClosed, setClosed] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    if (isClosed) return setVisible(false);

    setVisible((prevVisible) => !prevVisible);
  }, []);

  // Synchronize hash with content.metadata.name
  useEffect(() => {
    if (content && content.metadata && content.metadata.name) {
      const newHash = content.metadata.name;
      const currentPath = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      window.history.replaceState({}, '', `${currentPath}?${params}#${newHash}`);
    }
  }, [content]);

  const detailsContextValue = useMemo(() => ({
    content,
    setContent,
    isClosed,
    setClosed,
    isVisible,
    setVisible,
    toggleVisibility,
  }), [content, isClosed, isVisible, toggleVisibility]);

  return (
    <OverlayContext.Provider value={detailsContextValue}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useContentOverlay = () => {
  const context = React.useContext(OverlayContext);

  if (!context) {
    throw new Error('useContentOverlay must be used within a OverlayProvider');
  }

  return context;
};
