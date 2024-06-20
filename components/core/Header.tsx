"use client";

import React, { useCallback, useState } from "react";
import Title from "../design/Title";
import Hamburger from "../design/Hamburger";
import Menu from "../layout/Menu";
import styles from "./Header.module.scss";
import { useContentOverlay } from "@/providers/OverlayProvider";
import { useTooltip } from "@/providers/TooltipProvider";
import Controls from "../layout/Controls";
import { useQueryParam } from "@/providers/QueryParamProvider";
import Image from "next/image";
import Link from "../design/Link";

const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isVisible, toggleVisibility } = useContentOverlay();

  const handleHamburgerClick = useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);

  const handleTitleClick = useCallback(() => {
    setMenuOpen(false);
    if (isVisible) toggleVisibility();
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [toggleVisibility, isVisible]);

  return { setMenuOpen, menuOpen, handleHamburgerClick, handleTitleClick };
};

const Header: React.FC = () => {
  const { setMenuOpen, menuOpen, handleHamburgerClick, handleTitleClick } = useHeader();

  const { param, setParam, toggleParam
  } = useQueryParam();


  const handleToggleParam = (key: any, value: string) => {
    toggleParam(key, value);
  }

  return (
    <nav className={styles.header}>
      <div className={styles.name}>
        <Title onClick={handleTitleClick} />
      </div>
      <div className={styles.logo}>
          <Image src="/icon.png" alt="logo" height={38} width={38} />
      </div>
      <div className={styles.tooltip}>
        <Controls param={param} setParam={setParam} toggleParam={handleToggleParam} />
      </div>

      <Hamburger onClick={handleHamburgerClick} menuOpen={menuOpen} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default Header;
