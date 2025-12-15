import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">E</span>
              </div>
              <span className="font-bold">EduSupplies</span>
            </div>
            <p className="text-sm text-muted-foreground">Tu tienda de confianza para útiles escolares de calidad.</p>
            <div className="flex gap-2">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">Productos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=cuadernos" className="text-muted-foreground hover:text-foreground">
                  Cuadernos
                </Link>
              </li>
              <li>
                <Link href="/products?category=mochilas" className="text-muted-foreground hover:text-foreground">
                  Mochilas
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=arte-manualidades"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Arte y Manualidades
                </Link>
              </li>
              <li>
                <Link href="/products?category=tecnologia" className="text-muted-foreground hover:text-foreground">
                  Tecnología
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="font-semibold">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Recibe ofertas y novedades en tu correo.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                aria-label="Suscribirse"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EduSupplies. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
