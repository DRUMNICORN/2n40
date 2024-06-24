import React from "react";
import styles from "./Footer.module.scss";
import { MdInfo } from "react-icons/md";
import Link from "../design/Link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {/* 
        TODO: Implement feedback form
          */}
      </div>
      <div className={styles.right}>
        <Link textLeft label={'Impressum'} href='/impressum'>
          <MdInfo />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;