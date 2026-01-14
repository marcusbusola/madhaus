export const metadata = {
  title: "Register - Hack the Jam",
  description: "Register your interest for Hack the Jam - A hackathon bringing together innovators, developers, and creators to build solutions that matter.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Register - Hack the Jam | Madhaus Africa",
    description: "Register your interest for Hack the Jam hackathon and join us for an intensive weekend of innovation.",
    type: 'website',
    url: 'https://madhaus.africa/_hackthejam/register',
    images: [{
      url: '/hackthejam-background.png',
      width: 1176,
      height: 918,
      alt: 'Hack the Jam Registration',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Register - Hack the Jam | Madhaus Africa",
    description: "Register your interest for Hack the Jam hackathon.",
    images: ['/hackthejam-background.png'],
  },
};

export default function RegisterLayout({ children }) {
  return children;
}
