import { AuthRepository } from "../repositories/AuthRepository"

export class ChangePasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    if (!currentPassword) {
      throw new Error("Informe a senha atual.")
    }
    if (!newPassword || newPassword.length < 6) {
      throw new Error("A nova senha deve ter pelo menos 6 caracteres.")
    }
    if (newPassword !== confirmPassword) {
      throw new Error("As senhas não coincidem.")
    }
    if (currentPassword === newPassword) {
      throw new Error("A nova senha deve ser diferente da senha atual.")
    }
    await this.authRepository.changePassword(currentPassword, newPassword)
  }
}