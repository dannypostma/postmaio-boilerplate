const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: ["./build/**/*.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: [...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				gray: {
					"50": "#fafaf9",
					"100": "#f5f5f4",
					"200": "#e7e5e4",
					"300": "#d6d3d1",
					"400": "#a8a29e",
					"500": "#78716c",
					"600": "#57534e",
					"700": "#44403c",
					"800": "#292524",
					"900": "#1c1917",
				},
				'brand': colors.sky,
			},
		},
	},
	variants: {
		extend: {
			width: ['hover']
		}
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"), 
		require("@tailwindcss/line-clamp"),  
		require('@tailwindcss/typography'),
	],
};
