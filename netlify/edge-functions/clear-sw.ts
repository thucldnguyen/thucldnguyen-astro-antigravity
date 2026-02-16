// TEMPORARY edge function to kill old Gatsby service worker.
// Remove after 2026-04-01 once all returning visitors have been cleaned.
//
// How it works:
// 1. If the visitor has no "sw-cleaned" cookie, add Clear-Site-Data header
//    to nuke all service workers, caches, and storage.
// 2. Set a "sw-cleaned" cookie so this only happens once per browser.
// 3. Subsequent visits skip the header entirely (no performance impact).
export default async function handler(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const url = new URL(request.url);
  const isLocal =
    url.hostname === "localhost" || url.hostname === "127.0.0.1";

  // Bots never have service workers — let them through immediately
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const isBot = /googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp|facebookexternalhit|twitterbot|linkedinbot|oai-searchbot|gptbot|claudebot|perplexitybot|applebot|amazonbot|bytespider/i.test(ua);

  // CRITICAL FIX: Disable server-side clearing to prevent infinite reload loops.
  // The 'Clear-Site-Data: "storage"' header was wiping the 'sw-cleaned' cookie,
  // causing the browser to reload -> request again -> get header again -> loop.
  // We now rely entirely on the client-side script in BaseHead.astro to clean up.
  if (true || cookie.includes("sw-cleaned-v2=1") || isLocal || isBot) {
    return;
  }

  let response: Response;
  try {
    // In production, continue to origin and decorate the response once.
    response = await fetch(request);
  } catch (error) {
    // Fail open in dev/sandbox environments where edge fetch can fail.
    console.warn("[clear-sw] pass-through due to fetch error:", error);
    return;
  }
  const newResponse = new Response(response.body, response);

  /*
  // DANGEROUS: Enabling this causes infinite loops because 'storage' clears cookies too!
  // Nuke old service workers and caches
  newResponse.headers.set("Clear-Site-Data", '"cache", "storage", "executionContexts"');

  // Set cookie so we only do this once (expires in 1 year)
  newResponse.headers.append(
    "Set-Cookie",
    "sw-cleaned-v2=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure"
  );
  */

  return newResponse;
}

export const config = {
  path: "/*",
};
