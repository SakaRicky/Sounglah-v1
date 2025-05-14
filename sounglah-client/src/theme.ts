import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "light",
  defaultRadius: 0,
  colors: {
    // Primary beige background and brown tones
    beige: ["#F9F4EC", "#F6F0E6", "#F1E8DA", "#EADFCF", "#E1D4C1", "#D8C7B1"],
    brown: ["#EFE8DD", "#E2D4C0", "#D2BFA1", "#BF9F79", "#A6795D", "#4E3B2A"],

    // Accent: orange button
    orange: ["#FFECE1", "#FFD7C2", "#FFC2A3", "#FF9966", "#D76D3A", "#BF6432"],

    // Highlight gold (icons and accents)
    gold: ["#FFF9ED", "#FCEFCF", "#F8E6B0", "#F4DB86", "#D2A244", "#A97C2F"],

    // Deep green and pattern colors
    green: ["#E5F4EA", "#C8E0D2", "#A9CCB9", "#8BB8A1", "#6CA489", "#324334"],

    // Additional: soft gray for secondary text
    gray: ["#F8F6F4", "#EDE9E5", "#E0DAD5", "#CFC0B7", "#B5A69E", "#8B7766"],

    // You can preserve red or redefine
    red: ["#FFF5F5", "#FFC9C9", "#FF8787", "#FA5252", "#E03131", "#C92A2A"],
  },

  white: "#FFFFFF",

  breakpoints: {
    xs: 400,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1400,
  },
};
