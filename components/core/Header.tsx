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
  const { tooltip } = useTooltip();
  // const [param, setParams] = useState({} as any);
  const [name, description] = tooltip.split("-");

  const { param, setParam, toggleParam
  } = useQueryParam();

  // const setParam = (key: any, value: string | string[] | null) => {
  //   setParams((prevParam: any) => {
  //     return { ...prevParam, [key]: value };
  //   });
  // }

  const handleToggleParam = (key: any, value: string) => {
    console.log("toggleParam", key, value);
    toggleParam(key, value);
  }

  return (
    <nav className={styles.header}>
      <Title onClick={handleTitleClick} />

      {/* <div className={styles.tooltip}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
      </div> */}
      <div className={styles.tooltip}>
        <Controls param={param} setParam={setParam} toggleParam={handleToggleParam} />
      </div>

      <Hamburger onClick={handleHamburgerClick} menuOpen={menuOpen} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default Header;
