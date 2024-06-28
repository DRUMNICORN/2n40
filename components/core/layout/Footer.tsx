import React from "react";
import styles from "./Footer.module.scss";
import Linked from "../../util/Linked";
import { ContentTypes } from "@/app/types";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Linked type={ContentTypes.instagram} href="https://www.instagram.com/singularity.2n40/" />
        <Linked type={ContentTypes.github} href="https://github.com/DRUMNICORN/2n40" />
      </div>
      <div className={styles.center}>
      </div>
      <div className={styles.right}>
        <Linked label={'Impressum'} href='/impressum' type={ContentTypes.info} />
      </div>
    </footer>
  );
};

export default Footer;
