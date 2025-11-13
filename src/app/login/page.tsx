'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Heart, Calendar, TrendingUp, Mail, Lock, User, Award, Zap } from 'lucide-react';

type QuizStep = 
  | 'welcome' 
  | 'q1-phase' 
  | 'q2a-menstruation' 
  | 'q2b-follicular' 
  | 'q2c-ovulation' 
  | 'q2d-luteal'
  | 'q3-feeling'
  | 'q4-goals'
  | 'q5-stress'
  | 'q6-selfcare'
  | 'q7-content'
  | 'result'
  | 'register';

interface QuizAnswers {
  phase?: string;
  phaseFeeling?: string;
  cycleFeeling?: string;
  goals?: string[];
  stress?: string[];
  selfcare?: string[];
  content?: string[];
}

export default function QuizLoginPage() {
  const [step, setStep] = useState<QuizStep>('welcome');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [points, setPoints] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const totalSteps = 9;
  const stepNumbers: Record<QuizStep, number> = {
    welcome: 0,
    'q1-phase': 1,
    'q2a-menstruation': 2,
    'q2b-follicular': 2,
    'q2c-ovulation': 2,
    'q2d-luteal': 2,
    'q3-feeling': 3,
    'q4-goals': 4,
    'q5-stress': 5,
    'q6-selfcare': 6,
    'q7-content': 7,
    result: 8,
    register: 9,
  };

  const currentStepNumber = stepNumbers[step];
  const progress = (currentStepNumber / totalSteps) * 100;

  const handleMultiSelect = (question: keyof QuizAnswers, value: string) => {
    const current = (answers[question] as string[]) || [];
    if (current.includes(value)) {
      setAnswers({
        ...answers,
        [question]: current.filter((v) => v !== value),
      });
    } else {
      setAnswers({
        ...answers,
        [question]: [...current, value],
      });
      setPoints(points + 10);
    }
  };

  const handleSingleSelect = (question: keyof QuizAnswers, value: string, nextStep: QuizStep) => {
    setAnswers({ ...answers, [question]: value });
    setPoints(points + 15);
    setTimeout(() => setStep(nextStep), 400);
  };

  const getPhaseNextStep = (): QuizStep => {
    switch (answers.phase) {
      case 'menstruation':
        return 'q2a-menstruation';
      case 'follicular':
        return 'q2b-follicular';
      case 'ovulation':
        return 'q2c-ovulation';
      case 'luteal':
        return 'q2d-luteal';
      default:
        return 'q3-feeling';
    }
  };

  const getPersonalizedResult = () => {
    const results: Record<string, { title: string; tips: string[]; emoji: string }> = {
      menstruation: {
        emoji: '🌙',
        title: 'Fase de Menstruação - Autocuidado Intensivo',
        tips: [
          'Receitas anti-inflamatórias para aliviar cólicas',
          'Exercícios de yoga suaves e alongamentos',
          'Playlist relaxante para meditação',
          'Dicas de chás calmantes e nutritivos',
        ],
      },
      follicular: {
        emoji: '🌱',
        title: 'Fase Folicular - Energia e Novos Começos',
        tips: [
          'Plano de treinos energizantes e dinâmicos',
          'Receitas ricas em proteínas e vitaminas',
          'Dicas para iniciar novos projetos',
          'Atividades sociais e networking',
        ],
      },
      ovulation: {
        emoji: '✨',
        title: 'Ovulação - Confiança e Conexão',
        tips: [
          'Dicas de autoestima e empoderamento',
          'Sugestões para conexão com parceiro(a)',
          'Atividades que potencializam sua energia',
          'Receitas afrodisíacas e nutritivas',
        ],
      },
      luteal: {
        emoji: '🍂',
        title: 'Fase Lútea - Equilíbrio e Relaxamento',
        tips: [
          'Exercícios de relaxamento e respiração',
          'Playlist de músicas calmantes',
          'Receitas que combatem TPM',
          'Técnicas de mindfulness e meditação',
        ],
      },
    };

    return results[answers.phase || 'menstruation'];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quiz Answers:', answers);
    console.log('Form Data:', formData);
    console.log('Points:', points);
    alert(`🎉 Cadastro realizado com sucesso! Você ganhou ${points} pontos de autocuidado!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Points Badge */}
      {points > 0 && (
        <div className="fixed top-6 right-6 z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-pulse-slow">
            <Award className="w-6 h-6" />
            <span className="font-bold text-lg">{points} pontos</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        {/* Welcome Screen */}
        {step === 'welcome' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-6 animate-bounce-slow">
                <Sparkles className="w-12 h-12 text-pink-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Bem-vinda ao Cycly!
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Vamos conhecer você melhor! Responda 7 perguntas rápidas para personalizarmos sua experiência.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border-2 border-yellow-300 rounded-full mb-8">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">
                  Ganhe pontos de autocuidado a cada resposta!
                </span>
              </div>
              <button
                onClick={() => setStep('q1-phase')}
                className="group bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Começar Quiz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Question 1 - Phase Selection */}
        {step === 'q1-phase' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-900">Qual é a sua fase atual do ciclo menstrual?</h2>
            </div>
            <div className="space-y-4">
              {[
                { value: 'menstruation', label: 'Menstruação', emoji: '🌙', color: 'from-red-400 to-pink-500' },
                { value: 'follicular', label: 'Fase Folicular', emoji: '🌱', color: 'from-green-400 to-emerald-500' },
                { value: 'ovulation', label: 'Ovulação', emoji: '✨', color: 'from-yellow-400 to-orange-500' },
                { value: 'luteal', label: 'Fase Lútea', emoji: '🍂', color: 'from-purple-400 to-pink-500' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('phase', option.value, getPhaseNextStep())}
                  className="group w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-pink-300 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {option.emoji}
                    </div>
                    <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('welcome')}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}

        {/* Question 2A - Menstruation */}
        {step === 'q2a-menstruation' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌙</span>
              <h2 className="text-3xl font-bold text-gray-900">Como você se sente durante a menstruação?</h2>
            </div>
            <div className="space-y-4">
              {[
                { value: 'tired', label: 'Cansada', emoji: '😴' },
                { value: 'emotional', label: 'Emocional', emoji: '😢' },
                { value: 'comfortable', label: 'Confortável', emoji: '😌' },
                { value: 'neutral', label: 'Não me importo', emoji: '😐' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('phaseFeeling', option.value, 'q3-feeling')}
                  className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-red-300 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-red-50"
                >
                  <span className="text-3xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('q1-phase')}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}

        {/* Question 2B - Follicular */}
        {step === 'q2b-follicular' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌱</span>
              <h2 className="text-3xl font-bold text-gray-900">O que você mais gosta de fazer na fase folicular?</h2>
            </div>
            <div className="space-y-4">
              {[
                { value: 'projects', label: 'Começar novos projetos', emoji: '🚀' },
                { value: 'sports', label: 'Praticar esportes', emoji: '🏃‍♀️' },
                { value: 'social', label: 'Conectar-se socialmente', emoji: '👭' },
                { value: 'meditate', label: 'Meditar', emoji: '🧘‍♀️' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('phaseFeeling', option.value, 'q3-feeling')}
                  className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-green-300 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-50"
                >
                  <span className="text-3xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('q1-phase')}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}

        {/* Question 2C - Ovulation */}
        {step === 'q2c-ovulation' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">✨</span>
              <h2 className="text-3xl font-bold text-gray-900">Você costuma sentir mudanças no desejo?</h2>
            </div>
            <div className="space-y-4">
              {[
                { value: 'attractive', label: 'Sim, estou mais atraente', emoji: '💃' },
                { value: 'stable', label: 'Não, me sinto estável', emoji: '😊' },
                { value: 'depends', label: 'Depende', emoji: '🤔' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('phaseFeeling', option.value, 'q3-feeling')}
                  className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-yellow-300 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-yellow-50"
                >
                  <span className="text-3xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('q1-phase')}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}

        {/* Question 2D - Luteal */}
        {step === 'q2d-luteal' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🍂</span>
              <h2 className="text-3xl font-bold text-gray-900">Como você lida com a TPM?</h2>
            </div>
            <div className="space-y-4">
              {[
                { value: 'exercise', label: 'Exercícios físicos', emoji: '🏋️‍♀️' },
                { value: 'comfort-food', label: 'Comida comfort', emoji: '🍫' },
                { value: 'meditation', label: 'Meditação', emoji: '🧘‍♀️' },
                { value: 'ignore', label: 'Ignoro', emoji: '🤷‍♀️' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('phaseFeeling', option.value, 'q3-feeling')}
                  className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-300 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-purple-50"
                >
                  <span className="text-3xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('q1-phase')}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}

        {/* Question 3 - Cycle Feeling */}
        {step === 'q3-feeling' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-900">Como você se sente em relação ao seu ciclo menstrual?</h2>
            </div>
            <div className="space-y-4">
              {[
                { value: 'informed', label: 'Estou bem informada', emoji: '🎓' },
                { value: 'learn', label: 'Quero aprender mais', emoji: '📚' },
                { value: 'doubts', label: 'Tenho algumas dúvidas', emoji: '🤔' },
                { value: 'lost', label: 'Me sinto perdida', emoji: '😕' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('cycleFeeling', option.value, 'q4-goals')}
                  className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-pink-300 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-pink-50"
                >
                  <span className="text-3xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(getPhaseNextStep())}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}

        {/* Question 4 - Goals */}
        {step === 'q4-goals' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-900">Quais são os seus principais objetivos relacionados ao ciclo?</h2>
            </div>
            <p className="text-gray-600 mb-6">Selecione todos que se aplicam:</p>
            <div className="space-y-3">
              {[
                { value: 'health', label: 'Melhorar a saúde geral', emoji: '💪' },
                { value: 'emotions', label: 'Equilibrar emoções', emoji: '🧘‍♀️' },
                { value: 'energy', label: 'Aumentar energia', emoji: '⚡' },
                { value: 'fertility', label: 'Aprender sobre fertilidade', emoji: '👶' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMultiSelect('goals', option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-102 ${
                    (answers.goals || []).includes(option.value)
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                  {(answers.goals || []).includes(option.value) && (
                    <span className="float-right text-pink-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('q3-feeling')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button
                onClick={() => setStep('q5-stress')}
                disabled={!answers.goals || answers.goals.length === 0}
                className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                Próxima
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Question 5 - Stress */}
        {step === 'q5-stress' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">😰</span>
              <h2 className="text-3xl font-bold text-gray-900">Quais fatores influenciam seu estresse durante o ciclo?</h2>
            </div>
            <p className="text-gray-600 mb-6">Selecione todos que se aplicam:</p>
            <div className="space-y-3">
              {[
                { value: 'work', label: 'Trabalho', emoji: '💼' },
                { value: 'personal', label: 'Vida pessoal', emoji: '🏠' },
                { value: 'health', label: 'Saúde', emoji: '🏥' },
                { value: 'social', label: 'Relações sociais', emoji: '👥' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMultiSelect('stress', option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-102 ${
                    (answers.stress || []).includes(option.value)
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                  {(answers.stress || []).includes(option.value) && (
                    <span className="float-right text-pink-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('q4-goals')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button
                onClick={() => setStep('q6-selfcare')}
                disabled={!answers.stress || answers.stress.length === 0}
                className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                Próxima
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Question 6 - Self Care */}
        {step === 'q6-selfcare' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌸</span>
              <h2 className="text-3xl font-bold text-gray-900">O que você faz para se cuidar?</h2>
            </div>
            <p className="text-gray-600 mb-6">Selecione todos que se aplicam:</p>
            <div className="space-y-3">
              {[
                { value: 'yoga', label: 'Praticar yoga', emoji: '🧘‍♀️' },
                { value: 'walk', label: 'Fazer caminhadas', emoji: '🚶‍♀️' },
                { value: 'cook', label: 'Cozinhar', emoji: '👩‍🍳' },
                { value: 'alone', label: 'Ter tempo sozinha', emoji: '🛀' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMultiSelect('selfcare', option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-102 ${
                    (answers.selfcare || []).includes(option.value)
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                  {(answers.selfcare || []).includes(option.value) && (
                    <span className="float-right text-pink-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('q5-stress')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button
                onClick={() => setStep('q7-content')}
                disabled={!answers.selfcare || answers.selfcare.length === 0}
                className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                Próxima
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Question 7 - Content */}
        {step === 'q7-content' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-900">Qual tipo de conteúdo você gostaria de receber?</h2>
            </div>
            <p className="text-gray-600 mb-6">Selecione todos que se aplicam:</p>
            <div className="space-y-3">
              {[
                { value: 'health', label: 'Dicas de saúde', emoji: '💊' },
                { value: 'recipes', label: 'Receitas', emoji: '🥗' },
                { value: 'exercises', label: 'Exercícios', emoji: '🏃‍♀️' },
                { value: 'community', label: 'Comunidade de suporte', emoji: '👭' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMultiSelect('content', option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-102 ${
                    (answers.content || []).includes(option.value)
                      ? 'border-pink-500 bg-pink-50 shadow-md'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                  {(answers.content || []).includes(option.value) && (
                    <span className="float-right text-pink-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('q6-selfcare')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button
                onClick={() => setStep('result')}
                disabled={!answers.content || answers.content.length === 0}
                className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                Ver Resultado
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Result Screen */}
        {step === 'result' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-4 animate-bounce-slow">
                <Award className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Parabéns! 🎉</h2>
              <p className="text-lg text-gray-600 mb-4">
                Você ganhou <span className="font-bold text-pink-600">{points} pontos de autocuidado!</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{getPersonalizedResult().emoji}</span>
                <h3 className="text-2xl font-bold text-gray-900">{getPersonalizedResult().title}</h3>
              </div>
              <p className="text-gray-700 mb-4 font-semibold">Seu plano personalizado inclui:</p>
              <ul className="space-y-3">
                {getPersonalizedResult().tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border-2 border-green-200">
              <p className="text-center text-lg font-semibold text-gray-900">
                🎁 Pronta para começar sua jornada com o Cycly?
                <br />
                <span className="text-green-600">Complete seu cadastro e aproveite 7 dias grátis!</span>
              </p>
            </div>

            <button
              onClick={() => setStep('register')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Criar Minha Conta Grátis
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Register Form */}
        {step === 'register' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-4">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Último passo!</h2>
              <p className="text-gray-600">Crie sua conta para começar sua jornada com o Cycly</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border-2 border-yellow-300 rounded-full mt-4">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">
                  {points} pontos de autocuidado te esperam!
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-colors text-gray-900"
                />
              </div>

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
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Crie uma senha"
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
                Criar Conta e Começar 🎉
              </button>

              <p className="text-center text-sm text-gray-600">
                Ao criar sua conta, você concorda com nossos{' '}
                <a href="#" className="text-pink-600 hover:underline">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-pink-600 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </form>

            <button
              onClick={() => setStep('result')}
              className="mt-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
