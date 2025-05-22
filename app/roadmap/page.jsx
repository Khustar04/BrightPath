"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, GraduationCap, Briefcase, Code, Stethoscope, Calculator } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Mock data for roadmaps
const roadmapData = {
  engineering: [
    {
      id: "step1",
      title: "Foundation (Class 11-12)",
      description: "Build strong fundamentals in Physics, Chemistry, and Mathematics",
      tasks: [
        "Master NCERT textbooks for PCM",
        "Practice numerical problems regularly",
        "Prepare for JEE Main/Advanced or other engineering entrance exams",
        "Develop analytical and problem-solving skills",
      ],
    },
    {
      id: "step2",
      title: "Undergraduate Degree (B.Tech/B.E.)",
      description: "Pursue a bachelor's degree in your chosen engineering discipline",
      tasks: [
        "Focus on core engineering subjects",
        "Participate in technical projects and competitions",
        "Complete internships to gain practical experience",
        "Develop programming and technical skills",
      ],
    },
    {
      id: "step3",
      title: "Specialization",
      description: "Gain expertise in a specific domain within your field",
      tasks: [
        "Take elective courses in your area of interest",
        "Work on specialized projects",
        "Obtain relevant certifications",
        "Network with professionals in your chosen specialization",
      ],
    },
    {
      id: "step4",
      title: "Career Path",
      description: "Choose between industry roles, research, or entrepreneurship",
      tasks: [
        "Apply for entry-level engineering positions",
        "Consider higher education (M.Tech/MS/PhD) for research roles",
        "Explore startup opportunities",
        "Continue learning through professional development courses",
      ],
    },
  ],
  medical: [
    {
      id: "step1",
      title: "Foundation (Class 11-12)",
      description: "Build strong fundamentals in Biology, Physics, and Chemistry",
      tasks: [
        "Master NCERT textbooks for Biology, Physics, and Chemistry",
        "Prepare for NEET or other medical entrance exams",
        "Develop strong conceptual understanding of human anatomy and physiology",
        "Practice previous years' question papers",
      ],
    },
    {
      id: "step2",
      title: "MBBS (Bachelor of Medicine and Surgery)",
      description: "Complete your medical degree from a recognized institution",
      tasks: [
        "Focus on medical subjects and clinical rotations",
        "Prepare for university exams and assessments",
        "Participate in medical camps and community health programs",
        "Develop patient interaction and diagnostic skills",
      ],
    },
    {
      id: "step3",
      title: "Internship and Licensing",
      description: "Complete mandatory internship and obtain medical license",
      tasks: [
        "Complete one-year compulsory rotating internship",
        "Prepare for and clear licensing exams (e.g., NEXT in India)",
        "Gain hands-on experience in different medical departments",
        "Decide on specialization path",
      ],
    },
    {
      id: "step4",
      title: "Specialization and Career",
      description: "Pursue post-graduate studies or start medical practice",
      tasks: [
        "Prepare for PG entrance exams (NEET PG)",
        "Complete MD/MS in chosen specialization",
        "Consider super-specialization (DM/MCh) for further expertise",
        "Choose between clinical practice, research, or academic medicine",
      ],
    },
  ],
  commerce: [
    {
      id: "step1",
      title: "Foundation (Class 11-12)",
      description: "Build strong fundamentals in Commerce, Economics, and Mathematics",
      tasks: [
        "Master concepts in Accountancy, Business Studies, and Economics",
        "Develop quantitative aptitude and mathematical skills",
        "Prepare for commerce-related entrance exams",
        "Understand basic financial and business principles",
      ],
    },
    {
      id: "step2",
      title: "Undergraduate Degree",
      description: "Pursue B.Com, BBA, or related commerce degree",
      tasks: [
        "Focus on core commerce and business subjects",
        "Develop analytical and problem-solving skills",
        "Complete internships in relevant industries",
        "Participate in business competitions and case studies",
      ],
    },
    {
      id: "step3",
      title: "Professional Qualification/PG",
      description: "Obtain professional certification or pursue post-graduation",
      tasks: [
        "Prepare for CA, CS, CMA, or other professional certifications",
        "Consider MBA or M.Com for advanced knowledge",
        "Develop specialized skills in finance, marketing, or HR",
        "Build professional network through associations and events",
      ],
    },
    {
      id: "step4",
      title: "Career Path",
      description: "Choose between corporate roles, entrepreneurship, or consulting",
      tasks: [
        "Apply for entry-level positions in your chosen field",
        "Consider specialization in investment banking, consulting, etc.",
        "Explore entrepreneurship opportunities",
        "Continue professional development through advanced certifications",
      ],
    },
  ],
  arts: [
    {
      id: "step1",
      title: "Foundation (Class 11-12)",
      description: "Build strong fundamentals in Humanities subjects",
      tasks: [
        "Focus on subjects like History, Political Science, Sociology, Psychology, etc.",
        "Develop strong reading, writing, and critical thinking skills",
        "Explore areas of interest within humanities",
        "Prepare for entrance exams for top liberal arts colleges",
      ],
    },
    {
      id: "step2",
      title: "Undergraduate Degree",
      description: "Pursue BA in chosen humanities discipline",
      tasks: [
        "Focus on core subjects in your chosen discipline",
        "Develop research and analytical skills",
        "Participate in debates, seminars, and cultural activities",
        "Complete internships in relevant fields",
      ],
    },
    {
      id: "step3",
      title: "Specialization/PG",
      description: "Pursue post-graduation or specialized courses",
      tasks: [
        "Complete MA/MSc in your chosen field",
        "Consider interdisciplinary programs",
        "Develop research methodology skills",
        "Build academic or professional network",
      ],
    },
    {
      id: "step4",
      title: "Career Path",
      description: "Choose between academia, civil services, media, or other fields",
      tasks: [
        "Prepare for civil services, journalism, or other competitive exams",
        "Consider PhD for academic and research careers",
        "Explore opportunities in media, content creation, or publishing",
        "Develop specialized skills relevant to your chosen career path",
      ],
    },
  ],
}

