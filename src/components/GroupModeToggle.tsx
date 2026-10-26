import { Pressable, Text, View } from "react-native";
import { GroupMode } from "@/utils/groupTransactions";

interface Props {
  value: GroupMode;
  onChange: (mode: GroupMode) => void;
}

export function GroupModeToggle({ value, onChange }: Props) {
  return (
    <View className="flex-row overflow-hidden rounded-full border border-black/10 dark:border-white/10">
      {(["day", "month"] as GroupMode[]).map((mode) => {
        const active = mode === value;
        return (
          <Pressable
            key={mode}
            onPress={() => onChange(mode)}
            className={`px-3 py-1 ${active ? "bg-ink dark:bg-[#F1EFE8]" : ""}`}
          >
            <Text
              className={`font-body-medium text-[11px] ${
                active ? "text-white dark:text-ink" : "text-text-secondary dark:text-text-secondary-dark"
              }`}
            >
              {mode === "day" ? "Theo ngày" : "Theo tháng"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}