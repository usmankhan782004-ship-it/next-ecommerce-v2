import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, payload } = body;

        if (action === 'low_stock') {
            // Integrate with n8n webhook or email service
            console.log('Triggering low stock automation:', payload);
            return NextResponse.json({ status: 'success', message: 'Low stock alert sent' });
        }

        if (action === 'discount_trigger') {
            // e.g. Create dynamic discount code
            console.log('Triggering discount automation:', payload);
            return NextResponse.json({ status: 'success', message: 'Discount code generated' });
        }

        return NextResponse.json({ status: 'error', message: 'Unknown action' }, { status: 400 });
    } catch (error) {
        console.error('Automation error:', error);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}
