import { AuthRepository } from "../repositories/AuthRepository"
import { User } from "../entities/User"

export class SignUpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string, confirmPassword: string, displayName?: string): Promise<User> {
    if (!email || !email.includes("@")) {
      throw new Error("E-mail inválido.")
    }
    if (!password || password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.")
    }
    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem.")
    }
    return this.authRepository.signUp(email, password, displayName)
  }
}
