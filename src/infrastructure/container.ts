import { FirebaseAuthRepository } from "../infrastructure/repositories/FirebaseAuthRepository"
import { SignInUseCase } from "../domain/usecases/SignInUseCase"
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase"
import { ForgotPasswordUseCase } from "../domain/usecases/ForgotPasswordUseCase"

// Instância única do repositório (Singleton)
const authRepository = new FirebaseAuthRepository()

// Casos de uso com repositório injetado
export const signInUseCase = new SignInUseCase(authRepository)
export const signUpUseCase = new SignUpUseCase(authRepository)
export const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository)
