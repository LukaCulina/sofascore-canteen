import { useEffect, useState } from "react"
import { requestJson } from "@/api/http-client"
import { planById } from "@/api/routes"
import { useToastStore } from "@/stores/toast"
import type { Plan } from "@/types"

const getMealIds = (plan: Plan): Record<number, number[]> =>
  Object.fromEntries(plan.plan_day.map((day) => [day.id, day.day_meal.map((dm) => dm.meal.id)]))

export const usePlanActions = (
  plan: Plan,
  onMutate: () => Promise<unknown | Plan[] | undefined>,
) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [editedMeals, setEditedMeals] = useState<Record<number, number[]>>(getMealIds(plan))

  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const addToast = useToastStore((s) => s.addToast)

  useEffect(() => {
    setEditedMeals(getMealIds(plan))
  }, [plan])

  const deletePlan = async () => {
    setIsDeleting(true)
    try {
      await requestJson("DELETE", planById(plan.id))
      await onMutate()
      setShowConfirm(false)
      addToast("Plan deleted successfully.", "success")
    } catch {
      addToast("Failed to delete plan. Please try again.", "error")
    } finally {
      setIsDeleting(false)
    }
  }

  const savePlan = async () => {
    setIsSaving(true)
    try {
      await requestJson("PUT", planById(plan.id), {
        days: Object.entries(editedMeals).map(([planDayId, mealIds]) => ({
          plan_day_id: Number(planDayId),
          meal_ids: mealIds,
        })),
      })
      await onMutate()
      setIsEditing(false)
      addToast("Plan updated successfully.", "success")
    } catch {
      addToast("Failed to save changes. Please try again.", "error")
    } finally {
      setIsSaving(false)
    }
  }

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
    isDeleting,
    isSaving,
  }
}
