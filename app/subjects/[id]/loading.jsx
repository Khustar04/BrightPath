import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-orange-mid animate-spin mb-4" />
        <p className="text-lg font-medium">Loading subject details...</p>
      </div>
    </div>
  )
}
