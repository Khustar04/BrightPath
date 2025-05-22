"use client"

// Re-export the useToast hook from use-toast.js
import { useToast as useToastHook } from "./toast.jsx"

// Create a singleton instance of the toast function for direct imports
let toastInstance

// Create a standalone toast function that can be imported directly
export function toast(props) {
  if (typeof window === "undefined") return { id: "server-toast", dismiss: () => {} }

  if (!toastInstance) {
    // This is a workaround for the first render
    // We'll update this on the next render cycle
    return { id: "temp-toast", dismiss: () => {} }
  }

  return toastInstance(props)
}

// Export the hook with a wrapper to capture the toast function
export function useToast() {
  const hookResult = useToastHook()

  // Store the toast function for direct imports
  if (typeof window !== "undefined") {
    toastInstance = hookResult.toast
  }

  return hookResult
}
