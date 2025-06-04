"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  BarChart3,
  Smartphone,
  Star,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { FloatingElements } from "@/components/animations/floating-elements"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { MagneticButton } from "@/components/animations/magnetic-button"
import { useParallax } from "@/hooks/use-scroll-animation"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const parallaxOffset = useParallax(0.3)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^$$\d{2}$$\s\d{4,5}-\d{4}$/
    return phoneRegex.test(phone) || phone === ""
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Formato: (11) 99999-9999"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let formattedValue = value
    if (name === "phone") {
      formattedValue = formatPhone(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: Users,
      title: "Gestão Completa de Alunos",
      description: "Organize todos os seus alunos em um só lugar com perfis detalhados e histórico completo.",
    },
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description: "Sistema de agendamento automático que otimiza sua agenda e reduz cancelamentos.",
    },
    {
      icon: BarChart3,
      title: "Relatórios Avançados",
      description: "Acompanhe o progresso dos alunos com métricas detalhadas e insights acionáveis.",
    },
    {
      icon: Smartphone,
      title: "App Mobile Nativo",
      description: "Acesse tudo pelo celular com sincronização em tempo real e modo offline.",
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "3x Mais Produtivo",
      description: "Automatize tarefas repetitivas e foque no que realmente importa: seus alunos.",
    },
    {
      icon: TrendingUp,
      title: "Aumente sua Receita",
      description: "Gerencie mais alunos com menos esforço e maximize seus resultados financeiros.",
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Seus dados e dos seus alunos protegidos com criptografia de nível bancário.",
    },
    {
      icon: Clock,
      title: "Economize 10h/semana",
      description: "Menos tempo com planilhas, mais tempo treinando e conquistando resultados.",
    },
  ]

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Personal Trainer",
      image: "/placeholder.svg?height=60&width=60&text=CS",
      content: "Revolucionou minha forma de trabalhar. Consegui dobrar minha cartela de alunos mantendo a qualidade.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Treinadora Funcional",
      image: "/placeholder.svg?height=60&width=60&text=AC",
      content: "O melhor investimento que fiz para meu negócio. Interface intuitiva e suporte excepcional.",
      rating: 5,
    },
    {
      name: "Roberto Lima",
      role: "Personal Trainer",
      image: "/placeholder.svg?height=60&width=60&text=RL",
      content: "Meus alunos adoram o app. Conseguem acompanhar tudo e isso aumentou muito o engajamento.",
      rating: 5,
    },
  ]

  const stats = [
    { number: 10000, label: "Personal Trainers", suffix: "+" },
    { number: 50000, label: "Alunos Ativos", suffix: "+" },
    { number: 1000000, label: "Treinos Realizados", suffix: "+" },
    { number: 98, label: "Satisfação", suffix: "%" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingElements />

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <FadeIn direction="left" delay={100}>
            <div className="flex items-center space-x-3">
              <img src="/images/apt-logo.svg" alt="APT" className="w-10 h-10 transition-transform hover:scale-110" />
            </div>
          </FadeIn>

          <FadeIn direction="down" delay={200}>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-200 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Recursos
              </a>
              <a
                href="#benefits"
                className="text-gray-200 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Benefícios
              </a>
              <a
                href="#testimonials"
                className="text-gray-200 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Depoimentos
              </a>
              <a
                href="#pricing"
                className="text-gray-200 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Preços
              </a>
            </nav>
          </FadeIn>

          <FadeIn direction="right" delay={300}>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-200 hover:text-white font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-gray-800/50"
              >
                Entrar
              </Link>
              <MagneticButton>
                <Link
                  href="/auth/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                >
                  Começar Grátis
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center" style={{ transform: `translateY(${parallaxOffset}px)` }}>
          <FadeIn duration={800}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-green-300 bg-clip-text text-transparent">
              O Futuro do
              <br />
              <span className="text-green-400 animate-pulse">Personal Training</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200} duration={800}>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              Transforme sua carreira com a plataforma mais avançada para personal trainers. Gerencie alunos, treinos e
              resultados em um só lugar.
            </p>
          </FadeIn>

          <FadeIn delay={400} duration={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <MagneticButton strength={0.2}>
                <Link
                  href="/auth/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                >
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.1}>
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"></button>
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Animated Stats */}
          <FadeIn delay={600} duration={800}>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto" staggerDelay={150}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 drop-shadow-lg">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2000 + index * 200} />
                  </div>
                  <div className="text-gray-200 group-hover:text-gray-100 transition-colors font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-900/50 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Recursos que <span className="text-green-400">Revolucionam</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tudo que você precisa para levar seu negócio de personal training ao próximo nível
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={100}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600 hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 group hover:bg-gray-700/80"
              >
                <feature.icon className="w-12 h-12 text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                <h3 className="text-xl font-semibold mb-4 group-hover:text-green-300 transition-colors text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-200 group-hover:text-gray-100 transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Por que Escolher a <span className="text-green-400">APT</span>?
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <StaggerContainer className="space-y-8" staggerDelay={100}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-4 group hover:scale-105 transition-transform duration-300 p-4 rounded-xl hover:bg-gray-800/30"
                >
                  <div className="bg-green-500/30 p-3 rounded-xl group-hover:bg-green-500/40 transition-colors duration-300 border border-green-500/20">
                    <benefit.icon className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-300 transition-colors text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-200 group-hover:text-gray-100 transition-colors leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerContainer>

            <FadeIn direction="right" delay={200}>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-8 rounded-2xl border border-green-500/30 hover:border-green-500/50 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <Award className="w-16 h-16 text-green-400 mx-auto mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-4">Garantia de 30 Dias</h3>
                  <p className="text-gray-300 mb-6">
                    Não ficou satisfeito? Devolvemos 100% do seu dinheiro, sem perguntas.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Risco Zero</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                O que Nossos <span className="text-green-400">Clientes</span> Dizem
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={150}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600 hover:border-green-500/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                <p className="text-gray-200 mb-6 italic group-hover:text-gray-100 transition-colors leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300 border-2 border-gray-600 group-hover:border-green-400/50"
                  />
                  <div>
                    <div className="font-semibold group-hover:text-green-300 transition-colors text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-300">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Planos que <span className="text-green-400">Cabem</span> no seu Bolso
              </h2>
              <p className="text-xl text-gray-300">Comece grátis e escale conforme cresce</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" staggerDelay={100}>
            {/* Free Plan */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-500 hover:scale-105 group hover:shadow-xl hover:shadow-gray-500/10">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-green-300 transition-colors text-white">
                Starter
              </h3>
              <div className="text-4xl font-bold mb-6 text-white">
                Grátis
                <span className="text-lg text-gray-300 font-normal">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Até 10 alunos</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200"
                  style={{ transitionDelay: "50ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Agendamento básico</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200"
                  style={{ transitionDelay: "100ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Relatórios simples</span>
                </li>
              </ul>

              <MagneticButton className="w-full">
                <Link
                  href="/auth/register"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 block text-center hover:shadow-lg border border-gray-600 hover:border-gray-500"
                >
                  Começar Grátis
                </Link>
              </MagneticButton>
            </div>

            {/* Pro Plan - destacar melhor */}
            <div className="bg-gradient-to-br from-green-500/30 to-green-600/30 p-8 rounded-2xl border-2 border-green-400 relative hover:scale-105 transition-all duration-500 group shadow-xl shadow-green-500/20 backdrop-blur-sm">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-400 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Mais Popular
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-green-200 transition-colors text-white">
                Professional
              </h3>
              <div className="text-4xl font-bold mb-6 text-white">
                R$ 49
                <span className="text-lg text-gray-200 font-normal">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span>Alunos ilimitados</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-100"
                  style={{ transitionDelay: "50ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span>Agendamento avançado</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-100"
                  style={{ transitionDelay: "100ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span>Relatórios completos</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-100"
                  style={{ transitionDelay: "150ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span>App mobile</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-100"
                  style={{ transitionDelay: "200ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>

              <MagneticButton className="w-full">
                <Link
                  href="/auth/register"
                  className="w-full bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl font-bold transition-all duration-300 block text-center hover:shadow-lg hover:shadow-green-500/40 border border-green-400"
                >
                  Começar Teste Grátis
                </Link>
              </MagneticButton>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-500 hover:scale-105 group hover:shadow-xl hover:shadow-gray-500/10">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-green-300 transition-colors text-white">
                Enterprise
              </h3>
              <div className="text-4xl font-bold mb-6 text-white">
                R$ 99
                <span className="text-lg text-gray-300 font-normal">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Tudo do Professional</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200"
                  style={{ transitionDelay: "50ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>White label</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200"
                  style={{ transitionDelay: "100ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>API personalizada</span>
                </li>
                <li
                  className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-200"
                  style={{ transitionDelay: "150ms" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Suporte 24/7</span>
                </li>
              </ul>

              <MagneticButton className="w-full">
                <a
                  href="#contact"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 block text-center hover:shadow-lg border border-gray-600 hover:border-gray-500"
                >
                  Entrar em Contato
                </a>
              </MagneticButton>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Entre em <span className="text-green-400">Contato</span>
              </h2>
              <p className="text-xl text-gray-300">
                Tem dúvidas sobre o plano Enterprise? Nossa equipe está pronta para ajudar.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 font-medium ${
                        errors.name
                          ? "border-red-400 focus:ring-red-400 bg-red-900/20"
                          : "border-gray-500 focus:ring-green-400 hover:border-gray-400"
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-300 animate-pulse font-medium bg-red-900/20 px-3 py-1 rounded-lg border border-red-500/30">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 font-medium ${
                        errors.email
                          ? "border-red-400 focus:ring-red-400 bg-red-900/20"
                          : "border-gray-500 focus:ring-green-400 hover:border-gray-400"
                      }`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-300 animate-pulse font-medium bg-red-900/20 px-3 py-1 rounded-lg border border-red-500/30">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 font-medium ${
                        errors.phone
                          ? "border-red-400 focus:ring-red-400 bg-red-900/20"
                          : "border-gray-500 focus:ring-green-400 hover:border-gray-400"
                      }`}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-300 animate-pulse font-medium bg-red-900/20 px-3 py-1 rounded-lg border border-red-500/30">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Empresa/Studio
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-500 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 font-medium hover:border-gray-400"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none font-medium ${
                      errors.message
                        ? "border-red-400 focus:ring-red-400 bg-red-900/20"
                        : "border-gray-500 focus:ring-green-400 hover:border-gray-400"
                    }`}
                    placeholder="Conte-nos sobre suas necessidades e como podemos ajudar..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-300 animate-pulse font-medium bg-red-900/20 px-3 py-1 rounded-lg border border-red-500/30">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-500/30 border-2 border-green-400 rounded-xl p-4 text-green-100 text-center animate-pulse font-semibold backdrop-blur-sm">
                    ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/30 border-2 border-red-400 rounded-xl p-4 text-red-100 text-center animate-pulse font-semibold backdrop-blur-sm">
                    ✗ Erro ao enviar mensagem. Tente novamente.
                  </div>
                )}

                <div className="text-center">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                        isSubmitting ? "animate-pulse" : ""
                      }`}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </button>
                  </MagneticButton>
                </div>

                <p className="text-sm text-gray-400 text-center">* Campos obrigatórios</p>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-green-400 font-semibold mb-1">E-mail</div>
                    <div className="text-gray-300">contato@apt.com.br</div>
                  </div>
                  <div>
                    <div className="text-green-400 font-semibold mb-1">Telefone</div>
                    <div className="text-gray-300">(11) 3000-0000</div>
                  </div>
                  <div>
                    <div className="text-green-400 font-semibold mb-1">WhatsApp</div>
                    <div className="text-gray-300">(11) 99999-9999</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para Revolucionar seu Negócio?</h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de personal trainers que já transformaram suas carreiras
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton strength={0.2}>
                <Link
                  href="/auth/register"
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl"
                >
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.1}>
                <Link
                  href="/auth/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  Já tenho conta
                </Link>
              </MagneticButton>
            </div>

            <p className="text-sm mt-6 opacity-75">
              ✓ Sem cartão de crédito ✓ Configuração em 2 minutos ✓ Suporte gratuito
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={100}>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/images/apt-logo.svg" alt="APT" className="w-8 h-8 hover:scale-110 transition-transform" />
              </div>
              <p className="text-gray-400">A plataforma mais avançada para personal trainers modernos.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Integrações
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Termos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block font-medium hover:text-green-300"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </StaggerContainer>

          <FadeIn delay={400}>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 APT. Todos os direitos reservados.</p>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  )
}
