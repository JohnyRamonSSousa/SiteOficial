
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          isLoggedIn: true
        });
        setView('dashboard');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          isLoggedIn: true
        });
        if (_event === 'SIGNED_IN') {
          setView('dashboard');
        }
      } else {
        setUser(null);
        setView('landing');
      }
    });

    fetchComments();

    return () => subscription.unsubscribe();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        text,
        created_at,
        user_id,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else if (data) {
      const formattedComments: Comment[] = data.map((item: any) => ({
        id: item.id,
        user: item.profiles?.full_name || 'Anônimo',
        text: item.text,
        date: new Date(item.created_at).toLocaleDateString('pt-BR'),
        avatar: item.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.profiles?.full_name || 'A')}&background=random`
      }));
      setComments(formattedComments);
    }
  };

  const handleLogin = (userData: User) => {
    // This is now primarily handled by the onAuthStateChange listener,
    // but kept for immediate local state update if needed by AuthModal
    setUser(userData);
    setShowAuthModal(false);
    setView('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('landing');
  };

  const addComment = async (text: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) return;

    const { error } = await supabase
      .from('comments')
      .insert({
        text,
        user_id: authUser.id
      });

    if (error) {
      console.error('Error adding comment:', error);
      alert('Erro ao enviar comentário.');
    } else {
      fetchComments(); // Refresh list
    }
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

      <FloatingWhatsApp />
      <ScrollToTop />

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
