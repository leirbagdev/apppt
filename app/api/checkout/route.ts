import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicialize o cliente Stripe com a chave secreta do .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { priceId, planName } = body;
    
    // Crie uma sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // ID do preço no Stripe
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?canceled=true`,
      metadata: {
        planName: planName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(``
      { error: 'Erro ao criar sessão de checkout' },
      { status: 500 }
    );
  }
} 