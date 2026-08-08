import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MoneySource, Transaction } from "../types/finance";

interface FinanceState {
  transactions: Transaction[];
  hasHydrated: boolean;
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  removeTransaction: (id: string) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      hasHydrated: false,
      addTransaction: (t) =>
        set((state) => ({
          transactions: [
            { ...t, id: Date.now().toString(), date: new Date().toISOString() },
            ...state.transactions,
          ],
        })),
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "finance-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Derived helpers — call these with the transactions array from the store
// so components only re-render when the relevant slice actually changes.
export function computeBalance(transactions: Transaction[], source?: MoneySource) {
  return transactions
    .filter((t) => !source || t.source === source)
    .reduce((sum, t) => sum + (t.type === "in" ? t.amount : -t.amount), 0);
}

export function computeTotals(transactions: Transaction[]) {
  const income = transactions.filter((t) => t.type === "in").reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0);
  return { income, expense };
}
