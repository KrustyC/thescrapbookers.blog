import type { ImageLoaderProps } from "next/image";

/**
 * Custom image loader for Contentful images.
 * Uses Contentful's Image API instead of Vercel's image optimization,
 * avoiding edge requests while still getting optimized images.
 *
 * Contentful Image API docs: https://www.contentful.com/developers/docs/references/images-api/
 */
export default function contentfulImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Only transform Contentful URLs
  if (!src.includes("images.ctfassets.net")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}`;
  }

  const url = new URL(src.startsWith("//") ? `https:${src}` : src);

  // Set width
  url.searchParams.set("w", width.toString());

  // Set quality (default 75 matches Next.js default)
  url.searchParams.set("q", (quality || 75).toString());

  // Request WebP format for better compression
  url.searchParams.set("fm", "webp");

  return url.toString();
}
