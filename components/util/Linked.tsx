"use client";

import React, { useState } from 'react';
import styles from './Linked.module.scss';
import { useContentOverlay } from '@/providers/OverlayProvider';
import useContent from '@/hooks/useContent';
import { ContentTypes } from '@/exports/enums';
import { ContentType } from '@/exports/interfaces';
import { REACT_ICONS } from '@/exports/icons';
import Link from 'next/link';

interface LinkedProps {
  href?: string;
  children?: React.ReactNode;
  spinOnClick?: boolean;
  disableClick?: boolean;
  type?: ContentTypes;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  inline?: boolean;
  noWrap?: boolean;
  text?: boolean;
  id?: number;
}

const Linked: React.FC<LinkedProps> = ({
  href,
  children,
  spinOnClick = false,
  disableClick: disable = false,
  type,
  onClick,
  inline = false,
  noWrap = false,
  id,
  text = false,
}) => {
  const [iconAnimated, setIconAnimated] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // State to manage confirmation modal visibility
  const [pendingHref, setPendingHref] = useState<string | null>(null); // State to store the pending href
  const { setContent: setOverlayContent, setVisible: setOverlayVisible } = useContentOverlay(); // Accessing setContent from OverlayProvider
  const { contentFile } = useContent(id, type as ContentTypes);

  const handleRedirect = (value: string, key: string): void => {

    const actions: Record<string, () => void> = {
      mail: () => window.open(`mailto:${value}`),
      address: () => window.open(`https://www.google.com/maps/search/?api=1&query=${value}`),
      tel: () => window.open(`tel:${value}`),
      website: () => window.open(value.startsWith('https://') ? value : `https://${value}`, '_blank'),
      form: () => window.open(value, '_blank'),
      
    };


    actions[key]?.();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {

    if (disable) {
      console.warn("Linked: disableClick is set to true, skipping click handling.");
      return;
    }

    if (spinOnClick) {
      setIconAnimated(true);
      setTimeout(() => setIconAnimated(false), 500);
    }

    if (id) {
      e.preventDefault();
      e.stopPropagation();
      const fetchedContent: ContentType = contentFile as ContentType;
      setOverlayContent(fetchedContent);
      setOverlayVisible(true);
      return;
    }

    if ((type === 'address' || type === 'website' || (!!href && href.startsWith('http'))) && !disable) {
      e.preventDefault();
      e.stopPropagation();
      setPendingHref(href || '');
      setConfirmOpen(true); // Open the confirmation modal
    } else {
      onClick?.(e);
      handleRedirect(href || '', type || '');
    }
  };

  const handleConfirmNavigation = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, confirm: boolean): void => {
    
    if (!confirm) {
      e.preventDefault();
      e.stopPropagation();
    }

    setConfirmOpen(false);
    setPendingHref(null);
  };

  const extractDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url.replace('/', '');
    }
  };

  const effectiveHref = href || href || '';
  const isExternalLink = effectiveHref.startsWith('http');

  const linkClassName = `${styles.link} ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} 
    ${isExternalLink ? styles.externalLink :  styles.internalLink} ${(!href && !type && !effectiveHref) ? styles.quadratic : ''} 
    ${inline ? styles.inline : ''} ${noWrap ? styles.noWrap : ''}`;

  const extractedDomain = extractDomain(effectiveHref);

  return (
    <>
      <Link href={href || ''} onClick={handleClick} className={linkClassName}>
        {!isNaN(Number(children)) && children || REACT_ICONS[type as keyof typeof REACT_ICONS]}
        {text && (href || href) && <span className={styles.linkText}>{extractedDomain}</span>}
      </Link>

      {confirmOpen && (
        <div className={styles.confirmModal}>
          <p>Du wirst auf eine Drittanbieter {(isExternalLink ? extractedDomain : effectiveHref).toUpperCase()} weitergeleitet.</p>
          <div>
            <Link href={href || ''} className={linkClassName} onClick={(e) => handleConfirmNavigation(e, true)}>Yes</Link>
            <Link href={''} className={linkClassName} onClick={(e) => handleConfirmNavigation(e, false)}>No</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Linked;
