"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Tipos de idiomas suportados
export type Language = 'pt' | 'en';

// Interface das traduções
interface TranslationDictionary {
  [key: string]: string;
}

// Interface dos idiomas disponíveis
interface Translations {
  pt: TranslationDictionary;
  en: TranslationDictionary;
}

// Tipo para o contexto da internacionalização
type I18nContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Criação do contexto
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Traduções
export const translations: Translations = {
  pt: {
    'nav.features': 'Funcionalidades',
    'nav.pricing': 'Preços',
    'nav.contact': 'Contato',
    'nav.startFreeTrial': 'Iniciar Teste Gratuito',
    'hero.title': 'Eleve seu serviço de Personal Trainer',
    'hero.subtitle': 'Transforme a experiência dos seus alunos com o apppt, projetado exclusivamente para treinadores. Gerencie, prescreva, e conecte-se com seus alunos de forma eficiente e eficaz.',
    'trust.professionals': 'Confiado por mais de 10.000 profissionais de fitness',
    'trust.security': 'Segurança de nível com criptografia de ponta',
    'trust.uptime': 'Garantia de 99,9% de uptime',
    'features.title': 'Visualize o Progresso do Cliente em Tempo Real',
    'features.description': 'Nosso painel intuitivo transforma dados complexos de fitness em insights claros e acionáveis. Monitore métricas dos clientes, identifique tendências instantaneamente e tome decisões baseadas em dados que aceleram os resultados. Sua expertise, amplificada por análises poderosas.',
    'features.metrics': 'Métricas Personalizadas',
    'features.realtime': 'Dados em Tempo Real',
    'features.reports': 'Relatórios Automatizados',
    'ai.title': 'Assistente de Treinamento Alimentado por IA',
    'ai.description': 'Aproveite nosso motor de conhecimento avançado que fornece orientações baseadas em evidências sobre fitness e nutrição, extraídas de publicações de pesquisa.',
    'ai.research': 'Baseado em Pesquisas',
    'ai.support': 'Suporte 24/7',
    'ai.chat': 'Chat com Clientes',
    'workflow.title': 'Automação de Fluxo de Trabalho Perfeita',
    'workflow.description': 'Recupere seu tempo com uma automação poderosa que lida com as tarefas rotineiras enquanto você foca no que importa — seus clientes.',
    'workflow.custom': 'Fluxos de Trabalho Personalizados',
    'workflow.scheduling': 'Agendamento Inteligente',
    'workflow.payment': 'Sistema de Pagamento',
    'stats.title': 'Seu Sucesso em Números',
    'stats.subtitle': 'O AppTrainer entrega resultados mensuráveis para profissionais de fitness em todo o mundo',
    'login.title': 'Acesse sua área de membros',
    'login.button': 'Entrar',
    'login.loading': 'Entrando...',
    'login.signup': 'Não tem uma conta? Cadastre-se',
    'login.back': 'Voltar',
  },
  en: {
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.startFreeTrial': 'Start Free Trial',
    'hero.title': 'Elevate your Personal Training Service',
    'hero.subtitle': 'Transform your students\' experience with apppt, designed exclusively for trainers. Manage, prescribe, and connect with your students efficiently and effectively.',
    'trust.professionals': 'Trusted by over 10,000 fitness professionals',
    'trust.security': 'Top-level security with end-to-end encryption',
    'trust.uptime': '99.9% uptime guarantee',
    'features.title': 'Visualize Client Progress in Real Time',
    'features.description': 'Our intuitive dashboard transforms complex fitness data into clear, actionable insights. Monitor client metrics, instantly identify trends, and make data-driven decisions that accelerate results. Your expertise, amplified by powerful analytics.',
    'features.metrics': 'Custom Metrics',
    'features.realtime': 'Real-Time Data',
    'features.reports': 'Automated Reports',
    'ai.title': 'AI-Powered Training Assistant',
    'ai.description': 'Leverage our advanced knowledge engine that provides evidence-based guidance on fitness and nutrition, drawn from research publications.',
    'ai.research': 'Research-Based',
    'ai.support': '24/7 Support',
    'ai.chat': 'Client Chat',
    'workflow.title': 'Seamless Workflow Automation',
    'workflow.description': 'Reclaim your time with powerful automation that handles routine tasks while you focus on what matters — your clients.',
    'workflow.custom': 'Custom Workflows',
    'workflow.scheduling': 'Smart Scheduling',
    'workflow.payment': 'Payment System',
    'stats.title': 'Your Success in Numbers',
    'stats.subtitle': 'AppTrainer delivers measurable results to fitness professionals worldwide',
    'login.title': 'Access your member area',
    'login.button': 'Sign In',
    'login.loading': 'Signing in...',
    'login.signup': 'Don\'t have an account? Sign up',
    'login.back': 'Go Back',
  }
};

// Provider para gerenciar o estado do idioma
export function I18nProvider({ 
  children,
  defaultLanguage = 'pt'
}: { 
  children: ReactNode;
  defaultLanguage?: Language;
}) {
  // Define o idioma padrão
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  
  // Salva o idioma no localStorage quando mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('apppt-language', language);
      
      // Alterar o atributo lang do HTML
      document.documentElement.lang = language;
    }
  }, [language]);
  
  // Carrega o idioma do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('apppt-language') as Language;
      if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    }
  }, []);
  
  // Função para traduzir textos
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook para usar a tradução em componentes
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
} 