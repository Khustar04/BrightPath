"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("edupath_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    // In a real app, this would validate credentials with an API
    setUser(userData)
    localStorage.setItem("edupath_user", JSON.stringify(userData))
    return true
  }

  const signup = (userData) => {
    // In a real app, this would register the user with an API
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      progress: {
        courses: {},
        quizzes: {},
        lastActivity: new Date().toISOString(),
      },
    }
    setUser(newUser)
    localStorage.setItem("edupath_user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("edupath_user")
    router.push("/")
  }

  const updateProgress = (progressData) => {
    if (!user) return false

    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        ...progressData,
        lastActivity: new Date().toISOString(),
      },
    }
    setUser(updatedUser)
    localStorage.setItem("edupath_user", JSON.stringify(updatedUser))
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateProgress }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
