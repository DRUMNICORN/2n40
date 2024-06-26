"use client"

import React, { useState } from 'react';
import styles from './Linked.module.scss';
import { REACT_ICONS } from '@/app/Icons';
import NextLink from 'next/link';
import { ContentTypes, ContentType, DetailsType } from '@/app/types';
import { useContentOverlay } from '@/providers/OverlayProvider';
import useContent from '@/hooks/useContent';

export type { ContentTypes };

interface LinkedProps {
  href?: string;
  label?: string;
  children?: React.ReactNode;
  spinOnClick?: boolean;
  disableClick?: boolean;
  type?: ContentTypes;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  inline?: boolean;
  noWrap?: boolean;
  id?: number; // New prop to fetch content based on id
}

const Linked: React.FC<LinkedProps> = ({
  href,
  label,
  children,
  spinOnClick = false,
  disableClick = false,
  type,
  onClick,
  inline = false,
  noWrap = false,
  id, // Added id prop
}) => {
  const [iconAnimated, setIconAnimated] = useState(false);
  const { setContent: setOverlayContent, setVisible: setOverlayVisible } = useContentOverlay(); // Accessing setContent from OverlayProvider
  const { contentFile } = useContent(id, type as ContentTypes); 

  const handleRedirect = (value: string, key: string): void => {
    const actions: Record<string, () => void> = {
      mail: () => window.open(`mailto:${value}`),
      address: () => window.open(`https://www.google.com/maps/search/?api=1&query=${value}`),
      tel: () => window.open(`tel:${value}`),
      website: () => window.open(value.startsWith('https://') ? value : `https://${value}`, '_blank'),
    };

    actions[key]?.();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    if (disableClick) {
      e.preventDefault();
      return;
    }

    if (id) 
          {
            e.preventDefault();
            e.stopPropagation();
            // Simulate loading content from id (replace with actual logic)
            const fetchedContent: ContentType = contentFile as ContentType;

            console.log(fetchedContent);
      
            setOverlayContent(fetchedContent);
            setOverlayVisible(true);
            return;
          }


    onClick?.(e);

    if (spinOnClick) {
      setIconAnimated(true);
      setTimeout(() => setIconAnimated(false), 500);
    }

    if ((type === 'address' || type === 'website' || (!!href && href.startsWith('http'))) && !disableClick) {
      // e.preventDefault();
      handleRedirect(href || label || '', type || 'website');
    }
  };

  const extractDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const effectiveHref = href || label || '';
  const isExternalLink = effectiveHref.startsWith('http');
  const isLocalLink = effectiveHref.startsWith('/');

  const linkClassName = `${styles.link} ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} 
    ${isExternalLink ? styles.externalLink : ''} ${(!label && !type && !effectiveHref) ? styles.quadratic : ''} 
    ${inline ? styles.inline : ''} ${noWrap ? styles.noWrap : ''}`;

  if (isExternalLink) {
    const linkProps = {
      href: effectiveHref,
      onClick: handleClick,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: linkClassName,
    };

    return (
      <a {...linkProps}>
        {children || REACT_ICONS[type as keyof typeof REACT_ICONS]}
        {(label || label) && <span className={styles.linkText}>{label?.includes('https') ? extractDomain(label) : label}</span>}
      </a>
    );
  } else if (isLocalLink) {
    const linkProps = {
      href: effectiveHref,
      onClick: handleClick,
      className: linkClassName,
    };

    return (
      <NextLink {...linkProps} href={effectiveHref}>
        {(children || REACT_ICONS[type as keyof typeof REACT_ICONS])}
        {(label || label) && <span className={styles.linkText}>{label}</span>}
      </NextLink>
    );
  } else {
    const buttonProps = {
      onClick: handleClick,
      className: linkClassName,
    };
    return (
      <button {...buttonProps}>
        {!isNaN(Number(children)) && children || REACT_ICONS[type as keyof typeof REACT_ICONS]}
        {(label || label) && <span className={styles.linkText}>{label}</span>}
      </button>
    );
  }
};

export default Linked;
