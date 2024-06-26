import React, { useMemo, useRef, useEffect } from "react";
import styles from "./Menu.module.scss";
// import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CATEGORY_DESCRIPTIONS } from "@/app/types";
import { useContentOverlay } from "@/providers/OverlayProvider";
import { REACT_ICONS } from "@/app/Icons";
import Linked from "../design/Linked";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
  const { isVisible, toggleVisibility, setContent } = useContentOverlay();
  const menuRef = useRef(null);

  const categoriesList = useMemo(() => {
    return Object.keys(CATEGORY_DESCRIPTIONS).map((type: string) => `/${type}`);
  }, []);

  const handleLinkClick = (page: string) => {
    if (isVisible) {
      toggleVisibility();
    }

    setTimeout(onClose, 42);
  };

  const getCurrentPageClass = (page: string) => {
    const pathname = usePathname();
    return pathname === page? styles.selected : styles.notSelected;
  };

  const isMenuOpen = open? styles.show : "";
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as HTMLElement)) {
      // toggleVisibility()
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <ul className={`${styles.menu} ${isMenuOpen}`} ref={menuRef}>
      {categoriesList.map((page, index) => {
        const innerText = page.replace("/", "");
        return (
          <li key={index} className={`${styles.menuItem} ${getCurrentPageClass(page)}`}>
            <Linked href={page} onClick={() => handleLinkClick(page)} type={innerText as keyof typeof REACT_ICONS} label={innerText} />
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
