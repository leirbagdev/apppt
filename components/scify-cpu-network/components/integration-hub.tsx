"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"
import { Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { useMediaQuery } from "@/hooks/use-media-query"

import { JetBrains_Mono, Exo_2 } from "next/font/google"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-jetbrains-mono",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-exo-2",
})

// Componentes de logos científicos aprimorados
const ScientificLogos = {
  Hub: () => (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect
        x="8"
        y="8"
        width="8"
        height="8"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 4L7 7M20 4L17 7M4 20L7 17M20 20L17 17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),

  PubMed: () => (
    <svg viewBox="0 0 512 512" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M256 80c97.2 0 176 78.8 176 176s-78.8 176-176 176S80 353.2 80 256 158.8 80 256 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
      />
      <path
        d="M232 160h-72v192h32v-72h40c22.1 0 40-17.9 40-40v-40c0-22.1-17.9-40-40-40zm8 80c0 4.4-3.6 8-8 8h-40v-56h40c4.4 0 8 3.6 8 8v40zM352 160h-32v192h32V160z"
        fill="currentColor"
      />
      <path
        d="M383.7 160c-1.2-.1-2.3-.1-3.5-.1-14.2 0-27.5 7-35.6 18.7l-3.2 4.6V160h-32v192h32V283.5c0-19.4 13.7-37.3 32.8-40.4 1.1-.2 2.2-.2 3.2-.2h6.3v-82.9h-.1z"
        fill="currentColor"
      />
    </svg>
  ),

  SciELO: () => (
    <svg viewBox="0 0 512 512" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M144 176c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32H144z"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
      />
      <path
        d="M176 208c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM240 208c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM304 208c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM368 208c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM208 256c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM272 256c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM336 256c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM240 304c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM304 304c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16z"
        fill="currentColor"
      />
    </svg>
  ),

  CrossRef: () => (
    <svg viewBox="0 0 512 512" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path d="M144 144h224v224H144z" fill="none" stroke="currentColor" strokeWidth="16" />
      <path d="M144 144l224 224M368 144L144 368" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      <circle cx="256" cy="256" r="64" fill="none" stroke="currentColor" strokeWidth="16" />
    </svg>
  ),

  SemanticScholar: () => (
    <svg viewBox="0 0 512 512" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96z"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
      />
      <path d="M256 128v64M256 320v64" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      <path d="M208 208h96v96h-96z" fill="none" stroke="currentColor" strokeWidth="16" />
      <path
        d="M176 176l64 64M272 272l64 64M176 336l64-64M272 240l64-64"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  ),

  ArXiv: () => (
    <svg viewBox="0 0 512 512" className="size-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path d="M128 128h256v256H128z" fill="none" stroke="currentColor" strokeWidth="16" />
      <path d="M176 176l160 160M336 176L176 336" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
      <path
        d="M208 176h128M176 208v96M336 208v96M208 336h128"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  ),
}

