export interface Meal {
  id: number
  price: number
  discount: number
  image_url: string
  description: string
  is_vegetarian: boolean
}

export interface PlanDay {
  id: number
  day: number
  planId: number
}

export interface OrderSelection {
  id: number
  meal: Meal
  order_id?: number
  plan_day: PlanDay
  created_at: number
  unpaid: boolean
}

export interface Plan {
  id: number
  period_start: number
  period_end: number
}

export interface RawOrder {
  id: number
  user_id: string
  plan_id?: number
  status: string
  submitted_at: number
  created_at: number
  updated_at?: number
  plan: Plan
  order_selection: OrderSelection[]
  user: {
    name: string
    email: string
  }
}

export interface ProcessedOrder {
  id: number
  user: string
  period: string
  submitted: string
  meals: number
  discount: number
  total: number
  orderSelection: OrderSelection[]
  hasUnpaid: boolean
}
