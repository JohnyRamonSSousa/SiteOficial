
import React, { useState } from 'react';
import { User } from '../types';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

type AuthView = 'login' | 'register' | 'forgot-password';
type ServiceOption = 'Web' | 'Tráfego' | 'Social';

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [view, setView] = useState<AuthView>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceOption>('Web');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (view === 'forgot-password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/reset-password', // Ensure this route exists or redirect to home
        });
        if (error) throw error;
        alert(`Um link de recuperação foi enviado para ${email}`);
        setView('login');
      } else if (view === 'register') {
        if (password !== confirmPassword) {
          throw new Error('As senhas não coincidem!');
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            }
          }
        });
        if (error) throw error;
        if (data.user) {
          alert('Conta criada com sucesso! Verifique seu email para confirmar.');
          onLogin({
            name: name,
            email: email,
            isLoggedIn: true
          });
        }
      } else if (view === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          onLogin({
            name: data.user.user_metadata.full_name || email.split('@')[0],
            email: email,
            isLoggedIn: true
          });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao tentar autenticar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full ${view === 'register' ? 'max-w-xl' : 'max-w-md'} bg-white p-8 md:p-10 rounded-[2.5rem] relative animate-in zoom-in-95 duration-300 shadow-2xl overflow-y-auto max-h-[90vh]`}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition p-2"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <i className={`fas ${view === 'forgot-password' ? 'fa-key' : (view === 'register' ? 'fa-user-plus' : 'fa-user-lock')} text-ej-dark text-2xl`}></i>
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            {view === 'login' && <>Área do <span className="text-ej-green">Cliente</span></>}
            {view === 'register' && <>Crie sua <span className="text-ej-green">Conta</span></>}
            {view === 'forgot-password' && <>Recuperar <span className="text-ej-green">Acesso</span></>}
          </h3>
          <p className="text-slate-500 text-xs mt-2 font-medium tracking-wide">
            {view === 'login' && 'Bem-vindo de volta! Acesse seus projetos.'}
            {view === 'register' && 'Escolha o serviço e comece agora.'}
            {view === 'forgot-password' && 'Enviaremos instruções para o seu e-mail.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <>
              <div className="space-y-3 mb-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Serviço de Interesse</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Web', icon: 'fa-code', label: 'Web/Sistemas' },
                    { id: 'Tráfego', icon: 'fa-bullseye', label: 'Tráfego' },
                    { id: 'Social', icon: 'fa-hashtag', label: 'Social' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedService(opt.id as ServiceOption)}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center space-y-2 transition-all ${selectedService === opt.id
                        ? 'border-ej-green bg-emerald-50 text-ej-dark shadow-sm'
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                        }`}
                    >
                      <i className={`fas ${opt.icon} text-sm`}></i>
                      <span className="text-[9px] font-black uppercase tracking-tighter">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nome Completo</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm text-slate-900"
                  placeholder="Ex: João Silva"
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">E-mail Profissional</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm text-slate-900"
              placeholder="seu@email.com"
            />
          </div>

          {view !== 'forgot-password' && (
            <>
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Senha</label>
                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => setView('forgot-password')}
                      className="text-[10px] font-bold text-ej-green hover:underline uppercase tracking-wider"
                    >
                      Esqueci a senha
                    </button>
                  )}
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm text-slate-900"
                  placeholder="••••••••"
                />
              </div>

              {view === 'register' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Confirmar Senha</label>
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium text-sm text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full py-4 mt-4 btn-success text-slate-900 rounded-xl font-black transition shadow-lg shadow-emerald-100 flex items-center justify-center space-x-3 uppercase tracking-[0.15em] text-xs"
          >
            <span>
              {view === 'login' && 'Entrar na Conta'}
              {view === 'register' && 'Criar Conta & Iniciar'}
              {view === 'forgot-password' && 'Enviar Instruções'}
            </span>
            <i className="fas fa-chevron-right text-[10px]"></i>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          {view === 'login' ? (
            <p className="text-xs text-slate-500 font-medium">
              Não tem uma conta?{' '}
              <button
                onClick={() => setView('register')}
                className="text-ej-dark font-black hover:text-ej-green transition uppercase tracking-wider"
              >
                Cadastre-se
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500 font-medium">
              {view === 'register' ? 'Já possui uma conta?' : 'Lembrou a senha? '}{' '}
              <button
                onClick={() => setView('login')}
                className="text-ej-dark font-black hover:text-ej-green transition uppercase tracking-wider"
              >
                Fazer Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
