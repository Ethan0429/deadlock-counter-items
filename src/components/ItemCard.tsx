import type { CounterItem } from "../types";

const SLOT_COLORS: Record<string, string> = {
  weapon: "#cc8932",
  spirit: "#b473cf",
  vitality: "#6aad52",
};

function formatCost(cost: number | null): string {
  if (cost === null) return "???";
  if (cost >= 1000) {
    const k = cost / 1000;
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
  }
  return String(cost);
}

function heroDisplayName(name: string): string {
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface ItemCardProps {
  item: CounterItem;
  onSearchTag?: (tag: string) => void;
}

export function ItemCard({ item, onSearchTag }: ItemCardProps) {
  const slotColor = item.item_slot_type
    ? SLOT_COLORS[item.item_slot_type]
    : "#888";

  return (
    <div className="item-card" data-category={item.category}>
      <div className="item-card-header">
        {item.shop_image_webp ? (
          <img
            src={item.shop_image_webp}
            alt={item.name}
            className="item-image"
            loading="lazy"
          />
        ) : (
          <div className="item-image-placeholder" />
        )}
        <div className="item-title-block">
          <h3 className="item-name">{item.name}</h3>
          <div className="item-meta">
            {item.cost !== null && (
              <span className="item-cost">
                <svg viewBox="0 0 16 16" className="soul-icon" fill="currentColor">
                  <circle cx="8" cy="8" r="6" opacity="0.3" />
                  <circle cx="8" cy="8" r="3" />
                </svg>
                {formatCost(item.cost)}
              </span>
            )}
            {item.item_slot_type && (
              <span
                className="item-slot-badge"
                style={{ borderColor: slotColor, color: slotColor }}
              >
                {item.item_slot_type}
              </span>
            )}
            {item.item_tier && (
              <span className="item-tier">T{item.item_tier}</span>
            )}
          </div>
        </div>
      </div>

      <p className="item-effect">{item.effect}</p>

      {item.when_to_buy && (
        <p className="item-when">
          <strong>When to buy:</strong> {item.when_to_buy}
        </p>
      )}

      {item.countered_heroes.length > 0 && (
        <div className="item-counters">
          <span className="counters-label">Counters:</span>
          {item.countered_heroes.map((hero) => (
            <button
              key={hero}
              className="hero-chip"
              onClick={() => onSearchTag?.(hero)}
            >
              {heroDisplayName(hero)}
            </button>
          ))}
        </div>
      )}

      <div className="item-tags">
        {item.tags.map((tag) => (
          <button
            key={tag}
            className="tag-chip"
            onClick={() => onSearchTag?.(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {item.notes && (
        <p className="item-notes">{item.notes}</p>
      )}
    </div>
  );
}
