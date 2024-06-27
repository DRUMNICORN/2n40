import React from "react";
import styles from "./Footer.module.scss";
import Linked from "../design/Linked";
import { MetadataTypes } from "@/app/types";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Linked type={MetadataTypes.instagram} href="https://www.instagram.com/singularity.2n40/" />
        <Linked type={MetadataTypes.github} href="https://github.com/DRUMNICORN/2n40" />
      </div>
      <div className={styles.center}>
        {/* Center content, e.g., navigation links (optional) */}
        Made with ❤️
      </div>
      <div className={styles.right}>
        <Linked label={'Impressum'} href='/impressum' type={MetadataTypes.info} />
      </div>
    </footer>
  );
};

export default Footer;
