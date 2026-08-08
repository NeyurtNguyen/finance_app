import { useFinanceStore } from "@/store/useFinanceStore";
import {
  exportTransactionsToFile,
  pickAndParseImportFile,
} from "@/utils/dataTransfer";
import { diffTransactions } from "@/utils/transactionDiff";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingsRow({
  icon,
  label,
  destructive,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  destructive?: boolean;
  onPress?: () => void;
}) {
  const isDark = useColorScheme() === "dark";
  const color = destructive
    ? isDark
      ? "#F0997B"
      : "#993C1D"
    : isDark
      ? "#F1EFE8"
      : "#23214A";

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-2xl border border-black/5 bg-card px-4 py-3.5 dark:border-white/5 dark:bg-card-dark"
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ color }} className="flex-1 font-body-medium text-[14px]">
        {label}
      </Text>
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={isDark ? "#6B6A63" : "#B8B6AC"}
        />
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const resetAll = useFinanceStore((s) => s.resetAll);
  const transactionCount = useFinanceStore((s) => s.transactions.length);
  const transactions = useFinanceStore((s) => s.transactions);
  const importTransactions = useFinanceStore((s) => s.importTransactions);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  async function handleExport() {
    if (transactions.length === 0) {
      Alert.alert("Chưa có dữ liệu", "Không có giao dịch nào để xuất.");
      return;
    }
    setIsExporting(true);
    try {
      await exportTransactionsToFile(transactions);
    } catch (err) {
      Alert.alert(
        "Xuất dữ liệu thất bại",
        err instanceof Error ? err.message : "Đã có lỗi xảy ra.",
      );
    } finally {
      setIsExporting(false);
    }
  }

  async function handleImport() {
    setIsImporting(true);
    try {
      const imported = await pickAndParseImportFile();
      if (!imported) return; // người dùng huỷ chọn file

      const { newOnes, identical, conflicting } = diffTransactions(
        transactions,
        imported,
      );

      // Trường hợp toàn bộ file giống hệt app hiện tại — không có gì để làm
      if (newOnes.length === 0 && conflicting.length === 0) {
        Alert.alert(
          "Không có gì thay đổi",
          `Cả ${identical.length} giao dịch trong file đều đã có sẵn và giống hệt dữ liệu hiện tại.`,
        );
        return;
      }

      const summary = [
        newOnes.length > 0 && `• ${newOnes.length} giao dịch mới`,
        identical.length > 0 &&
          `• ${identical.length} giao dịch trùng khớp hoàn toàn (sẽ bỏ qua)`,
        conflicting.length > 0 &&
          `• ${conflicting.length} giao dịch trùng ID nhưng nội dung khác`,
      ]
        .filter(Boolean)
        .join("\n");

      Alert.alert("Nhập dữ liệu", summary, [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Chỉ thêm mới",
          onPress: () => importTransactions(newOnes, "merge"),
        },
        {
          text: "Thay thế hết",
          style: "destructive",
          onPress: () => importTransactions(imported, "replace"),
        },
      ]);
    } catch (err) {
      Alert.alert(
        "Nhập dữ liệu thất bại",
        err instanceof Error ? err.message : "Đã có lỗi xảy ra.",
      );
    } finally {
      setIsImporting(false);
    }
  }

  function handleResetPress() {
    Alert.alert(
      "Xoá toàn bộ dữ liệu?",
      `${transactionCount} giao dịch sẽ bị xoá vĩnh viễn khỏi máy. Không thể hoàn tác.`,
      [
        { text: "Huỷ", style: "cancel" },
        { text: "Xoá hết", style: "destructive", onPress: resetAll },
      ],
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-cream dark:bg-cream-dark"
      edges={["top"]}
    >
      <View className="px-5 pt-2">
        <Text className="font-display text-[18px] text-text-primary dark:text-text-primary-dark">
          Cài đặt
        </Text>
      </View>

      <View className="gap-2.5 px-5 pt-6">
        <Text className="mb-1 font-body text-[12px] uppercase text-text-secondary dark:text-text-secondary-dark">
          Dữ liệu
        </Text>

        <SettingsRow
          icon="share-outline"
          label={isExporting ? "Đang xuất..." : "Xuất dữ liệu"}
          onPress={isExporting ? undefined : handleExport}
        />
        <SettingsRow
          icon="download-outline"
          label={isImporting ? "Đang nhập..." : "Nhập dữ liệu"}
          onPress={isImporting ? undefined : handleImport}
        />

        <SettingsRow
          icon="trash-outline"
          label="Xoá toàn bộ dữ liệu"
          destructive
          onPress={handleResetPress}
        />

        <Text className="mb-1 mt-5 font-body text-[12px] uppercase text-text-secondary dark:text-text-secondary-dark">
          Ứng dụng
        </Text>
        <SettingsRow
          icon="moon-outline"
          label="Giao diện: tự động theo hệ thống"
        />
        <SettingsRow
          icon="information-circle-outline"
          label="Phiên bản 1.0.0"
        />
      </View>
    </SafeAreaView>
  );
}
