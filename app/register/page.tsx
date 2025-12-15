import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export const metadata = {
  title: "Crear Cuenta - EduSupplies",
  description: "Crea tu cuenta para comenzar a comprar",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Crear cuenta</h1>
            <p className="mt-2 text-muted-foreground">Únete a nuestra comunidad de estudiantes</p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
