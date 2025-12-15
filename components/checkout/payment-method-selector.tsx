"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CreditCard, Wallet, Building2 } from "lucide-react"

interface PaymentMethodSelectorProps {
  onPaymentMethodSelect: (method: string) => void
}

const paymentMethods = [
  {
    id: "card",
    name: "Tarjeta de Crédito/Débito",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
  },
  {
    id: "wallet",
    name: "Billetera Digital",
    description: "Mercado Pago, PayPal",
    icon: Wallet,
  },
  {
    id: "transfer",
    name: "Transferencia Bancaria",
    description: "Transferencia directa",
    icon: Building2,
  },
]

export function PaymentMethodSelector({ onPaymentMethodSelect }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState("")

  const handleSelect = (value: string) => {
    setSelectedMethod(value)
    onPaymentMethodSelect(value)
  }

  return (
    <RadioGroup value={selectedMethod} onValueChange={handleSelect} className="space-y-3">
      {paymentMethods.map((method) => (
        <Card
          key={method.id}
          className={`p-4 cursor-pointer transition-colors ${
            selectedMethod === method.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
          }`}
          onClick={() => handleSelect(method.id)}
        >
          <div className="flex items-start gap-3">
            <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer font-medium">
                <method.icon className="h-5 w-5" />
                {method.name}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </RadioGroup>
  )
}
