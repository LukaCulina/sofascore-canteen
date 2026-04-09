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

export interface MealApiResponse {
  meals: {
    id: number
    description: string
    price: number
    is_vegetarian: boolean
    discount: number
    image_url: string
    average_rating?: number
    review_count: number
  }[]
}

export function transformMeal(apiMeal: MealApiResponse["meals"][0]): Meal {
  return {
    id: apiMeal.id,
    description: apiMeal.description,
    price: apiMeal.price,
    isVegetarian: apiMeal.is_vegetarian,
    discount: apiMeal.discount,
    imageUrl: apiMeal.image_url,
    averageRating: apiMeal.average_rating,
    reviewCount: apiMeal.review_count,
  }
}
