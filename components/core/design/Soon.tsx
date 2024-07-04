import React from 'react';
import styles from './Soon.module.scss';
import Logo from './Logo';
import { SITE_METADATA } from '@/utils/metadata';
import Title from '../layout/Title';

const Soon: React.FC = () => {
  return (
    <div className={styles.workContainer}>
      <h1>This page is currently under construction</h1>
      <span>Thank you for your patience, it will be updated soon! </span>
      <Title />
      <span><Logo rotating size={100} /></span>
    </div>
  );
};

export default Soon;
