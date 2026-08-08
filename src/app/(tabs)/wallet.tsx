import { TransactionRow } from "@/components/TransactionRow";
import { formatVND } from "@/constants/format";
import { computeBalance, useFinanceStore } from "@/store/useFinanceStore";
import { MoneySource } from "@/types/finance";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WALLETS: {
  value: MoneySource;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: "cash", label: "Tiền mặt", icon: "cash-outline" },
  { value: "bank", label: "Ngân hàng", icon: "business-outline" },
];

export default function WalletScreen() {
  const isDark = useColorScheme() === "dark";
  const transactions = useFinanceStore((s) => s.transactions);
  const removeTransaction = useFinanceStore((s) => s.removeTransaction);
  const [source, setSource] = useState<MoneySource>("cash");

  const balance = useMemo(
    () => computeBalance(transactions, source),
    [transactions, source],
  );
  const list = useMemo(
    () => transactions.filter((t) => t.source === source),
    [transactions, source],
  );

  return (
    <SafeAreaView
      className="flex-1 bg-cream dark:bg-cream-dark"
      edges={["top"]}
    >
      <View className="px-5 pt-2">
        <Text className="font-display text-[18px] text-text-primary dark:text-text-primary-dark">
          Ví
        </Text>
      </View>

      <View className="mx-5 mt-4 flex-row gap-2.5">
        {WALLETS.map((w) => {
          const active = w.value === source;
          return (
            <Pressable
              key={w.value}
              onPress={() => setSource(w.value)}
              className={`flex-1 rounded-2xl border px-4 py-3.5 ${
                active
                  ? "border-transparent bg-ink"
                  : "border-black/10 bg-card dark:border-white/10 dark:bg-card-dark"
              }`}
            >
              <Ionicons
                name={w.icon}
                size={18}
                color={active ? "#fff" : isDark ? "#B4B2A9" : "#888780"}
              />
              <Text
                className={`mt-2 font-body text-[12px] ${
                  active
                    ? "text-[#D8D6EE]"
                    : "text-text-secondary dark:text-text-secondary-dark"
                }`}
              >
                {w.label}
              </Text>
              <Text
                className={`mt-0.5 font-display text-[16px] ${active ? "text-white" : "text-text-primary dark:text-text-primary-dark"}`}
              >
                {formatVND(
                  active ? balance : computeBalance(transactions, w.value),
                )}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text className="mx-5 mb-2 mt-6 font-body-medium text-[14px] text-text-primary dark:text-text-primary-dark">
        Giao dịch — {WALLETS.find((w) => w.value === source)?.label}
      </Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 pb-28 gap-1.5"
        renderItem={({ item }) => (
          <TransactionRow
            transaction={item}
            onDelete={() => removeTransaction(item.id)}
          />
        )}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
              Chưa có giao dịch nào ở ví này.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
