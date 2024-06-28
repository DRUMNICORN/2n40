import React from 'react';
import styles from "./Contents.module.scss";
import { ContentType } from '@/app/types';
import Logo from '../design/Logo';

interface ContentsComponentProps {
    contentFiles: ContentType[];
    isLoading: boolean;
    isClosed: boolean;

    loadError: string;

    MemoizedViewComponent: React.ReactNode;
}


const ContentsComponent: React.FC<ContentsComponentProps> = ({
    contentFiles,
    isLoading,
    loadError,
    isClosed,
    MemoizedViewComponent
}) => {
    return (
        (loadError && contentFiles.length === 0 && !isLoading)
            ? <div className={styles.container}>
                <Logo rotating size={420} />
            </div>
            : <div className={styles.container}>
                {MemoizedViewComponent}
            </div>
    );
}

export default React.memo(ContentsComponent);
