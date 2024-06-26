import React from 'react';
import styles from './Soon.module.scss';
import { SITE_METADATA } from '@/app/types';
import Logo from './Logo';
// import { SITE_METADATA } from '@/app/types';

const Soon: React.FC = () => {
  return (
    <div className={styles.workContainer}>
      <h1>This page is currently under construction</h1>
      <p>Thank you for your patience, it will be updated soon! </p>
      <span><Logo rotating size={100} /></span>
      {SITE_METADATA.title as string}
    </div>
  );
};

export default Soon;