export default function RoadmapPage() {
  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const roadmapsRef = useRef(null)

  useEffect(() => {
    // Animate header
    gsap.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    // Animate tabs
    gsap.fromTo(
      tabsRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3,
      },
    )

    // Set up scroll animations for roadmap items
    const roadmapItems = document.querySelectorAll(".roadmap-step")
    roadmapItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        },
      )
    })
  }, [])

  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <section ref={headerRef} className="bg-gradient-to-r from-navy-deep to-maroon py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Career Roadmaps</h1>
            <p className="text-xl text-white/80 mb-8">
              Clear pathways to help you navigate your educational and career journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-orange-mid hover:bg-orange-deep text-white" asChild>
                <a href="#roadmaps">Explore Roadmaps</a>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/assistant">Get Personalized Guidance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12" id="roadmaps">
        {/* Roadmap Tabs */}
        <div ref={tabsRef} className="mb-8">
          <Tabs defaultValue="engineering" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="engineering"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                <Code className="h-4 w-4 mr-2" />
                Engineering
              </TabsTrigger>
              <TabsTrigger value="medical" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                <Stethoscope className="h-4 w-4 mr-2" />
                Medical
              </TabsTrigger>
              <TabsTrigger
                value="commerce"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Commerce
              </TabsTrigger>
              <TabsTrigger value="arts" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Arts & Humanities
              </TabsTrigger>
            </TabsList>

            {/* Roadmap Content */}
            <div ref={roadmapsRef}>
              {Object.keys(roadmapData).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="relative pl-6 border-l-2 border-orange-mid space-y-12">
                    {roadmapData[category].map((step, index) => (
                      <div key={step.id} className="roadmap-step pl-8">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-navy-deep dark:text-orange-mid">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">{step.description}</p>

                            <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
                              <CardContent className="p-4">
                                <h4 className="font-medium mb-2 text-navy-deep dark:text-orange-mid">
                                  Key Activities:
                                </h4>
                                <ul className="space-y-2">
                                  {step.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex} className="flex items-start">
                                      <div className="h-5 w-5 rounded-full bg-orange-mid/20 flex items-center justify-center mr-2 mt-0.5">
                                        <span className="text-xs text-orange-mid">{taskIndex + 1}</span>
                                      </div>
                                      <span className="text-muted-foreground">{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>

                            {index < roadmapData[category].length - 1 && (
                              <div className="flex justify-center my-4">
                                <ArrowRight className="h-6 w-6 text-orange-mid transform rotate-90" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-navy-deep dark:text-orange-mid">
                      Need Personalized Guidance?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Our AI Assistant can help you create a customized roadmap based on your interests and goals.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                      asChild
                    >
                      <Link href="/assistant">Get Personalized Roadmap</Link>
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-navy-deep dark:text-orange-mid">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-orange-mid" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-deep dark:text-orange-mid">Career Guides</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive guides for various career paths with expert insights.
                </p>
                <Button
                  variant="outline"
                  className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                >
                  View Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-orange-mid" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-deep dark:text-orange-mid">Entrance Exam Prep</h3>
                <p className="text-muted-foreground mb-4">
                  Resources and strategies for competitive entrance examinations.
                </p>
                <Button
                  variant="outline"
                  className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                >
                  Explore Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-orange-mid" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy-deep dark:text-orange-mid">
                  Internship Opportunities
                </h3>
                <p className="text-muted-foreground mb-4">
                  Find internships and practical experience opportunities in your field.
                </p>
                <Button
                  variant="outline"
                  className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                >
                  Find Internships
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
