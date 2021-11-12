import "../styles/globals.min.css";
import "../styles/App.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../context/store";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  return (
    <>
      <Head>
        <title>Ömer Ayhan</title>
      </Head>
      <PersistGate persistor={store.__persistor}>
        {() => <Component {...pageProps} />}
      </PersistGate>
    </>
  );
}

export default wrapper.withRedux(MyApp);
