"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Send, Bot, BookOpen, GraduationCap, FileText } from "lucide-react"
import { gsap } from "gsap"

// Mock data for AI responses
const aiResponses = {
  greeting: {
    text: "Hello! I'm your EduPath AI Assistant. I can help you with academic guidance, learning resources, and career planning. What would you like to know today?",
    suggestions: [
      "Tell me about engineering careers",
      "How to prepare for board exams?",
      "Recommend study materials for Class 12 Physics",
    ],
  },
  fallback: {
    text: "I'm not sure I understand. Could you please rephrase your question? I can help with academic guidance, learning resources, and career planning.",
    suggestions: ["Show me career options", "Help me create a study plan", "Recommend learning resources"],
  },
  "engineering careers": {
    text: "Engineering offers diverse career paths across multiple disciplines. Popular branches include Computer Science, Mechanical, Electrical, Civil, and Chemical Engineering. Each requires specific skills and offers unique opportunities.",
    links: [
      { text: "Computer Science Engineering Roadmap", url: "/roadmap/cse" },
      { text: "Engineering Entrance Exam Guide", url: "/resources/engineering-exams" },
    ],
    suggestions: ["What skills do I need for CSE?", "Top engineering colleges", "Engineering vs Medicine"],
  },
  "board exams": {
    text: "Preparing for board exams requires a structured approach. Start by understanding the syllabus, create a study schedule, practice with previous year papers, and take regular mock tests to assess your preparation.",
    links: [
      { text: "Board Exam Preparation Guide", url: "/resources/board-exam-prep" },
      { text: "Previous Year Question Papers", url: "/question-bank/board-exams" },
    ],
    suggestions: ["How to manage exam stress?", "Time management tips", "Important topics for Physics"],
  },
  physics: {
    text: "For Class 12 Physics, focus on understanding core concepts rather than memorization. Key topics include Electrostatics, Current Electricity, Magnetism, Optics, and Modern Physics. Regular problem-solving is essential.",
    links: [
      { text: "Class 12 Physics Study Material", url: "/resources/class-12/physics" },
      { text: "Physics Video Lectures", url: "/resources/videos/physics" },
    ],
    suggestions: ["Difficult topics in Physics", "Physics experiment ideas", "Physics numericals practice"],
  },
  "study plan": {
    text: "An effective study plan balances all subjects, includes regular revision, and accounts for your peak productivity hours. I recommend the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break.",
    links: [
      { text: "Customizable Study Planner", url: "/tools/study-planner" },
      { text: "Effective Study Techniques", url: "/resources/study-techniques" },
    ],
    suggestions: ["How many hours should I study?", "Weekend study routine", "Balancing studies and hobbies"],
  },
}

export default function AssistantPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    // Add greeting message when component mounts
    setTimeout(() => {
      handleAIResponse(aiResponses.greeting)
    }, 500)

    // GSAP animation for the chat interface
    gsap.fromTo(
      chatContainerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
    )
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { type: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      // Find response based on keywords
      const userInput = input.toLowerCase()
      let response

      if (userInput.includes("engineering") || userInput.includes("career")) {
        response = aiResponses["engineering careers"]
      } else if (userInput.includes("board") || userInput.includes("exam")) {
        response = aiResponses["board exams"]
      } else if (userInput.includes("physics")) {
        response = aiResponses["physics"]
      } else if (userInput.includes("study plan") || userInput.includes("schedule")) {
        response = aiResponses["study plan"]
      } else {
        response = aiResponses.fallback
      }

      handleAIResponse(response)
      setIsTyping(false)
    }, 1500)
  }

  const handleAIResponse = (response) => {
    const aiMessage = {
      type: "ai",
      text: response.text,
      links: response.links || [],
      suggestions: response.suggestions || [],
    }
    setMessages((prev) => [...prev, aiMessage])
  }

  const handleSuggestionClick = (suggestion) => {
    // Add user message with the suggestion
    const userMessage = { type: "user", text: suggestion }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      // Find response based on keywords
      const userInput = suggestion.toLowerCase()
      let response

      if (userInput.includes("engineering") || userInput.includes("career")) {
        response = aiResponses["engineering careers"]
      } else if (userInput.includes("board") || userInput.includes("exam")) {
        response = aiResponses["board exams"]
      } else if (userInput.includes("physics")) {
        response = aiResponses["physics"]
      } else if (userInput.includes("study plan") || userInput.includes("schedule")) {
        response = aiResponses["study plan"]
      } else {
        response = aiResponses.fallback
      }

      handleAIResponse(response)
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Learning Assistant</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized academic guidance, learning resources, and career advice from our AI assistant.
            </p>
          </div>

          <Card ref={chatContainerRef} className="border shadow-lg">
            <CardContent className="p-0">
              {/* Chat header */}
              <div className="border-b p-4 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">EduPath Assistant</h2>
                  <p className="text-sm text-muted-foreground">Academic guidance & career advice</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                          : "bg-secondary rounded-tl-lg rounded-tr-lg rounded-br-lg"
                      } p-4`}
                    >
                      {message.type === "ai" && (
                        <div className="flex items-center mb-2">
                          <Avatar className="h-6 w-6 mr-2">
                            <Bot className="h-4 w-4" />
                          </Avatar>
                          <span className="font-semibold text-sm">EduPath Assistant</span>
                        </div>
                      )}
                      <p>{message.text}</p>

                      {/* Resource links */}
                      {message.links && message.links.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm font-medium">Recommended Resources:</p>
                          <div className="flex flex-col space-y-2">
                            {message.links.map((link, i) => (
                              <a key={i} href={link.url} className="text-sm flex items-center hover:underline">
                                <FileText className="h-3 w-3 mr-1" />
                                {link.text}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">You might want to ask:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, i) => (
                              <button
                                key={i}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs bg-background hover:bg-primary/10 rounded-full px-3 py-1 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* AI typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <Bot className="h-4 w-4" />
                        </Avatar>
                        <div className="flex space-x-1">
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "600ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about courses, careers, study tips..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Features section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background/50">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learning Guidance</h3>
                <p className="text-muted-foreground">
                  Get personalized study plans, resource recommendations, and help with difficult concepts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Career Advice</h3>
                <p className="text-muted-foreground">
                  Explore career options, understand requirements, and get guidance on educational pathways.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Resource Finder</h3>
                <p className="text-muted-foreground">
                  Discover the best study materials, video lectures, practice questions, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
