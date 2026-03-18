interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ query, onQueryChange, resultCount }: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder='Search items, heroes, or strategies &mdash; use "quotes" for exact match...'
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          autoFocus
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
      <div className="search-result-count">
        {resultCount} item{resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
