"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { gsap } from "gsap"
import { useSearch } from "@/contexts/search-context"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)
  const buttonRef = useRef(null)
  const { performSearch } = useSearch()

  useEffect(() => {
    // Focus animation
    if (inputRef.current) {
      inputRef.current.focus()

      gsap.fromTo(
        inputRef.current,
        { width: "90%", opacity: 0 },
        { width: "100%", opacity: 1, duration: 0.3, ease: "power2.out" },
      )
    }

    // Button hover animation
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.out",
        })
      })

      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power1.out",
        })
      })
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseenter", () => {})
        buttonRef.current.removeEventListener("mouseleave", () => {})
      }
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-mid" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search courses, roadmaps, questions..."
          className="w-full pl-10 pr-24 border-orange-mid/30 focus:border-orange-mid focus:ring-1 focus:ring-orange-mid bg-white/10 dark:bg-navy-deep/50 text-foreground placeholder:text-muted-foreground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          ref={buttonRef}
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
