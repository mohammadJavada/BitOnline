import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  let theme = createTheme({
    typography: {
      fontFamily: `iransans`,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
