function getConfiguredApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";
  return configuredBaseUrl.replace(/\/+$/, "");
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const configuredBaseUrl = getConfiguredApiBaseUrl();

  if (!configuredBaseUrl) {
    return normalizedPath;
  }

  return `${configuredBaseUrl}${normalizedPath}`;
}

export async function requestApi<T>(path: string, init: RequestInit) {
  const response = await fetch(buildApiUrl(path), init);
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : typeof payload === "string" && payload
          ? payload
          : "Request failed.";

    throw new Error(message);
  }

  return payload as T;
}

