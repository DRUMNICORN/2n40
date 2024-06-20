"use client";

import React, { useState } from 'react';
import { MdCreate } from 'react-icons/md';
import styles from './Link.module.scss';

interface LinkProps {
  children?: React.ReactNode;
  spinOnClick?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  noBorder?: boolean;
  noHover?: boolean;
  noName?: boolean;
  noStyle?: boolean;
  disableClick?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  fittingText?: boolean;
  shortenedText?: boolean;
  href?: string;
  label?: string;
  type?: string;
  textLeft?: boolean; // New property to position text to the left of the icon
  [key: string]: any; // For additional dynamic properties
}

const Link: React.FC<LinkProps> = ({
  spinOnClick = false,
  onClick,
  children,
  preventDefault = false,
  stopPropagation = false,
  noBorder = false,
  noHover = false,
  noName = false,
  disableClick = false,
  noStyle = false,
  fittingText = false,
  shortenedText = false,
  href,
  type,
  label,
  textLeft = false, // Default value is false
  ...rest
}) => {
  const [iconAnimated, setIconAnimated] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    if (preventDefault) e.preventDefault();
    if (stopPropagation) e.stopPropagation();
    if (onClick) onClick(e);

    if (spinOnClick) {
      setIconAnimated(true);
      setTimeout(() => setIconAnimated(false), 500);
    }

    if (!noName && !children) {
      console.warn('No name provided for Link component');
    }

    if (type && label && !disableClick) {
      handleRedirect(label, type);
    }
  };

  const handleRedirect = (value: string, key: string) => {
    switch (key) {
      case 'mail':
        window.open(`mailto:${value}`);
        break;
      case 'address':
        window.open(`https://www.google.com/maps/search/?api=1&query=${value}`);
        break;
      case 'tel':
        window.open(`tel:${value}`);
        break;
      case 'website':
        const url = value.startsWith('https://') ? value : `https://${value}`;
        window.open(url);
        break;
      default:
        break;
    }
  };

  const fittingTextClass = fittingText ? styles.fittingText : '';
  const shortenedTextClass = shortenedText ? styles.shortenedText : '';
  const noNameTextClass = noName ? styles.noName : '';
  const textLeftClass = textLeft ? styles.textLeft : '';

  return href ? (
    <a
      href={href}
      className={`${styles.link} ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} ${noBorder ? styles.noBorder : ''} ${noHover ? styles.noHover : ''} ${noStyle ? styles.noStyle : ''} ${fittingTextClass} ${shortenedTextClass} ${noNameTextClass} ${textLeftClass}`}
      onClick={handleLinkClick}
      {...rest}
    >
      {textLeft && label && <span className={styles.label}>{label}</span>}
      {children ? (
        <div className={`${styles.textContainer} ${shortenedTextClass}`}>
          {children}
        </div>
      ) : (
        <MdCreate />
      )}
      {!textLeft && label && <span className={styles.label}>{label}</span>}
    </a>)
    : (
      <button
        className={`${styles.link} ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} ${noBorder ? styles.noBorder : ''} ${noHover ? styles.noHover : ''} ${noStyle ? styles.noStyle : ''} ${fittingTextClass} ${shortenedTextClass} ${noNameTextClass} ${textLeftClass}`}
        onClick={handleLinkClick}
        {...rest}
      >
        {textLeft && label && <span className={styles.label}>{label}</span>}
        {children ? (
          <div className={`${styles.textContainer} ${shortenedTextClass}`}>
            {children}
          </div>
        ) : (
          <MdCreate />
        )}
        {!textLeft && label && <span className={styles.label}>{label}</span>}
      </button>)

};

export default Link;
