
import React, { useState } from 'react';
import { User, Comment } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import SegmentSelector from './components/SegmentSelector';
import SocialMediaSection from './components/SocialMediaSection';
import TrafficSection from './components/TrafficSection';
import CommentSection from './components/CommentSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Carlos Silva',
      text: 'A EJ TEC transformou a presença digital da minha hamburgueria. Site rápido e intuitivo!',
      date: '10/05/2024',
      avatar: 'https://picsum.photos/seed/user1/100/100'
    },
    {
      id: '2',
      user: 'Ana Oliveira',
      text: 'O tráfego pago deles realmente converte. Tivemos um aumento de 40% nas vendas do mês.',
      date: '12/05/2024',
      avatar: 'https://picsum.photos/seed/user2/100/100'
    }
  ]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const addComment = (text: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const newComment: Comment = {
      id: Date.now().toString(),
      user: user.name,
      text,
      date: new Date().toLocaleDateString('pt-BR'),
      avatar: `https://picsum.photos/seed/${user.name}/100/100`
    };
    setComments([newComment, ...comments]);
  };

  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar user={user} onLoginClick={() => setShowAuthModal(true)} onLogout={handleLogout} />
      
      <main className="flex-grow">
        <Hero onStartClick={() => setShowAuthModal(true)} isLoggedIn={!!user} />
        
        <ServiceSection id="dev" className="bg-ej-dark text-white py-16 md:py-24 scroll-mt-20">
          <div className="text-center mb-12 relative">
            <span className="text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block opacity-70">Especialidades</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tighter">Sistemas & <span className="text-white">Web</span></h2>
            <p className="text-slate-100 max-w-2xl mx-auto px-6 text-sm md:text-lg font-medium opacity-80">
              Arquitetura de software moderna para negócios que não aceitam menos que a excelência tecnológica.
            </p>
          </div>
          <SegmentSelector isLoggedIn={!!user} onLoginRequired={() => setShowAuthModal(true)} isDarkBackground={true} />
        </ServiceSection>

        <TrafficSection id="traffic" className="bg-white text-slate-900" />

        <SocialMediaSection id="social" className="bg-ej-teal text-white scroll-mt-20" />

        <PricingSection onSelectPlan={() => setShowAuthModal(true)} />

        <CommentSection 
          comments={comments} 
          onAddComment={addComment} 
          isLoggedIn={!!user} 
        />
      </main>

      <Footer />

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
};

export default App;
