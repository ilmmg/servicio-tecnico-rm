
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-rm-black text-rm-text`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
