import React from "react";
import styles from "./Footer.module.scss";
import Linked from "../../util/Linked";
import { ContentTypes } from "@/exports/enums";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Linked type={ContentTypes.instagram} href="https://www.instagram.com/singularity.2n40/" />
        <Linked type={ContentTypes.github} href="https://github.com/DRUMNICORN/2n40" />
        <Linked type={ContentTypes.discord} href="https://discord.gg/wffdazYfKf" />
        <Linked type={ContentTypes.telegram} href="https://t.me/singularity_chemnitz" />
      </div>
      <div className={styles.center}>
      </div>
      <div className={styles.right}>
        <Linked href='/impressum' type={ContentTypes.info} />
      </div>
    </footer>
  );
};

export default Footer;
