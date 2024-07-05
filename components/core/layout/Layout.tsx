"use client";

import React, { ReactNode, FC } from "react";
import styles from "./Layout.module.scss";
import { OverlayProvider } from "@/providers/OverlayProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import Background from "../design/Background";
import ContentOverlay from "@/components/view/ContentOverlay";
import Header from "./Header";
import Footer from "./Footer";
import Network from "../design/Network";
import { ContentProvider } from "../../../providers/ContentProvider";
import { SyncProvider } from "@/providers/SyncProvider";

interface Props {
  children: ReactNode;
}

// Define an array of providers
const providers: FC<{ children: ReactNode }>[] = [
  QueryProvider,
  SyncProvider,
  ContentProvider,
  OverlayProvider,
];

const Layout: FC<Props> = React.memo(({ children }) => {
  // Create a single component that wraps all providers around its children
  const WrappedProviders: FC<{ children: ReactNode }> = providers.reduce((AccumulatedProviders, CurrentProvider) => {
    return ({ children }: { children: ReactNode }) => (
      <CurrentProvider>
        <AccumulatedProviders>{children}</AccumulatedProviders>
      </CurrentProvider>
    );
  }, ({ children }: { children: ReactNode }) => <>{children}</>);

  return (
    <div className={styles.content}>
      <Network />
      <Background />
      <WrappedProviders>
        <ContentOverlay />
        <Header />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </WrappedProviders>
    </div>
  );
});

export default Layout;
