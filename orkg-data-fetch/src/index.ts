import { DEFAULT_ENDPOINT, q3Cells, qDiseaseClasses } from "./queries.js";
import { sparqlGet } from "./client.js";
import { parseQ3ToTable } from "./parsers.js";
import type { TableData, GraphData } from "./types.js";
import { localName, toSlugId } from "./util.js";
import { buildSequelaGraph } from "./graph.js";
export { buildSequelaGraph } from "./graph.js";
export type * from "./types.js";

export async function loadTable(cmpIri: string, endpoint: string = DEFAULT_ENDPOINT): Promise<TableData> {
  const query = q3Cells(cmpIri, Date.now());
  const json = await sparqlGet(query, endpoint);
  return parseQ3ToTable(cmpIri, json);
}

export async function loadDiseaseClasses(endpoint: string = DEFAULT_ENDPOINT): Promise<Array<{id:string; label:string}>> {
  const query = qDiseaseClasses(Date.now());
  const json: any = await sparqlGet(query, endpoint);
  const out: Array<{id:string; label:string}> = [];
  for (const b of json?.results?.bindings ?? []) {
    const iri = b.inst?.value ?? "";
    const label = b.label?.value ?? localName(iri);
    if (!label) continue;
    out.push({ id: toSlugId(label), label });
  }
  const seen = new Set<string>();
  return out.filter(c => (seen.has(c.id) ? false : (seen.add(c.id), true)));
}

// High-level convenience: fetch table + circles and return GraphData
export async function loadGraph(cmpIri: string, endpoint: string = DEFAULT_ENDPOINT): Promise<GraphData> {
  const [table, circles] = await Promise.all([loadTable(cmpIri, endpoint), loadDiseaseClasses(endpoint)]);
  return buildSequelaGraph(table, circles);
}
