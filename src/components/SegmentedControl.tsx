import { Pressable, Text, View, useColorScheme } from "react-native";

export type FilterValue = "all" | "in" | "out";

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "in", label: "Thu" },
  { value: "out", label: "Chi" },
];

interface Props {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}

export function SegmentedControl({ value, onChange }: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className="mx-5 mt-4 flex-row gap-2">
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`flex-1 rounded-xl border py-2 ${
              active
                ? "border-transparent bg-ink dark:bg-[#F1EFE8]"
                : "border-black/10 bg-transparent dark:border-white/10"
            }`}
          >
            <Text
              className={`text-center font-body-medium text-[13px] ${
                active
                  ? isDark
                    ? "text-ink"
                    : "text-white"
                  : "text-text-primary dark:text-text-primary-dark"
              }`}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
