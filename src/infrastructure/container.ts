import { FirebaseAuthRepository } from "../infrastructure/repositories/FirebaseAuthRepository"
import { SignInUseCase } from "../domain/usecases/SignInUseCase"
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase"
import { ForgotPasswordUseCase } from "../domain/usecases/ForgotPasswordUseCase"
import { SignOutUseCase } from "../domain/usecases/SignOutUseCase"

const authRepository = new FirebaseAuthRepository()

export const signInUseCase = new SignInUseCase(authRepository)
export const signUpUseCase = new SignUpUseCase(authRepository)
export const forgotPasswordUseCase = new ForgotPasswordUseCase()
export const signOutUseCase = new SignOutUseCase(authRepository)