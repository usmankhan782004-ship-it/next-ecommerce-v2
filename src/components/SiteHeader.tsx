'use client'

import { ShoppingCart, Menu, Search, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import CartDrawer from './CartDrawer'
import { useCartStore } from '@/store/cart'
import SearchBar from './SearchBar'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export default function SiteHeader() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const count = useCartStore(state => state.getCount())
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMounted(true), [])

    return (
        <>
            <header className="fixed top-0 w-full z-40 border-b border-border/10 bg-background/60 backdrop-blur-xl shadow-sm transition-all duration-300">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="p-2 -ml-2 hover:bg-secondary/50 rounded-lg md:hidden" aria-label="Open Menu">
                            <Menu className="w-5 h-5" />
                        </button>
                        <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            CleanCanvas
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Shop</a>
                        <a href="#" className="hover:text-foreground transition-colors">Collections</a>
                        <a href="#" className="hover:text-foreground transition-colors">About</a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <SearchBar />

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 hover:bg-secondary/50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {mounted && theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-secondary/50 rounded-full transition-colors group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            aria-label="Open Cart"
                        >
                            <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
                            {mounted && count > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in spin-in-90 duration-300">
                                    {count}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
