import React from "react";
import "./globals.css";
import localFont from 'next/font/local';
import { Metadata as NextMetadata } from 'next';
import Layout from "@/components/core/layout/Layout";
import { SITE_METADATA } from "@/exports/metadata";

const Inter = localFont({ src: './Inter.ttf' });

export const metadata: NextMetadata = SITE_METADATA;

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body className={Inter.className}>
        <Layout> 
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
