"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { quizzesData } from "@/data/quizzes"

export default function QuizPage({ params }) {
  const { id } = params

  // Find the quiz in all categories
  const quiz = Object.values(quizzesData)
    .flat()
    .find((q) => q.id === id)

  const router = useRouter()
  const { user, updateProgress } = useAuth()
  const { toast } = useToast()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.timeLimit * 60 : 0) // in seconds
  const [quizState, setQuizState] = useState("in-progress") // in-progress, completed, review
  const [quizResult, setQuizResult] = useState(null)

  const questionCardRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!quiz) {
      router.push("/quizzes")
      return
    }

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          submitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Animate question card
    animateQuestionCard()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [quiz, router])

  useEffect(() => {
    // Animate question card when changing questions
    if (quizState === "in-progress") {
      animateQuestionCard()
    }
  }, [currentQuestion, quizState])

  const animateQuestionCard = () => {
    if (questionCardRef.current) {
      gsap.fromTo(
        questionCardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      )
    }
  }

  const handleAnswer = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  const goToNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const submitQuiz = () => {
    // Stop timer
    clearInterval(timerRef.current)

    // Calculate score
    let correctAnswers = 0
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    // Set quiz result
    setQuizResult({
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      passed,
      timeTaken: quiz.timeLimit * 60 - timeLeft,
    })

    // Change quiz state
    setQuizState("completed")

    // If user is logged in, update their progress
    if (user) {
      // Check if this quiz is already in completed quizzes
      const subjectProgress = user.progress.subjects?.[quiz.subjectId] || {
        completedLessons: [],
        completedQuizzes: [],
        overallProgress: 0,
      }

      if (!subjectProgress.completedQuizzes.includes(quiz.id)) {
        const updatedCompletedQuizzes = [...subjectProgress.completedQuizzes, quiz.id]

        updateProgress({
          subjects: {
            ...user.progress.subjects,
            [quiz.subjectId]: {
              ...subjectProgress,
              completedQuizzes: updatedCompletedQuizzes,
            },
          },
          quizzes: {
            ...user.progress.quizzes,
            [quiz.id]: {
              score,
              date: new Date().toISOString(),
              timeTaken: quiz.timeLimit * 60 - timeLeft,
            },
          },
        })
      } else {
        // Just update the quiz score
        updateProgress({
          quizzes: {
            ...user.progress.quizzes,
            [quiz.id]: {
              score,
              date: new Date().toISOString(),
              timeTaken: quiz.timeLimit * 60 - timeLeft,
            },
          },
        })
      }
    }

    // Show toast notification
    toast({
      title: passed ? "Quiz Completed Successfully!" : "Quiz Completed",
      description: `You scored ${score}% (${correctAnswers}/${quiz.questions.length})`,
      variant: passed ? "success" : "default",
    })
  }

  const reviewQuiz = () => {
    setQuizState("review")
    setCurrentQuestion(0)
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
          <p className="text-muted-foreground mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/quizzes">Browse Quizzes</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Format time left
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get current question
  const question = quiz.questions[currentQuestion]

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-navy-deep/5 to-orange-mid/5 dark:from-navy-deep dark:to-burgundy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-navy-deep dark:text-white">{quiz.title}</h1>
                <p className="text-muted-foreground">
                  Subject:{" "}
                  <Link href={`/subjects/${quiz.subjectId}`} className="text-orange-mid hover:underline">
                    {quiz.subject}
                  </Link>
                </p>
              </div>

              {quizState === "in-progress" && (
                <div className="flex items-center mt-4 md:mt-0 bg-orange-mid/10 text-orange-mid px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>

            {quizState === "in-progress" && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </p>
                  <p className="text-sm font-medium">
                    {Object.keys(answers).length} of {quiz.questions.length} answered
                  </p>
                </div>
                <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2" />
              </div>
            )}
          </div>

          {/* Quiz Content */}
          {quizState === "in-progress" && (
            <Card
              ref={questionCardRef}
              className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 mb-6"
            >
              <CardHeader>
                <CardTitle className="text-xl text-navy-deep dark:text-white">
                  {currentQuestion + 1}. {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  className="space-y-4"
                >
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 p-3 rounded-md hover:bg-orange-mid/5 transition-colors"
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={`option-${option.id}`}
                        className="text-orange-mid border-orange-mid/50"
                      />
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPrevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                {currentQuestion < quiz.questions.length - 1 ? (
                  <Button
                    onClick={goToNextQuestion}
                    className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={submitQuiz}
                    className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                  >
                    Submit Quiz
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}

          {/* Quiz Navigation */}
          {quizState === "in-progress" && (
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
              {quiz.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={currentQuestion === index ? "default" : answers[q.id] ? "outline" : "secondary"}
                  className={`h-10 w-10 p-0 ${
                    currentQuestion === index
                      ? "bg-orange-mid text-white"
                      : answers[q.id]
                        ? "border-orange-mid text-orange-mid"
                        : ""
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}

          {/* Quiz Results */}
          {quizState === "completed" && quizResult && (
            <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-navy-deep dark:text-white">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div
                    className={`h-24 w-24 rounded-full flex items-center justify-center mb-4 ${
                      quizResult.passed ? "bg-green-500/10" : "bg-red-mid/10"
                    }`}
                  >
                    {quizResult.passed ? (
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    ) : (
                      <XCircle className="h-12 w-12 text-red-mid" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    {quizResult.passed ? "Congratulations!" : "Better luck next time!"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {quizResult.passed
                      ? "You've successfully passed the quiz."
                      : "You didn't meet the passing score this time."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-secondary/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                    <p className="text-2xl font-bold text-navy-deep dark:text-orange-mid">{quizResult.score}%</p>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Passing Score</p>
                    <p className="text-2xl font-bold text-navy-deep dark:text-orange-mid">{quiz.passingScore}%</p>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Correct Answers</p>
                    <p className="text-2xl font-bold text-navy-deep dark:text-orange-mid">
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Time Taken</p>
                    <p className="text-2xl font-bold text-navy-deep dark:text-orange-mid">
                      {formatTime(quizResult.timeTaken)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                    onClick={reviewQuiz}
                  >
                    Review Answers
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                    asChild
                  >
                    <Link href={`/subjects/${quiz.subjectId}`}>Continue Learning</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Mode */}
          {quizState === "review" && (
            <Card
              ref={questionCardRef}
              className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 mb-6"
            >
              <CardHeader>
                <CardTitle className="text-xl text-navy-deep dark:text-white">
                  {currentQuestion + 1}. {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option.id
                    const isCorrect = option.id === question.correctAnswer

                    return (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 p-3 rounded-md ${
                          isCorrect ? "bg-green-500/10" : isSelected && !isCorrect ? "bg-red-mid/10" : "bg-secondary/20"
                        }`}
                      >
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isCorrect ? "text-green-500" : isSelected && !isCorrect ? "text-red-mid" : ""
                            }`}
                          >
                            {option.text}
                          </p>
                        </div>
                        {isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-mid" />}
                      </div>
                    )
                  })}
                </div>

                {question.explanation && (
                  <div className="mt-6 p-4 bg-orange-mid/10 rounded-lg">
                    <p className="font-medium text-orange-mid mb-1">Explanation:</p>
                    <p className="text-muted-foreground">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPrevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-orange-mid/30 hover:bg-orange-mid/10 hover:border-orange-mid"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                {currentQuestion < quiz.questions.length - 1 ? (
                  <Button
                    onClick={goToNextQuestion}
                    className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
                    asChild
                  >
                    <Link href={`/subjects/${quiz.subjectId}`}>Finish Review</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
