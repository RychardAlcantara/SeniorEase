import { AuthRepository } from "../repositories/AuthRepository"
import { User } from "../entities/User"

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    if (!email || !email.includes("@")) {
      throw new Error("E-mail inválido.")
    }
    if (!password || password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.")
    }
    return this.authRepository.signIn(email, password)
  }
}
