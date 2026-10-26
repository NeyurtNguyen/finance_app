import { Transaction } from "@/types/finance";

export type GroupMode = "day" | "month";

export interface TransactionGroup {
  key: string;
  label: string;
  data: Transaction[];
  total: number; // thu - chi trong nhóm này
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function formatDayLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Hôm nay";
  if (isSameDay(date, yesterday)) return "Hôm qua";
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatMonthLabel(date: Date): string {
  return `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
}

export function groupTransactions(
  transactions: Transaction[],
  mode: GroupMode,
): TransactionGroup[] {
  const groups = new Map<string, Transaction[]>();

  for (const t of transactions) {
    const date = new Date(t.date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const key = mode === "day" ? `${year}-${month}-${day}` : `${year}-${month}`;

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(t);
  }

  return Array.from(groups.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, data]) => {
      const sampleDate = new Date(data[0].date);
      const label =
        mode === "day"
          ? formatDayLabel(sampleDate)
          : formatMonthLabel(sampleDate);
      const total = data.reduce(
        (sum, t) => sum + (t.type === "in" ? t.amount : -t.amount),
        0,
      );
      return { key, label, data, total };
    });
}
