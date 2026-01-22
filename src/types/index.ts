export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    category: string;
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}
