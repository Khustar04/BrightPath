"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, BookOpen, GraduationCap, Award, Brain } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CategoryCard({ title, description, icon, link, className }) {
  const cardRef = useRef(null)

  useEffect(() => {
    // Add hover animation
    if (cardRef.current) {
      cardRef.current.addEventListener("mouseenter", () => {
        gsap.to(cardRef.current, {
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(232, 93, 4, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      cardRef.current.addEventListener("mouseleave", () => {
        gsap.to(cardRef.current, {
          y: 0,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mouseenter", () => {})
        cardRef.current.removeEventListener("mouseleave", () => {})
      }
    }
  }, [])

  const getIcon = () => {
    switch (icon) {
      case "BookOpen":
        return <BookOpen className="h-6 w-6 text-orange-mid" />
      case "GraduationCap":
        return <GraduationCap className="h-6 w-6 text-orange-mid" />
      case "Award":
        return <Award className="h-6 w-6 text-orange-mid" />
      case "Brain":
        return <Brain className="h-6 w-6 text-orange-mid" />
      default:
        return <BookOpen className="h-6 w-6 text-orange-mid" />
    }
  }

  return (
    <Card
      ref={cardRef}
      className={`overflow-hidden transition-all border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 ${className}`}
    >
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center mb-4">{getIcon()}</div>
        <h3 className="text-xl font-semibold mb-2 text-navy-deep dark:text-orange-mid">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={link}
          className="text-orange-mid font-medium flex items-center hover:text-orange-deep transition-colors"
        >
          Explore <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
