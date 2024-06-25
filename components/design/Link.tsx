"use client";

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
  textLeft?: boolean;
  type?: MetadataTypes;
  openInNewTab?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  inline?: boolean; // New property for inline placement
  noWrap?: boolean; // New property for no-wrap behavior
}

const Link: React.FC<LinkProps> = ({
  href,
  label,
  children,
  spinOnClick = false,
  disableClick = false,
  type,
  openInNewTab = false,
  onClick,
  inline = false, // Default to false
  noWrap = false, // Default to false
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

  const extractDomain = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '');
    } catch (error) {
      return url;
    }
  };

  const LinkText = () => (
    <span className={styles.linkText}>
      {label?.includes('https') ? extractDomain(label) : label}
    </span>
  );

  const isExternalLink = type === 'address' || type === 'website';
  const isQuadratic = !label && !type && !href;

  const linkClassName = `
    ${styles.link} 
    ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} 
    ${isExternalLink ? styles.externalLink : ''}
    ${isQuadratic ? styles.quadratic : ''} 
    ${inline ? styles.inline : ''}
    ${noWrap ? styles.noWrap : ''}
  `;

  return href ? (
    <a
      href={href}
      className={linkClassName}
      onClick={handleLinkClick}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children || SOCIAL_MEDIA_ICONS[type as keyof typeof SOCIAL_MEDIA_ICONS]}
      {label && <LinkText />}
    </a>
  ) : (
    <button className={linkClassName} onClick={handleLinkClick}>
      {children || SOCIAL_MEDIA_ICONS[type as keyof typeof SOCIAL_MEDIA_ICONS]}
      {label && <LinkText />}
    </button>
  );
};

export default Link;
