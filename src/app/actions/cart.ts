'use server'

import { CartItem, Product } from "@/types";

export async function addToCartAction(product: Product): Promise<{ success: boolean; message: string }> {
    // Mock server validation/database interaction
    console.log('Adding to cart on server:', product.id);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate latency
    return { success: true, message: 'Added to cart' };
}

export async function updateQuantityAction(productId: string, quantity: number) {
    console.log('Updating quantity on server:', productId, quantity);
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
}

export async function removeFromCartAction(productId: string) {
    console.log('Removing from cart on server:', productId);
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
}

export async function checkoutAction(items: CartItem[]) {
    console.log('Processing checkout:', items);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, orderId: `order_${Math.floor(Math.random() * 10000)}` };
}