// Informações sobre cada base de dados
const databaseInfo = {
  PubMed: {
    title: "PubMed",
    description:
      "Base de dados de referências e resumos sobre literatura biomédica da MEDLINE, mantida pela Biblioteca Nacional de Medicina dos EUA.",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    stats: "Mais de 33 milhões de citações",
    color: "from-blue-500 to-indigo-700",
    primaryColor: "#60a5fa",
    secondaryColor: "#4f46e5",
    resultCount: 2850000,
  },
  SciELO: {
    title: "SciELO",
    description:
      "Scientific Electronic Library Online é uma biblioteca digital de acesso aberto de periódicos brasileiros e latino-americanos.",
    url: "https://scielo.org/",
    stats: "Mais de 1.700 periódicos",
    color: "from-orange-500 to-amber-700",
    primaryColor: "#f97316",
    secondaryColor: "#c2410c",
    resultCount: 950000,
  },
  CrossRef: {
    title: "CrossRef",
    description:
      "Organização oficial de registro de DOI (Digital Object Identifier) para publicações acadêmicas e profissionais.",
    url: "https://www.crossref.org/",
    stats: "Mais de 120 milhões de registros",
    color: "from-green-500 to-emerald-700",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    resultCount: 1850000,
  },
  SemanticScholar: {
    title: "Semantic Scholar",
    description:
      "Mecanismo de pesquisa baseado em IA que utiliza processamento de linguagem natural para analisar e extrair significado de artigos científicos.",
    url: "https://www.semanticscholar.org/",
    stats: "Mais de 200 milhões de artigos",
    color: "from-purple-500 to-violet-700",
    primaryColor: "#8b5cf6",
    secondaryColor: "#7c3aed",
    resultCount: 2250000,
  },
  ArXiv: {
    title: "ArXiv",
    description:
      "Repositório de acesso aberto para preprints de artigos científicos em física, matemática, ciência da computação, biologia quantitativa e outros campos.",
    url: "https://arxiv.org/",
    stats: "Mais de 2 milhões de preprints",
    color: "from-red-500 to-rose-700",
    primaryColor: "#ef4444",
    secondaryColor: "#be123c",
    resultCount: 1450000,
  },
  Hub: {
    title: "Tecnologia Inovadora",
    description:
      "Hub central de integração que conecta todas as bases de dados científicas, permitindo consultas rápidas e eficientes.",
    url: "",
    stats: "Acesso a bilhões de registros científicos",
    color: "from-indigo-500 to-purple-700",
    primaryColor: "#6366f1",
    secondaryColor: "#4f46e5",
    resultCount: 16500000,
  },
}

// Componente de nó de integração sem interatividade
const IntegrationNode = ({
  logo: Logo,
  label,
  className,
  position,
  size = "md",
  iconColor = "text-indigo-500",
  id,
  isProcessing = false,
  ...props
}: {
  logo: React.ElementType
  label: string
  className?: string
  position?: "left" | "right" | "top" | "bottom" | "center"
  size?: "sm" | "md" | "lg"
  iconColor?: string
  id: string
  isProcessing?: boolean
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className={`text-xs font-medium text-gray-200 drop-shadow-sm ${exo2.className}`}>{label}</span>
    </div>
  )
}

