"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, X, LogOut, UserIcon } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import SearchBar from "./search-bar"
import { gsap } from "gsap"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const navbarRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const actionsRef = useRef(null)

  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // GSAP animations for navbar entrance
    const tl = gsap.timeline()

    tl.fromTo(navbarRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })

    tl.fromTo(logoRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3")

    tl.fromTo(
      linksRef.current.children,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" },
      "-=0.2",
    )

    tl.fromTo(
      actionsRef.current.children,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" },
      "-=0.4",
    )

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Question Bank", href: "/question-bank" },
    { name: "Ask Assistant", href: "/assistant" },
  ]

  // Add dashboard link if user is logged in
  if (user) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" })
  }

  // Helper function to safely get user initials
  const getUserInitial = () => {
    if (!user || !user.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  return (
    <header
      ref={navbarRef}
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-navy-deep/90 backdrop-blur-md shadow-md" : "bg-navbar-gradient"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center" ref={logoRef}>
            <Link href="/" className="flex items-center">
              <GraduationCapIcon className="h-8 w-8 text-orange-mid mr-2" />
              <span className="font-bold text-xl text-white">BrightPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav ref={linksRef} className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-orange-mid ${
                  pathname === link.href ? "text-orange-mid" : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div ref={actionsRef} className="flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="relative hidden md:flex items-center">
                <SearchBar />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 text-white hover:text-orange-mid hover:bg-transparent"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-white hover:text-orange-mid hover:bg-transparent"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}

            <div className="hidden md:flex items-center space-x-2">
              <ModeToggle />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} />
                        <AvatarFallback className="bg-orange-mid text-white">{getUserInitial()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" className="text-white hover:text-smokeyWhite-mid hover:bg-white/10" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white border-none"
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-orange-mid hover:bg-transparent"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <ModeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-orange-mid hover:bg-transparent">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-navy-deep text-white border-maroon">
                  <div className="flex flex-col space-y-4 mt-8">
                    {user && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} />
                          <AvatarFallback className="bg-orange-mid text-white">{getUserInitial()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user?.name || "User"}</p>
                          <p className="text-xs text-white/70">{user?.email || "user@example.com"}</p>
                        </div>
                      </div>
                    )}

                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-orange-mid ${
                          pathname === link.href ? "text-orange-mid" : "text-white/90"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="h-px bg-maroon my-2" />

                    {user ? (
                      <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 w-full"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    ) : (
                      <>
                        <Link href="/login" className="text-sm font-medium transition-colors hover:text-orange-mid">
                          Login
                        </Link>
                        <Button
                          className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white border-none w-full"
                          asChild
                        >
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-2 px-4">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  )
}

function GraduationCapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}
