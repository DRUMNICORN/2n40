import { useContentOverlay } from '@/providers/OverlayProvider';
import { useQuery } from '@/providers/QueryProvider';
import React, { useCallback, useState } from 'react';

const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isVisible, toggleVisibility } = useContentOverlay();
  const { toggleParam, setParam, param } = useQuery();

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

  const handleSwap = useCallback(() => {
    console.log("sawp")
    let name = param.name;
    setParam("name", null);
    toggleParam("connections", name as string);
    console.log(param)
  }, [setParam, param.name]);

  const handleKeyPress = useCallback((e: any) => {
    if (e.key === "Enter") {
      handleSwap();
    }
  }, [handleSwap]);

  return {
    setMenuOpen,
    setParam,
    toggleParam,
    menuOpen,
    handleHamburgerClick,
    handleTitleClick,
    handleToggleParam,
    handleSwap,
    handleKeyPress
  };
};

export default useHeader;
