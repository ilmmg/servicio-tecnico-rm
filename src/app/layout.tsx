
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RM Servicio Tecnico - Reparacion de Heladeras y Lavarropas",
  description: "Servicio Tecnico RM. Reparacion de heladeras y lavarropas. Calidad, precio y confianza. Ruiz de los Llanos 3132, Laferrere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script id="rm-theme-init" strategy="beforeInteractive">{`
          (() => {
            const storageKey = "rm-theme";
            const root = document.documentElement;
            const savedTheme = localStorage.getItem(storageKey);
            const theme = savedTheme === "dark" || savedTheme === "light"
              ? savedTheme
              : window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.remove("dark", "light");
            root.classList.add(theme);
            root.style.colorScheme = theme;
          })();
        `}</Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-rm-black text-rm-text`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
