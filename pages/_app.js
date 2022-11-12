import { store } from "../store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Roboto } from "@next/font/google";

import "../styles/globals.scss";

const queryClient = new QueryClient();

const roboto = Roboto({
  weight: "400",
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
