import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types"
import { authApi } from "@/services/api"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { user, token } = await authApi.login(email, password)

        set({
          user,
          token,
          isAuthenticated: true,
        })
      },

      register: async (name, email, password) => {
        const { user, token } = await authApi.register(name, email, password)

        set({
          user,
          token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      updateUser: (user) => {
        set({ user })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
