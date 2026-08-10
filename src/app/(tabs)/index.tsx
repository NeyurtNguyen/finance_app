import { BalanceCard } from "@/components/BalanceCard";
import { FilterValue, SegmentedControl } from "@/components/SegmentedControl";
import { TransactionRow } from "@/components/TransactionRow";
import { computeBalance, useFinanceStore } from "@/store/useFinanceStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GroupModeToggle } from "@/components/GroupModeToggle";
import { formatVND } from "@/constants/format";
import { groupTransactions, GroupMode } from "@/utils/groupTransactions";

export default function HomeScreen() {
  const transactions = useFinanceStore((s) => s.transactions);
  const removeTransaction = useFinanceStore((s) => s.removeTransaction);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [groupMode, setGroupMode] = useState<GroupMode>("day");

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

  const sections = useMemo(
    () =>
      groupTransactions(filtered, groupMode).map((g) => ({
        title: g.label,
        total: g.total,
        data: g.data,
      })),
    [filtered, groupMode],
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
        <GroupModeToggle value={groupMode} onChange={setGroupMode} />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 pb-28"
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View className="mb-1.5 mt-3 flex-row items-center justify-between bg-cream py-1 dark:bg-cream-dark">
            <Text className="font-body-medium text-[12px] text-text-secondary dark:text-text-secondary-dark">
              {section.title}
            </Text>
            <Text
              className={`font-body-medium text-[12px] ${
                section.total >= 0
                  ? "text-income dark:text-income-dark"
                  : "text-expense dark:text-expense-dark"
              }`}
            >
              {section.total >= 0 ? "+" : ""}
              {formatVND(section.total)}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="mb-1.5">
            <TransactionRow
              transaction={item}
              onDelete={() => removeTransaction(item.id)}
            />
          </View>
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
        className="absolute bottom-6 left-1/2 -ml-7 h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg"
      >
        <Ionicons name="add" size={26} color="#412402" />
      </Pressable>
    </SafeAreaView>
  );
}
