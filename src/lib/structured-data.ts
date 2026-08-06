import { siteConfig } from "@/content/site";
import { publication } from "@/content/publication";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "AI Solution Architect & Generative AI Engineer",
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: [siteConfig.linkedin],
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-01-01",
    mainEntity: personJsonLd(),
  };
}

export function scholarlyArticleJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: publication.title,
    isPartOf: {
      "@type": "Periodical",
      name: publication.journal,
    },
    datePublished: publication.year,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    ...(publication.doi ? { sameAs: `https://doi.org/${publication.doi}` } : {}),
  };
}
