import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryPicker } from "../components/CategoryPicker";
import { CATEGORIES } from "../constants/categories";
import { useFinanceStore } from "../store/useFinanceStore";
import { MoneySource, TransactionType } from "../types/finance";

export default function AddTransactionScreen() {
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const isDark = useColorScheme() === "dark";

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("out");
  const [source, setSource] = useState<MoneySource>("cash");
  const [categoryId, setCategoryId] = useState(CATEGORIES[1].id); // default: Ăn uống
  const [customCategoryName, setCustomCategoryName] = useState("");

  const isOtherCategory = categoryId === "other"; // return true if the selected category is "other"
  const canSave =
    name.trim().length > 0 &&
    Number(amount) > 0 &&
    (!isOtherCategory || customCategoryName.trim().length > 0); // if the selected category is "other", the custom category name must not be empty

  function handleSave() {
    if (!canSave) return;
    addTransaction({
      name: name.trim(),
      amount: Number(amount),
      type,
      source,
      categoryId,
      customCategoryName: isOtherCategory
        ? customCategoryName.trim()
        : undefined,
    });
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-cream dark:bg-cream-dark">
      <View className="flex-row items-center justify-between px-5 pt-2">
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons
            name="close"
            size={24}
            color={isDark ? "#F1EFE8" : "#23214A"}
          />
        </Pressable>
        <Text className="font-display text-[16px] text-text-primary dark:text-text-primary-dark">
          Thêm giao dịch
        </Text>
        <View className="w-6" />
      </View>

      <View className="gap-5 px-5 pt-6">
        {/* Type toggle */}
        <View className="flex-row gap-2">
          {(["out", "in"] as TransactionType[]).map((t) => {
            const active = t === type;
            const label = t === "out" ? "Chi tiêu" : "Thu nhập";
            return (
              <Pressable
                key={t}
                onPress={() => setType(t)}
                className={`flex-1 items-center rounded-xl border py-3 ${
                  active
                    ? t === "out"
                      ? "border-transparent bg-[#F0997B]"
                      : "border-transparent bg-[#5DCAA5]"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                <Text
                  className={`font-body-medium text-[14px] ${
                    active
                      ? "text-[#4A1B0C]"
                      : "text-text-primary dark:text-text-primary-dark"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Name */}
        <View className="gap-1.5">
          <Text className="font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
            Tên giao dịch
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ví dụ: Cà phê Highlands"
            placeholderTextColor="#888780"
            className="rounded-xl border border-black/10 bg-card px-4 py-3 font-body text-[15px] text-text-primary dark:border-white/10 dark:bg-card-dark dark:text-text-primary-dark"
          />
        </View>

        {/* Amount */}
        <View className="gap-1.5">
          <Text className="font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
            Số tiền (đ)
          </Text>
          <TextInput
            value={amount}
            onChangeText={(v) => setAmount(v.replace(/[^0-9]/g, ""))}
            placeholder="0"
            keyboardType="number-pad"
            placeholderTextColor="#888780"
            className="rounded-xl border border-black/10 bg-card px-4 py-3 font-body text-[15px] text-text-primary dark:border-white/10 dark:bg-card-dark dark:text-text-primary-dark"
          />
        </View>

        {/* Source toggle */}
        <View className="gap-1.5">
          <Text className="font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
            Nguồn tiền
          </Text>
          <View className="flex-row gap-2">
            {(["cash", "bank"] as MoneySource[]).map((s) => {
              const active = s === source;
              return (
                <Pressable
                  key={s}
                  onPress={() => setSource(s)}
                  className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-xl border py-3 ${
                    active
                      ? "border-transparent bg-ink"
                      : "border-black/10 dark:border-white/10"
                  }`}
                >
                  <Ionicons
                    name={s === "cash" ? "cash-outline" : "business-outline"}
                    size={16}
                    color={active ? "#fff" : "#888780"}
                  />
                  <Text
                    className={`font-body-medium text-[14px] ${
                      active
                        ? "text-white"
                        : "text-text-primary dark:text-text-primary-dark"
                    }`}
                  >
                    {s === "cash" ? "Tiền mặt" : "Ngân hàng"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Category */}
        <View className="gap-1.5">
          <Text className="font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
            Danh mục
          </Text>
          <CategoryPicker value={categoryId} onChange={setCategoryId} />
        </View>

        {/* Custom name — only shown when "Khác" is selected */}
        {isOtherCategory && (
          <View className="gap-1.5">
            <Text className="font-body text-[13px] text-text-secondary dark:text-text-secondary-dark">
              Tên danh mục
            </Text>
            <TextInput
              value={customCategoryName}
              onChangeText={setCustomCategoryName}
              placeholder="Ví dụ: Học phí, Từ thiện..."
              placeholderTextColor="#888780"
              className="rounded-xl border border-black/10 bg-card px-4 py-3 font-body text-[15px] text-text-primary dark:border-white/10 dark:bg-card-dark dark:text-text-primary-dark"
            />
          </View>
        )}
      </View>

      <Pressable
        onPress={handleSave}
        disabled={!canSave}
        className={`mx-5 mt-8 items-center rounded-xl py-3.5 ${canSave ? "bg-gold" : "bg-black/10 dark:bg-white/10"}`}
      >
        <Text
          className={`font-body-medium text-[15px] ${canSave ? "text-gold-fg" : "text-text-secondary dark:text-text-secondary-dark"}`}
        >
          Lưu giao dịch
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
