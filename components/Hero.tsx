
import React from 'react';

interface HeroProps {
  onStartClick: () => void;
  isLoggedIn: boolean;
}

const Hero: React.FC<HeroProps> = ({ onStartClick, isLoggedIn }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4 -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-slate-900 tracking-tight">
            Criamos <span className="text-ej-dark">Sistemas</span> que <br/> 
            Escalam seu <span className="text-ej-green">Negócio</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Desenvolvimento de elite, tráfego focado em ROI e gestão estratégica de marcas. Tudo o que sua empresa precisa em um só lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartClick}
              className="btn-success w-full sm:w-auto px-10 py-5 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl"
            >
              Começar Projeto
            </button>
            <a 
              href="#traffic"
              className="w-full sm:w-auto px-10 py-5 bg-white text-ej-dark border-2 border-ej-dark rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition shadow-sm"
            >
              Ver Resultados
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
