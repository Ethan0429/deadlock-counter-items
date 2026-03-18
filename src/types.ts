export interface CounterItem {
  name: string;
  data_name: string;
  category: Category;
  effect: string;
  when_to_buy: string;
  countered_heroes: string[];
  notes: string;
  cost: number | null;
  item_slot_type: SlotType | null;
  item_tier: number | null;
  shop_image_webp: string;
  tags: string[];
}

export type Category = "passive" | "active" | "anti-heal" | "bonus";

export type SlotType = "weapon" | "spirit" | "vitality";
