import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, useColorScheme } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { CATEGORY_COLORS } from "../constants/theme";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export function CategoryPicker({ value, onChange }: Props) {
  const isDark = useColorScheme() === "dark";

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
      {CATEGORIES.map((cat) => {
        const active = cat.id === value;
        const colors = CATEGORY_COLORS[cat.colorKey];
        const bg = active ? (isDark ? colors.bgDark : colors.bgLight) : undefined;
        const fg = active ? (isDark ? colors.fgDark : colors.fgLight) : isDark ? "#B4B2A9" : "#888780";

        return (
          <Pressable
            key={cat.id}
            onPress={() => onChange(cat.id)}
            style={bg ? { backgroundColor: bg } : undefined}
            className={`mx-1 flex-row items-center gap-1.5 rounded-full border px-3.5 py-2 ${
              active ? "border-transparent" : "border-black/10 dark:border-white/10"
            }`}
          >
            <Ionicons name={cat.icon} size={15} color={fg} />
            <Text style={{ color: fg }} className="font-body-medium text-[13px]">
              {cat.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
