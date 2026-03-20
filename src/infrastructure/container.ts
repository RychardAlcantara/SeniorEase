import { FirebaseAuthRepository } from "../infrastructure/repositories/FirebaseAuthRepository";
import { SignInUseCase } from "../domain/usecases/SignInUseCase";
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase";
import { ForgotPasswordUseCase } from "../domain/usecases/ForgotPasswordUseCase";
import { SignOutUseCase } from "../domain/usecases/SignOutUseCase";
import { TaskRepositoryImpl } from "./repositories/TaskRepositoryImpl";
import { CreateTask } from "../domain/usecases/CreateTask";
import { GetAllTasks } from "../domain/usecases/GetAllTasks";
import { UpdateTask } from "../domain/usecases/UpdateTask";

const authRepository = new FirebaseAuthRepository();
const taskRepository = new TaskRepositoryImpl();

export const signInUseCase = new SignInUseCase(authRepository);
export const signUpUseCase = new SignUpUseCase(authRepository);
export const forgotPasswordUseCase = new ForgotPasswordUseCase();
export const signOutUseCase = new SignOutUseCase(authRepository);

export const createTaskUseCase = new CreateTask(taskRepository);
export const updateTaskUseCase = new UpdateTask(taskRepository);
export const getAllTasksUseCase = new GetAllTasks(taskRepository);
