import { UserProfile } from "../entities/UserProfile"

export interface UserProfileRepository {
  getProfile(userId: string): Promise<UserProfile | null>
  saveProfile(profile: UserProfile): Promise<void>
  uploadPhoto(userId: string, file: File): Promise<string>
}