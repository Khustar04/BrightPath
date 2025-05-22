"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, ArrowRight } from "lucide-react"

export default function HeroSection() {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate hero elements
    tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      .fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(
        ctaRef.current.querySelectorAll("a"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8",
      )

    // Add hover animations to buttons
    const buttons = ctaRef.current.querySelectorAll("a")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.2 })
      })
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.2 })
      })
    })

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", () => {})
        button.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/10 to-orange-mid/5 dark:from-navy-deep dark:to-burgundy-dark -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-navy-deep dark:text-white"
            >
              Your Path to Academic <span className="text-orange-mid">Excellence</span>
            </h1>
            <p ref={subheadingRef} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg">
              Comprehensive learning resources, career roadmaps, and AI assistance for students from Class 11th to
              Master's level.
            </p>
            <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                asChild
              >
                <Link href="/categories" className="w-40">
                  <BookOpen className="h-8 w-7 p-1" /> Explore Stream
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                asChild
              >
                <Link href="/assistant" className="w-40">
                  <Brain className="mr-2 h-9 w-6 " /> Ask AI Assistant
                </Link>
              </Button>
              <Button variant="link" size="lg" className="text-orange-mid hover:text-orange-deep" asChild>
                <Link href="/roadmap" className="flex items-center">
                  View Career Roadmaps <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div ref={imageRef} className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="absolute w-full h-full bg-gradient-to-tr from-orange-mid/10 to-navy-deep/5 dark:from-orange-mid/20 dark:to-navy-deep/20 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-mid/20 to-transparent" />
            </div>
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Students learning"
              className="relative z-10 max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
