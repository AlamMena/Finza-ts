import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { NextUIProvider, createTheme, Container } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Nav from "@/ui/nav ";
import PrivateRoute from "@/auth/privateRoute";

export default function App({ Component, pageProps }: AppProps) {
  const lightTheme = createTheme({
    type: "light",
  });

  const darkTheme = createTheme({
    type: "dark",
  });
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Nav />
        <Container>
          <PrivateRoute>
            <Component {...pageProps} />
          </PrivateRoute>
        </Container>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
