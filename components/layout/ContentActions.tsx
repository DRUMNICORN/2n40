import React from 'react';
// import { MdClose, MdShare } from "react-icons/md";
import Linked from "../design/Linked";
import styles from "./ContentOverlay.module.scss";
import { MetadataTypes } from '@/app/types';

interface ContentActionsProps {
  handleClose?: () => void;
  handleShare?: () => void;
  handleDetails?: () => void;
}

const ContentActions: React.FC<ContentActionsProps> = ({ handleClose, handleShare, handleDetails }) => {
  return (
    <div className={styles.buttons}>
      {handleShare && <Linked onClick={handleShare} type={MetadataTypes.share} />}
      {handleClose && <Linked onClick={handleClose} type={MetadataTypes.close} />}
    </div>
  );
};

export default ContentActions;
