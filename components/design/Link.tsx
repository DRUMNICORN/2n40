"use client"

import React, { useState } from 'react';
import styles from './Link.module.scss';
import { SOCIAL_MEDIA_ICONS } from '@/app/defaults';
import { MetadataTypes } from '@/app/types';

interface LinkProps {
  href?: string;
  label?: string;
  children?: React.ReactNode;
  spinOnClick?: boolean;
  disableClick?: boolean;
  textLeft?: boolean; // Position text to the left of the icon
  type?: MetadataTypes;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any; // For additional dynamic properties
}

const Link: React.FC<LinkProps> = ({
  href,
  label,
  children,
  spinOnClick = false,
  disableClick = false,
  textLeft = false,
  type,
  onClick,
  ...rest
}) => {
  const [iconAnimated, setIconAnimated] = useState(false);

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

  const handleLinkClick = (e: React.MouseEvent) => {
    if (disableClick) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);

    if (spinOnClick) {
      setIconAnimated(true);
      setTimeout(() => setIconAnimated(false), 500);
    }

    if (type && label) {
      handleRedirect(label, type);
    }
  };

  const LinkText = () => (
    <span className={styles.linkText}>{label}</span>
  );

  const isExternalLink = type === 'address' || type === 'website';

  // Determine if the link is a quadratic (square) style based on presence of label
  const isQuadratic = !label && !type;


  const linkClassName = `
    ${styles.link} 
    ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} 
    ${isExternalLink ? styles.externalLink : ''}
    ${isQuadratic ? styles.quadratic : ''} 
  `;

  return href ? (
    <a href={href} className={linkClassName} onClick={handleLinkClick} {...rest}>
      {children || SOCIAL_MEDIA_ICONS[type as keyof typeof SOCIAL_MEDIA_ICONS]}
      {label && <LinkText />}
    </a>
  ) : (
    <button className={linkClassName} onClick={handleLinkClick} {...rest}>
      {children || SOCIAL_MEDIA_ICONS[type as keyof typeof SOCIAL_MEDIA_ICONS]}
      {label && <LinkText />}
    </button>
  );
};

export default Link;
