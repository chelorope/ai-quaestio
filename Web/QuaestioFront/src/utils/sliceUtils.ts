// Utility functions for Redux slices

import { DesignerEdge, DesignerNode } from "@/types/designer/DesignerTypes";
import { getOutgoers } from "@xyflow/react";

/**
 * Generate next sequential ID with given prefix based on existing items' IDs.
 * e.g., getNextId('Q', [{ id: 'Q0' }, { id: 'Q1' }]) -> 'Q2'
 */
export function getNextId(prefix: string, items: { id: string }[]): string {
  const lastId = items[items.length - 1]?.id || `${prefix}0`;
  const numericPart = Number(lastId.replace(prefix, ""));
  const nextNumeric = isNaN(numericPart) ? 1 : numericPart + 1;
  return `${prefix}${nextNumeric}`;
}

/**
 * Generic helper to update data property of a node in a list by ID.
 * Returns a new array with the matching node's data transformed by updateFn.
 */
export function updateNodeList<T extends { id: string; data: unknown }>(
  nodes: T[],
  id: string,
  updateFn: (data: T["data"]) => T["data"]
): T[] {
  return nodes.map((node) =>
    node.id === id ? { ...node, data: updateFn(node.data) } : node
  );
}

export function hasCycle(
  node: DesignerNode,
  sourceId: string,
  nodes: DesignerNode[],
  edges: DesignerEdge[],
  visited = new Set()
) {
  if (visited.has(node.id)) return false;

  visited.add(node.id);

  for (const outgoer of getOutgoers(node, nodes, edges)) {
    if (outgoer.id === sourceId) return true;
    if (hasCycle(outgoer, sourceId, nodes, edges, visited)) return true;
  }
}
