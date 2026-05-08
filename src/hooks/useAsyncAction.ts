import { useState } from "react"

export const useAsyncAction = (
  fn: () => Promise<void>,
  errorMessage = "Something went wrong. Please try again.",
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await fn()
    } catch {
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, execute }
}
