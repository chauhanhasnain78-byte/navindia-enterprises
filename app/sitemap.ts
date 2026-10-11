import type { MetadataRoute } from "next";
import { companyConfig } from "@/config/company";
import { catalogProducts } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = companyConfig.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rfq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = companyConfig.categories.map(
    (category) => ({
      url: `${baseUrl}/products/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })
  );

  const productRoutes: MetadataRoute.Sitemap = catalogProducts.map(
    (product) => ({
      url: `${baseUrl}/products/${product.categorySlug}/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
