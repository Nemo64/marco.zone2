import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { trackPageView } from "../src/tracker";

function MyApp({ Component, pageProps, router }: AppProps) {
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}${router.pathname}`;
  useEffect(() => {
    trackPageView(canonicalUrl);
  }, [canonicalUrl]);

  return <Component {...pageProps} />;
}
export default MyApp;
