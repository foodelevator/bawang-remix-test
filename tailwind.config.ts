import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cerise: {
          DEFAULT: "#e83d84",
          strong: "#ee2a7b",
          light: "#ec5f99",
        },
        offblack: "#212121",
        yellow: "#fcda04",
        offwhite: "#f7f7f7",
      },
    },
    fontFamily: {
      sans: "Lato",
    },
  },
  plugins: [],
} satisfies Config

