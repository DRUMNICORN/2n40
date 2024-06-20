import React from 'react';
import Link from 'next/link';
import styles from './Title.module.scss';
import { SITE_METADATA } from '@/app/types';

interface TitleProps {
    onClick?: () => void;
    title?: string;
}

const Title: React.FC<TitleProps> = ({ onClick, title }) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <Link href="/" className={styles.title}>
                {title ? title : SITE_METADATA.title as string}
            </Link>
        </div>
    );
};

export default Title;
