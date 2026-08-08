export type TransactionType = "in" | "out";
export type MoneySource = "cash" | "bank";

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof import("@expo/vector-icons/Ionicons").default.glyphMap;
  colorKey: "teal" | "coral" | "purple" | "pink" | "amber" | "gray";
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  source: MoneySource;
  categoryId: string;
  /** Only used when categoryId === "other" — the user's own label, shown instead of "Khác". */
  customCategoryName?: string;
  date: string; // ISO string
}
