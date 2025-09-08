import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
    colors: {
      sidebar: "var(--sidebar)",
      "sidebar-foreground": "var(--sidebar-foreground)",
      "sidebar-primary": "var(--sidebar-primary)",
      "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
      "sidebar-accent": "var(--sidebar-accent)",
      "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
      "sidebar-border": "var(--sidebar-border)",
      "sidebar-ring": "var(--sidebar-ring)",
    },
  },
  },
  plugins: [],
}

export default config
