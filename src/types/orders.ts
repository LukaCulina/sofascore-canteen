import type { Meal } from "./meal"
import type { Plan } from "./mealPlan"
import type { Transfer } from "./transfer"

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

export interface OrderUser {
  name: string
  email: string
}
