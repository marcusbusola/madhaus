import PresentationContainer from "./components/PresentationContainer";

export const metadata = {
  title: "Home",
  description: "Madhaus is a media company and social innovation lab creating impact through systems thinking and bold ideas across Africa. Explore our initiatives including PODS, scholarships, and hackathons.",
  openGraph: {
    title: "Madhaus Africa - Media Company & Social Innovation Lab",
    description: "Creating impact through systems thinking and bold ideas across Africa.",
    type: 'website',
    url: 'https://madhaus.africa',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Madhaus Africa - Media Company & Social Innovation Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Madhaus Africa - Media Company & Social Innovation Lab",
    description: "Creating impact through systems thinking and bold ideas across Africa.",
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <PresentationContainer />;
}
