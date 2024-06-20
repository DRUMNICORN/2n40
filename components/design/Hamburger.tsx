import React from "react";
import styles from "./Hamburger.module.scss";

interface HamburgerProps {
  menuOpen?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Hamburger: React.FC<HamburgerProps> = ({ menuOpen = false, onClick, disabled = false }) => {
  const handleMenuClick = () => {
    if (disabled) return;
    if (onClick) onClick();
  };

  return (
    <div
      className={`${styles.hamburger} ${menuOpen ? styles.show : ""}`}
      onClick={handleMenuClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamburger;
