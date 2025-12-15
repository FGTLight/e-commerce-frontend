import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export const metadata = {
  title: "Iniciar Sesión - EduSupplies",
  description: "Ingresa a tu cuenta para realizar compras",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h1>
            <p className="mt-2 text-muted-foreground">Ingresa a tu cuenta para continuar</p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
