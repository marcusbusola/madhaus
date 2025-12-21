import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['serif']
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata = {
  title: "Madhaus",
  description:
    "Madhaus is a media company and social innovation lab creating impact through systems thinking and bold ideas across Africa.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${outfit.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FSEDXP0GJ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FSEDXP0GJ6');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
