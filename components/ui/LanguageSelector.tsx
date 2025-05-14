"use client";
import { useTranslation } from '@/lib/i18n';

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('pt')}
        className={`text-sm font-medium ${language === 'pt' ? 'text-[#3ddcb5]' : 'text-white hover:text-[#3ddcb5]'} transition-colors`}
        aria-label="Mudar para Português"
      >
        PT
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`text-sm font-medium ${language === 'en' ? 'text-[#3ddcb5]' : 'text-white hover:text-[#3ddcb5]'} transition-colors`}
        aria-label="Change to English"
      >
        EN
      </button>
    </div>
  );
} 