"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth-store"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ProfileInfo() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast.success("Sesión cerrada correctamente")
    router.push("/")
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Actualiza tus datos personales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" defaultValue={user?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email} disabled />
            <p className="text-xs text-muted-foreground">El email no puede ser modificado</p>
          </div>

          <Button className="w-full">Guardar cambios</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seguridad</CardTitle>
          <CardDescription>Gestiona tu contraseña y sesión</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña actual</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva contraseña</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>

          <Button className="w-full">Cambiar contraseña</Button>

          <div className="pt-4 border-t">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
