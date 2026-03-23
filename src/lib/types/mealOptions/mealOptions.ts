import type { Meal } from "@/lib/types/meal"

export interface DayMeal {
  id: number
  meal: Meal
  mealId: number
  planDayId: number
}

export interface PlanDay {
  id: number
  day: number
  planId: number
  dayMeal: DayMeal[]
}

export interface DayMeal {
  id: number
  meal: Meal
  mealId: number
  planDayId: number
}

export interface Plan {
  id: number
  periodStart: number
  periodEnd: number
  planDay: PlanDay[]
}

// Replace with correct interface/type
export type Order = null

export interface MealOptions {
  hasOrder: boolean
  order: Order | null
  plan: Plan
  isOpen: boolean
  openingPeriodHours: number
}
