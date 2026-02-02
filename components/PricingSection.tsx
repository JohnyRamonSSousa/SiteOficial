
import React from 'react';

interface PricingSectionProps {
  onSelectPlan: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      title: 'Web & Sistemas',
      price: '2.900',
      period: 'projeto',
      icon: 'fa-code',
      features: ['Site Institucional', 'E-commerce', 'Painel Administrativo', 'SEO Otimizado'],
      color: 'border-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Tráfego Pago',
      price: '1.500',
      period: 'mês',
      icon: 'fa-bullseye',
      features: ['Google & Meta Ads', 'Dashboard em Tempo Real', 'Otimização de ROI', 'Suporte VIP'],
      color: 'border-ej-green',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Gestão Social',
      price: '1.200',
      period: 'mês',
      icon: 'fa-hashtag',
      features: ['Cronograma Editorial', 'Design de Posts/Reels', 'Monitoramento 24/7', 'Relatório de Engajamento'],
      color: 'border-purple-500',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-ej-green font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Nossos Planos</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Investimento em <span className="text-ej-green">Resultados</span></h2>
          <p className="text-slate-500 font-medium mt-4">Transparência total para o crescimento do seu negócio.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`bg-white rounded-[3rem] p-10 border-2 ${plan.color} shadow-xl hover:scale-105 transition-transform duration-500 flex flex-col`}>
              <div className={`w-16 h-16 ${plan.bg} rounded-2xl flex items-center justify-center mb-8`}>
                <i className={`fas ${plan.icon} text-2xl text-slate-900`}></i>
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{plan.title}</h3>
              <div className="flex items-baseline space-x-1 mb-8">
                <span className="text-slate-400 text-sm font-bold">R$</span>
                <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                <span className="text-slate-400 text-xs font-bold uppercase">/{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-3 text-sm font-medium text-slate-600">
                    <i className="fas fa-check-circle text-ej-green"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onSelectPlan}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-ej-green hover:text-slate-900 transition-colors shadow-lg"
              >
                Contratar Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
