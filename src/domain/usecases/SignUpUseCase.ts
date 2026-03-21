import { AuthRepository } from "../repositories/AuthRepository"
import { UserProfileRepository } from "../repositories/UserProfileRepository"
import { User } from "../entities/User"

export class SignUpUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    if (!firstName.trim()) throw new Error("O nome é obrigatório.")
    if (!lastName.trim()) throw new Error("O sobrenome é obrigatório.")
    if (!email || !email.includes("@")) throw new Error("E-mail inválido.")
    if (!password || password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.")
    if (password !== confirmPassword) throw new Error("As senhas não coincidem.")

    const user = await this.authRepository.signUp(email, password)

    // Salva nome e sobrenome no Firestore logo após o cadastro
    await this.userProfileRepository.saveProfile({
      id: user.id,
      email: user.email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    })

    return user
  }
}