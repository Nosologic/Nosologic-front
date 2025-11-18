import type { Column, TableData, TableRow, CellValue, SparqlResult } from "./types.js";
import { localName, fnv1a32Hex } from "./util.js";

export function parseQ3ToTable(cmpIri: string, json: SparqlResult): TableData {
  const colsByIri = new Map<string, Column>();
  const rowByProp = new Map<string, TableRow>();

  const addColumn = (iri: string) => {
    if (colsByIri.has(iri)) return colsByIri.get(iri)!;
    const col: Column = {
      iri,
      id: fnv1a32Hex(iri),
      label: localName(iri)
    };
    colsByIri.set(iri, col);
    return col;
  };

  const getRow = (propIri: string, propLabel?: string) => {
    let row = rowByProp.get(propIri);
    if (!row) {
      row = { propertyIri: propIri, propertyLabel: propLabel || localName(propIri), cells: {} };
      rowByProp.set(propIri, row);
    } else if (propLabel && !row.propertyLabel) {
      row.propertyLabel = propLabel;
    }
    return row;
  };

  for (const b of json?.results?.bindings ?? []) {
    const colIri = b.col?.value;
    const propIri = b.prop?.value;
    if (!colIri || !propIri) continue;

    const col = addColumn(colIri);
    const row = getRow(propIri, b.propLabel?.value);

    const cellArr = row.cells[col.id] ?? (row.cells[col.id] = []);
    const val = b.val;
    if (!val) continue;
    let cv: CellValue | null = null;
    if (val.type === "uri") {
      const label = b.valLabel?.value || localName(val.value);
      cv = { label, iri: val.value };
    } else {
      const label = val.value;
      cv = { label, datatype: (val as any).datatype, lang: (val as any)['xml:lang'] };
    }
    const key = cv.label + "|" + (cv.iri ?? "");
    if (!cellArr.some(x => (x.label + "|" + (x.iri ?? "")) === key)) cellArr.push(cv);
  }

  const columns = [...colsByIri.values()];
  const rows = [...rowByProp.values()];

  columns.sort((a,b) => a.iri.localeCompare(b.iri));
  rows.sort((a,b) => a.propertyIri.localeCompare(b.propertyIri));

  return { comparisonId: cmpIri, columns, rows };
}
