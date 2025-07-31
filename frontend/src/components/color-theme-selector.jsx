"use client"
import { Palette } from "lucide-react"
import { useColorTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

const colorThemes = [
  {
    name: "Light Gray",
    value: "light",
    color: "bg-gray-200",
    description: "Clean and minimal"
  },
  {
    name: "Orange",
    value: "orange",
    color: "bg-orange-500",
    description: "Warm and energetic"
  },
  {
    name: "Blue",
    value: "blue",
    color: "bg-blue-500",
    description: "Professional and trustworthy"
  },
  {
    name: "Green",
    value: "green",
    color: "bg-green-600",
    description: "Natural and fresh"
  },
  {
    name: "Purple",
    value: "purple",
    color: "bg-purple-600",
    description: "Creative and modern"
  }
]

export function ColorThemeSelector() {
  const { colorTheme, setColorTheme } = useColorTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Palette className="h-4 w-4" />
          Color Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Choose Your Color Theme</DropdownMenuLabel>

        {colorThemes.map(theme => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColorTheme(theme.value)}
            className="flex items-start gap-3 p-3"
          >
            <div
              className={`w-6 h-6 rounded-full ${theme.color} border border-gray-300 mt-0.5 flex-shrink-0`}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{theme.name}</span>
                {colorTheme === theme.value && (
                  <span className="text-xs text-primary">✓</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {theme.description}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
