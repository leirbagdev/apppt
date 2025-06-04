"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseLazyLoadOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

// Cache para evitar criar múltiplos observers para o mesmo threshold/rootMargin
const observerCache = new Map<string, IntersectionObserver>()

export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const { threshold = 0.1, rootMargin = "50px", triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Se já foi acionado e triggerOnce está ativo, não fazer nada
    if (hasTriggered && triggerOnce) return

    // Criar uma chave única para o cache
    const cacheKey = `${threshold}-${rootMargin}`

    // Verificar se já existe um observer com estas configurações
    let observer = observerCache.get(cacheKey)

    if (!observer) {
      // Criar um novo observer se não existir no cache
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target
            const isTargetVisible = entry.isIntersecting

            // Encontrar todos os elementos que usam este observer
            document.querySelectorAll("[data-lazy-observed]").forEach((el) => {
              if (el === target) {
                // Disparar o callback apenas para o elemento atual
                if (isTargetVisible) {
                  setIsVisible(true)
                  setHasTriggered(true)

                  if (triggerOnce) {
                    observer?.unobserve(element)
                  }
                } else if (!triggerOnce) {
                  setIsVisible(false)
                }
              }
            })
          })
        },
        { threshold, rootMargin },
      )

      // Armazenar no cache
      observerCache.set(cacheKey, observer)
    }

    // Marcar o elemento como observado
    element.setAttribute("data-lazy-observed", "true")
    observer.observe(element)

    return () => {
      if (element) {
        observer?.unobserve(element)
        element.removeAttribute("data-lazy-observed")
      }

      // Limpar o observer do cache se não houver mais elementos observados
      if (document.querySelectorAll("[data-lazy-observed]").length === 0) {
        observerCache.delete(cacheKey)
      }
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { elementRef, isVisible, hasTriggered }
}

// Hook para lazy loading de dados
export function useLazyData<T>(fetchFn: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { elementRef, isVisible } = useLazyLoad()

  // Usar useCallback para evitar recriação da função em cada render
  const loadData = useCallback(async () => {
    if (!isVisible || loading) return

    try {
      setLoading(true)
      setError(null)
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar dados"))
    } finally {
      setLoading(false)
    }
  }, [isVisible, loading, fetchFn])

  useEffect(() => {
    loadData()
  }, [loadData, isVisible, ...dependencies])

  return { elementRef, data, loading, error, isVisible }
}
