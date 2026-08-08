import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { formatVND } from "../constants/format";

interface Props {
  total: number;
  cash: number;
  bank: number;
}

export function BalanceCard({ total, cash, bank }: Props) {
  return (
    <View className="mx-5 mt-4 overflow-hidden rounded-[20px] bg-ink p-5">
      {/* decorative blob, matches the mockup */}
      <View className="absolute -right-8 -top-8 h-[100px] w-[100px] rounded-full bg-ink-soft" />

      <Text className="font-body text-[13px] text-text-secondary-dark">Tổng số dư</Text>
      <Text className="mb-4 mt-1 font-display text-[28px] text-white">{formatVND(total)}</Text>

      <View className="flex-row gap-2.5">
        <View className="flex-1 rounded-[14px] bg-ink-soft px-3 py-2.5">
          <View className="mb-1 flex-row items-center gap-1">
            <Ionicons name="cash-outline" size={13} color="#9FE1CB" />
            <Text className="font-body text-[11px] text-[#9FE1CB]">Tiền mặt</Text>
          </View>
          <Text className="font-body-medium text-[14px] text-white">{formatVND(cash)}</Text>
        </View>

        <View className="flex-1 rounded-[14px] bg-ink-soft px-3 py-2.5">
          <View className="mb-1 flex-row items-center gap-1">
            <Ionicons name="business-outline" size={13} color="#85B7EB" />
            <Text className="font-body text-[11px] text-[#85B7EB]">Ngân hàng</Text>
          </View>
          <Text className="font-body-medium text-[14px] text-white">{formatVND(bank)}</Text>
        </View>
      </View>
    </View>
  );
}
