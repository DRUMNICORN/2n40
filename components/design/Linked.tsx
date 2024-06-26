"use client";

import React, { useState } from 'react';
import styles from './Linked.module.scss';
import { REACT_ICONS } from '@/app/Icons';
import { MetadataTypes } from '@/app/types';
import Link from 'next/link';

export type { MetadataTypes }

interface LinkedProps {
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

const Linked: React.FC<LinkedProps> = ({
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
    <Link
      href={href}
      className={linkClassName}
      onClick={handleLinkClick}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children || REACT_ICONS[type as keyof typeof REACT_ICONS]}
      {label && <LinkText />}
    </Link>
  ) : (
    <button className={linkClassName} onClick={handleLinkClick}>
      {children || REACT_ICONS[type as keyof typeof REACT_ICONS]}
      {label && <LinkText />}
    </button>
  );
};

export default Linked;
