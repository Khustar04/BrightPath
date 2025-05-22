"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Download, Search, Filter, BookOpen } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Mock data for question papers
const questionPapers = [
  {
    id: 1,
    title: "CBSE Class 12 Physics 2023",
    category: "class-12",
    subject: "Physics",
    year: "2023",
    type: "Board Exam",
    downloadUrl: "#",
    questions: 35,
    marks: 70,
    duration: "3 hours",
  },
  {
    id: 2,
    title: "CBSE Class 12 Chemistry 2023",
    category: "class-12",
    subject: "Chemistry",
    year: "2023",
    type: "Board Exam",
    downloadUrl: "#",
    questions: 33,
    marks: 70,
    duration: "3 hours",
  },
  {
    id: 3,
    title: "CBSE Class 12 Mathematics 2023",
    category: "class-12",
    subject: "Mathematics",
    year: "2023",
    type: "Board Exam",
    downloadUrl: "#",
    questions: 38,
    marks: 80,
    duration: "3 hours",
  },
  {
    id: 4,
    title: "CBSE Class 11 Physics 2023",
    category: "class-11",
    subject: "Physics",
    year: "2023",
    type: "Board Exam",
    downloadUrl: "#",
    questions: 30,
    marks: 70,
    duration: "3 hours",
  },
  {
    id: 5,
    title: "JEE Main 2023 Paper 1",
    category: "graduation",
    subject: "PCM",
    year: "2023",
    type: "Entrance Exam",
    downloadUrl: "#",
    questions: 90,
    marks: 300,
    duration: "3 hours",
  },
  {
    id: 6,
    title: "NEET 2023",
    category: "graduation",
    subject: "PCB",
    year: "2023",
    type: "Entrance Exam",
    downloadUrl: "#",
    questions: 180,
    marks: 720,
    duration: "3 hours 20 minutes",
  },
  {
    id: 7,
    title: "GATE CSE 2023",
    category: "masters",
    subject: "Computer Science",
    year: "2023",
    type: "Entrance Exam",
    downloadUrl: "#",
    questions: 65,
    marks: 100,
    duration: "3 hours",
  },
  {
    id: 8,
    title: "CAT 2023",
    category: "masters",
    subject: "MBA",
    year: "2023",
    type: "Entrance Exam",
    downloadUrl: "#",
    questions: 66,
    marks: 198,
    duration: "2 hours",
  },
]

export default function QuestionBankPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    subject: "",
    year: "",
    type: "",
  })
  const [filteredPapers, setFilteredPapers] = useState(questionPapers)

  const heroRef = useRef(null)
  const filtersRef = useRef(null)
  const papersRef = useRef(null)

  useEffect(() => {
    // Animate hero section
    gsap.fromTo(
      heroRef.current.querySelectorAll(".animate-item"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      },
    )

    // Animate filters section
    gsap.fromTo(
      filtersRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      },
    )

    // Animate papers section
    gsap.fromTo(
      papersRef.current.querySelectorAll(".paper-card"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: papersRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  useEffect(() => {
    // Filter papers based on search term and filters
    const results = questionPapers.filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.subject.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filters.category === "" || paper.category === filters.category
      const matchesSubject = filters.subject === "" || paper.subject === filters.subject
      const matchesYear = filters.year === "" || paper.year === filters.year
      const matchesType = filters.type === "" || paper.type === filters.type

      return matchesSearch && matchesCategory && matchesSubject && matchesYear && matchesType
    })

    setFilteredPapers(results)
  }, [searchTerm, filters])

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      subject: "",
      year: "",
      type: "",
    })
    setSearchTerm("")
  }

  // Get unique values for filter options
  const getUniqueValues = (field) => {
    return [...new Set(questionPapers.map((paper) => paper[field]))]
  }

  const categories = getUniqueValues("category")
  const subjects = getUniqueValues("subject")
  const years = getUniqueValues("year")
  const types = getUniqueValues("type")

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-item">Question Bank</h1>
            <p className="text-xl text-muted-foreground mb-8 animate-item">
              Access previous year question papers for board exams, entrance tests, and competitive exams.
            </p>
            <div className="relative max-w-xl mx-auto animate-item">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by exam name, subject..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <div ref={filtersRef} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Filters
            </h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Education Level</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category === "class-11"
                        ? "Class 11th"
                        : category === "class-12"
                          ? "Class 12th"
                          : category === "graduation"
                            ? "Graduation"
                            : category === "masters"
                              ? "Master's"
                              : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Select value={filters.subject} onValueChange={(value) => handleFilterChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject, index) => (
                    <SelectItem key={index} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Year</label>
              <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year, index) => (
                    <SelectItem key={index} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Exam Type</label>
              <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div ref={papersRef}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Question Papers</h2>
            <p className="text-muted-foreground">{filteredPapers.length} results found</p>
          </div>

          {filteredPapers.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No question papers found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPapers.map((paper) => (
                <Card key={paper.id} className="paper-card hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {paper.type}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {paper.year}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {paper.subject}
                          </span>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="details">
                            <AccordionTrigger className="text-sm py-2">View Details</AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Questions</p>
                                  <p className="text-muted-foreground">{paper.questions}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Marks</p>
                                  <p className="text-muted-foreground">{paper.marks}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Duration</p>
                                  <p className="text-muted-foreground">{paper.duration}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination placeholder */}
          {filteredPapers.length > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <span className="text-muted-foreground">...</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  8
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Answer Keys</h3>
                <p className="text-muted-foreground mb-4">
                  Access official answer keys and solutions for all question papers.
                </p>
                <Button variant="outline" size="sm">
                  View Answer Keys
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Marking Schemes</h3>
                <p className="text-muted-foreground mb-4">
                  Understand how marks are allocated for different types of questions.
                </p>
                <Button variant="outline" size="sm">
                  View Marking Schemes
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Study Guides</h3>
                <p className="text-muted-foreground mb-4">Get exam-specific study guides and preparation strategies.</p>
                <Button variant="outline" size="sm">
                  View Study Guides
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
