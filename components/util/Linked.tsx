"use client";

import React from 'react';
import styles from './Linked.module.scss';
import { ContentTypes } from '@/exports/enums';
import { REACT_ICONS } from '@/exports/icons';
import Link from 'next/link';
import useLinked from './Linked.hook';

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
  disableClick = false,
  type,
  onClick,
  inline = false,
  noWrap = false,
  id,
  text = false,
}) => {
  const {
    iconAnimated,
    confirmOpen,
    handleClick,
    handleConfirmNavigation,
    extractDomain,
  } = useLinked({ id, type, href, spinOnClick, disableClick, onClick });

  const effectiveHref = href || '';
  const isExternalLink = effectiveHref.startsWith('http');
  const linkClassName = `${styles.link} ${iconAnimated && spinOnClick ? styles.iconAnimated : ''} 
    ${isExternalLink ? styles.externalLink : styles.internalLink} ${(!href && !type && !effectiveHref) ? styles.quadratic : ''} 
    ${inline ? styles.inline : ''} ${noWrap ? styles.noWrap : ''}`;

  const extractedDomain = extractDomain(effectiveHref);

  return (
    <>
      <Link href={href || ''} onClick={handleClick} className={linkClassName}>
        {!isNaN(Number(children)) ? children : REACT_ICONS[type as keyof typeof REACT_ICONS]}
        {text && href && <span className={styles.linkText}>{extractedDomain}</span>}
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
