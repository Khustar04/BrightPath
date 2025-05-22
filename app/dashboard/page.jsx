"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Award, Clock, ArrowRight, BarChart, Calendar, CheckCircle2 } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const headerRef = useRef(null)
  const statsRef = useRef(null)
  const coursesRef = useRef(null)
  const quizzesRef = useRef(null)

  useEffect(() => {
    if (!user) return

    // Animate header
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
    }

    // Animate stats
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll(".stat-card")
      if (statCards.length > 0) {
        gsap.fromTo(
          statCards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3,
          },
        )
      }
    }

    // Animate courses
    if (coursesRef.current) {
      const courseCards = coursesRef.current.querySelectorAll(".course-card")
      if (courseCards.length > 0) {
        gsap.fromTo(
          courseCards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5,
          },
        )
      }
    }

    // Animate quizzes
    if (quizzesRef.current) {
      const quizCards = quizzesRef.current.querySelectorAll(".quiz-card")
      if (quizCards.length > 0) {
        gsap.fromTo(
          quizCards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5,
          },
        )
      }
    }
  }, [user])

  // Mock data for user progress
  const userProgress = {
    coursesCompleted: 3,
    totalCourses: 12,
    quizzesTaken: 8,
    totalQuizzes: 15,
    averageScore: 82,
    streak: 5,
    lastActivity: "2 hours ago",
    recentCourses: [
      {
        id: 1,
        title: "Physics Fundamentals",
        progress: 75,
        lastAccessed: "Today",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: 2,
        title: "Chemistry Essentials",
        progress: 45,
        lastAccessed: "Yesterday",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: 3,
        title: "Mathematics Mastery",
        progress: 90,
        lastAccessed: "3 days ago",
        image: "/placeholder.svg?height=100&width=200",
      },
    ],
    recentQuizzes: [
      {
        id: 1,
        title: "Physics: Forces and Motion",
        score: 85,
        totalQuestions: 20,
        date: "Today",
      },
      {
        id: 2,
        title: "Chemistry: Periodic Table",
        score: 78,
        totalQuestions: 15,
        date: "2 days ago",
      },
      {
        id: 3,
        title: "Mathematics: Calculus Basics",
        score: 92,
        totalQuestions: 25,
        date: "4 days ago",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Fast Learner",
        description: "Completed 3 courses in a month",
        icon: "Award",
        date: "2 weeks ago",
      },
      {
        id: 2,
        title: "Quiz Master",
        description: "Scored 90% or higher in 5 quizzes",
        icon: "Award",
        date: "1 month ago",
      },
    ],
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12 bg-gradient-to-b from-navy-deep/5 to-orange-mid/5 dark:from-navy-deep dark:to-burgundy-dark">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div ref={headerRef} className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-orange-mid text-white text-xl">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-navy-deep dark:text-white">Welcome, {user?.name || "User"}</h1>
                  <p className="text-muted-foreground">Track your learning progress and achievements</p>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                asChild
              >
                <Link href="/courses">
                  <BookOpen className="mr-2 h-4 w-4" /> Explore Courses
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="stat-card border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                    <h3 className="text-2xl font-bold mt-1 text-navy-deep dark:text-orange-mid">
                      {userProgress.coursesCompleted}/{userProgress.totalCourses}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-orange-mid" />
                  </div>
                </div>
                <Progress
                  value={(userProgress.coursesCompleted / userProgress.totalCourses) * 100}
                  className="h-2 mt-4"
                />
              </CardContent>
            </Card>

            <Card className="stat-card border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Quizzes Taken</p>
                    <h3 className="text-2xl font-bold mt-1 text-navy-deep dark:text-orange-mid">
                      {userProgress.quizzesTaken}/{userProgress.totalQuizzes}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-orange-mid" />
                  </div>
                </div>
                <Progress value={(userProgress.quizzesTaken / userProgress.totalQuizzes) * 100} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card className="stat-card border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                    <h3 className="text-2xl font-bold mt-1 text-navy-deep dark:text-orange-mid">
                      {userProgress.averageScore}%
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-orange-mid" />
                  </div>
                </div>
                <Progress value={userProgress.averageScore} className="h-2 mt-4" />
              </CardContent>
            </Card>

            <Card className="stat-card border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                    <h3 className="text-2xl font-bold mt-1 text-navy-deep dark:text-orange-mid">
                      {userProgress.streak} days
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-mid/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-orange-mid" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Last activity: {userProgress.lastActivity}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="progress" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="progress"
                className="data-[state=active]:bg-orange-mid data-[state=active]:text-white"
              >
                My Progress
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                My Courses
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                My Quizzes
              </TabsTrigger>
            </TabsList>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
                  <CardHeader>
                    <CardTitle className="text-navy-deep dark:text-orange-mid">Learning Progress</CardTitle>
                    <CardDescription>Your course completion and quiz performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userProgress.recentCourses.map((course) => (
                        <div key={course.id} className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-navy-deep dark:text-white">{course.title}</h4>
                            <div className="flex items-center mt-1">
                              <Progress value={course.progress} className="h-2 flex-1" />
                              <span className="ml-2 text-sm text-muted-foreground">{course.progress}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Last accessed: {course.lastAccessed}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/courses">View All Courses</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50">
                  <CardHeader>
                    <CardTitle className="text-navy-deep dark:text-orange-mid">Achievements</CardTitle>
                    <CardDescription>Badges and milestones you've earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProgress.achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start space-x-3">
                          <div className="h-10 w-10 rounded-full bg-orange-mid/10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-orange-mid" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-navy-deep dark:text-white">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">Earned: {achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/achievements">View All Achievements</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProgress.recentCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="course-card border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 overflow-hidden"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-white font-semibold">{course.title}</h3>
                          <div className="flex items-center mt-1">
                            <Progress value={course.progress} className="h-1.5 flex-1 bg-white/20" />
                            <span className="ml-2 text-xs text-white">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-orange-mid hover:text-orange-deep" asChild>
                          <Link href={`/courses/${course.id}`}>
                            Continue <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes">
              <div ref={quizzesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProgress.recentQuizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="quiz-card border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-navy-deep dark:text-white">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {quiz.score}% score • {quiz.totalQuestions} questions
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Taken: {quiz.date}</p>
                        </div>
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center ${
                            quiz.score >= 80
                              ? "bg-green-500/10"
                              : quiz.score >= 60
                                ? "bg-orange-mid/10"
                                : "bg-red-mid/10"
                          }`}
                        >
                          <span
                            className={`text-sm font-bold ${
                              quiz.score >= 80
                                ? "text-green-500"
                                : quiz.score >= 60
                                  ? "text-orange-mid"
                                  : "text-red-mid"
                            }`}
                          >
                            {quiz.score}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/quizzes/${quiz.id}/review`}>Review Answers</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/quizzes/${quiz.id}`}>Retake Quiz</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
