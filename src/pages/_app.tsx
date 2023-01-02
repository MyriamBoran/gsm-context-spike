import type { AppProps } from "next/app";

import { BeerProvider } from "../store/useBeer";

import "../../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BeerProvider>
      <Component {...pageProps} />
    </BeerProvider>
  );
}
