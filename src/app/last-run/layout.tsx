import './last-run.css';
import { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
    children: ReactNode;
  };
  
  export default function LastRunLayout({ children }: Props) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/default.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <html lang="en">
          <body>{children}</body>
        </html>
      </>
    );
  }