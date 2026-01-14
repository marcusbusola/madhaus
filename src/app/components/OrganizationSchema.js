export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Madhaus Africa",
    "url": "https://madhaus.africa",
    "logo": "https://madhaus.africa/MH.svg",
    "description": "Madhaus is a media company and social innovation lab creating impact through systems thinking and bold ideas across Africa.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "General Inquiries",
      "email": "hello@madhaus.africa"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c')
      }}
    />
  );
}
