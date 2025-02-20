import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

import '@styles/globals.css';
import '@styles/reset.css';
import Head from 'next/head';
function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList.add('bg-background', 'dark:bg-background-dark');
  }, []);

  return (
    <>
      <Head>
        <html lang="en"></html>
        <title>The Note App</title>
        <meta name="description" content="An app to add notes to each day" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <React.StrictMode>
        <Component
          className="bg-background dark:bg-background-dark"
          {...pageProps}
        />
      </React.StrictMode>
    </>
  );
}

export default App;
