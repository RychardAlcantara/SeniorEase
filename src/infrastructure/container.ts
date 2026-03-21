import { FirebaseAuthRepository } from "./repositories/FirebaseAuthRepository";
import { FirebaseUserProfileRepository } from "./repositories/FirebaseUserProfileRepository"
import { SignInUseCase } from "../domain/usecases/SignInUseCase";
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase";
import { SignOutUseCase } from "../domain/usecases/SignOutUseCase"
import { ForgotPasswordUseCase } from "../domain/usecases/ForgotPasswordUseCase";
import { ChangePasswordUseCase } from "../domain/usecases/Changepasswordusecase"
import { GetUserProfileUseCase } from "../domain/usecases/GetUserProfileUseCase"
import { SaveUserProfileUseCase } from "../domain/usecases/SaveUserProfileUseCase";
import { TaskRepositoryImpl } from "./repositories/TaskRepositoryImpl";
import { CreateTask } from "../domain/usecases/CreateTask";
import { GetAllTasks } from "../domain/usecases/GetAllTasks";
import { UpdateTask } from "../domain/usecases/UpdateTask";
import { DeleteTask } from "../domain/usecases/DeleteTask";

const authRepository = new FirebaseAuthRepository();
const taskRepository = new TaskRepositoryImpl();
const userProfileRepository = new FirebaseUserProfileRepository()

export const signInUseCase = new SignInUseCase(authRepository);
export const signUpUseCase = new SignUpUseCase(authRepository, userProfileRepository)
export const signOutUseCase = new SignOutUseCase(authRepository);
export const forgotPasswordUseCase = new ForgotPasswordUseCase();
export const changePasswordUseCase = new ChangePasswordUseCase(authRepository)
export const getUserProfileUseCase = new GetUserProfileUseCase(userProfileRepository)
export const saveUserProfileUseCase = new SaveUserProfileUseCase(userProfileRepository);

export const createTaskUseCase = new CreateTask(taskRepository);
export const updateTaskUseCase = new UpdateTask(taskRepository);
export const getAllTasksUseCase = new GetAllTasks(taskRepository);
export const deleteTaskUseCase = new DeleteTask(taskRepository);
