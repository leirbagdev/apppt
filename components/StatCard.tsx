"use client";
import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

// Usando React.memo para evitar re-renderizações desnecessárias
const StatCard = React.memo(function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <div className={`animate-fadeUp ${className}`}>
      <div className="text-5xl md:text-6xl font-bold text-[#3ddcb5] mb-3">{value}</div>
      <div className="text-lg text-[#d1d5db]">{label}</div>
    </div>
  );
});

// Nome para melhor debug no React DevTools
StatCard.displayName = 'StatCard';

export default StatCard; 