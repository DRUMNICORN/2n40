"use client";

import React from "react";
import styles from "./Layout.module.scss";
import Background from "../design/Background";
import Footer from "../core/Footer";
import { OverlayProvider } from "@/providers/OverlayProvider";
import Header from "../core/Header";
import ContentOverlay from "./ContentOverlay";
import { QueryProvider } from "@/providers/QueryProvider";

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
            <ContentOverlay />
          <QueryProvider>
            {/* <TooltipProvider> */}
            <Header />
            <main className={styles.main}>
              {memoizedChildren}
            </main>
            {/* </TooltipProvider> */}
          </QueryProvider>
        </OverlayProvider>
        <Footer />
    </div>
  );
});

export default Layout;
