const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "GET") {
      return json({ error: "Method not allowed." }, { status: 405 });
    }

    if (!env.VIEW_COUNTER) {
      return json({ error: "VIEW_COUNTER binding is missing." }, { status: 500 });
    }

    const url = new URL(request.url);
    const path = normalizePath(url.searchParams.get("path"));
    const key = `views:${path}`;
    const stored = await env.VIEW_COUNTER.get(key);
    const current = Number.parseInt(stored || "0", 10);
    const views = (Number.isFinite(current) ? current : 0) + 1;

    await env.VIEW_COUNTER.put(key, String(views));

    return json({ path, views });
  },
};

function normalizePath(path) {
  if (!path || !path.startsWith("/") || path.length > 200) {
    return "/";
  }

  return path;
}

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders,
      ...init.headers,
    },
  });
}
