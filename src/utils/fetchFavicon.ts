import isValidImage from "./isValidImage";

export default async function fetchFavicon(url: string) {
  // trim to base url
  const urlObj = new URL(url);
  const baseUrl = `${urlObj.protocol}//${urlObj.hostname}`;

  // try to find favicon.ico, favicon.png, favicon.jpg, favicon.jpeg, favicon.svg, favicon.gif, favicon.bmp
  const faviconUrls = [
    `${baseUrl}/favicon.ico`,
    `${baseUrl}/favicon.png`,
    `${baseUrl}/favicon.jpg`,
    `${baseUrl}/favicon.jpeg`,
    `${baseUrl}/favicon.svg`,
    `${baseUrl}/favicon.gif`,
    `${baseUrl}/favicon.bmp`,
  ];

  for (const faviconUrl of faviconUrls) {
    if (await isValidImage(faviconUrl)) {
      return faviconUrl;
    }
    break;
  }

  // if all fail, assign default favicon as base64
  return require("@/assets/fallback.png");
}
