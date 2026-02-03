
import React, { useState } from 'react';
import { SegmentType } from '../types';

interface SegmentSelectorProps {
  isLoggedIn: boolean;
  onLoginRequired: () => void;
  isDarkBackground?: boolean;
}

const SegmentSelector: React.FC<SegmentSelectorProps> = ({ isLoggedIn, onLoginRequired, isDarkBackground = true }) => {
  const [selected, setSelected] = useState<SegmentType | null>(null);

  const segments = [
    { type: SegmentType.ACADEMIA, icon: 'fa-dumbbell', desc: 'Gestão de alunos, treinos digitais e biometria.', exampleUrl: 'https://academia-peach-theta.vercel.app/' },
    { type: SegmentType.FARMACIA, icon: 'fa-pills', desc: 'Estoque inteligente e e-commerce farmacêutico.' },
    { type: SegmentType.HAMBURGUERIA, icon: 'fa-burger', desc: 'Cardápios QR, pedidos e delivery integrado.' },
    { type: SegmentType.IMOBILIARIA, icon: 'fa-house', desc: 'Portais com tour virtual e CRM avançado.', exampleUrl: 'https://imobiliaria-gold.vercel.app/' },
    { type: SegmentType.PETSHOP, icon: 'fa-paw', desc: 'Gestão de banho e tosa, vacinas e agendamento online.' },
    { type: SegmentType.LEILAO, icon: 'fa-gavel', desc: 'Plataforma de lances em tempo real e gestão de arremates.' },
    { type: SegmentType.OUTROS, icon: 'fa-plus', desc: 'Soluções customizadas para seu desafio único.' },
  ];

  const handleRequest = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    alert(`Solicitação para o segmento ${selected} enviada! Entraremos em contato.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-12">
        {segments.map((seg) => (
          <button
            key={seg.type}
            onClick={() => setSelected(seg.type)}
            className={`p-3 rounded-3xl transition-all duration-300 flex flex-col items-center justify-center space-y-3 border-2 ${selected === seg.type
              ? 'bg-ej-green border-ej-green text-white shadow-xl scale-105'
              : isDarkBackground
                ? 'bg-white/5 border-white/10 hover:border-white text-white'
                : 'bg-slate-50 border-slate-100 hover:border-ej-green text-slate-600'
              }`}
          >
            <i className={`fas ${seg.icon} text-xl ${selected === seg.type ? 'text-white' : (isDarkBackground ? 'text-white' : 'text-ej-green')}`}></i>
            <span className={`font-black text-[10px] uppercase tracking-widest text-center ${selected === seg.type ? 'text-white' : (isDarkBackground ? 'text-white' : 'text-slate-600')}`}>
              {seg.type}
            </span>
          </button>
        ))}
      </div>

      <div className={`border backdrop-blur-sm p-10 rounded-[2.5rem] text-center min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${isDarkBackground
        ? 'bg-white/5 border-white/10'
        : 'bg-slate-50 border-slate-200 shadow-inner'
        }`}>
        {selected ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10">
            <h3 className={`text-2xl font-black mb-4 ${isDarkBackground ? 'text-white' : 'text-ej-dark'}`}>
              Solução EJ para <span className={isDarkBackground ? 'text-white underline decoration-ej-green' : 'text-ej-green'}>{selected}</span>
            </h3>
            <p className={`mb-8 font-medium max-w-lg mx-auto ${isDarkBackground ? 'text-slate-100' : 'text-slate-500'}`}>
              {segments.find(s => s.type === selected)?.desc}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {segments.find(s => s.type === selected)?.exampleUrl && (
                <a
                  href={segments.find(s => s.type === selected)?.exampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg border-2 transition-all ${isDarkBackground
                      ? 'border-white text-white hover:bg-white hover:text-ej-dark'
                      : 'border-ej-dark text-ej-dark hover:bg-ej-dark hover:text-white'
                    }`}
                >
                  Ver Exemplo
                </a>
              )}
              <button
                onClick={handleRequest}
                className="btn-success px-12 py-4 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 opacity-70">
            <i className={`fas fa-hand-pointer text-3xl animate-bounce ${isDarkBackground ? 'text-white' : 'text-ej-green'}`}></i>
            <p className={`font-bold uppercase tracking-[0.3em] text-xs ${isDarkBackground ? 'text-white' : 'text-slate-400'}`}>
              Selecione sua categoria acima
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SegmentSelector;
