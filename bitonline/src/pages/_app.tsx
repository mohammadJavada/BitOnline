import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient());
  let theme = createTheme({
    typography: {
      fontFamily: `iransans`,
    },
  });

  return (
    <QueryClientProvider client={queryClient.current}>
      <ThemeProvider theme={theme}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
