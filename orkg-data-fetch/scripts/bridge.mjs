import { loadGraph } from "../dist/index.js";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const cmp = process.argv[2];
const outDir = process.argv[3] || "out";
if (!cmp || !cmp.startsWith("http://orkg.org/orkg/resource/")) {
  console.error("Usage: node scripts/bridge.mjs http://orkg.org/orkg/resource/R123456 [outDir]");
  process.exit(1);
}

const graph = await loadGraph(cmp);

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "graph.json"),   JSON.stringify(graph, null, 2));
await writeFile(join(outDir, "nodes.json"),   JSON.stringify(graph.nodes, null, 2));
await writeFile(join(outDir, "edges.json"),   JSON.stringify(graph.edges, null, 2));
await writeFile(join(outDir, "circles.json"), JSON.stringify(graph.circles, null, 2));

console.log("Wrote:", join(outDir, "graph.json"));
