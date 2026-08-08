import { Transaction } from "@/types/finance";

export interface TransactionDiff {
  newOnes: Transaction[]; // id chưa có trong app
  identical: Transaction[]; // id trùng, nội dung giống hệt
  conflicting: Transaction[]; // id trùng, nội dung khác
}

function isSameTransaction(a: Transaction, b: Transaction): boolean {
  return (
    a.name === b.name &&
    a.amount === b.amount &&
    a.type === b.type &&
    a.source === b.source &&
    a.categoryId === b.categoryId &&
    (a.customCategoryName ?? "") === (b.customCategoryName ?? "") &&
    a.date === b.date
  );
}

export function diffTransactions(
  existing: Transaction[],
  incoming: Transaction[],
): TransactionDiff {
  const existingMap = new Map(existing.map((t) => [t.id, t]));
  const diff: TransactionDiff = { newOnes: [], identical: [], conflicting: [] };

  for (const t of incoming) {
    const match = existingMap.get(t.id);
    if (!match) diff.newOnes.push(t);
    else if (isSameTransaction(match, t)) diff.identical.push(t);
    else diff.conflicting.push(t);
  }

  return diff;
}
