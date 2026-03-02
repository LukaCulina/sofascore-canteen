import type { User } from "@/stores/auth"

export interface LoginResponse {
  message: string
  refreshToken: string
  token: string
  user: User
}
