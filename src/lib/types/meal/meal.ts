export interface Meal {
  id: number
  price: number
  discount: number
  imageUrl: string
  description: string
  isVegetarian: boolean
  averageRating?: number
  reviewCount?: number
}