export default function IntegrationHub() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const pubmedRef = useRef<HTMLDivElement>(null)
  const scieloRef = useRef<HTMLDivElement>(null)
  const crossRefRef = useRef<HTMLDivElement>(null)
  const semanticScholarRef = useRef<HTMLDivElement>(null)
  const arxivRef = useRef<HTMLDivElement>(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Efeito para iniciar o processamento após um tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(true)

      // Iniciar contagem de resultados após um tempo
      const resultTimer = setTimeout(() => {
        setShowResults(true)

        // Definir diretamente o valor de resultados
        setTotalResults(2137)

        return () => clearInterval(countInterval)
      }, 4000)

      let countInterval: NodeJS.Timeout // Declare countInterval here

      return () => clearTimeout(resultTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={containerRef}
        className="relative flex h-[500px] sm:h-[600px] md:h-[500px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-xl 
          border border-white/20 bg-gradient-to-br from-gray-900/90 to-black/90 p-4 md:p-6 
          shadow-xl backdrop-blur-md"
      >
        {/* Glow Effect Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
            animate={
              isProcessing
                ? {
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Termo de busca */}
        {searchTerm && (
          <div className="absolute left-1/2 top-4 md:top-6 -translate-x-1/2 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 px-4 py-2 backdrop-blur-md">
            <span className="text-xs md:text-sm font-semibold text-white">"{searchTerm}"</span>
          </div>
        )}

        {/* Rótulo de Tecnologia Inovadora */}
        <div className="absolute left-4 md:left-6 top-4 md:top-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-md">
          <Zap className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
          <span className="text-[10px] md:text-xs font-semibold text-white">Consultas Rápidas</span>
        </div>

        {/* Centro Hub - CPU sempre visível e destacado */}
        <div ref={centerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {/* CPU Core */}
          <div className="relative flex flex-col items-center justify-center">
            {/* CPU Chip */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-indigo-500/70 shadow-xl shadow-indigo-500/30 flex items-center justify-center overflow-hidden">
              {/* CPU Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-indigo-500/20" />
                ))}
              </div>

              {/* CPU Pins */}
              <div className="absolute -bottom-1 left-0 right-0 h-2 flex">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 mx-px h-2 bg-gray-600" />
                ))}
              </div>

              {/* CPU Pins */}
              <div className="absolute -top-1 left-0 right-0 h-2 flex">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 mx-px h-2 bg-gray-600" />
                ))}
              </div>

              {/* CPU Pins */}
              <div className="absolute -left-1 top-0 bottom-0 w-2 flex flex-col">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 my-px w-2 bg-gray-600" />
                ))}
              </div>

              {/* CPU Pins */}
              <div className="absolute -right-1 top-0 bottom-0 w-2 flex flex-col">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 my-px w-2 bg-gray-600" />
                ))}
              </div>

              {/* CPU Core */}
              <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-md flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <h1 className={`font-extrabold text-white text-2xl ${jetBrainsMono.className}`}>SCIFY</h1>
              </div>

              {/* Processing Indicators */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-blue-500"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Bases de dados - Layout responsivo */}
        {!isMobile ? (
          // Layout para desktop
          <>
            {/* PubMed */}
            <div ref={pubmedRef} className="absolute left-[15%] top-[25%]">
              <IntegrationNode logo={ScientificLogos.PubMed} label="PubMed" iconColor="text-blue-400" id="PubMed" />
            </div>

            {/* SciELO */}
            <div ref={scieloRef} className="absolute right-[15%] top-[25%]">
              <IntegrationNode logo={ScientificLogos.SciELO} label="SciELO" iconColor="text-orange-400" id="SciELO" />
            </div>

            {/* CrossRef */}
            <div ref={crossRefRef} className="absolute left-[20%] bottom-[25%]">
              <IntegrationNode
                logo={ScientificLogos.CrossRef}
                label="CrossRef"
                iconColor="text-green-400"
                id="CrossRef"
              />
            </div>

            {/* Semantic Scholar */}
            <div ref={semanticScholarRef} className="absolute right-[20%] bottom-[25%]">
              <IntegrationNode
                logo={ScientificLogos.SemanticScholar}
                label="Semantic Scholar"
                iconColor="text-purple-400"
                id="SemanticScholar"
              />
            </div>

            {/* ArXiv */}
            <div ref={arxivRef} className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
              <IntegrationNode logo={ScientificLogos.ArXiv} label="ArXiv" iconColor="text-red-400" id="ArXiv" />
            </div>
          </>
        ) : (
          // Layout para mobile - organização circular
          <>
            {/* PubMed */}
            <div ref={pubmedRef} className="absolute left-[20%] top-[20%]">
              <IntegrationNode
                logo={ScientificLogos.PubMed}
                label="PubMed"
                size="sm"
                iconColor="text-blue-400"
                id="PubMed"
              />
            </div>

            {/* SciELO */}
            <div ref={scieloRef} className="absolute right-[20%] top-[20%]">
              <IntegrationNode
                logo={ScientificLogos.SciELO}
                label="SciELO"
                size="sm"
                iconColor="text-orange-400"
                id="SciELO"
              />
            </div>

            {/* CrossRef */}
            <div ref={crossRefRef} className="absolute left-[10%] top-[50%] -translate-y-1/2">
              <IntegrationNode
                logo={ScientificLogos.CrossRef}
                label="CrossRef"
                size="sm"
                iconColor="text-green-400"
                id="CrossRef"
              />
            </div>

            {/* Semantic Scholar */}
            <div ref={semanticScholarRef} className="absolute right-[10%] top-[50%] -translate-y-1/2">
              <IntegrationNode
                logo={ScientificLogos.SemanticScholar}
                label="Scholar"
                size="sm"
                iconColor="text-purple-400"
                id="SemanticScholar"
              />
            </div>

            {/* ArXiv */}
            <div ref={arxivRef} className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
              <IntegrationNode
                logo={ScientificLogos.ArXiv}
                label="ArXiv"
                size="sm"
                iconColor="text-red-400"
                id="ArXiv"
              />
            </div>
          </>
        )}

        {/* Feixes de Conexão - Cores personalizadas */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={pubmedRef}
          toRef={centerRef}
          curvature={40}
          gradientStartColor="#60a5fa"
          gradientStopColor="#4f46e5"
          pathOpacity={0.15}
          pathWidth={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={centerRef}
          toRef={scieloRef}
          curvature={40}
          gradientStartColor="#4f46e5"
          gradientStopColor="#f97316"
          pathOpacity={0.15}
          pathWidth={3}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={crossRefRef}
          toRef={centerRef}
          curvature={-40}
          gradientStartColor="#10b981"
          gradientStopColor="#4f46e5"
          pathOpacity={0.15}
          pathWidth={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={centerRef}
          toRef={semanticScholarRef}
          curvature={-40}
          gradientStartColor="#4f46e5"
          gradientStopColor="#8b5cf6"
          pathOpacity={0.15}
          pathWidth={3}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={arxivRef}
          toRef={centerRef}
          curvature={0}
          gradientStartColor="#ef4444"
          gradientStopColor="#4f46e5"
          pathOpacity={0.15}
          pathWidth={3}
        />

        {/* Indicadores de Fluxo de Dados - Sistema avançado de fluxo */}
        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Fase 1: Ondas de consultas saindo do hub central */}
          <QueryWave
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={pubmedRef}
            curvature={40}
            baseDelay={0.5}
            color="bg-blue-300"
            shadowColor="shadow-blue-500"
            count={3}
          />
          <QueryWave
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={scieloRef}
            curvature={40}
            baseDelay={0.7}
            color="bg-orange-300"
            shadowColor="shadow-orange-500"
            count={3}
          />
          <QueryWave
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={crossRefRef}
            curvature={-40}
            baseDelay={0.9}
            color="bg-green-300"
            shadowColor="shadow-green-500"
            count={3}
          />
          <QueryWave
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={semanticScholarRef}
            curvature={-40}
            baseDelay={1.1}
            color="bg-purple-300"
            shadowColor="shadow-purple-500"
            count={3}
          />
          <QueryWave
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={arxivRef}
            curvature={0}
            baseDelay={1.3}
            color="bg-red-300"
            shadowColor="shadow-red-500"
            count={3}
          />

          {/* Fase 2: Enxames de dados retornando ao hub central */}
          <DataSwarm
            containerRef={containerRef}
            fromRef={pubmedRef}
            toRef={centerRef}
            curvature={40}
            baseDelay={2.2}
            color="bg-blue-500"
            shadowColor="shadow-blue-500"
            count={8}
          />
          <DataSwarm
            containerRef={containerRef}
            fromRef={scieloRef}
            toRef={centerRef}
            curvature={40}
            baseDelay={2.4}
            color="bg-orange-500"
            shadowColor="shadow-orange-500"
            count={5}
          />
          <DataSwarm
            containerRef={containerRef}
            fromRef={crossRefRef}
            toRef={centerRef}
            curvature={-40}
            baseDelay={2.6}
            color="bg-green-500"
            shadowColor="shadow-green-500"
            count={10}
          />
          <DataSwarm
            containerRef={containerRef}
            fromRef={semanticScholarRef}
            toRef={centerRef}
            curvature={-40}
            baseDelay={2.8}
            color="bg-purple-500"
            shadowColor="shadow-purple-500"
            count={6}
          />
          <DataSwarm
            containerRef={containerRef}
            fromRef={arxivRef}
            toRef={centerRef}
            curvature={0}
            baseDelay={3.0}
            color="bg-red-500"
            shadowColor="shadow-red-500"
            count={7}
          />

          {/* Fase 3: Efeitos de processamento adicionais (apenas quando isProcessing é true) */}
          {isProcessing && (
            <>
              {/* Onda de choque quando os dados são processados */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/30"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: [0, 300, 350],
                  height: [0, 300, 350],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              />

              {/* Partículas de dados processados */}
              {Array.from({ length: 12 }).map((_, index) => {
                const angle = (index / 12) * Math.PI * 2
                const radius = 30
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.div
                    key={`particle-${index}`}
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-md shadow-indigo-500"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: [0, x * 1.5, x * 3],
                      y: [0, y * 1.5, y * 3],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.5,
                      delay: index * 0.1,
                    }}
                  />
                )
              })}
            </>
          )}
        </motion.div>

        {/* Indicador de Velocidade */}
        <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-md">
          <span className="text-[10px] md:text-xs font-semibold text-white">Resultados em segundos</span>
          <Zap className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
        </div>
      </div>
    </div>
  )
}

