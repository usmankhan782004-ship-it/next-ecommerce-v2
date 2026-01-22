import { create, insert, search, type Orama } from '@orama/orama'
import { Product } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let productDb: Orama<any> | null = null

export async function initSearch(products: Product[]) {
    if (productDb) return productDb

    productDb = await create({
        schema: {
            id: 'string',
            name: 'string',
            description: 'string',
            category: 'string',
            price: 'number',
        },
    })

    await insert(productDb, products)
    return productDb
}

export async function searchProducts(term: string) {
    if (!productDb) return []

    const results = await search(productDb, {
        term,
        properties: ['name', 'description', 'category'],
        threshold: 0.2,
    })

    return results.hits.map(hit => hit.document)
}
