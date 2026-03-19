import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { UserProfileRepository } from "../../domain/repositories/UserProfileRepository"
import { UserProfile } from "../../domain/entities/UserProfile"

export class FirebaseUserProfileRepository implements UserProfileRepository {
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const snap = await getDoc(doc(db, "users", userId))
      if (!snap.exists()) return null
      return snap.data() as UserProfile
    } catch {
      return null
    }
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    // Firestore não aceita campos com valor undefined
    const data = Object.fromEntries(
      Object.entries(profile).filter(([, value]) => value !== undefined)
    )
    await setDoc(doc(db, "users", profile.id), data, { merge: true })
  }

  // Converte a foto para Base64 e salva junto no Firestore
  async uploadPhoto(_userId: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        reject(new Error("A foto deve ter no máximo 2MB."))
        return
      }
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error("Erro ao processar a imagem."))
      reader.readAsDataURL(file)
    })
  }
}