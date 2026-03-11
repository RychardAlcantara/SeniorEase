import { AuthRepository } from "../repositories/AuthRepository"

export class ForgotPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string): Promise<void> {
    if (!email || !email.includes("@")) {
      throw new Error("Informe um e-mail válido.")
    }
    return this.authRepository.sendPasswordResetEmail(email)
  }
}
