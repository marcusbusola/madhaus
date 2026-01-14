import { Montserrat, Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import CookieConsent from "./components/CookieConsent";
import OrganizationSchema from "./components/OrganizationSchema";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata = {
  metadataBase: new URL('https://madhaus.africa'),
  title: {
    default: "Madhaus Africa - Media Company & Social Innovation Lab",
    template: "%s | Madhaus Africa"
  },
  description:
    "Madhaus is a media company and social innovation lab creating impact through systems thinking and bold ideas across Africa.",
  keywords: ["social innovation", "media company", "Africa", "systems thinking", "PODS", "NYSC", "innovation lab", "Madhaus"],
  authors: [{ name: "Madhaus Africa" }],
  creator: "Madhaus Africa",
  publisher: "Madhaus Africa",

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://madhaus.africa',
    siteName: 'Madhaus Africa',
    title: 'Madhaus Africa - Media Company & Social Innovation Lab',
    description: 'Madhaus is a media company and social innovation lab creating impact through systems thinking and bold ideas across Africa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Madhaus Africa - Media Company & Social Innovation Lab',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Madhaus Africa - Media Company & Social Innovation Lab',
    description: 'Madhaus is a media company and social innovation lab creating impact through systems thinking and bold ideas across Africa.',
    images: ['/og-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Note: Create these favicon files for proper browser icon support
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
  //     { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
  //   ],
  //   apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body className={`${montserrat.variable} ${manrope.variable} antialiased`}>
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
        <CookieConsent />
      </body>
    </html>
  );
}
