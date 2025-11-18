import assert from "node:assert/strict";
import { loadGraph } from "../dist/index.js";

const cmp = process.env.CMP || "http://orkg.org/orkg/resource/R1559162";
console.log("Fetching:", cmp);

const graph = await loadGraph(cmp);
assert.ok(graph.nodes.length >= 1, "expected ≥1 node");
console.log("OK — nodes:", graph.nodes.length, "edges:", graph.edges.length, "circles:", graph.circles.length);
