function delay(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function withCacheBuster(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}preview=${Date.now()}`;
}

function preloadImage(url: string) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    const previewUrl = withCacheBuster(url);

    image.onload = () => resolve(previewUrl);
    image.onerror = reject;
    image.src = previewUrl;
  });
}

export async function waitForImage(url: string, attempts = 15) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await preloadImage(url);
    } catch {
      if (attempt === attempts - 1) throw new Error("Image is not ready yet");
      await delay(1000);
    }
  }

  throw new Error("Image is not ready yet");
}
