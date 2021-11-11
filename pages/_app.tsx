import "../styles/globals.min.css";
import "../styles/App.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import store, { persistor } from "../context/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ömer Ayhan</title>
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {() => <Component {...pageProps} />}
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
