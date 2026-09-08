import { MetadataRoute } from "next";
import guidesData from "@/data/guides.json";
import storiesData from "@/data/stories.json";

const SITE_URL = "https://dev-digestion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = guidesData.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const stories = storiesData.map((story) => ({
    url: `${SITE_URL}/stories/${story.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...guides,
    ...stories,
  ];
}
