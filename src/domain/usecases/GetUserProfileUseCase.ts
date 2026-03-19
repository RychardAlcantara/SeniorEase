import { UserProfileRepository } from "../repositories/UserProfileRepository"
import { UserProfile } from "../entities/UserProfile"

export class GetUserProfileUseCase {
  constructor(private readonly repository: UserProfileRepository) {}

  async execute(userId: string): Promise<UserProfile | null> {
    return this.repository.getProfile(userId)
  }
}