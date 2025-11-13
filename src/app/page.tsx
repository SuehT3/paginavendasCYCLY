'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Check, Heart, Calendar, TrendingUp, Users, Lock, Star, X, Mail, User as UserIcon, KeyRound } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({}
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableHeight = documentHeight - windowHeight
      const progress = (currentScrollY / scrollableHeight) * 100
      setScrollProgress(progress)
    }

    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ 
            ...prev, 
            [entry.target.id]: true,
            [`${entry.target.id}-ratio`]: entry.intersectionRatio
          }))
        }
      })
    }, observerOptions)

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate authentication
    console.log('Auth Data:', { mode: authMode, ...formData })
    
    // Close modal and redirect to quiz
    setShowAuthModal(false)
    router.push('/login')
  }

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const phases = [
    {
      id: 1,
      name: 'Menstruação',
      emoji: '🌙',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      description: 'Aprenda a lidar melhor com os sintomas e se cuidar!',
      tips: ['Descanse e ouça seu corpo', 'Alimentos ricos em ferro', 'Exercícios leves como yoga']
    },
    {
      id: 2,
      name: 'Fase Folicular',
      emoji: '🌱',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      description: 'Entenda como sua energia aumenta e aproveite para realizar novos projetos!',
      tips: ['Momento ideal para novos desafios', 'Energia em alta', 'Criatividade aflorada']
    },
    {
      id: 3,
      name: 'Ovulação',
      emoji: '✨',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      description: 'Saiba o momento certo para se sentir mais confiante e sedutora.',
      tips: ['Pico de energia e confiança', 'Comunicação facilitada', 'Momento de brilhar']
    },
    {
      id: 4,
      name: 'Fase Lútea',
      emoji: '🍂',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      description: 'Dicas para gerenciar a TPM e manter o equilíbrio emocional.',
      tips: ['Autocuidado intensivo', 'Alimentos que combatem TPM', 'Técnicas de relaxamento']
    }
  ]

  const features = [
    {
      icon: Calendar,
      title: 'Acompanhamento Personalizado',
      description: 'Nunca mais esqueça quando seu período vai chegar! Lembretes personalizados e previsões precisas.'
    },
    {
      icon: Heart,
      title: 'Guias para Cada Fase',
      description: 'Dicas de autocuidado, alimentação e exercícios alinhados com cada fase do seu ciclo.'
    },
    {
      icon: Users,
      title: 'Comunidade de Mulheres',
      description: 'Conecte-se com outras mulheres! Compartilhe experiências e crie uma rede de empoderamento.'
    },
    {
      icon: TrendingUp,
      title: 'Relatórios e Análises',
      description: 'Monitore humor, sintomas físicos e emocionais com relatórios detalhados.'
    }
  ]

  const testimonials = [
    {
      name: 'Mariana',
      age: 28,
      text: 'Com o Cycly, nunca mais me senti perdida no meu próprio corpo! Agora, eu sei quando posso me sentir mais energética ou mais introspectiva. Transformador!',
      rating: 5
    },
    {
      name: 'Ana',
      age: 23,
      text: 'Adorei a comunidade! É maravilhoso saber que não estou sozinha nessa jornada.',
      rating: 5
    },
    {
      name: 'Juliana',
      age: 31,
      text: 'O app mudou completamente minha relação com meu ciclo. Agora entendo meu corpo e me sinto no controle!',
      rating: 5
    }
  ]

  const handlePhaseClick = (phaseId: number) => {
    setActivePhase(activePhase === phaseId ? null : phaseId)
  }

  // Calculate parallax values
  const heroParallax = scrollY * 0.5
  const heroOpacity = Math.max(0, 1 - scrollY / 600)
  const heroScale = Math.max(0.8, 1 - scrollY / 2000)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white overflow-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-4">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {authMode === 'login' ? 'Bem-vinda de volta!' : 'Crie sua conta'}
              </h2>
              <p className="text-gray-600">
                {authMode === 'login' 
                  ? 'Entre para continuar sua jornada' 
                  : 'Comece sua jornada de autoconhecimento'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-colors text-gray-900"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-colors text-gray-900"
                />
              </div>

              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-colors text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {authMode === 'login' ? 'Entrar' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                {authMode === 'login' 
                  ? 'Não tem conta? Cadastre-se' 
                  : 'Já tem conta? Faça login'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Parallax Background Layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-transparent transition-all duration-300"
          style={{ 
            transform: `translateY(${heroParallax}px) scale(${1 + scrollY / 3000})`,
            opacity: heroOpacity
          }}
        ></div>
        
        {/* Animated Gradient Orbs with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/40 to-purple-400/40 rounded-full blur-3xl"
            style={{ 
              transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px) scale(${1 + scrollY / 2000})`,
              opacity: heroOpacity
            }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full blur-3xl"
            style={{ 
              transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.4}px) scale(${1 + scrollY / 1500})`,
              opacity: heroOpacity
            }}
          ></div>
          <div 
            className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-yellow-400/40 to-pink-400/40 rounded-full blur-3xl"
            style={{ 
              transform: `translate(${scrollY * 0.15}px, ${-scrollY * 0.3}px) scale(${1 + scrollY / 2500})`,
              opacity: heroOpacity
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-lg"
              style={{ 
                transform: `translateY(${scrollY * 0.1}px) scale(${heroScale})`,
                opacity: heroOpacity
              }}
            >
              🎉 7 Dias Grátis - Experimente Agora!
            </div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
              style={{ 
                transform: `translateY(${scrollY * 0.3}px) scale(${heroScale})`,
                opacity: heroOpacity,
                filter: `blur(${scrollY / 200}px)`
              }}
            >
              Descubra o Poder do Seu Ciclo com o Cycly
            </h1>
            
            <p 
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ 
                transform: `translateY(${scrollY * 0.2}px) scale(${heroScale})`,
                opacity: heroOpacity
              }}
            >
              Você não apenas rastreia seu ciclo; você o <span className="font-semibold text-purple-600">entende</span> e o <span className="font-semibold text-pink-600">abraça</span>. Sinta-se mais conectada e empoderada em cada fase!
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              style={{ 
                transform: `translateY(${scrollY * 0.15}px) scale(${heroScale})`,
                opacity: heroOpacity
              }}
            >
              <button 
                onClick={() => openAuthModal('register')}
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2"
              >
                Começar Agora Grátis
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
              <button 
                onClick={() => openAuthModal('login')}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400"
              >
                Já tenho conta
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          style={{ 
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateX(-50%) translateY(${Math.sin(Date.now() / 500) * 10}px)`
          }}
        >
          <ChevronDown className="w-8 h-8 text-purple-600 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        data-animate
        className="py-16 md:py-24 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div 
            className="text-center mb-16 transition-all duration-1000"
            style={{
              opacity: isVisible['features'] ? 1 : 0,
              transform: isVisible['features'] 
                ? 'translateY(0) scale(1)' 
                : 'translateY(50px) scale(0.9)'
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Por que o Cycly é para você?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para você entender e celebrar cada fase do seu ciclo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const delay = index * 150
              const direction = index % 2 === 0 ? -50 : 50
              
              return (
                <div
                  key={index}
                  data-animate
                  className="group p-6 bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 border border-pink-100 cursor-pointer"
                  style={{
                    opacity: isVisible['features'] ? 1 : 0,
                    transform: isVisible['features']
                      ? 'translateY(0) translateX(0) rotate(0deg) scale(1)'
                      : `translateY(50px) translateX(${direction}px) rotate(${direction / 10}deg) scale(0.8)`,
                    transitionDelay: `${delay}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-20px) scale(1.05) rotate(2deg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Phases Section - Interactive */}
      <section 
        id="phases"
        data-animate
        className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              transform: `translate(${Math.sin(scrollY / 100) * 50}px, ${Math.cos(scrollY / 100) * 50}px)`
            }}
          ></div>
          <div 
            className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              transform: `translate(${Math.cos(scrollY / 150) * -50}px, ${Math.sin(scrollY / 150) * 50}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              transform: `translate(${Math.sin(scrollY / 200) * 50}px, ${Math.cos(scrollY / 200) * -50}px)`
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div 
            className="text-center mb-16 transition-all duration-1000"
            style={{
              opacity: isVisible['phases'] ? 1 : 0,
              transform: isVisible['phases']
                ? 'translateY(0) scale(1)'
                : 'translateY(50px) scale(0.9)'
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              🌙 Explore Cada Fase do Seu Ciclo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Clique em cada fase para descobrir dicas personalizadas
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {phases.map((phase, index) => {
              const delay = index * 150
              const slideDirection = index % 2 === 0 ? -100 : 100
              
              return (
                <div
                  key={phase.id}
                  data-animate
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl border-2 ${
                    activePhase === phase.id ? 'border-purple-400' : 'border-transparent'
                  }`}
                  style={{
                    opacity: isVisible['phases'] ? 1 : 0,
                    transform: isVisible['phases']
                      ? activePhase === phase.id 
                        ? 'translateX(0) scale(1.02) rotate(0deg)'
                        : 'translateX(0) scale(1) rotate(0deg)'
                      : `translateX(${slideDirection}px) scale(0.9) rotate(${slideDirection / 20}deg)`,
                    transitionDelay: `${delay}ms`
                  }}
                >
                  <button
                    onClick={() => handlePhaseClick(phase.id)}
                    className={`w-full p-6 flex items-center justify-between text-left transition-all duration-500 ${
                      activePhase === phase.id ? `${phase.bgColor}` : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-500`}
                        style={{
                          transform: activePhase === phase.id 
                            ? 'scale(1.25) rotate(12deg)' 
                            : 'scale(1) rotate(0deg)'
                        }}
                      >
                        {phase.emoji}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{phase.name}</h3>
                        <p className="text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className="w-6 h-6 text-purple-600 transition-all duration-500"
                      style={{
                        transform: activePhase === phase.id 
                          ? 'rotate(180deg) scale(1.25)' 
                          : 'rotate(0deg) scale(1)'
                      }}
                    />
                  </button>
                  
                  <div 
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: activePhase === phase.id ? '400px' : '0',
                      opacity: activePhase === phase.id ? 1 : 0
                    }}
                  >
                    <div className={`px-6 pb-6 ${phase.bgColor}`}>
                      <div className="pt-4 border-t border-pink-200">
                        <h4 className="font-semibold text-lg mb-3 text-purple-900">Dicas para esta fase:</h4>
                        <ul className="space-y-3">
                          {phase.tips.map((tip, tipIndex) => (
                            <li 
                              key={tipIndex} 
                              className="flex items-start gap-3"
                              style={{
                                opacity: activePhase === phase.id ? 1 : 0,
                                transform: activePhase === phase.id 
                                  ? 'translateX(0)' 
                                  : 'translateX(-20px)',
                                transition: `all 0.5s ease-out ${tipIndex * 100}ms`
                              }}
                            >
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section 
        id="bonus"
        data-animate
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div 
              className="text-center mb-12 transition-all duration-1000"
              style={{
                opacity: isVisible['bonus'] ? 1 : 0,
                transform: isVisible['bonus']
                  ? 'translateY(0) scale(1)'
                  : 'translateY(50px) scale(0.9)'
              }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                🌼 Bônus Exclusivos
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div 
                className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl border-2 border-green-200 transition-all duration-700 cursor-pointer"
                style={{
                  opacity: isVisible['bonus'] ? 1 : 0,
                  transform: isVisible['bonus']
                    ? 'translateX(0) rotate(0deg) scale(1)'
                    : 'translateX(-100px) rotate(-5deg) scale(0.9)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(2deg) translateY(-10px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg) translateY(0)'
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">🥗</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Receitas Saudáveis</h3>
                <p className="text-gray-700 leading-relaxed">
                  Receba sugestões de receitas que vão nutrir seu corpo em cada fase do ciclo.
                </p>
              </div>

              <div 
                className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl border-2 border-blue-200 transition-all duration-700 cursor-pointer"
                style={{
                  opacity: isVisible['bonus'] ? 1 : 0,
                  transform: isVisible['bonus']
                    ? 'translateX(0) rotate(0deg) scale(1)'
                    : 'translateX(100px) rotate(5deg) scale(0.9)',
                  transitionDelay: '200ms'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg) translateY(-10px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg) translateY(0)'
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">🏃‍♀️</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Exercícios Personalizados</h3>
                <p className="text-gray-700 leading-relaxed">
                  Dicas de atividades físicas que vão ajudar você a se sentir bem, não importa a fase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials"
        data-animate
        className="py-16 md:py-24 bg-gradient-to-b from-pink-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <div 
            className="text-center mb-12 transition-all duration-1000"
            style={{
              opacity: isVisible['testimonials'] ? 1 : 0,
              transform: isVisible['testimonials']
                ? 'translateY(0) scale(1)'
                : 'translateY(50px) scale(0.9)'
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              🌈 O que nossas usuárias dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
              const delay = index * 150
              const rotateDirection = index % 2 === 0 ? -5 : 5
              
              return (
                <div
                  key={index}
                  data-animate
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer"
                  style={{
                    opacity: isVisible['testimonials'] ? 1 : 0,
                    transform: isVisible['testimonials']
                      ? 'translateY(0) scale(1) rotate(0deg)'
                      : `translateY(100px) scale(0.8) rotate(${rotateDirection}deg)`,
                    transitionDelay: `${delay}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-20px) scale(1.05) rotate(1deg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                  }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-125 transition-transform duration-300" 
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.age} anos</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-200 hover:scale-105 transition-transform duration-300">
              <Lock className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-gray-900">
                🔒 Sua Privacidade é Nossa Prioridade - Dados 100% Seguros
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-500 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Transforme Sua Relação com Seu Ciclo Agora!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Junte-se a milhares de mulheres que já descobriram o poder do autoconhecimento
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={() => openAuthModal('register')}
                className="group px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 hover:scale-110 transition-all duration-300 flex items-center gap-2"
              >
                🚀 Começar Grátis Agora
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>

            <p className="text-lg opacity-90">
              7 dias grátis para experimentar todas as funcionalidades
            </p>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-2xl font-semibold italic">
                Cycly – Entenda seu ciclo, abrace sua essência. 💜
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-center">
        <p className="text-sm">
          © 2024 Cycly. Todos os direitos reservados. Feito com 💜 para mulheres incríveis.
        </p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
