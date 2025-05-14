"use client";
import { useEffect } from "react";

export const ANIMATION_CLASSNAMES = {
  initial: "opacity-0 translate-y-5",
  animate: "opacity-100 translate-y-0",
  transition: "transition-all duration-600"
};

export default function ScrollAnimations() {
  useEffect(() => {
    // Inicializar o Intersection Observer para animações de scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Quando um elemento está visível na tela
          if (entry.isIntersecting) {
            // Adicionar classes para animação
            entry.target.classList.add(
              ...ANIMATION_CLASSNAMES.animate.split(" ")
            );
            entry.target.classList.remove(
              ...ANIMATION_CLASSNAMES.initial.split(" ")
            );
            
            // Parar de observar o elemento depois de animá-lo
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, // Animar quando pelo menos 10% do elemento estiver visível
        rootMargin: "0px 0px -100px 0px" // Animar um pouco antes de chegar no elemento
      }
    );

    // Aplicar classes iniciais e observar elementos com a classe 'animate-fadeUp'
    const animatedElements = document.querySelectorAll(".animate-fadeUp");
    
    animatedElements.forEach((element, index) => {
      // Adicionar classes de estado inicial e transição
      element.classList.add(
        ...ANIMATION_CLASSNAMES.initial.split(" "),
        ...ANIMATION_CLASSNAMES.transition.split(" ")
      );
      
      // Adicionar delay escalonado para elementos na mesma seção
      (element as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      
      // Começar a observar o elemento
      observer.observe(element);
    });

    // Animar elementos visíveis na primeira renderização (hero section)
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero .animate-fadeUp');
      heroElements.forEach((element) => {
        element.classList.add(...ANIMATION_CLASSNAMES.animate.split(" "));
        element.classList.remove(...ANIMATION_CLASSNAMES.initial.split(" "));
        observer.unobserve(element); // Parar de observar já que foi animado
      });
    }, 300);

    // Limpar o observer quando o componente for desmontado
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // Este componente não renderiza nada, apenas controla animações
} 