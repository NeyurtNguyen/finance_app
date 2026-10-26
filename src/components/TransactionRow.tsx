import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Text, View, useColorScheme } from "react-native";
import { getCategory } from "../constants/categories";
import { formatVND } from "../constants/format";
import { CATEGORY_COLORS } from "../constants/theme";
import { Transaction } from "../types/finance";
import { router } from "expo-router";

interface Props {
  transaction: Transaction;
  onDelete: () => void;
}

export function TransactionRow({ transaction, onDelete }: Props) {
  const isDark = useColorScheme() === "dark";
  const category = getCategory(transaction.categoryId);
  const colors = CATEGORY_COLORS[category.colorKey];
  const chipBg = isDark ? colors.bgDark : colors.bgLight;
  const chipFg = isDark ? colors.fgDark : colors.fgLight;
  const isIncome = transaction.type === "in";
  const categoryLabel = transaction.customCategoryName?.trim() || category.name;
  const secondaryColor = isDark ? "#B4B2A9" : "#888780";

  function handleDeletePress() {
    Alert.alert(
      "Xoá giao dịch?",
      `"${transaction.name}" sẽ bị xoá vĩnh viễn.`,
      [
        { text: "Huỷ", style: "cancel" },
        { text: "Xoá", style: "destructive", onPress: onDelete },
      ],
    );
  }

  return (
    <Pressable
      onPress={() => router.push(`/add-transaction?id=${transaction.id}`)}
      className="flex-row items-center gap-3 rounded-2xl border border-black/5 bg-card px-3 py-2.5 dark:border-white/5 dark:bg-card-dark"
    >
      <View style={{ backgroundColor: chipBg }} className="h-[38px] w-[38px] items-center justify-center rounded-full">
        <Ionicons name={category.icon} size={18} color={chipFg} />
      </View>

      <View className="flex-1">
        <Text className="font-body-medium text-[13px] text-text-primary dark:text-text-primary-dark">
          {transaction.name}
        </Text>
        <View className="mt-0.5 flex-row items-center gap-1">
          <Ionicons
            name={transaction.source === "cash" ? "cash-outline" : "business-outline"}
            size={11}
            color={secondaryColor}
          />
          <Text className="font-body text-[11px] text-text-secondary dark:text-text-secondary-dark">
            {categoryLabel}
          </Text>
        </View>
      </View>

      <Text
        className={`font-body-medium text-[13px] ${
          isIncome ? "text-income dark:text-income-dark" : "text-expense dark:text-expense-dark"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatVND(transaction.amount)}
      </Text>

      <Pressable
        onPress={handleDeletePress}
        hitSlop={8}
        className="ml-1 h-7 w-7 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
      >
        <Ionicons name="trash-outline" size={16} color={secondaryColor} />
      </Pressable>
    </Pressable>
  );
}
