
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Previne scroll quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const menuLinks = [
    { label: 'Projetos', href: '#dev' },
    { label: 'Tráfego', href: '#traffic' },
    { label: 'Social', href: '#social' },
    { label: 'Contato', href: '#footer' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between lg:justify-center lg:gap-56">
          <a href="#" className="flex items-center space-x-1 group relative z-[70]">
            <img src="/logo-nav-final.png" alt="InnoviQ Digital" className="h-20 w-auto object-contain" />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            {menuLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-ej-green transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden lg:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-slate-600 font-bold">Olá, {user.name.split(' ')[0]}</span>
                  <button onClick={onLogout} className="text-xs font-black text-ej-dark hover:text-ej-green">SAIR</button>
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="btn-primary px-8 py-3 text-white rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                  Área do Cliente
                </button>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-[70] w-10 h-10 flex items-center justify-center text-ej-dark"
              aria-label="Toggle Menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-all duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Background Blur */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl"></div>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="flex flex-col items-center space-y-8 mb-12">
            {menuLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-2xl font-black uppercase tracking-[0.2em] text-ej-dark hover:text-ej-green transition-all transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className={`w-full max-w-xs transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
            {user ? (
              <div className="flex flex-col items-center space-y-4">
                <span className="text-sm text-slate-500 font-bold italic">Logado como {user.name}</span>
                <button
                  onClick={() => { onLogout(); handleLinkClick(); }}
                  className="w-full py-4 border-2 border-ej-dark text-ej-dark rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  Sair da Conta
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onLoginClick(); handleLinkClick(); }}
                className="w-full btn-primary py-5 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl"
              >
                Área do Cliente
              </button>
            )}
          </div>

          {/* Social Icons in Mobile Menu */}
          <div className={`mt-16 flex space-x-6 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ transitionDelay: '500ms' }}>
            <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-ej-dark hover:bg-ej-green hover:text-white transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-ej-dark hover:bg-ej-green hover:text-white transition-colors">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-ej-dark hover:bg-ej-green hover:text-white transition-colors">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
