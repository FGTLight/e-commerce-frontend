"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="border-b bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="container py-8">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Panel de Administración</h1>
              <p className="mt-2 text-muted-foreground">Gestiona productos, pedidos e inventario</p>
            </div>
          </div>
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
