import { Category } from "../types/finance";

export const CATEGORIES: Category[] = [
  { id: "salary", name: "Lương", icon: "briefcase-outline", colorKey: "teal" },
  { id: "food", name: "Ăn uống", icon: "cafe-outline", colorKey: "coral" },
  { id: "transport", name: "Di chuyển", icon: "car-outline", colorKey: "purple" },
  { id: "entertainment", name: "Giải trí", icon: "book-outline", colorKey: "pink" },
  { id: "bill", name: "Hóa đơn", icon: "bulb-outline", colorKey: "amber" },
  { id: "shopping", name: "Mua sắm", icon: "bag-handle-outline", colorKey: "coral" },
  { id: "health", name: "Sức khỏe", icon: "heart-outline", colorKey: "pink" },
  { id: "other", name: "Khác", icon: "ellipsis-horizontal-outline", colorKey: "gray" },
];

export function getCategory(id: string): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}
