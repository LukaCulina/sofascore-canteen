export interface Meal {
  id: number
  price: number
  discount: number
  image_url: string
  description: string
  is_vegetarian: boolean
  averageRating?: number
  reviewCount?: number
}
