import { useState } from 'react';

interface StripeCheckoutProps {
  priceId: string;
  planName: string;
}

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCheckout = async ({ priceId, planName }: StripeCheckoutProps) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento');
      }

      // Redireciona para a página de checkout do Stripe
      window.location.href = data.url;
    } catch (err) {
      setError((err as Error).message);
      console.error('Erro durante o checkout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    redirectToCheckout,
    isLoading,
    error,
  };
} 