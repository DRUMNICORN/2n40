import React from 'react';
import styles from './Title.module.scss';
import { SITE_METADATA } from '@/app/types';
import Linked from './Linked';

interface TitleProps {
    onClick?: () => void;
    title?: string;
}

const Title: React.FC<TitleProps> = ({ onClick, title }) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <Linked href="/">
                {title ? title : SITE_METADATA.title as string}
            </Linked>
        </div>
    );
};

export default Title;
