import React, { useMemo, useRef, useEffect, useCallback } from "react";
import styles from "./Menu.module.scss";
import { usePathname } from 'next/navigation';
import { useContentOverlay } from "@/providers/OverlayProvider";
import Linked from "@/components/util/Linked";
import { CATEGORY_DESCRIPTIONS } from "@/exports/metadata";
import { REACT_ICONS } from "@/exports/icons";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
  const { isVisible, toggleVisibility } = useContentOverlay();
  const menuRef = useRef<HTMLUListElement>(null);

  const categoriesList = useMemo(() => Object.keys(CATEGORY_DESCRIPTIONS).map(type => `/${type}`), []);

  const handleLinkClick = useCallback((page: string) => {
    if (isVisible) {
      toggleVisibility();
    }
    setTimeout(onClose, 42);
  }, [isVisible, toggleVisibility, onClose]);

  const getCurrentPageClass = (page: string) => {
    const pathname = usePathname();
    return pathname === page ? styles.selected : styles.notSelected;
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      if (event.y > menuRef.current.offsetTop) onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  return (
    <ul className={`${styles.menu} ${open ? styles.show : ""}`} ref={menuRef}>
      {categoriesList.map((page, index) => {
        const innerText = page.replace("/", "");
        return (
          <li key={index} className={`${styles.menuItem} ${getCurrentPageClass(page)}`}>
            <Linked text href={page} onClick={() => handleLinkClick(page)} type={innerText as keyof typeof REACT_ICONS} />
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
