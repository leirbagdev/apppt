"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Protege contra redirecionamentos indesejados na landing page
  useEffect(() => {
    // Não faça nada, apenas deixe o usuário na página inicial
    // Remover o redirecionamento para evitar loop
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Verificar se o cliente Supabase está disponível
    if (!supabase) {
      setError('Erro de conexão com o servidor. Por favor, tente novamente.');
      setLoading(false);
      return;
    }
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/dashboard');
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else router.push('/dashboard');
    }
    setLoading(false);
  }

  // Parallax scrolling effect
  useEffect(() => {
    function handleScroll() {
      const animatedElements = document.querySelectorAll('.animate-fadeUp');
      
      animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('opacity-100');
          element.classList.add('translate-y-0');
          element.classList.remove('opacity-0');
          element.classList.remove('translate-y-5');
        }
      });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animations
    const animatedElements = document.querySelectorAll('.animate-fadeUp');
    animatedElements.forEach((element, index) => {
      element.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-600');
      (element as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
    });
    
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero .animate-fadeUp');
      heroElements.forEach(element => {
        element.classList.add('opacity-100', 'translate-y-0');
        element.classList.remove('opacity-0', 'translate-y-5');
      });
    }, 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!showLogin ? (
        <>
          {/* Navigation */}
          <nav className="fixed w-full h-20 flex justify-between items-center px-[10%] bg-black/70 backdrop-blur-md z-50">
            <div className="logo text-3xl font-bold tracking-wider text-white">
              apppt<span className="text-[#3ddcb5]">✓</span>
            </div>
            <div className="nav-links hidden md:flex gap-8">
              <a href="#features" className="text-white hover:text-[#3ddcb5] transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-white hover:text-[#3ddcb5] transition-colors">Preços</a>
              <a href="#contact" className="text-white hover:text-[#3ddcb5] transition-colors">Contato</a>
            </div>
            <button 
              className="bg-gradient-to-r from-[#00c2a8] to-[#3ddcb5] text-white border-none py-3 px-6 rounded-full font-semibold cursor-pointer transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00c2a8]/30"
              onClick={() => setShowLogin(true)}
            >
              Iniciar Teste Gratuito
            </button>
          </nav>

          {/* Hero Section */}
          <section className="hero h-screen flex flex-col justify-center items-start px-[10%] relative overflow-hidden bg-gradient-to-r from-black to-[#111]">
            <div className="hero-content w-full lg:w-1/2 z-10 animate-fadeUp">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 bg-gradient-to-r from-white to-[#3ddcb5] bg-clip-text text-transparent">
                Eleve seu serviço de Personal Trainer
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#d1d5db]">
                Transforme a experiência dos seus alunos com o apppt, projetado exclusivamente para treinadores. Gerencie, prescreva, e conecte-se com seus alunos de forma eficiente e eficaz.
              </p>
              <div className="trust-badges flex flex-wrap justify-center md:justify-start items-center gap-5 mt-10">
                <div className="badge bg-white/10 px-5 py-2.5 rounded-full flex items-center gap-2.5">
                  <span className="text-[#3ddcb5]">⭐</span>
                  <span className="text-[#d1d5db] text-sm">Confiado por mais de 10.000 profissionais de fitness</span>
                </div>
                <div className="badge bg-white/10 px-5 py-2.5 rounded-full flex items-center gap-2.5">
                  <span className="text-[#3ddcb5]">🔒</span>
                  <span className="text-[#d1d5db] text-sm">Segurança de nível com criptografia de ponta</span>
                </div>
                <div className="badge bg-white/10 px-5 py-2.5 rounded-full flex items-center gap-2.5">
                  <span className="text-[#3ddcb5]">🚀</span>
                  <span className="text-[#d1d5db] text-sm">Garantia de 99,9% de uptime</span>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Dashboard Section */}
          <section id="features" className="relative h-screen flex items-center overflow-hidden bg-[#0c0c0c]">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center px-[10%] gap-12">
              <div className="feature-box w-full lg:w-1/2 bg-[#11182733] backdrop-blur-md rounded-[20px] p-10 shadow-lg animate-fadeUp">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white">
                  Visualize o Progresso do Cliente em Tempo Real
                </h2>
                <p className="text-lg leading-relaxed mb-8 text-[#d1d5db]">
                  Nosso painel intuitivo transforma dados complexos de fitness em insights claros e acionáveis. Monitore métricas dos clientes, identifique tendências instantaneamente e tome decisões baseadas em dados que aceleram os resultados. Sua expertise, amplificada por análises poderosas.
                </p>
                <div className="feature-icons flex justify-between mt-10">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">📊</span>
                    <span className="text-[#d1d5db]">Métricas Personalizadas</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">⚡</span>
                    <span className="text-[#d1d5db]">Dados em Tempo Real</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">🔄</span>
                    <span className="text-[#d1d5db]">Relatórios Automatizados</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                {/* Dashboard mockup em notebook */}
                <div className="relative w-full animate-fadeUp">
                  <div className="laptop-frame bg-[#222] rounded-[20px] pt-5 pb-7 px-5 shadow-xl">
                    <div className="laptop-screen bg-white rounded-t-lg overflow-hidden">
                      <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                        <img 
                          src="/placeholder.jpg" 
                          alt="Dashboard de progresso do cliente" 
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#3ddcb5]/20 to-transparent opacity-50"></div>
                      </div>
                    </div>
                    <div className="laptop-base flex justify-center mt-1">
                      <div className="w-1/3 h-1 bg-[#333] rounded-b-xl"></div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-5 transform rotate-12 w-[30%] shadow-2xl rounded-xl border-8 border-[#222]">
                    <img 
                      src="/placeholder.jpg" 
                      alt="Versão mobile do dashboard" 
                      className="w-full aspect-[9/16] object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Assistant Section */}
          <section className="relative h-screen flex items-center overflow-hidden bg-[#080808]">
            <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center px-[10%] gap-12">
              <div className="w-full lg:w-1/2">
                {/* AI Assistant mockup em celular */}
                <div className="relative w-full h-[650px] flex justify-center items-center animate-fadeUp">
                  <div className="phone-mockup relative w-[300px] h-[600px] bg-[#222] rounded-[40px] p-3 shadow-2xl border-8 border-[#333]">
                    <div className="notch absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-[#222] rounded-b-xl z-10"></div>
                    <div className="screen bg-black rounded-[30px] overflow-hidden h-full relative">
                      <img 
                        src="/placeholder.jpg" 
                        alt="Assistente de IA em conversa com cliente" 
                        className="w-full h-full object-cover"
                      />
                      <div className="chat-overlay absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="chat-bubble bg-[#3ddcb5] rounded-2xl rounded-br-none p-4 mb-3 ml-auto max-w-[80%]">
                          <p className="text-sm text-white">Como posso melhorar meu treino de hoje?</p>
                        </div>
                        <div className="chat-bubble bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-none p-4 mr-auto max-w-[80%]">
                          <p className="text-xs text-white">Com base nos seus dados recentes, sugiro aumentar a carga nos exercícios de perna e adicionar 10 minutos de HIIT para melhorar seu condicionamento.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-box w-full lg:w-1/2 bg-[#11182733] backdrop-blur-md rounded-[20px] p-10 shadow-lg animate-fadeUp">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white">
                  Assistente de Treinamento Alimentado por IA
                </h2>
                <p className="text-lg leading-relaxed mb-8 text-[#d1d5db]">
                  Aproveite nosso motor de conhecimento avançado que fornece orientações baseadas em evidências sobre fitness e nutrição, extraídas de publicações de pesquisa. Forneça respostas imediatas às perguntas dos clientes, apoie suas recomendações com ciência e estabeleça-se como a autoridade definitiva em fitness.
                </p>
                <div className="feature-icons flex justify-between mt-10">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">🧠</span>
                    <span className="text-[#d1d5db]">Baseado em Pesquisas</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">💬</span>
                    <span className="text-[#d1d5db]">Suporte 24/7</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">📱</span>
                    <span className="text-[#d1d5db]">Chat com Clientes</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow Automation Section */}
          <section className="relative h-screen flex items-center overflow-hidden bg-[#0c0c0c]">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center px-[10%] gap-12">
              <div className="feature-box w-full lg:w-1/2 bg-[#11182733] backdrop-blur-md rounded-[20px] p-10 shadow-lg animate-fadeUp">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white">
                  Automação de Fluxo de Trabalho Perfeita
                </h2>
                <p className="text-lg leading-relaxed mb-8 text-[#d1d5db]">
                  Recupere seu tempo com uma automação poderosa que lida com as tarefas rotineiras enquanto você foca no que importa — seus clientes. Desde a programação personalizada de treinos até o processamento de pagamentos e acompanhamentos, nossos fluxos de trabalho inteligentes se adaptam ao seu estilo de treinamento único e às necessidades do seu negócio.
                </p>
                <div className="feature-icons flex justify-between mt-10">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">⚙️</span>
                    <span className="text-[#d1d5db]">Fluxos de Trabalho Personalizados</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">📅</span>
                    <span className="text-[#d1d5db]">Agendamento Inteligente</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl text-[#3ddcb5] mb-4">💰</span>
                    <span className="text-[#d1d5db]">Sistema de Pagamento</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                {/* Tablet/iPad mockup para automação de fluxo */}
                <div className="relative w-full flex justify-center items-center animate-fadeUp">
                  <div className="tablet-frame bg-[#333] rounded-[30px] p-3 shadow-xl">
                    <div className="tablet-screen rounded-[20px] bg-white overflow-hidden">
                      <div className="relative w-full" style={{paddingTop: '75%'}}> {/* 4:3 aspect ratio */}
                        <img 
                          src="/placeholder.svg" 
                          alt="Sistema de automação de fluxo de trabalho" 
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#007a68]/30 to-transparent"></div>
                        <div className="absolute top-0 left-0 p-4">
                          <div className="fake-calendar bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                            <div className="calendar-header flex justify-between items-center mb-2">
                              <span className="font-bold text-[#333]">Agenda</span>
                              <span className="text-[#3ddcb5]">Hoje</span>
                            </div>
                            <div className="calendar-body">
                              {[1, 2, 3].map((item) => (
                                <div key={item} className="calendar-item flex items-center mb-2 p-2 bg-white/50 rounded">
                                  <div className="time w-16 text-sm text-[#555]">{8 + item * 2}:00</div>
                                  <div className="event-marker w-2 h-8 rounded bg-[#3ddcb5] mr-2"></div>
                                  <div className="event-text text-xs">Treinamento Cliente {item}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-[#080808] py-20 px-[10%] text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white animate-fadeUp">
              Seu Sucesso em Números
            </h2>
            <p className="text-lg text-[#d1d5db] max-w-2xl mx-auto mb-12 animate-fadeUp">
              O AppTrainer entrega resultados mensuráveis para profissionais de fitness em todo o mundo
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="animate-fadeUp">
                <div className="text-5xl md:text-6xl font-bold text-[#3ddcb5] mb-3">87%</div>
                <div className="text-lg text-[#d1d5db]">Aumento na Retenção de Clientes</div>
              </div>
              <div className="animate-fadeUp">
                <div className="text-5xl md:text-6xl font-bold text-[#3ddcb5] mb-3">5.2x</div>
                <div className="text-lg text-[#d1d5db]">ROI no Primeiro Ano</div>
              </div>
              <div className="animate-fadeUp">
                <div className="text-5xl md:text-6xl font-bold text-[#3ddcb5] mb-3">68%</div>
                <div className="text-lg text-[#d1d5db]">Tempo Economizado em Administração</div>
              </div>
              <div className="animate-fadeUp">
                <div className="text-5xl md:text-6xl font-bold text-[#3ddcb5] mb-3">94%</div>
                <div className="text-lg text-[#d1d5db]">Satisfação dos Clientes</div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="bg-[#111] py-24 px-[10%]">
            <div className="text-center mb-16 animate-fadeUp">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white">
                Planos de Crescimento
              </h2>
              <p className="text-lg text-[#d1d5db] max-w-2xl mx-auto">
                Escolha o plano ideal para alavancar seu negócio fitness. Desenvolvidos para se adaptarem ao crescimento do seu estúdio ou consultoria.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-[#1a1a1a] rounded-[20px] p-10 w-full md:w-auto md:max-w-[320px] transition hover:-translate-y-2 hover:shadow-xl animate-fadeUp">
                <h3 className="text-2xl font-semibold mb-5 text-white">Essencial</h3>
                <div className="text-5xl font-bold mb-5 text-white">R$69 <span className="text-lg font-normal">/mês</span></div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Dashboard personalizado
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Até 15 clientes ativos
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Biblioteca de exercícios básica
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Suporte por email
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Automação de lembretes
                  </li>
                </ul>
                <button className="w-full py-4 bg-transparent border-2 border-[#00c2a8] text-white rounded-[10px] text-base font-semibold cursor-pointer transition hover:-translate-y-1 hover:shadow-lg">
                  Começar Agora
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-[#007a68] to-[#00c2a8] rounded-[20px] p-10 w-full md:w-auto md:max-w-[320px] transition hover:-translate-y-2 hover:shadow-xl relative animate-fadeUp">
                <div className="absolute -top-4 right-8 bg-[#f43f5e] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
                <h3 className="text-2xl font-semibold mb-5 text-white">Pro</h3>
                <div className="text-5xl font-bold mb-5 text-white">R$159 <span className="text-lg font-normal">/mês</span></div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-white">
                    <span className="text-white mr-2.5">✓</span> Todas as funcionalidades Essenciais
                  </li>
                  <li className="flex items-center text-white">
                    <span className="text-white mr-2.5">✓</span> Até 50 clientes ativos
                  </li>
                  <li className="flex items-center text-white">
                    <span className="text-white mr-2.5">✓</span> Assistente de treino inteligente
                  </li>
                  <li className="flex items-center text-white">
                    <span className="text-white mr-2.5">✓</span> Automação de fluxos de trabalho
                  </li>
                  <li className="flex items-center text-white">
                    <span className="text-white mr-2.5">✓</span> Análises avançadas de desempenho
                  </li>
                </ul>
                <button className="w-full py-4 bg-gradient-to-r from-[#00c2a8] to-[#3ddcb5] text-white rounded-[10px] text-base font-semibold cursor-pointer transition hover:-translate-y-1 hover:shadow-lg">
                  Escolher Pro
                </button>
              </div>
              
              <div className="bg-[#1a1a1a] rounded-[20px] p-10 w-full md:w-auto md:max-w-[320px] transition hover:-translate-y-2 hover:shadow-xl animate-fadeUp">
                <h3 className="text-2xl font-semibold mb-5 text-white">Studio</h3>
                <div className="text-5xl font-bold mb-5 text-white">R$379 <span className="text-lg font-normal">/mês</span></div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Todas as funcionalidades Pro
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Clientes ilimitados
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Múltiplos perfis de treinadores
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Integração com sistemas de ponto
                  </li>
                  <li className="flex items-center text-[#d1d5db]">
                    <span className="text-[#10b981] mr-2.5">✓</span> Consultoria de implementação
                  </li>
                </ul>
                <button className="w-full py-4 bg-transparent border-2 border-[#00c2a8] text-white rounded-[10px] text-base font-semibold cursor-pointer transition hover:-translate-y-1 hover:shadow-lg">
                  Contato Comercial
                </button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-[#008b7a] to-[#00c2a8] py-20 px-[10%] text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-white animate-fadeUp">
              Pronto para revolucionar seu negócio fitness?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 animate-fadeUp">
              Junte-se a milhares de profissionais que estão redefinindo o treinamento personalizado com tecnologia de ponta
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <button className="bg-white text-[#008b7a] border-none py-4 px-8 rounded-full text-base font-semibold cursor-pointer transition hover:-translate-y-1 hover:shadow-lg">
                Agendar Demonstração
              </button>
              <button 
                className="bg-gradient-to-r from-[#00c2a8] to-[#3ddcb5] text-white border border-white/20 py-4 px-8 rounded-full text-base font-semibold cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
                onClick={() => setShowLogin(true)}
              >
                Iniciar Trial Gratuito
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer id="contact" className="bg-[#0a0a0a] py-16 px-[10%]">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
              <div>
                <h4 className="text-lg font-semibold mb-5 text-white">AppTrainer</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Nosso Time</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Carreiras</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Imprensa</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-5 text-white">Funcionalidades</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Dashboard Personalizado</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Assistente Inteligente</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Automação de Workflow</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Relatórios e Análises</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-5 text-white">Recursos</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Academia de Conhecimento</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Webinars</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Guias e E-books</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">API e Integrações</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-5 text-white">Suporte</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Contatar Suporte</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Política de Privacidade</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Termos de Serviço</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-5 text-white">Conecte-se</h4>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">YouTube</a></li>
                  <li><a href="#" className="text-[#9ca3af] no-underline hover:text-[#3ddcb5] transition-colors">Comunidade</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-[#222]">
              <p className="text-[#6b7280] text-sm">© 2025 AppTrainer. Todos os direitos reservados.</p>
            </div>
          </footer>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-[#171717]">
          <div className="login-form bg-[#222] max-w-md mx-auto rounded-lg p-10 shadow-lg w-full">
            <h2 className="text-center mb-2 text-xl font-bold">App<span className="text-[#3ddcb5]">Trainer</span></h2>
            <p className="text-center text-[#e0e0e0] mb-8">Acesse sua área de membros</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-5">
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input type="email" id="email" className="form-control w-full px-4 py-3 bg-[#2c2c2c] border border-[#2c2c2c] rounded text-white text-base transition" placeholder="seu@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group mb-5">
                <label htmlFor="password" className="block mb-2 font-medium">Senha</label>
                <input type="password" id="password" className="form-control w-full px-4 py-3 bg-[#2c2c2c] border border-[#2c2c2c] rounded text-white text-base transition" placeholder="********" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="form-check flex items-center justify-between mb-5">
                <label className="form-check-label flex items-center cursor-pointer">
                  <input type="checkbox" className="form-check-input mr-2 cursor-pointer" /> Lembrar-me
                </label>
                <a href="#" className="forgot-password text-[#3ddcb5] text-sm hover:text-[#00c2a8] transition">Esqueceu a senha?</a>
              </div>
              <button type="submit" className="submit-btn w-full py-3 bg-gradient-to-r from-[#00c2a8] to-[#3ddcb5] border-none rounded text-white text-base font-medium cursor-pointer transition hover:bg-[#00c2a8]" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
            </form>
            <div className="login-footer text-center mt-5">
              <p className="text-[#e0e0e0]">Não tem uma conta? <a href="#" className="text-[#3ddcb5] hover:text-[#00c2a8] transition">Cadastre-se</a></p>
            </div>
            <button className="mt-8 text-[#e0e0e0] underline w-full" onClick={() => setShowLogin(false)}>Voltar</button>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
        </div>
      )}
    </>
  );
}