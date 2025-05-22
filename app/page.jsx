"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen, GraduationCap, Brain, FileQuestion } from "lucide-react"
import HeroSection from "@/components/hero-section"
import CategoryCard from "@/components/category-card"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const featuresRef = useRef(null)
  const categoriesRef = useRef(null)
  const testimonialsRef = useRef(null)

  useEffect(() => {
    // Animate features section
    const featureCards = featuresRef.current.querySelectorAll(".feature-card")
    gsap.fromTo(
      featureCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate categories section
    const categoryCards = categoriesRef.current.querySelectorAll(".category-card")
    gsap.fromTo(
      categoryCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate testimonials section
    const testimonialCards = testimonialsRef.current.querySelectorAll(".testimonial-card")
    gsap.fromTo(
      testimonialCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose BrightPath?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="feature-card p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Syllabus</h3>
                <p className="text-muted-foreground">Access detailed syllabus for all education levels</p>
              </div>
            </Card>

            <Card className="feature-card p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Roadmaps</h3>
                <p className="text-muted-foreground">Clear pathways to achieve your academic goals</p>
              </div>
            </Card>

            <Card className="feature-card p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                <p className="text-muted-foreground">Get instant answers to your academic queries</p>
              </div>
            </Card>

            <Card className="feature-card p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileQuestion className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Question Bank</h3>
                <p className="text-muted-foreground">Practice with previous year questions</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Explore by Education Level</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Find tailored learning materials, roadmaps, and resources for your specific education level
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard
              title="Class 11th"
              description="Foundation for higher education with subject specializations"
              icon="BookOpen"
              link="/categories/class-11"
              className="category-card"
            />
            <CategoryCard
              title="Class 12th"
              description="Prepare for board exams and college entrance tests"
              icon="BookOpen"
              link="/categories/class-12"
              className="category-card"
            />
            <CategoryCard
              title="Graduation"
              description="Undergraduate programs across various disciplines"
              icon="GraduationCap"
              link="/categories/graduation"
              className="category-card"
            />
            <CategoryCard
              title="Master's"
              description="Specialized advanced degrees and research opportunities"
              icon="Award"
              link="/categories/masters"
              className="category-card"
            />
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/categories">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="testimonial-card p-6 border border-border">
              <blockquote className="text-muted-foreground italic mb-4">
                "The roadmap feature helped me plan my entire academic journey. I knew exactly what steps to take to
                reach my career goals."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">RS</span>
                </div>
                <div>
                  <p className="font-semibold">Rahul Singh</p>
                  <p className="text-sm text-muted-foreground">Engineering Student</p>
                </div>
              </div>
            </Card>

            <Card className="testimonial-card p-6 border border-border">
              <blockquote className="text-muted-foreground italic mb-4">
                "The AI assistant is like having a personal tutor available 24/7. It helped me understand complex topics
                when I was stuck."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">AP</span>
                </div>
                <div>
                  <p className="font-semibold">Ananya Patel</p>
                  <p className="text-sm text-muted-foreground">Class 12 Student</p>
                </div>
              </div>
            </Card>

            <Card className="testimonial-card p-6 border border-border">
              <blockquote className="text-muted-foreground italic mb-4">
                "The question bank with previous year papers was invaluable for my exam preparation. I felt confident
                walking into my finals."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">MK</span>
                </div>
                <div>
                  <p className="font-semibold">Mohit Kumar</p>
                  <p className="text-sm text-muted-foreground">MBA Student</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of students who are achieving their academic goals with  BrightPath
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild className="w-40 h-9 border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid">
              <Link href="/signup">Sign Up for Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-40 h-9 border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid">
              <Link href="/assistant">Try AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
