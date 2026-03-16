import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth"
import { auth } from "../firebase"
import { AuthRepository } from "../../domain/repositories/AuthRepository"
import { User } from "../../domain/entities/User"

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/invalid-credential": "E-mail ou senha inválidos.",
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
  "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
}

function mapFirebaseError(code: string): string {
  return FIREBASE_ERROR_MESSAGES[code] ?? "Ocorreu um erro inesperado."
}

export class FirebaseAuthRepository implements AuthRepository {
  async signIn(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return {
        id: result.user.uid,
        email: result.user.email!,
        displayName: result.user.displayName ?? undefined,
      }
    } catch (error: any) {
      throw new Error(mapFirebaseError(error.code))
    }
  }

  async signUp(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }
      return {
        id: result.user.uid,
        email: result.user.email!,
        displayName: displayName,
        createdAt: new Date(),
      }
    } catch (error: any) {
      throw new Error(mapFirebaseError(error.code))
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      throw new Error(mapFirebaseError(error.code))
    }
  }

  async signOut(): Promise<void> {
    await signOut(auth)
  }

  getCurrentUser(): User | null {
    const user = auth.currentUser
    if (!user) return null
    return {
      id: user.uid,
      email: user.email!,
      displayName: user.displayName ?? undefined,
    }
  }
}
