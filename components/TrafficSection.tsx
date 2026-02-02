
import React from 'react';

interface TrafficSectionProps {
  id: string;
  className?: string;
}

const TrafficSection: React.FC<TrafficSectionProps> = ({ id, className = "" }) => {
  return (
    <section id={id} className={`py-24 scroll-mt-20 transition-colors duration-500 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-ej-dark font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Marketing de Performance</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tighter">
              Aceleração de <span className="text-ej-dark">Vendas</span> <br />
              via <span className="text-ej-green">Tráfego Pago</span>
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl font-medium">
              Não compramos apenas cliques, compramos conversões. Nossa metodologia exclusiva de Ads foca no seu ROI (Retorno sobre Investimento).
            </p>
            <div className="space-y-4">
              {[
                { t: 'Google & YouTube Ads', d: 'Esteja onde o cliente pesquisa.', icon: 'fa-search-dollar' },
                { t: 'Meta Ads (Insta/FB)', d: 'Interrompa com desejo e relevância.', icon: 'fa-users-cog' },
                { t: 'Tracking de Dados', d: 'Saiba de onde vem cada centavo.', icon: 'fa-bullseye' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-ej-green/50 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-ej-green/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <i className={`fas ${item.icon} text-ej-green text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">{item.t}</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-ej-green/5 rounded-[3rem] -rotate-3 scale-105"></div>
            <div className="relative bg-ej-dark p-10 md:p-16 rounded-[3rem] text-center shadow-2xl border border-white/10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl md:text-6xl font-black text-ej-green mb-2">10x</div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">ROI Potencial</div>
                </div>
                <div>
                  <div className="text-4xl md:text-6xl font-black text-white mb-2">R$ 5M+</div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Verba Gerida</div>
                </div>
              </div>
              <div className="mt-12 p-8 bg-white/5 rounded-[2rem] border border-white/10">
                <p className="text-white text-sm font-bold italic leading-relaxed">"Estratégia validada para escala agressiva de faturamento no digital."</p>
                <div className="mt-4 flex items-center justify-center space-x-1 text-ej-green text-[10px]">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrafficSection;
