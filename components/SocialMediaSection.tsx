
import React from 'react';

const SocialMediaSection: React.FC<{ id: string, className?: string }> = ({ id, className = "" }) => {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Presença Social</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Domínio de <br /><span className="text-ej-green">Redes Sociais</span></h2>
          </div>
          <p className="text-white/80 max-w-sm font-medium">Sua marca viva e pulsante onde seu cliente passa a maior parte do tempo.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Estratégia Social', icon: 'fa-chess', desc: 'Planejamento de linha editorial focada em autoridade e vendas.' },
            { title: 'Design Completo', icon: 'fa-palette', desc: 'Identidade visual moderna para posts, reels e stories.' },
            { title: 'Gestão de Comunidade', icon: 'fa-comments', desc: 'Interação ativa e monitoramento de marca 24/7.' }
          ].map((item, idx) => (
            <div key={idx} className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-ej-green rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:-translate-y-2 transition-transform">
                <i className={`fas ${item.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;