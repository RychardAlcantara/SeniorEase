import { User } from "../entities/User"

export interface AuthRepository {
  signIn(email: string, password: string): Promise<User>
  signUp(email: string, password: string, displayName?: string): Promise<User>
  sendPasswordResetEmail(email: string): Promise<void>
  signOut(): Promise<void>
  getCurrentUser(): User | null
}
