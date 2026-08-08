import { CATEGORIES } from "@/constants/categories";
import { formatVND } from "@/constants/format";
import { CATEGORY_COLORS } from "@/constants/theme";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { ScrollView, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function isThisMonth(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  );
}

export default function StatsScreen() {
  const isDark = useColorScheme() === "dark";
  const transactions = useFinanceStore((s) => s.transactions);

  const monthly = useMemo(
    () => transactions.filter((t) => isThisMonth(t.date)),
    [transactions],
  );
  const expenseTotal = useMemo(
    () =>
      monthly.filter((t) => t.type === "out").reduce((s, t) => s + t.amount, 0),
    [monthly],
  );

  const byCategory = useMemo(() => {
    const totals = new Map<string, number>();
    monthly
      .filter((t) => t.type === "out")
      .forEach((t) =>
        totals.set(t.categoryId, (totals.get(t.categoryId) ?? 0) + t.amount),
      );
    return CATEGORIES.map((c) => ({
      category: c,
      amount: totals.get(c.id) ?? 0,
    }))
      .filter((row) => row.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [monthly]);

  const maxAmount = byCategory[0]?.amount ?? 1;

  return (
    <SafeAreaView
      className="flex-1 bg-cream dark:bg-cream-dark"
      edges={["top"]}
    >
      <View className="px-5 pt-2">
        <Text className="font-display text-[18px] text-text-primary dark:text-text-primary-dark">
          Thống kê
        </Text>
        <Text className="mt-1 font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
          Chi tiêu tháng này · {formatVND(expenseTotal)}
        </Text>
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-28 pt-5 gap-3"
        showsVerticalScrollIndicator={false}
      >
        {byCategory.length === 0 ? (
          <View className="items-center py-16">
            <Ionicons
              name="stats-chart-outline"
              size={28}
              color={isDark ? "#B4B2A9" : "#888780"}
            />
            <Text className="mt-3 text-center font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
              Chưa có khoản chi nào trong tháng này.
            </Text>
          </View>
        ) : (
          byCategory.map(({ category, amount }) => {
            const colors = CATEGORY_COLORS[category.colorKey];
            const barColor = isDark ? colors.fgDark : colors.fgLight;
            const chipBg = isDark ? colors.bgDark : colors.bgLight;
            const percent = Math.round((amount / expenseTotal) * 100);
            const barWidth = Math.max(
              6,
              Math.round((amount / maxAmount) * 100),
            );

            return (
              <View
                key={category.id}
                className="rounded-2xl border border-black/5 bg-card px-4 py-3 dark:border-white/5 dark:bg-card-dark"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2.5">
                    <View
                      style={{ backgroundColor: chipBg }}
                      className="h-8 w-8 items-center justify-center rounded-full"
                    >
                      <Ionicons
                        name={category.icon}
                        size={16}
                        color={barColor}
                      />
                    </View>
                    <Text className="font-body-medium text-[14px] text-text-primary dark:text-text-primary-dark">
                      {category.name}
                    </Text>
                  </View>
                  <Text className="font-body-medium text-[13px] text-text-primary dark:text-text-primary-dark">
                    {formatVND(amount)}
                  </Text>
                </View>

                <View className="mt-2.5 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <View
                    style={{ width: `${barWidth}%`, backgroundColor: barColor }}
                    className="h-full rounded-full"
                  />
                </View>
                <Text className="mt-1 font-body text-[11px] text-text-secondary dark:text-text-secondary-dark">
                  {percent}% tổng chi tiêu
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
