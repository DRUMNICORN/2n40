import React from 'react';
import Image from 'next/image';
import styles from './Logo.module.scss';
import Link from 'next/link';

interface LogoProps {
  rotating?: boolean;
  size?: number; // Size prop to make the size dynamic
}

const Logo: React.FC<LogoProps> = ({ rotating = false, size = 42 }) => {
  const logoClassName = `${styles.logoContainer} ${rotating ? styles.rotating : ''}`;
  return (
    <Link className={logoClassName} style={{ width: `${size}px`, height: `${size}px` }} href="/" >
      <Image src="/singularity.png" alt="Logo" width={size} height={size} priority />
    </Link>
  );
};

export default Logo;
