import { UserProfileRepository } from "../repositories/UserProfileRepository"
import { UserProfile } from "../entities/UserProfile"

export class SaveUserProfileUseCase {
  constructor(private readonly repository: UserProfileRepository) {}

  async execute(profile: UserProfile, photoFile?: File): Promise<void> {
    if (!profile.firstName.trim()) {
      throw new Error("O nome é obrigatório.")
    }
    if (!profile.lastName.trim()) {
      throw new Error("O sobrenome é obrigatório.")
    }

    let updatedProfile = { ...profile }

    if (photoFile) {
      const photoURL = await this.repository.uploadPhoto(profile.id, photoFile)
      updatedProfile = { ...updatedProfile, photoURL }
    }

    await this.repository.saveProfile(updatedProfile)
  }
}