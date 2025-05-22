"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, FileText, CheckCircle2, Play, Download, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { subjectsData } from "@/data/subjects"
import { quizzesData } from "@/data/quizzes"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SubjectDetailPage({ params }) {
  const { id } = params

  // Find the subject in all categories
  const subject = Object.values(subjectsData)
    .flat()
    .find((s) => s.id === id)

  // Find quizzes for this subject
  const subjectQuizzes = Object.values(quizzesData)
    .flat()
    .filter((q) => q.subjectId === id)

  const { user, updateProgress } = useAuth()
  const [userProgress, setUserProgress] = useState({
    completedLessons: [],
    completedQuizzes: [],
    overallProgress: 0,
  })

  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const topicsRef = useRef(null)
  const quizzesRef = useRef(null)
  const resourcesRef = useRef(null)

  useEffect(() => {
    if (!subject) return

    // If user is logged in, get their progress for this subject
    if (user && user.progress && user.progress.subjects && user.progress.subjects[id]) {
      setUserProgress(user.progress.subjects[id])
    } else {
      // Initialize empty progress
      const totalLessons = subject.topics?.reduce((acc, topic) => acc + topic.lessons.length, 0) || 0
      setUserProgress({
        completedLessons: [],
        completedQuizzes: [],
        overallProgress: 0,
        totalLessons,
      })
    }

    // Animate header
    gsap.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    // Animate content
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 },
    )

    // Set up scroll animations for topics
    if (topicsRef.current) {
      const topicItems = topicsRef.current.querySelectorAll(".topic-item")
      topicItems.forEach((item) => {
        gsap.fromTo(
          item,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          },
        )
      })
    }

    // Set up scroll animations for quizzes
    if (quizzesRef.current) {
      const quizItems = quizzesRef.current.querySelectorAll(".quiz-item")
      quizItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          },
        )
      })
    }

    // Set up scroll animations for resources
    if (resourcesRef.current) {
      const resourceItems = resourcesRef.current.querySelectorAll(".resource-item")
      resourceItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          },
        )
      })
    }
  }, [id, subject, user])

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
          <p className="text-muted-foreground mb-6">
            The subject you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const markLessonComplete = (lessonId) => {
    if (!user) return

    // Check if lesson is already completed
    if (userProgress.completedLessons.includes(lessonId)) return

    // Add lesson to completed lessons
    const updatedCompletedLessons = [...userProgress.completedLessons, lessonId]

    // Calculate new progress percentage
    const newProgress = Math.round((updatedCompletedLessons.length / userProgress.totalLessons) * 100)

    // Update local state
    setUserProgress({
      ...userProgress,
      completedLessons: updatedCompletedLessons,
      overallProgress: newProgress,
    })

    // Update user progress in auth context
    updateProgress({
      subjects: {
        ...user.progress.subjects,
        [id]: {
          completedLessons: updatedCompletedLessons,
          completedQuizzes: userProgress.completedQuizzes,
          overallProgress: newProgress,
          totalLessons: userProgress.totalLessons,
        },
      },
    })
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-navy-deep/5 to-orange-mid/5 dark:from-navy-deep dark:to-burgundy-dark">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div ref={headerRef} className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-navy-deep dark:text-white">{subject.title}</h1>
              <p className="text-muted-foreground mb-6">{subject.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-medium">{subject.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{subject.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="font-medium">{subject.level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="font-medium">{subject.students?.toLocaleString() || "N/A"}</p>
                </div>
              </div>

              {user && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Your Progress</p>
                    <p className="text-sm font-medium">{userProgress.overallProgress}%</p>
                  </div>
                  <Progress value={userProgress.overallProgress} className="h-2" />
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                  asChild
                >
                  <Link href="#curriculum">
                    <BookOpen className="mr-2 h-4 w-4" /> Start Learning
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#quizzes">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Take a Quiz
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <img
                src={subject.image || "/placeholder.svg"}
                alt={subject.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div ref={contentRef}>
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="curriculum"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" id="curriculum">
              <div ref={topicsRef} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-navy-deep dark:text-orange-mid">Course Curriculum</h2>

                {subject.topics && subject.topics.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {subject.topics.map((topic, topicIndex) => (
                      <AccordionItem
                        key={topic.id}
                        value={topic.id}
                        className="topic-item border-orange-mid/20 dark:border-orange-mid/10"
                      >
                        <AccordionTrigger className="hover:text-orange-mid">
                          <div className="flex items-center">
                            <span className="text-lg font-medium">
                              {topicIndex + 1}. {topic.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2 pb-4">
                            <p className="text-muted-foreground mb-4">{topic.description}</p>

                            <div className="space-y-3">
                              {topic.lessons &&
                                topic.lessons.map((lesson, lessonIndex) => (
                                  <Card
                                    key={lesson.id}
                                    className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50"
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          <div className="h-8 w-8 rounded-full bg-orange-mid/10 flex items-center justify-center mr-3">
                                            {userProgress.completedLessons.includes(lesson.id) ? (
                                              <CheckCircle2 className="h-4 w-4 text-orange-mid" />
                                            ) : (
                                              <span className="text-sm font-medium text-orange-mid">
                                                {topicIndex + 1}.{lessonIndex + 1}
                                              </span>
                                            )}
                                          </div>
                                          <div>
                                            <h4 className="font-medium text-navy-deep dark:text-white">
                                              {lesson.title}
                                            </h4>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                              <Clock className="h-3 w-3 mr-1" />
                                              <span>{lesson.duration}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-orange-mid hover:text-orange-deep"
                                          onClick={() => markLessonComplete(lesson.id)}
                                          asChild
                                        >
                                          <Link href={`/lessons/${lesson.id}`}>
                                            {userProgress.completedLessons.includes(lesson.id) ? (
                                              <>Review</>
                                            ) : (
                                              <>
                                                <Play className="mr-1 h-3 w-3" /> Start
                                              </>
                                            )}
                                          </Link>
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Curriculum Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      We're currently developing the curriculum for this subject. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes" id="quizzes">
              <div ref={quizzesRef} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-navy-deep dark:text-orange-mid">Assessment Quizzes</h2>

                {subjectQuizzes && subjectQuizzes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subjectQuizzes.map((quiz) => (
                      <Card
                        key={quiz.id}
                        className="quiz-item border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-navy-deep dark:text-white">{quiz.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span className="mr-4">{quiz.questions.length} questions</span>
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {quiz.timeLimit} min
                                </span>
                              </div>

                              {user && userProgress.completedQuizzes.includes(quiz.id) && (
                                <div className="mt-2 flex items-center text-sm">
                                  <CheckCircle2 className="h-4 w-4 mr-1 text-orange-mid" />
                                  <span className="text-orange-mid">Completed</span>
                                </div>
                              )}
                            </div>

                            <Button
                              variant={user && userProgress.completedQuizzes.includes(quiz.id) ? "outline" : "default"}
                              size="sm"
                              className={
                                user && userProgress.completedQuizzes.includes(quiz.id)
                                  ? "border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                                  : "bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                              }
                              asChild
                            >
                              <Link href={`/quizzes/${quiz.id}`}>
                                {user && userProgress.completedQuizzes.includes(quiz.id) ? "Retake Quiz" : "Start Quiz"}
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Quizzes Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      We're currently developing quizzes for this subject. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" id="resources">
              <div ref={resourcesRef} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-navy-deep dark:text-orange-mid">Learning Resources</h2>

                {subject.resources && subject.resources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subject.resources.map((resource) => (
                      <Card
                        key={resource.id}
                        className="resource-item border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center">
                              <FileText className="h-6 w-6 text-orange-mid" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-navy-deep dark:text-white">{resource.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span className="mr-4">{resource.type}</span>
                                <span>{resource.size}</span>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-4 border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                              >
                                <Download className="mr-2 h-4 w-4" /> Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Resources Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      We're currently developing resources for this subject. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
