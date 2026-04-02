export interface Meal {
  id: number
  description: string
  price: number
  is_vegetarian: boolean
  discount: number
  image_url: string
  average_rating?: number
  review_count?: number
}
