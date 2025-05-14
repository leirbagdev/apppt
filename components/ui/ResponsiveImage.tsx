"use client";
import React from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  quality?: number;
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  fill = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  width,
  height,
  quality = 75
}: ResponsiveImageProps) {
  // Verificar se a URL é externa
  const isExternal = src.startsWith('http');
  
  // Tratar placeholder para demo
  const imageSrc = src === '/placeholder.jpg' || src === '/placeholder.svg' 
    ? 'https://placehold.co/600x400/3ddcb5/FFFFFF/png'
    : src;
  
  return fill ? (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill={true}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className="object-cover"
        unoptimized={isExternal} // Não otimizar imagens externas que não estão no domínio atual
      />
    </div>
  ) : (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 600}
      height={height || 400}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      unoptimized={isExternal} // Não otimizar imagens externas que não estão no domínio atual
    />
  );
} 