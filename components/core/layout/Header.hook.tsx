import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import React, { useCallback, useState } from 'react';

const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isVisible, toggleVisibility } = useContentOverlay();
  const { toggleParam, setParam } = useQuery();

  const handleHamburgerClick = useCallback(() => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  }, []);

  const handleTitleClick = useCallback(() => {
    setMenuOpen(false);
    if (isVisible) toggleVisibility();
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [toggleVisibility, isVisible]);

  const handleToggleParam = useCallback((key: any, value: string) => {
    toggleParam(key, value);
  }, [toggleParam]);

  return {
    setMenuOpen,
    setParam,
    toggleParam,
    menuOpen,
    handleHamburgerClick,
    handleTitleClick,
    handleToggleParam,
  };
};

export default useHeader;
