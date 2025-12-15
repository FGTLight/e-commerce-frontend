"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileContent } from "@/components/profile/profile-content"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="border-b bg-muted/30">
            <div className="container py-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Mi Perfil</h1>
              <p className="mt-2 text-muted-foreground">Gestiona tu información personal</p>
            </div>
          </div>
          <ProfileContent />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
