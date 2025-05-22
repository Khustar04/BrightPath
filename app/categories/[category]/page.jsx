"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, GraduationCap, ArrowRight, Download, Brain } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const categoryData = {
  "class-11": {
    title: "Class 11th",
    description: "Foundation for higher education with subject specializations",
    subjects: [
      { name: "Physics", chapters: 15, resources: 42 },
      { name: "Chemistry", chapters: 14, resources: 38 },
      { name: "Mathematics", chapters: 16, resources: 45 },
      { name: "Biology", chapters: 22, resources: 50 },
      { name: "English", chapters: 12, resources: 30 },
      { name: "Computer Science", chapters: 10, resources: 25 },
    ],
    roadmap: [
      { title: "First Term", description: "Focus on building fundamentals and core concepts" },
      { title: "Second Term", description: "Strengthen understanding and prepare for Class 12th" },
      { title: "Career Exploration", description: "Explore potential career paths and interests" },
      { title: "Entrance Exam Preparation", description: "Begin preparation for competitive exams" },
    ],
  },
  "class-12": {
    title: "Class 12th",
    description: "Prepare for board exams and college entrance tests",
    subjects: [
      { name: "Physics", chapters: 15, resources: 48 },
      { name: "Chemistry", chapters: 16, resources: 45 },
      { name: "Mathematics", chapters: 13, resources: 40 },
      { name: "Biology", chapters: 16, resources: 42 },
      { name: "English", chapters: 10, resources: 25 },
      { name: "Computer Science", chapters: 12, resources: 30 },
    ],
    roadmap: [
      { title: "Board Exam Preparation", description: "Focused preparation for board examinations" },
      { title: "Entrance Exam Preparation", description: "Intensive preparation for competitive exams" },
      { title: "College Applications", description: "Research and apply to colleges and universities" },
      { title: "Career Decision", description: "Finalize career path and required qualifications" },
    ],
  },
  graduation: {
    title: "Graduation",
    description: "Undergraduate programs across various disciplines",
    subjects: [
      { name: "Engineering", branches: 8, courses: 120 },
      { name: "Medicine", branches: 5, courses: 80 },
      { name: "Commerce", branches: 6, courses: 90 },
      { name: "Arts & Humanities", branches: 12, courses: 150 },
      { name: "Science", branches: 10, courses: 130 },
      { name: "Law", branches: 4, courses: 60 },
    ],
    roadmap: [
      { title: "First Year", description: "Foundation courses and general education requirements" },
      { title: "Second Year", description: "Specialization begins with focused coursework" },
      { title: "Third Year", description: "Advanced courses and potential internships" },
      { title: "Final Year", description: "Capstone projects and career preparation" },
    ],
  },
  masters: {
    title: "Master's",
    description: "Specialized advanced degrees and research opportunities",
    subjects: [
      { name: "Engineering", specializations: 15, courses: 60 },
      { name: "Medicine", specializations: 20, courses: 70 },
      { name: "Business", specializations: 12, courses: 50 },
      { name: "Arts & Humanities", specializations: 25, courses: 80 },
      { name: "Science", specializations: 18, courses: 65 },
      { name: "Law", specializations: 10, courses: 45 },
    ],
    roadmap: [
      { title: "Coursework", description: "Advanced specialized courses in chosen field" },
      { title: "Research", description: "Conduct original research or applied projects" },
      { title: "Thesis/Dissertation", description: "Complete and defend thesis or capstone project" },
      { title: "Career Advancement", description: "Leverage advanced degree for career growth" },
    ],
  },
}

export default function CategoryPage({ params }) {
  const { category } = params
  const data = categoryData[category] || categoryData["class-11"]

  const syllabusRef = useRef(null)
  const roadmapRef = useRef(null)
  const resourcesRef = useRef(null)

  useEffect(() => {
    // Animate syllabus section
    const syllabusItems = syllabusRef.current.querySelectorAll(".syllabus-item")
    gsap.fromTo(
      syllabusItems,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: syllabusRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate roadmap section
    const roadmapItems = roadmapRef.current.querySelectorAll(".roadmap-item")
    gsap.fromTo(
      roadmapItems,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: roadmapRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate resources section
    const resourceItems = resourcesRef.current.querySelectorAll(".resource-item")
    gsap.fromTo(
      resourceItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: resourcesRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{data.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="#syllabus">
                  <BookOpen className="mr-2 h-4 w-4" /> View Syllabus
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#roadmap">
                  <GraduationCap className="mr-2 h-4 w-4" /> Career Roadmap
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="syllabus" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
            <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          </TabsList>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus" id="syllabus">
            <div ref={syllabusRef} className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Complete Syllabus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.subjects.map((subject, index) => (
                  <Card key={index} className="syllabus-item overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                          {"chapters" in subject ? (
                            <p className="text-muted-foreground">
                              {subject.chapters} Chapters • {subject.resources} Resources
                            </p>
                          ) : (
                            <p className="text-muted-foreground">
                              {subject.branches || subject.specializations}{" "}
                              {subject.branches ? "Branches" : "Specializations"} • {subject.courses} Courses
                            </p>
                          )}
                          <Button variant="link" className="p-0 h-auto mt-4" asChild>
                            <Link href={`/subjects/${subject.name.toLowerCase().replace(" ", "-")}`}>
                              View Details <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" id="roadmap">
            <div ref={roadmapRef} className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Career Roadmap</h2>
              <div className="pl-6 border-l-2 border-primary/30 space-y-12">
                {data.roadmap.map((step, index) => (
                  <div key={index} className="roadmap-item pl-8">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <Card className="bg-secondary/50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Key Activities</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            <li>Regular study schedule</li>
                            <li>Practice exercises</li>
                            <li>Mock tests</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-secondary/50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Resources</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            <li>Textbooks</li>
                            <li>Online courses</li>
                            <li>Study groups</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-secondary/50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Outcomes</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            <li>Subject mastery</li>
                            <li>Exam readiness</li>
                            <li>Career clarity</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" id="resources">
            <div ref={resourcesRef} className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="resource-item hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
                        <p className="text-muted-foreground mb-4">
                          Comprehensive notes, textbooks, and reference materials for all subjects.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Download className="mr-2 h-4 w-4" /> Download Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="resource-item hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M14 12L10 9V15L14 12Z" fill="currentColor" />
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Video Lectures</h3>
                        <p className="text-muted-foreground mb-4">
                          Engaging video content explaining complex topics in simple terms.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Watch Videos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="resource-item hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 6H20M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Practice Questions</h3>
                        <p className="text-muted-foreground mb-4">
                          Extensive question banks with solutions for effective practice.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Start Practicing
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="resource-item hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Mock Tests</h3>
                        <p className="text-muted-foreground mb-4">
                          Simulated exams to assess your preparation and improve performance.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Take Mock Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold mb-4">Need Personalized Guidance?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our AI Assistant can help you find the right resources and create a customized learning plan.
                </p>
                <Button asChild>
                  <Link href="/assistant">
                    <Brain className="mr-2 h-5 w-5" /> Ask AI Assistant
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
