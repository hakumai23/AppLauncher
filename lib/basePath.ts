const normalizeBasePath = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, "");
};

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");

export const withBasePath = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return normalizedPath;
  if (normalizedPath === "/") return `${basePath}/`;
  return `${basePath}${normalizedPath}`;
};

export const withBasePathIfLocal = (url: string) => {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("blob:")) return url;
  if (!url.startsWith("/")) return url;
  if (basePath && url.startsWith(`${basePath}/`)) return url;
  return withBasePath(url);
};
