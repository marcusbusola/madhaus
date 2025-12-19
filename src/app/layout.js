import { Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],  // Only load needed weights
  display: "swap",                        // Prevent FOIT (Flash of Invisible Text)
  preload: true,                          // Preload for faster initial render
  fallback: ['system-ui', 'arial']       // Fallback fonts
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
      <body className={`${manrope.variable} antialiased`}>
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
