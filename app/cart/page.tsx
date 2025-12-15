import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartContent } from "@/components/cart/cart-content"

export const metadata = {
  title: "Carrito de Compras - EduSupplies",
  description: "Revisa tus productos y procede al checkout",
}

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/30">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Carrito de compras</h1>
            <p className="mt-2 text-muted-foreground">Revisa tus productos antes de continuar</p>
          </div>
        </div>
        <CartContent />
      </main>
      <Footer />
    </div>
  )
}
