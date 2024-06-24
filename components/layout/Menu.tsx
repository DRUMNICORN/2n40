import React, { useMemo } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CATEGORY_DESCRIPTIONS, ContentType } from "@/app/types";
import { useContentOverlay } from "@/providers/OverlayProvider";
import { CATEGORY_ICONS } from "@/app/defaults";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
  const { isVisible, toggleVisibility, setContent } = useContentOverlay();

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
    return pathname === page ? styles.selected : styles.notSelected;
  };

  const isMenuOpen = open ? styles.show : "";

  return (
    <ul className={`${styles.menu} ${isMenuOpen}`}>
      {categoriesList.map((page, index) => {
        const innerText = page.replace("/", "");
        const icon = CATEGORY_ICONS[innerText];

        return (
          <li key={index} className={`${styles.menuItem} ${getCurrentPageClass(page)}`}>
            <Link href={page} className={styles.menuLink} onClick={() => handleLinkClick(page)}>
              {innerText}
              <div className={styles.icon}>
                {icon}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
