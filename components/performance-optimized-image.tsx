"use client"

import { useState, useRef, useEffect, memo } from "react"
import { useLazyLoad } from "@/hooks/use-lazy-load"

interface PerformanceOptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  quality?: number
}

// Usando memo para evitar re-renderizações desnecessárias
const PerformanceOptimizedImage = memo(function PerformanceOptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder = "/placeholder.svg?height=200&width=200",
  quality = 75,
}: PerformanceOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { elementRef, isVisible } = useLazyLoad({ threshold: 0.1 })
  const imgRef = useRef<HTMLImageElement>(null)

  // Usar um efeito separado para limpar os listeners
  useEffect(() => {
    let img: HTMLImageElement | null = null

    if (isVisible) {
      img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => setIsLoaded(true)
      img.onerror = () => setHasError(true)
      img.src = src
    }

    return () => {
      if (img) {
        img.onload = null
        img.onerror = null
      }
    }
  }, [isVisible, src])

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Carregando...</div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Erro ao carregar imagem</div>
        </div>
      )}

      {/* Actual image */}
      {isVisible && (
        <img
          ref={imgRef}
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
})

export default PerformanceOptimizedImage
