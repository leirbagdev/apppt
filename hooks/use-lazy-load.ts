"use client"

import { useState, useEffect, useRef, type MutableRefObject } from "react"

/**
 * Opções de configuração para o hook useLazyLoad
 */
interface UseLazyLoadOptions {
  /** 
   * Valor entre 0 e 1 que indica quanto do elemento precisa estar visível
   * @default 0.1
   */
  threshold?: number

  /** 
   * Margem ao redor do elemento para trigger do lazy loading
   * @example "50px 0px"
   * @default "50px"
   */
  rootMargin?: string

  /** 
   * Se true, o callback só será executado uma vez
   * @default true
   */
  triggerOnce?: boolean
}

/**
 * Resultado retornado pelo hook useLazyLoad
 */
interface UseLazyLoadResult {
  /** Ref para ser anexada ao elemento que será observado */
  elementRef: MutableRefObject<HTMLElement | null>
  /** Se o elemento está atualmente visível na viewport */
  isVisible: boolean
  /** Se o elemento já foi visível pelo menos uma vez */
  hasTriggered: boolean
}

// Cache para evitar criar múltiplos observers com as mesmas configurações
const observerCache = new Map<string, IntersectionObserver>()

/**
 * Hook para implementar lazy loading baseado em Intersection Observer
 * 
 * @param options - Opções de configuração do lazy loading
 * @returns Objeto contendo a ref do elemento e estados de visibilidade
 * 
 * @example
 * ```tsx
 * const { elementRef, isVisible } = useLazyLoad({ threshold: 0.5 })
 * 
 * return (
 *   <div ref={elementRef}>
 *     {isVisible && <HeavyComponent />}
 *   </div>
 * )
 * ```
 */
export function useLazyLoad(options: UseLazyLoadOptions = {}): UseLazyLoadResult {
  const { threshold = 0.1, rootMargin = "50px", triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

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
      // Criar novo observer se não existir no cache
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target
            const isTargetVisible = entry.isIntersecting

            // Encontrar todos os elementos que usam este observer
            document.querySelectorAll("[data-lazy-observed]").forEach((el) => {
              if (el === target) {
                // Atualizar estado apenas para o elemento atual
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
        { threshold, rootMargin }
      )

      // Armazenar no cache para reuso
      observerCache.set(cacheKey, observer)
    }

    // Marcar elemento como observado
    element.setAttribute("data-lazy-observed", "true")
    observer.observe(element)

    // Cleanup na desmontagem do componente
    return () => {
      if (element) {
        observer?.unobserve(element)
        element.removeAttribute("data-lazy-observed")

        // Limpar observer do cache se não houver mais elementos
        if (document.querySelectorAll("[data-lazy-observed]").length === 0) {
          observerCache.delete(cacheKey)
        }
      }
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { elementRef, isVisible, hasTriggered }
}

/**
 * Hook para lazy loading de dados baseado em visibilidade
 * 
 * @template T Tipo dos dados que serão carregados
 * @param fetchFn Função que retorna uma Promise com os dados
 * @param dependencies Array de dependências adicionais para o efeito
 * @returns Objeto com ref, dados, estados de loading e erro
 * 
 * @example
 * ```tsx
 * const { elementRef, data, loading } = useLazyData(
 *   () => fetch('/api/data').then(r => r.json())
 * )
 * ```
 */
export function useLazyData<T>(
  fetchFn: () => Promise<T>, 
  dependencies: any[] = []
): UseLazyLoadResult & {
  data: T | null
  loading: boolean
  error: Error | null
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { elementRef, isVisible } = useLazyLoad()

  useEffect(() => {
    const loadData = async () => {
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
    }

    loadData()
  }, [isVisible, loading, fetchFn, ...dependencies])

  return { 
    elementRef, 
    isVisible, 
    hasTriggered: isVisible,
    data, 
    loading, 
    error 
  }
}
