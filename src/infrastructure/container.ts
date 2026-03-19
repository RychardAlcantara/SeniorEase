import { FirebaseAuthRepository } from "./repositories/FirebaseAuthRepository"
import { FirebaseUserProfileRepository } from "./repositories/FirebaseUserProfileRepository"
import { SignInUseCase } from "../domain/usecases/SignInUseCase"
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase"
import { SignOutUseCase } from "../domain/usecases/SignOutUseCase"
import { ForgotPasswordUseCase } from "../domain/usecases/ForgotPasswordUseCase"
import { ChangePasswordUseCase } from "../domain/usecases/Changepasswordusecase"
import { GetUserProfileUseCase } from "../domain/usecases/GetUserProfileUseCase"
import { SaveUserProfileUseCase } from "../domain/usecases/SaveUserProfileUseCase"

const authRepository = new FirebaseAuthRepository()
const userProfileRepository = new FirebaseUserProfileRepository()

export const signInUseCase = new SignInUseCase(authRepository)
export const signUpUseCase = new SignUpUseCase(authRepository, userProfileRepository)
export const signOutUseCase = new SignOutUseCase(authRepository)
export const forgotPasswordUseCase = new ForgotPasswordUseCase()
export const changePasswordUseCase = new ChangePasswordUseCase(authRepository)
export const getUserProfileUseCase = new GetUserProfileUseCase(userProfileRepository)
export const saveUserProfileUseCase = new SaveUserProfileUseCase(userProfileRepository)