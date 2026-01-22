'use client'

import { useCartStore } from '@/store/cart'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { checkoutAction } from '@/app/actions/cart'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { items, removeFromCart, updateQuantity, getTotal } = useCartStore()
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!mounted) return null

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        await checkoutAction(items)
        setIsCheckingOut(false)
        alert("Checkout Successful (Mock)")
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-background/80 backdrop-blur-xl shadow-2xl border-l border-border/20"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping Cart"
                        data-testid="cart-drawer"
                    >
                        <div className="flex flex-col h-full">
                            <div className="p-4 border-b border-border/10 flex items-center justify-between">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    Cart ({items.length})
                                </h2>
                                <button onClick={onClose} className="p-2 hover:bg-secondary/50 rounded-full focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close cart">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                                        <ShoppingCart className="w-12 h-12 opacity-20" />
                                        <p>Your cart is empty</p>
                                    </div>
                                ) : (
                                    items.map(item => (
                                        <div key={item.id} className="flex gap-4" data-testid="cart-item">
                                            <div className="w-20 h-20 bg-secondary/30 rounded-lg flex-shrink-0" />
                                            <div className="flex-1 space-y-1">
                                                <h3 className="font-medium" data-testid="cart-item-name">{item.name}</h3>
                                                <p className="text-sm font-semibold">{item.currency} {item.price}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-secondary/50 rounded focus-visible:ring-1 focus-visible:ring-ring"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-secondary/50 rounded focus-visible:ring-1 focus-visible:ring-ring"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                    <div className="flex-1" />
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-destructive hover:text-destructive/80 p-1 focus-visible:ring-1 focus-visible:ring-destructive"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-border/10 bg-secondary/5 space-y-4">
                                <div className="flex items-center justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    disabled={items.length === 0 || isCheckingOut}
                                    onClick={handleCheckout}
                                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
