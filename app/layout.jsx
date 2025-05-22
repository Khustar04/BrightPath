import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { SearchProvider } from "@/contexts/search-context"
import { Suspense } from "react"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EduPath - Academic Guidance & Learning",
  description: "Providing academic guidance, learning material, and career roadmaps to students",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" storageKey="edupath-theme">
          <AuthProvider>
            <SearchProvider>
              <Navbar />
              <Suspense fallback={<div>Loading...</div>}>
                <main className="flex-grow">{children}</main>
              </Suspense>
              <Footer />
              <Toaster />
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
