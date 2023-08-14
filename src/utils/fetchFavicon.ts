import isValidImage from "./isValidImage";

export default async function fetchFavicon(url: string) {
  const urlObj = new URL(url);
  const baseUrl = `${urlObj.protocol}//${urlObj.hostname}`;

  const faviconExtensions = ["ico", "png", "jpg", "jpeg", "svg", "gif", "bmp"];

  for (const ext of faviconExtensions) {
    const faviconUrl = `${baseUrl}/favicon.${ext}`;
    if (await isValidImage(faviconUrl)) {
      return faviconUrl;
    }
  }

  return require("@/assets/fallback.png");
}
