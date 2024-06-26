import React from "react";
import styles from "./Footer.module.scss";
import Linked from "../design/Linked";
import { MetadataTypes } from "@/app/types";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Linked type={MetadataTypes.instagram} href="https://www.instagram.com/singularity.2n40/" openInNewTab />
        {/* <Linked type={MetadataTypes.github} href="https://github.com/DRUMNICORN/2n40" openInNewTab /> */}
      </div>
      <div className={styles.center}>
        {/* Center content, e.g., navigation links (optional) */}
      </div>
      <div className={styles.right}>
        <Linked textLeft label={'Impressum'} href='/impressum' type={MetadataTypes.info} />
      </div>
    </footer>
  );
};

export default Footer;
