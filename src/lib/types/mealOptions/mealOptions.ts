import type { Meal } from "@/lib/types/meal"

export interface DayMeal {
  meal: Meal
}

export interface PlanDay {
  id: number
  day: number
  day_meal: DayMeal[]
}

export interface Plan {
  id: number
  period_start: number
  period_end: number
  plan_day: PlanDay[]
}

export interface Transfer {
  user_id: string
  to_user_display_name: string
}

export interface OrderSelection {
  id: number
  order_id: number
  plan_day_id: number
  meal_id: number
  unpaid: boolean
  created_at: number
  meal: Meal
  plan_day: {
    id: number
    day: number
    planId: number
  }
  transfer?: Transfer
}

export interface OrderUser {
  name: string
  email: string
}

export interface Order {
  id: number
  user_id: string
  plan_id: number
  status: "submitted" | string
  submitted_at: number
  created_at: number
  updated_at: number
  plan: Plan
  order_selection: OrderSelection[]
  user: OrderUser
}

export interface MealOptions {
  hasOrder: boolean
  order: Order | null
  plan: Plan
  isOpen: boolean
  openingPeriodHours: number
}
