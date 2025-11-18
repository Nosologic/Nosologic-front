import type { GraphData, TableData, Node, Edge, Circle } from "./types.js";
import { toSlugId, norm } from "./util.js";

const localName = (iri: string): string => {
  try {
    const u = new URL(iri);
    return u.pathname.split(/[\\/]/).filter(Boolean).pop() ?? iri;
  } catch {
    const m = iri.match(/[^#\\/]+$/);
    return m ? m[0] : iri;
  }
};

const byCol = (table: TableData, row?: TableData["rows"][number]) => {
  const m = new Map<string, string[]>();
  if (!row) return m;
  for (const col of table.columns) {
    const arr = (row.cells[col.id] ?? []).map(c => c.label).filter(Boolean);
    if (arr.length) m.set(col.id, arr);
  }
  return m;
};

function findRowDisease(table: TableData) {
  return table.rows.find(r =>
    norm(r.propertyLabel) === "disease" ||
    (norm(r.propertyLabel).includes("disease") && !norm(r.propertyLabel).includes("ancestral")) ||
    (localName(r.propertyIri).toLowerCase().includes("disease") && !localName(r.propertyIri).toLowerCase().includes("ancestral"))
  );
}
function findRowAncestralDisease(table: TableData) {
  return table.rows.find(r =>
    (norm(r.propertyLabel).includes("disease") && norm(r.propertyLabel).includes("ancestral")) ||
    (localName(r.propertyIri).toLowerCase().includes("disease") && localName(r.propertyIri).toLowerCase().includes("ancestral"))
  );
}
const CLASS_HINTS = ["class", "category", "type", "group"];
function findRowClass(table: TableData, wantAncestral: boolean) {
  return table.rows.find(r => {
    const lab = norm(r.propertyLabel ?? "");
    const iri = localName(r.propertyIri).toLowerCase();
    const isClass = CLASS_HINTS.some(k => lab.includes(k) || iri.includes(k));
    const hasAnc = lab.includes("ancestral") || iri.includes("ancestral");
    return isClass && (wantAncestral ? hasAnc : !hasAnc);
  });
}

/**
 * Build GraphData from a TableData and a provided list of circles (from C123035).
 * Circles are NOT derived from the table. Nodes get classIds only if their class labels
 * match a provided circle (by normalized label).
 */
export function buildSequelaGraph(
  table: TableData,
  circles: Array<{ id: string; label: string }> = []
): GraphData {
  const diseaseRow         = findRowDisease(table);
  const ancestralRow       = findRowAncestralDisease(table);
  const diseaseClassRow    = findRowClass(table, false);
  const ancestralClassRow  = findRowClass(table, true);

  const dByCol      = byCol(table, diseaseRow);
  const aByCol      = byCol(table, ancestralRow);
  const dClassByCol = byCol(table, diseaseClassRow);
  const aClassByCol = byCol(table, ancestralClassRow);

  const labelToCircleId = new Map<string, string>();
  for (const c of circles) labelToCircleId.set(norm(c.label), c.id);

  const nodesMap = new Map<string, Node>();
  const nodeClasses = new Map<string, Set<string>>();
  const addNode = (label: string) => {
    const id = toSlugId(label);
    if (!nodesMap.has(id)) nodesMap.set(id, { id, label, classIds: [] });
    if (!nodeClasses.has(id)) nodeClasses.set(id, new Set());
    return id;
  };
  const addClasses = (nid: string, classLabels: string[]) => {
    const set = nodeClasses.get(nid)!;
    for (const lab of classLabels) {
      const cid = labelToCircleId.get(norm(lab));
      if (cid) set.add(cid);
    }
  };

  for (const col of table.columns) {
    const ds  = dByCol.get(col.id) ?? [];
    const as  = aByCol.get(col.id) ?? [];
    const dcs = dClassByCol.get(col.id) ?? [];
    const acs = aClassByCol.get(col.id) ?? [];
    for (const d of ds) addClasses(addNode(d), dcs);
    for (const a of as) addClasses(addNode(a), acs);
  }
  for (const [nid, set] of nodeClasses) nodesMap.get(nid)!.classIds = [...set];

  const counts = new Map<string, number>();
  for (const col of table.columns) {
    const ds = dByCol.get(col.id) ?? [];
    const as = aByCol.get(col.id) ?? [];
    for (const a of as) for (const d of ds) {
      const sid = toSlugId(a);
      const tid = toSlugId(d);
      const key = `${sid}->${tid}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const edges: Edge[] = [];
  for (const [key, k] of counts) {
    const [sid, tid] = key.split("->");
    edges.push({ id: `${sid}__to__${tid}`, source: sid, target: tid, relation: `evolutionary sequela (n=${k})` });
  }

  const outCircles: Circle[] = circles.map(c => ({ id: c.id, label: c.label }));

  return { circles: outCircles, nodes: [...nodesMap.values()], edges };
}
