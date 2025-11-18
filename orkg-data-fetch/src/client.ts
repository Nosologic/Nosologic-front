import { BASE_PARAMS } from "./queries.js";
import type { SparqlResult } from "./types.js";

export async function sparqlGet(query: string, endpoint: string): Promise<SparqlResult> {
  const url = new URL(endpoint);
  const params = new URLSearchParams();
  Object.entries(BASE_PARAMS).forEach(([k, v]) => params.set(k, String(v)));
  params.set("query", query);
  params.set("_", String(Date.now())); // defeat caches
  url.search = params.toString();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "accept": "application/sparql-results+json",
      "cache-control": "no-cache",
      "pragma": "no-cache"
    }
  });

  const body = await res.text();
  if (!res.ok) {
    const preview = body.slice(0, 400);
    throw new Error(`SPARQL GET failed (${res.status} ${res.statusText}). Body: ${preview}`);
  }
  try {
    return JSON.parse(body) as SparqlResult;
  } catch {
    const preview = body.slice(0, 400);
    throw new Error(`SPARQL response was not JSON. Body starts: ${preview}`);
  }
}
