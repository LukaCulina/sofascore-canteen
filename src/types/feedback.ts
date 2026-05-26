export interface Feedback {
  id: number
  user_display_name: string
  rating: number
  message?: string | null
  created_at: number
}

export interface FeedbackResponse {
  feedback: Feedback[]
}
