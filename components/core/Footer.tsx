import React from "react";
import styles from "./Footer.module.scss";
import { MdInfo } from "react-icons/md";
import Link from "../design/Link";
import { MetadataTypes } from "@/app/types";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link type={MetadataTypes.instagram} href="https://www.instagram.com/singularity.kms/" openInNewTab />
      </div>
      <div className={styles.center}>
        {/* Center content, e.g., navigation links (optional) */}
      </div>
      <div className={styles.right}>
        <Link textLeft label={'Impressum'} href='/impressum' type={MetadataTypes.info} />
      </div>
    </footer>
  );
};

export default Footer;
