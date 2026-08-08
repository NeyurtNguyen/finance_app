// Matches the tailwind.config.js "colors" extension.
// Each category color has a soft light-mode chip and a saturated dark-mode chip.
export const CATEGORY_COLORS = {
  teal: { bgLight: "#E1F5EE", fgLight: "#04342C", bgDark: "#0F6E56", fgDark: "#9FE1CB" },
  coral: { bgLight: "#FAECE7", fgLight: "#4A1B0C", bgDark: "#712B13", fgDark: "#F0997B" },
  purple: { bgLight: "#EEEDFE", fgLight: "#26215C", bgDark: "#3C3489", fgDark: "#AFA9EC" },
  pink: { bgLight: "#FBEAF0", fgLight: "#4B1528", bgDark: "#72243E", fgDark: "#ED93B1" },
  amber: { bgLight: "#FAEEDA", fgLight: "#412402", bgDark: "#633806", fgDark: "#FAC775" },
  gray: { bgLight: "#F1EFE8", fgLight: "#2C2C2A", bgDark: "#444441", fgDark: "#D3D1C7" },
} as const;

export type CategoryColorKey = keyof typeof CATEGORY_COLORS;
