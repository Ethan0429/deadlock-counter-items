import { useMemo, useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { CounterItem, Category } from "../types";

const SEARCHABLE_KEYS: (keyof CounterItem)[] = [
  "name",
  "tags",
  "countered_heroes",
  "effect",
  "when_to_buy",
  "notes",
];

const fuseOptions: IFuseOptions<CounterItem> = {
  keys: [
    { name: "name", weight: 0.3 },
    { name: "tags", weight: 0.25 },
    { name: "countered_heroes", weight: 0.2 },
    { name: "effect", weight: 0.1 },
    { name: "when_to_buy", weight: 0.1 },
    { name: "notes", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  useExtendedSearch: false,
};

function parseExactQuote(q: string): string | null {
  const m = q.match(/^"(.+)"$/);
  return m ? m[1] : null;
}

function exactMatch(item: CounterItem, needle: string): boolean {
  for (const key of SEARCHABLE_KEYS) {
    const val = item[key];
    if (typeof val === "string") {
      if (val.toLowerCase().includes(needle)) return true;
    } else if (Array.isArray(val)) {
      if (val.some((v) => String(v).toLowerCase().includes(needle))) return true;
    }
  }
  return false;
}

export function useSearch(items: CounterItem[]) {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set()
  );

  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    let filtered: CounterItem[];

    if (!trimmed) {
      filtered = items;
    } else {
      const exact = parseExactQuote(trimmed);
      if (exact !== null) {
        const needle = exact.toLowerCase();
        filtered = items.filter((item) => exactMatch(item, needle));
      } else {
        filtered = fuse.search(trimmed).map((r) => r.item);
      }
    }

    if (activeCategories.size > 0) {
      filtered = filtered.filter((item) => activeCategories.has(item.category));
    }

    return filtered;
  }, [query, activeCategories, fuse, items]);

  const toggleCategory = (category: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return {
    query,
    setQuery,
    activeCategories,
    toggleCategory,
    results,
  };
}
