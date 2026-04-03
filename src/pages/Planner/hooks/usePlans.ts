import useSWR from "swr"
import { plans } from "@/api/routes"

interface PlanDetail {
  id: number
  period_start: number
  period_end: number
}

export const usePlans = () => {
  const { data, error, isLoading } = useSWR<PlanDetail[]>(plans())

  return {
    plans: data ?? [],
    isLoading,
    error,
  }
}
