import type { Metadata } from "next";
import { Oswald, Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Tatiana Shudria | Portfolio",
  description: "Personal portfolio of Tatiana Shudria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${bebasNeue.variable} ${oswald.variable} ${manrope.variable}`}
      >
        <Header />
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#171917",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "16px 24px",
              fontFamily: "var(--font-manrope)",
            },
            success: {
              iconTheme: {
                primary: "#d5f45b",
                secondary: "#171917",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
