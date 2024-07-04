"use client"

import React from "react";
import styles from "./Layout.module.scss";
import { OverlayProvider } from "@/providers/OverlayProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import Background from "../design/Background";
import ContentOverlay from "@/components/view/ContentOverlay";
import Header from "./Header";
import Footer from "./Footer";
import Network from "../design/Network";

interface Props {
  children: React.ReactNode;
}

const Layout = React.memo((props: Props) => {
  const { children } = props;

  return (
    <div className={styles.content}>
        <Network />
        <Background />
        <OverlayProvider>
          <QueryProvider>
          <ContentOverlay />
            <Header />
            <main className={styles.main}>
              {children}
            </main>
          </QueryProvider>
        </OverlayProvider>
        <Footer />
    </div>
  );
});

export default Layout;
