import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import AIRecommendations from '@/components/AIRecommendations'
import SiteHeader from '@/components/SiteHeader'
import { Product } from '@/types'

// Mock Data
const products: Product[] = [
  { id: '1', name: 'Ceramic Diffuser', description: 'Ultrasonic aromatherapy with ambient light', price: 59, currency: 'USD', image: '', category: 'Home', stock: 20 },
  { id: '2', name: 'Linen Throw', description: '100% organic french linen, stone washed', price: 129, currency: 'USD', image: '', category: 'Home', stock: 15 },
  { id: '3', name: 'Glass Carafe set', description: 'Hand-blown glass with cork stopper', price: 45, currency: 'USD', image: '', category: 'Kitchen', stock: 30 },
]

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />

      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <AIRecommendations />
      </div>

      <footer className="border-t border-border/50 py-12 mt-12 bg-secondary/20">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          © 2026 CleanCanvas. Powered by Next.js & Artificial Intelligence.
        </div>
      </footer>
    </main>
  );
}
