"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const ThemeContext = React.createContext(undefined)

export function useColorTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ThemeProvider")
  }
  return context
}

export function ThemeProvider({ children, ...props }) {
  const [colorTheme, setColorTheme] = React.useState("orange")

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme")
    if (savedTheme) {
      setColorTheme(savedTheme)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("color-theme", colorTheme)

    // Remove all theme classes
    document.documentElement.classList.remove(
      "theme-orange",
      "theme-blue",
      "theme-green",
      "theme-purple"
    )

    // Add the current theme class (except for light which is default)
    if (colorTheme !== "light") {
      document.documentElement.classList.add(`theme-${colorTheme}`)
    }
  }, [colorTheme])

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  )
}
