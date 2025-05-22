"use client"

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"

// Mock data for search
import { subjectsData } from "@/data/subjects"
import { coursesData } from "@/data/courses"
import { quizzesData } from "@/data/quizzes"

const SearchContext = createContext({})

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const performSearch = (query) => {
    if (!query || query.trim() === "") {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // In a real app, this would be an API call
    const q = query.toLowerCase()

    // Search in subjects
    const subjectResults = Object.values(subjectsData)
      .flat()
      .filter(
        (subject) =>
          subject.title.toLowerCase().includes(q) ||
          subject.description.toLowerCase().includes(q) ||
          subject.topics.some((topic) => topic.title.toLowerCase().includes(q)),
      )
      .map((item) => ({ ...item, type: "subject" }))

    // Search in courses
    const courseResults = Object.values(coursesData)
      .flat()
      .filter(
        (course) =>
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q) ||
          course.category.toLowerCase().includes(q),
      )
      .map((item) => ({ ...item, type: "course" }))

    // Search in quizzes
    const quizResults = Object.values(quizzesData)
      .flat()
      .filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(q) ||
          quiz.description.toLowerCase().includes(q) ||
          quiz.subject.toLowerCase().includes(q),
      )
      .map((item) => ({ ...item, type: "quiz" }))

    // Combine and sort results
    const allResults = [...subjectResults, ...courseResults, ...quizResults]

    setSearchResults(allResults)
    setIsSearching(false)

    // Navigate to search results page if not already there
    if (window.location.pathname !== "/search") {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const clearSearch = () => {
    setSearchResults([])
  }

  return (
    <SearchContext.Provider value={{ searchResults, isSearching, performSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
