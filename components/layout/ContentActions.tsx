import React from 'react';
import { MdClose, MdShare } from "react-icons/md";
import Link from "../design/Link";
import styles from "./ContentOverlay.module.scss";

interface ContentActionsProps {
  handleClose?: () => void;
  handleShare?: () => void;
  handleDetails?: () => void;
}

const ContentActions: React.FC<ContentActionsProps> = ({ handleClose, handleShare, handleDetails }) => {
  return (
    <div className={styles.buttons}>
      {handleShare && <Link onClick={handleShare}>
        <MdShare />
      </Link>}
      {handleClose && <Link onClick={handleClose}>
        <MdClose />
      </Link>}
    </div>
  );
};

export default ContentActions;
