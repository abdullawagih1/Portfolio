import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
