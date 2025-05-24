import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  defaultRadius: 0,

  colors: {
    beige: [
      "#F9F4EC", "#F6F0E6", "#F1E8DA", "#EADFCF", "#E1D4C1", "#D8C7B1", // Your original 6 shades
      "#C5B6A2", "#B0A08B", "#9A8A75", "#857560" // <-- Placeholder/Example shades to make it 10
    ],
    brown: [
      "#EFE8DD", "#E2D4C0", "#D2BFA1", "#BF9F79", "#A6795D", "#4E3B2A", // Your original 6 shades
      "#453525", "#3D2E20", "#34271A", "#2B2015" // <-- Placeholder/Example shades to make it 10
    ],
    // Accent: orange button
    orange: [
      "#FFECE1", "#FFD7C2", "#FFC2A3", "#FF9966", "#D76D3A", "#BF6432", // Your original 6 shades
      "#A6572B", "#8C4924", "#733C1D", "#593016" // <-- Placeholder/Example shades to make it 10
    ],
    // Highlight gold (icons and accents)
    gold: [
      "#FFF9ED", "#FCEFCF", "#F8E6B0", "#F4DB86", "#D2A244", "#A97C2F", // Your original 6 shades
      "#916528", "#784E20", "#603719", "#472012" // <-- Placeholder/Example shades to make it 10
    ],
    // Deep green and pattern colors
    green: [
      "#E5F4EA", "#C8E0D2", "#A9CCB9", "#8BB8A1", "#6CA489", "#324334", // Your original 6 shades
      "#2A3A2C", "#233125", "#1B281D", "#141F16" // <-- Placeholder/Example shades to make it 10
    ],
    // Additional: soft gray for secondary text
    gray: [
      "#F8F6F4", "#EDE9E5", "#E0DAD5", "#CFC0B7", "#B5A69E", "#8B7766", // Your original 6 shades
      "#736253", "#5B4E40", "#443B2D", "#2C271A" // <-- Placeholder/Example shades to make it 10
    ],
    // You can preserve red or redefine
    red: [
      "#FFF5F5", "#FFC9C9", "#FF8787", "#FA5252", "#E03131", "#C92A2A", // Your original 6 shades
      "#B22424", "#992020", "#821B1B", "#6B1616" // <-- Placeholder/Example shades to make it 10
    ],
  },
  breakpoints: {
    xs: '36em',  // 576px
    sm: '48em',  // 768px
    md: '62em',  // 992px
    lg: '75em',  // 1200px
    xl: '88em',  // 1408px
  }
};