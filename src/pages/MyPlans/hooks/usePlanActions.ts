import { useEffect, useState } from "react"
import { requestJson } from "@/api/http-client"
import { planById } from "@/api/routes"
import { useAsyncAction } from "@/hooks/useAsyncAction"
import type { Plan } from "@/types"

const getMealIds = (plan: Plan): Record<number, number[]> =>
  Object.fromEntries(plan.plan_day.map((day) => [day.id, day.day_meal.map((dm) => dm.meal.id)]))

export const usePlanActions = (plan: Plan, onMutate: () => void) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [editedMeals, setEditedMeals] = useState<Record<number, number[]>>(getMealIds(plan))

  useEffect(() => {
    setEditedMeals(getMealIds(plan))
  }, [plan])

  const deletePlan = useAsyncAction(async () => {
    await requestJson("DELETE", planById(plan.id))
    onMutate()
    setShowConfirm(false)
  }, "Failed to delete plan. Please try again.")

  const savePlan = useAsyncAction(async () => {
    await requestJson("PUT", planById(plan.id), {
      days: Object.entries(editedMeals).map(([planDayId, mealIds]) => ({
        plan_day_id: Number(planDayId),
        meal_ids: mealIds,
      })),
    })
    onMutate()
    setIsEditing(false)
  }, "Failed to save changes. Please try again.")

  const toggleMeal = (planDayId: number, mealId: number) => {
    setEditedMeals((prev) => {
      const current = prev[planDayId] ?? []
      return {
        ...prev,
        [planDayId]: current.includes(mealId)
          ? current.filter((id) => id !== mealId)
          : [...current, mealId],
      }
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedMeals(getMealIds(plan))
  }

  return {
    isEditing,
    setIsEditing,
    showConfirm,
    setShowConfirm,
    editedMeals,
    toggleMeal,
    handleCancelEdit,
    deletePlan,
    savePlan,
  }
}
