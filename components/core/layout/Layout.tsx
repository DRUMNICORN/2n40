"use client";

import React from "react";
import styles from "./Layout.module.scss";
import { OverlayProvider } from "@/providers/OverlayProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import Background from "../design/Background";
import ContentOverlay from "@/components/view/ContentOverlay";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = React.memo((props: Props) => {
  const { children } = props;

  const memoizedChildren = React.useMemo(() => {
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child as React.ReactElement<any>, { key: index })
    );
  }, [children]);

  return (
    <div className={styles.content}>
        <Background />
        <OverlayProvider>
          <QueryProvider>
          <ContentOverlay />
            <Header />
            <main className={styles.main}>
              {memoizedChildren}
            </main>
          </QueryProvider>
        </OverlayProvider>
        <Footer />
    </div>
  );
});

export default Layout;
