import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetail } from "@/components/product/product-detail"
import { RelatedProducts } from "@/components/product/related-products"
import { mockProducts } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = mockProducts.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: "Producto no encontrado",
    }
  }

  return {
    title: `${product.name} - EduSupplies`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = mockProducts.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} />
        <RelatedProducts currentProduct={product} />
      </main>
      <Footer />
    </div>
  )
}
