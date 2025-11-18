// SPARQL strings and defaults
export const DEFAULT_ENDPOINT = "https://orkg.org/triplestore" as const;

export const BASE_PARAMS = {
  "default-graph-uri": "http://orkg.org",
  "format": "application/sparql-results+json",
  "timeout": "0",
  "signal_void": "on"
} as const;

// Q3: single runtime query (table cells)
export function q3Cells(cmpIri: string, nonce: number = Date.now()): string {
  return [
    `# cache-bust=${nonce}`,
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    "SELECT ?col ?prop ?propLabel ?val ?valLabel WHERE {",
    `  <${cmpIri}> <http://orkg.org/orkg/predicate/compareContribution> ?col .`,
    "  ?col ?prop ?val .",
    "  OPTIONAL { ?prop rdfs:label ?propLabel }",
    "  OPTIONAL { ?val  rdfs:label ?valLabel }",
    "}",
  ].join("\n");
}

// All instances of class-of-disease C123035
export const DISEASE_CLASS_IRI = "http://orkg.org/orkg/class/C123035" as const;

export function qDiseaseClasses(nonce: number = Date.now()): string {
  return [
    `# cache-bust=${nonce}`,
    "PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    "SELECT ?inst ?label WHERE {",
    `  ?inst rdf:type <${DISEASE_CLASS_IRI}> .`,
    "  OPTIONAL { ?inst rdfs:label ?label }",
    "}"
  ].join("\n");
}
