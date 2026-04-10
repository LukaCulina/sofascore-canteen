import type { Plan } from "./mealPlan"
import type { Order } from "./orders"

export interface MealOptions {
  hasOrder: boolean
  order: Order | null
  plan: Plan
  isOpen: boolean
  openingPeriodHours: number
}
