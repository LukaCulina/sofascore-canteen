// types.ts

export interface Meal {
  id: number
  price: number
  discount: number
  imageUrl: string
  description: string
  isVegetarian: boolean
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
  planDay: PlanDay
  createdAt: number
}

export interface Plan {
  id: number
  periodStart: number
  periodEnd: number
}

export interface RawOrder {
  id: number
  userId: string
  planId?: number
  status: string
  submittedAt: number
  createdAt: number
  updatedAt?: number
  plan: Plan
  orderSelection: OrderSelection[]
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
}