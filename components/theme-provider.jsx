"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({ theme: "light", setTheme: () => null })

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "theme", ...props }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first
      const storedTheme = localStorage.getItem(storageKey)
      if (storedTheme) {
        return storedTheme
      }

      // Check user preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    }

    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove the old theme class
    root.classList.remove("light", "dark")

    // Add the new theme class
    root.classList.add(theme)

    // Store the theme in localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
