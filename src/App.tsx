import { SearchBar } from "./components/SearchBar";
import { CategoryFilters } from "./components/CategoryFilters";
import { ItemCard } from "./components/ItemCard";
import { useSearch } from "./hooks/useSearch";
import counterItems from "./data/counter_items.json";
import type { CounterItem } from "./types";

const items = counterItems as CounterItem[];

export default function App() {
  const { query, setQuery, activeCategories, toggleCategory, results } =
    useSearch(items);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          Deadlock <span className="accent">Counter Items</span>
        </h1>
        <p className="app-subtitle">
          Search items by name, hero, or strategy to find what counters what
        </p>
      </header>

      <main className="app-main">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          resultCount={results.length}
        />
        <CategoryFilters
          activeCategories={activeCategories}
          onToggle={toggleCategory}
        />

        {results.length > 0 ? (
          <div className="item-grid">
            {results.map((item) => (
              <ItemCard key={item.data_name} item={item} onSearchTag={setQuery} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No items match your search.</p>
            <p className="no-results-hint">
              Try searching for a hero name, tag like "anti-heal", or an item
              name.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
