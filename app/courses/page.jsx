"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Star, ArrowRight } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Mock data for courses
const coursesData = {
  "class-11": [
    {
      id: 1,
      title: "Physics Fundamentals",
      description: "Master the core concepts of Physics for Class 11",
      instructor: "Dr. Rajesh Kumar",
      duration: "48 hours",
      students: 1250,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
    {
      id: 2,
      title: "Chemistry Essentials",
      description: "Comprehensive guide to Class 11 Chemistry",
      instructor: "Dr. Priya Singh",
      duration: "45 hours",
      students: 980,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
    {
      id: 3,
      title: "Mathematics Mastery",
      description: "Build a strong foundation in Class 11 Mathematics",
      instructor: "Prof. Amit Sharma",
      duration: "52 hours",
      students: 1450,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
    {
      id: 4,
      title: "English Literature",
      description: "Explore the world of literature and improve language skills",
      instructor: "Ms. Sarah Johnson",
      duration: "36 hours",
      students: 820,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      category: "Humanities",
    },
  ],
  "class-12": [
    {
      id: 5,
      title: "Advanced Physics",
      description: "Prepare for board exams and competitive tests",
      instructor: "Dr. Vikram Patel",
      duration: "54 hours",
      students: 1580,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
    {
      id: 6,
      title: "Organic Chemistry",
      description: "Master organic chemistry concepts for Class 12",
      instructor: "Dr. Meera Gupta",
      duration: "48 hours",
      students: 1320,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
    {
      id: 7,
      title: "Calculus & Algebra",
      description: "Advanced mathematics for Class 12 students",
      instructor: "Prof. Rahul Verma",
      duration: "56 hours",
      students: 1680,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
    {
      id: 8,
      title: "Economics Fundamentals",
      description: "Understand micro and macroeconomics concepts",
      instructor: "Dr. Neha Kapoor",
      duration: "42 hours",
      students: 950,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      category: "Commerce",
    },
  ],
  graduation: [
    {
      id: 9,
      title: "Computer Science Fundamentals",
      description: "Core CS concepts for undergraduate students",
      instructor: "Prof. Arun Mishra",
      duration: "72 hours",
      students: 2150,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Engineering",
    },
    {
      id: 10,
      title: "Business Management",
      description: "Essential management principles for commerce students",
      instructor: "Dr. Sanjay Gupta",
      duration: "64 hours",
      students: 1850,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      category: "Commerce",
    },
    {
      id: 11,
      title: "Digital Marketing",
      description: "Modern marketing strategies for the digital age",
      instructor: "Ms. Ritu Sharma",
      duration: "58 hours",
      students: 2250,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Commerce",
    },
    {
      id: 12,
      title: "Psychology 101",
      description: "Introduction to human behavior and mental processes",
      instructor: "Dr. Ananya Das",
      duration: "60 hours",
      students: 1750,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      category: "Arts",
    },
  ],
  masters: [
    {
      id: 13,
      title: "Advanced Data Science",
      description: "Master data analysis, machine learning, and AI",
      instructor: "Prof. Rajiv Khanna",
      duration: "80 hours",
      students: 1450,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
    {
      id: 14,
      title: "Financial Management",
      description: "Advanced financial strategies for business growth",
      instructor: "Dr. Vivek Joshi",
      duration: "72 hours",
      students: 1250,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
    },
    {
      id: 15,
      title: "Clinical Psychology",
      description: "Advanced psychological assessment and therapy techniques",
      instructor: "Dr. Priya Mehta",
      duration: "76 hours",
      students: 980,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      category: "Medical",
    },
    {
      id: 16,
      title: "Artificial Intelligence",
      description: "Cutting-edge AI techniques and applications",
      instructor: "Prof. Sunil Kumar",
      duration: "84 hours",
      students: 1680,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
  ],
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("class-11")
  const headerRef = useRef(null)
  const coursesRef = useRef(null)
  const filterRef = useRef(null)

  useEffect(() => {
    // Animate header
    gsap.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    // Animate filters
    gsap.fromTo(
      filterRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
      },
    )

    // Animate course cards
    gsap.fromTo(
      coursesRef.current.querySelectorAll(".course-card"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.5,
      },
    )
  }, [activeTab])

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <section ref={headerRef} className="bg-gradient-to-r from-navy-deep to-maroon py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Explore Our Courses</h1>
            <p className="text-xl text-white/80 mb-8">
              Comprehensive learning materials designed to help you excel in your academic journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-orange-mid hover:bg-orange-deep text-white" asChild>
                <a href="#courses">Browse Courses</a>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/question-bank">Question Bank</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12" id="courses">
        {/* Filters Section */}
        <div ref={filterRef} className="mb-8">
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="class-11"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                Class 11th
              </TabsTrigger>
              <TabsTrigger
                value="class-12"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                Class 12th
              </TabsTrigger>
              <TabsTrigger
                value="graduation"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                Graduation
              </TabsTrigger>
              <TabsTrigger value="masters" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                Master's
              </TabsTrigger>
            </TabsList>

            {/* Course Listings */}
            <div ref={coursesRef}>
              {Object.keys(coursesData).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coursesData[category].map((course) => (
                      <Card
                        key={course.id}
                        className="course-card overflow-hidden hover:shadow-lg transition-all duration-300 border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 bg-orange-mid text-white text-xs font-medium px-2 py-1 rounded-full">
                            {course.category}
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="text-xl font-semibold mb-2 text-navy-deep dark:text-orange-mid">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">{course.description}</p>

                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Users className="h-4 w-4 mr-1 text-orange-mid" />
                            <span>{course.students} students</span>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4 mr-1 text-orange-mid" />
                            <span>{course.duration}</span>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Star className="h-4 w-4 mr-1 text-orange-mid" />
                            <span>{course.rating} rating</span>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium">Instructor: {course.instructor}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-orange-mid hover:text-orange-deep hover:bg-orange-mid/10"
                              asChild
                            >
                              <Link href={`/courses/${course.id}`}>
                                View <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-navy-deep to-maroon rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="mb-6">
              Join thousands of students who are achieving their academic goals with our comprehensive courses.
            </p>
            <Button className="bg-orange-mid hover:bg-orange-deep text-white" asChild>
              <Link href="/signup">Sign Up for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
