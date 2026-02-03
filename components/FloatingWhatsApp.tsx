
import React from 'react';

const FloatingWhatsApp: React.FC = () => {
    const phoneNumber = '5524981755889'; // Format from footer: (24) 98175-5889
    const message = 'Olá! Gostaria de saber mais sobre as soluções da InnoviQ.';

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group"
            aria-label="Contato via WhatsApp"
        >
            <i className="fab fa-whatsapp text-3xl"></i>
            {/* Tooltip */}
            <span className="absolute left-full ml-4 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Fale Conosco
            </span>
        </a>
    );
};

export default FloatingWhatsApp;
