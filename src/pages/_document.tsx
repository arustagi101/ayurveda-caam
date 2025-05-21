import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load fonts with display=swap for better performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
          media="print"
          onLoad={(e) => { e.currentTarget.media = 'all'; }}
        />
        
        {/* Meta tags for better performance */}
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <body className="antialiased font-martel theme-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
