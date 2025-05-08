import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
	colorScheme: "light",
	defaultRadius: 0,
	colors: {
		brown: ["#ede0d4", "#e6ccb2", "#ddb892", "#b08968", "#7f5539", "#573825"],
		green: ["#e9f5db", "#cfe1b9", "#b5c99a", "#97a97c", "#87986a", "#718355"],
		red: ["#FFF5F5", "#FFC9C9", "#FF8787", "#FA5252", "#E03131", "#C92A2A"],
	},
	white: "#fff",

	breakpoints: {
		xs: 400,
		sm: 800,
		md: 1000,
		lg: 1200,
		xl: 1400,
	},
};
