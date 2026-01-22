'use client'

import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { ShoppingBag } from 'lucide-react'
import { addToCartAction } from '@/app/actions/cart'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)
        addToCart(product)
        try {
            await addToCartAction(product)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-shadow duration-500"
            tabIndex={0}
        >
            <div className="aspect-square bg-secondary/20 relative overflow-hidden">
                <motion.div
                    className="w-full h-full bg-secondary/10"
                    variants={{
                        hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Placeholder content - replace with next/image in real implementation */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-medium">
                        {product.name}
                    </div>
                </motion.div>

                {/* Quick Add overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full flex items-center justify-center gap-2 bg-white/90 dark:bg-black/80 backdrop-blur-md text-foreground py-3 rounded-xl font-medium shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
                        aria-label={`Quick Add ${product.name}`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {isAdding ? 'Adding...' : 'Quick Add'}
                    </button>
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-display font-medium text-lg text-foreground group-hover:text-primary transition-colors tracking-tight">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-lg tracking-tight">{product.currency} {product.price}</span>
                </div>
            </div>
        </motion.div>
    )
}