// Componente para ondas de consultas
function QueryWave({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  baseDelay = 0,
  color = "bg-indigo-300",
  shadowColor = "shadow-indigo-500",
  count = 3,
}: {
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  curvature?: number
  baseDelay?: number
  color?: string
  shadowColor?: string
  count?: number
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={`query-${fromRef.current?.id}-${toRef.current?.id}-${index}`}
          className={cn("absolute left-0 top-0 h-1.5 w-1.5 rounded-full shadow-sm", color, shadowColor)}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.5, 0.8, 0.5],
          }}
          transition={{
            delay: baseDelay + index * 0.15,
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
          }}
          style={{
            offsetPath: `path('${calculatePath(containerRef, fromRef, toRef, curvature)}')`,
            offsetRotate: "0deg",
          }}
        />
      ))}
    </>
  )
}

// Componente para enxames de dados retornando
function DataSwarm({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  baseDelay = 0,
  color = "bg-indigo-500",
  shadowColor = "shadow-indigo-500",
  count = 5,
}: {
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  curvature?: number
  baseDelay?: number
  color?: string
  shadowColor?: string
  count?: number
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        // Variação de tamanho para representar diferentes volumes de dados
        const size = Math.random() * 1.5 + 1.5
        // Variação de velocidade
        const duration = Math.random() * 0.5 + 1.2
        // Variação de caminho
        const pathVariation = Math.random() * 10 - 5

        return (
          <motion.div
            key={`data-${fromRef.current?.id}-${toRef.current?.id}-${index}`}
            className={cn("absolute left-0 top-0 rounded-full shadow-md", color, shadowColor)}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              offsetPath: `path('${calculatePath(containerRef, fromRef, toRef, curvature + pathVariation)}')`,
              offsetRotate: "0deg",
            }}
            initial={{
              opacity: 0,
              offsetDistance: "0%",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              offsetDistance: ["0%", "100%"],
            }}
            transition={{
              delay: baseDelay + index * 0.1,
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 4,
            }}
          >
            {/* Rastro/cauda para dar sensação de velocidade */}
            <motion.div
              className={cn("absolute top-1/2 left-0 h-0.5 rounded-full", color.replace("bg-", "bg-opacity-50 bg-"))}
              style={{
                width: `${Math.random() * 5 + 5}px`,
                transform: "translateY(-50%)",
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}

function calculatePath(
  containerRef: React.RefObject<HTMLElement>,
  fromRef: React.RefObject<HTMLElement>,
  toRef: React.RefObject<HTMLElement>,
  curvature: number,
) {
  if (!containerRef.current || !fromRef.current || !toRef.current) {
    return "M 0,0 Q 0,0 0,0"
  }

  const containerRect = containerRef.current.getBoundingClientRect()
  const fromRect = fromRef.current.getBoundingClientRect()
  const toRect = toRef.current.getBoundingClientRect()

  const startX = fromRect.left - containerRect.left + fromRect.width / 2
  const startY = fromRect.top - containerRect.top + fromRect.height / 2
  const endX = toRect.left - containerRect.left + toRect.width / 2
  const endY = toRect.top - containerRect.top + toRect.height / 2

  const controlY = startY - curvature
  return `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
}
