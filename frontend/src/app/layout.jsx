import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AppContextProvider } from "@/contexts/appcontext"
import { Toaster } from "react-hot-toast"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DKS - Designer Kitchens for Less",
  description:
    "Transform your space with high-quality modular kitchens at affordable prices. Premium materials, 10-year warranty, and free 3D design service.",
  keywords: "modular kitchens, kitchen design, custom kitchens, affordable kitchens, designer kitchens",
  generator: "v0.dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <AppContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* <Navbar /> */}
            {children}
            <Footer />
          </ThemeProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}
