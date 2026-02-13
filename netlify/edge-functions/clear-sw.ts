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

  // Already cleaned — pass through without modification
  if (cookie.includes("sw-cleaned=1")) {
    return;
  }

  // Get the original response
  const response = await fetch(request);
  const newResponse = new Response(response.body, response);

  // Nuke old service workers and caches
  newResponse.headers.set("Clear-Site-Data", '"cache", "storage"');

  // Set cookie so we only do this once (expires in 1 year)
  newResponse.headers.append(
    "Set-Cookie",
    "sw-cleaned=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure"
  );

  return newResponse;
}

export const config = {
  path: "/*",
};
