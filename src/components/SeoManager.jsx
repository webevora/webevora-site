import { useEffect } from "react";

const DEFAULTS = {
  siteName: "Webevora",
  siteUrl: "https://www.webentra.com",
  title: "Webevora | Web Development, App Development, AI & SEO Services",
  description:
    "Webevora Digital Studio provides web development, app development, AI agent solutions, SEO services, and digital marketing to grow your business online.",
  image: "/logo.png",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  twitterCard: "summary_large_image",
  locale: "en_US",
};

function upsertMeta(selector, attrs) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(key, value);
    }
  });
}

function upsertLink(selector, attrs) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(key, value);
    }
  });
}

function upsertStructuredData(id, json) {
  if (!json) return;

  let script = document.getElementById(id);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(json);
}

function removeStructuredData(id) {
  const script = document.getElementById(id);
  if (script) script.remove();
}

function toAbsoluteUrl(url, baseUrl) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return `${baseUrl.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
}

function buildWebPageSchema({
  title,
  description,
  canonical,
  image,
  siteName,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    image,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: canonical?.split("/").slice(0, 3).join("/"),
    },
  };
}

export default function SeoManager({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  image,
  robots,
  noindex = false,
  ogType = "website",
  twitterCard,
  siteName,
  siteUrl,
  structuredData,
}) {
  useEffect(() => {
    const resolvedSiteName = siteName || DEFAULTS.siteName;
    const resolvedSiteUrl = (siteUrl || DEFAULTS.siteUrl).replace(/\/+$/, "");
    const resolvedTitle = title || DEFAULTS.title;
    const resolvedDescription = description || DEFAULTS.description;
    const resolvedImage = toAbsoluteUrl(
      image || DEFAULTS.image,
      resolvedSiteUrl,
    );

    const pathFromLocation = window.location.pathname + window.location.search;
    const resolvedPath = canonicalPath || pathFromLocation;
    const resolvedCanonical =
      canonicalUrl || toAbsoluteUrl(resolvedPath, resolvedSiteUrl);

    const robotsContent = noindex
      ? "noindex, nofollow"
      : robots || DEFAULTS.robots;

    document.title = resolvedTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: resolvedDescription,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robotsContent,
    });

    upsertMeta('meta[name="referrer"]', {
      name: "referrer",
      content: "strict-origin-when-cross-origin",
    });

    upsertMeta('meta[name="theme-color"]', {
      name: "theme-color",
      content: "#0e1b2f",
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: ogType,
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: resolvedSiteName,
    });

    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: DEFAULTS.locale,
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: resolvedTitle,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: resolvedDescription,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: resolvedCanonical,
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: resolvedImage,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: twitterCard || DEFAULTS.twitterCard,
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: resolvedTitle,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: resolvedDescription,
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: resolvedImage,
    });

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: resolvedCanonical,
    });

    const schemaPayload =
      structuredData ||
      buildWebPageSchema({
        title: resolvedTitle,
        description: resolvedDescription,
        canonical: resolvedCanonical,
        image: resolvedImage,
        siteName: resolvedSiteName,
      });

    upsertStructuredData("seo-structured-data", schemaPayload);

    return () => {
      // Keep latest SEO data for SPA navigation; cleanup only if intentionally unmounted
      // by non-routed flows.
      if (!window.location.pathname) {
        removeStructuredData("seo-structured-data");
      }
    };
  }, [
    title,
    description,
    canonicalPath,
    canonicalUrl,
    image,
    robots,
    noindex,
    ogType,
    twitterCard,
    siteName,
    siteUrl,
    structuredData,
  ]);

  return null;
}
