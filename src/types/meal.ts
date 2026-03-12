export interface Meal {
  id: number
  description: string
  price: number
  isVegetarian: boolean
  discount: number
  imageUrl: string
  averageRating?: number
  reviewCount: number
}
