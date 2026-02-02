/**
 * Rehype plugin: add loading="lazy" and decoding="async" to all img in content.
 * Prose images are below the fold, so lazy loading improves LCP on 3G / low-end.
 */
import { visit } from "unist-util-visit";

export function rehypeLazyImg() {
	return (tree: import("unist").Node) => {
		visit(tree, "element", (node: import("hast").Element) => {
			if (node.tagName !== "img") return;
			node.properties = node.properties || {};
			node.properties.loading = "lazy";
			node.properties.decoding = "async";
		});
	};
}
