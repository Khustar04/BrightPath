"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpen, FileText, GraduationCap, Search, ArrowRight, CheckCircle2 } from "lucide-react"
import { useSearch } from "@/contexts/search-context"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const { searchResults, isSearching, performSearch } = useSearch()
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query, performSearch])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  // Filter results based on active tab
  const filteredResults =
    activeTab === "all" ? searchResults : searchResults.filter((result) => result.type === activeTab)

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-navy-deep/5 to-orange-mid/5 dark:from-navy-deep dark:to-burgundy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6 text-navy-deep dark:text-white">Search Results</h1>

          <form onSubmit={handleSearch} className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-mid" />
            <Input
              type="search"
              placeholder="Search courses, subjects, quizzes..."
              className="pl-10 border-orange-mid/30 focus:border-orange-mid focus:ring-1 focus:ring-orange-mid bg-white/50 dark:bg-navy-deep/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white"
            >
              Search
            </Button>
          </form>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                All Results
              </TabsTrigger>
              <TabsTrigger value="subject" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                Subjects
              </TabsTrigger>
              <TabsTrigger value="course" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                Courses
              </TabsTrigger>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-orange-mid data-[state=active]:text-white">
                Quizzes
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {isSearching ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto mb-4 text-orange-mid animate-pulse" />
                  <p className="text-lg">Searching...</p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any matches for "{query}". Try different keywords or browse our categories.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/">Go to Home</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredResults.map((result, index) => (
                    <SearchResultCard key={`${result.type}-${result.id || index}`} result={result} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function SearchResultCard({ result }) {
  const getIcon = () => {
    switch (result.type) {
      case "subject":
        return <BookOpen className="h-5 w-5 text-orange-mid" />
      case "course":
        return <GraduationCap className="h-5 w-5 text-orange-mid" />
      case "quiz":
        return <CheckCircle2 className="h-5 w-5 text-orange-mid" />
      default:
        return <FileText className="h-5 w-5 text-orange-mid" />
    }
  }

  const getLink = () => {
    switch (result.type) {
      case "subject":
        return `/subjects/${result.id}`
      case "course":
        return `/courses/${result.id}`
      case "quiz":
        return `/quizzes/${result.id}`
      default:
        return "/"
    }
  }

  return (
    <Card className="border-orange-mid/20 dark:border-orange-mid/10 dark:bg-navy-deep/50 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-orange-mid/10 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-mid/10 text-orange-mid capitalize">
                {result.type}
              </span>
              {result.category && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {result.category}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-navy-deep dark:text-white">{result.title}</h3>
            <p className="text-muted-foreground mt-1 line-clamp-2">{result.description}</p>

            {result.type === "course" && (
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span className="mr-4">Instructor: {result.instructor}</span>
                <span>Duration: {result.duration}</span>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" className="text-orange-mid hover:text-orange-deep" asChild>
                <Link href={getLink()}>
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
