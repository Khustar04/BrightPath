"use client"

import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef(null)

  useEffect(() => {
    // Add hover animation
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.1,
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          className="bg-orange-deep/10 text-orange-mid hover:bg-orange-deep/20"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-navy-deep border-orange-mid/20">
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-orange-mid/10">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-orange-mid/10">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-orange-mid/10">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
