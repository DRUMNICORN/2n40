import React from 'react';
import styles from "./Contents.module.scss";
import useContentsContainer from '@/hooks/useContentsContainer';
import { ContentTypes } from '@/utils/enums';

interface ContentsContainerProps {
    contentType: ContentTypes;
}

const Contents: React.FC<ContentsContainerProps> = ({ contentType: mode }) => {
    // const {
    //     contentFiles,
    //     isLoading,
    //     loadError,
    //     isClosed,
    //     MemoizedViewComponent
    // } = useContentsContainer({ contentType: mode });

    // return (
    //     (loadError && contentFiles.length === 0 && !isLoading)
    //         ? <div className={styles.container}>
    //             {/* <Logo rotating size={420} /> */}
    //         </div>
    //         : <div className={styles.container}>
    //             {MemoizedViewComponent}
    //         </div>
    // );

    return <>
    </>
};

export default React.memo(Contents);
