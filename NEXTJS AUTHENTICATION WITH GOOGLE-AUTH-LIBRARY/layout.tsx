import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Header from "./components/Header";
import StoreProvider from './components/StoreProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
