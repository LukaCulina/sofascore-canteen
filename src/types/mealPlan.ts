import type { DayMeal } from "./meal"

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
