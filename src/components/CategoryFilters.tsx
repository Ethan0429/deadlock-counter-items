import type { Category } from "../types";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "passive", label: "Passive" },
  { key: "active", label: "Active" },
  { key: "anti-heal", label: "Anti-Heal" },
  { key: "bonus", label: "Bonus" },
];

interface CategoryFiltersProps {
  activeCategories: Set<Category>;
  onToggle: (category: Category) => void;
}

export function CategoryFilters({
  activeCategories,
  onToggle,
}: CategoryFiltersProps) {
  return (
    <div className="category-filters">
      {CATEGORIES.map(({ key, label }) => (
        <button
          key={key}
          className={`category-pill ${activeCategories.has(key) ? "active" : ""}`}
          onClick={() => onToggle(key)}
          data-category={key}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
