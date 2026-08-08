import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BalanceCard } from "../components/BalanceCard";
import { FilterValue, SegmentedControl } from "../components/SegmentedControl";
import { TransactionRow } from "../components/TransactionRow";
import { computeBalance, useFinanceStore } from "../store/useFinanceStore";

export default function HomeScreen() {
  const transactions = useFinanceStore((s) => s.transactions);
  const removeTransaction = useFinanceStore((s) => s.removeTransaction);
  const [filter, setFilter] = useState<FilterValue>("all");

  const total = useMemo(() => computeBalance(transactions), [transactions]);
  const cash = useMemo(
    () => computeBalance(transactions, "cash"),
    [transactions],
  );
  const bank = useMemo(
    () => computeBalance(transactions, "bank"),
    [transactions],
  );

  const filtered = useMemo(
    () =>
      filter === "all"
        ? transactions
        : transactions.filter((t) => t.type === filter),
    [transactions, filter],
  );

  return (
    <SafeAreaView
      className="flex-1 bg-cream dark:bg-cream-dark"
      edges={["top"]}
    >
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Text className="font-display text-[18px] text-text-primary dark:text-text-primary-dark">
          Ví của tôi
        </Text>
        <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-gold">
          <Ionicons name="person-outline" size={18} color="#412402" />
        </View>
      </View>

      <BalanceCard total={total} cash={cash} bank={bank} />
      <SegmentedControl value={filter} onChange={setFilter} />

      <View className="mb-2 mt-4 flex-row items-center justify-between px-5">
        <Text className="font-body-medium text-[14px] text-text-primary dark:text-text-primary-dark">
          Giao dịch gần đây
        </Text>
      </View>

      <FlatList
        data={filtered}
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
              Chưa có giao dịch nào. Nhấn nút + để thêm.
            </Text>
          </View>
        }
      />

      <Pressable
        onPress={() => router.push("/add-transaction")}
        className="absolute bottom-8 right-5 h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg"
      >
        <Ionicons name="add" size={26} color="#412402" />
      </Pressable>
    </SafeAreaView>
  );
}
