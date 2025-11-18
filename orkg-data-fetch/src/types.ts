export interface Column { id: string; iri: string; label: string }
export interface CellValue { label: string; iri?: string; datatype?: string; lang?: string }
export interface TableRow { propertyIri: string; propertyLabel: string; cells: Record<string, CellValue[]> }

export interface TableData {
  comparisonId: string;
  columns: Column[];
  rows: TableRow[];
}

export interface Circle { id: string; label: string }
export interface Node { id: string; label: string; classIds: string[] }
export interface Edge { id: string; source: string; target: string; relation: string }

export interface GraphData { circles: Circle[]; nodes: Node[]; edges: Edge[] }

// SPARQL JSON shape (minimal)
export interface SparqlBinding {
  type: 'uri' | 'literal' | string;
  value: string;
  'xml:lang'?: string;
  'datatype'?: string;
}
export interface SparqlResult {
  head: { vars: string[] };
  results: { bindings: Record<string, SparqlBinding>[] };
}
