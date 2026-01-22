'use client'

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { ProductSkeleton } from './ui/ProductSkeleton';
import ProductCard from './ProductCard';

// Mock graph source
const recommendedProducts: Product[] = [
    { id: 'rec-1', name: 'Smart Plant Monitor', description: 'AI-powered hydration tracking', price: 45, currency: 'USD', image: '/placeholder.jpg', category: 'Sensors', stock: 10 },
    { id: 'rec-2', name: 'Automated Grow Light', description: 'Optimized spectrum for herbs', price: 85, currency: 'USD', image: '/placeholder.jpg', category: 'Lighting', stock: 5 },
];

export default function AIRecommendations() {
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching from graph/agent
        const fetchRecommendations = async () => {
            await new Promise(resolve => setTimeout(resolve, 800));
            setRecommendations(recommendedProducts);
            setLoading(false);
        };
        fetchRecommendations();
    }, []);

    if (loading) return (
        <section className="py-12">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">AI Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        </section>
    )

    return (
        <section className="py-12">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">AI Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
