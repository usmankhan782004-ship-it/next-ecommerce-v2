'use client'

import { Search, X, Loader2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchProducts } from '@/lib/search'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { addToCartAction } from '@/app/actions/cart'

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const addToCart = useCartStore(state => state.addToCart)

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 300)
        return () => clearTimeout(timer)
    }, [query])

    // Search Effect
    useEffect(() => {
        const performSearch = async () => {
            if (!debouncedQuery) {
                setResults([])
                return
            }
            setIsLoading(true)
            // Mock search for now as Orama needs initialization
            // In real app: const hits = await searchProducts(debouncedQuery)
            // Mocking results based on query for demo
            await new Promise(resolve => setTimeout(resolve, 500))
            const mockHits: Product[] = [
                { id: '1', name: 'Ceramic Diffuser', description: 'Ultrasonic aromatherapy', price: 59, currency: 'USD', image: '', category: 'Home', stock: 20 },
                { id: '2', name: 'Linen Throw', description: 'Organic french linen', price: 129, currency: 'USD', image: '', category: 'Home', stock: 15 },
            ].filter(p => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()))

            setResults(mockHits)
            setIsLoading(false)
        }
        performSearch()
    }, [debouncedQuery])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen])

    const handleAddToCart = async (product: Product) => {
        addToCart(product)
        await addToCartAction(product)
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
                aria-label="Search"
            >
                <Search className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative z-50 w-full max-w-lg bg-card border border-border/20 shadow-2xl rounded-2xl overflow-hidden"
                        >
                            <div className="flex items-center px-4 py-3 border-b border-border/10">
                                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search products..."
                                    className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground/50"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                ) : query && (
                                    <button onClick={() => setQuery('')} className="p-1 hover:bg-secondary rounded-full">
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                )}
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {!query && (
                                    <div className="p-4 text-center text-muted-foreground text-sm">
                                        Type to search...
                                    </div>
                                )}

                                {query && !isLoading && results.length === 0 && (
                                    <div className="p-4 text-center text-muted-foreground text-sm">
                                        No results found.
                                    </div>
                                )}

                                {results.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full flex items-center gap-4 p-3 hover:bg-secondary/50 rounded-xl transition-colors text-left group focus-visible:bg-secondary/50 focus-visible:outline-none"
                                    >
                                        <div className="w-12 h-12 bg-secondary/30 rounded-lg flex-shrink-0" />
                                        <div className="flex-1">
                                            <h4 className="font-medium group-hover:text-primary transition-colors">{product.name}</h4>
                                            <p className="text-sm text-muted-foreground">{product.currency} {product.price}</p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                                            Add
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
