
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#245057] pt-24 pb-12 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-8 -mt-12">
              <img src="/logo-innovi.png" alt="InnoviQ Digital" className="w-96 object-contain" />
            </div>
            <p className="text-white max-w-sm mb-8 leading-relaxed font-medium">
              Transformando desafios complexos em soluções digitais simples e lucrativas. Líderes em engenharia de software e marketing de performance.
            </p>
            <div className="flex space-x-4">
              {['instagram', 'linkedin-in', 'whatsapp'].map(social => (
                <a key={social} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-ej-green transition-all">
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-ej-green">Soluções</h4>
            <ul className="space-y-4 text-white text-sm font-bold">
              <li><a href="#dev" className="hover:text-ej-green transition">Desenvolvimento Web</a></li>
              <li><a href="#traffic" className="hover:text-ej-green transition">Tráfego Pago</a></li>
              <li><a href="#social" className="hover:text-ej-green transition">Redes Sociais</a></li>
              <li><a href="#dev" className="hover:text-ej-green transition">Sistemas de Gestão</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-ej-green">Contato</h4>
            <ul className="space-y-4 text-white text-sm font-bold">
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope text-ej-green"></i>
                <span>johnyramonvoss@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone text-ej-green"></i>
                <span>(24) 98175-5889</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-white text-xs font-black uppercase tracking-[0.5em]">
          © 2026 INNOVIQ DIGITAL• ALTA TECNOLOGIA
        </div>
      </div>
    </footer>
  );
};

export default Footer;