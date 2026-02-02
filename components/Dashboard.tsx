
import React, { useState } from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ProjectStatus = 'briefing' | 'design' | 'dev' | 'review' | 'launched';
type ServiceType = 'Web' | 'Tráfego' | 'Social';
type DashboardView = 'main' | 'payments' | 'contracts' | 'briefing' | 'support';

interface Project {
  id: string;
  name: string;
  type: ServiceType;
  status: ProjectStatus;
  progress: number;
  details: string;
  value: string;
  stats: {
    messages: number;
    files: number;
    tasks: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeService, setActiveService] = useState<ServiceType>('Web');
  const [activeView, setActiveView] = useState<DashboardView>('main');
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const projectData: Record<ServiceType, Project> = {
    'Web': {
      id: 'w1',
      name: 'Site Institucional / Sistema',
      type: 'Web',
      status: 'briefing',
      progress: 0,
      value: 'R$ 2.900,00',
      details: 'Aguardando o preenchimento do briefing técnico para início do desenvolvimento.',
      stats: { messages: 2, files: 1, tasks: 5 }
    },
    'Tráfego': {
      id: 't1',
      name: 'Gestão de Anúncios Ads',
      type: 'Tráfego',
      status: 'briefing',
      progress: 0,
      value: 'R$ 1.500,00/mês',
      details: 'Configurando as contas de anúncios e acessos do Gerenciador de Negócios.',
      stats: { messages: 0, files: 0, tasks: 3 }
    },
    'Social': {
      id: 's1',
      name: 'Gestão de Redes Sociais',
      type: 'Social',
      status: 'briefing',
      progress: 0,
      value: 'R$ 1.200,00/mês',
      details: 'Definição estratégica do público-alvo e cronograma de publicações.',
      stats: { messages: 1, files: 2, tasks: 4 }
    }
  };

  const currentProject = projectData[activeService];

  const statusMap: Record<ProjectStatus, { label: string, color: string, icon: string }> = {
    briefing: { label: 'Briefing', color: 'bg-blue-600', icon: 'fa-file-signature' },
    design: { label: 'Design UI', color: 'bg-purple-600', icon: 'fa-palette' },
    dev: { label: 'Desenvolvimento', color: 'bg-ej-green', icon: 'fa-code' },
    review: { label: 'Homologação', color: 'bg-orange-500', icon: 'fa-eye' },
    launched: { label: 'Finalizado', color: 'bg-slate-900', icon: 'fa-rocket' }
  };

  const switchService = (type: ServiceType) => {
    setActiveService(type);
    setShowSwitchModal(false);
    setActiveView('main');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'payments':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Financeiro <span className="text-ej-green">/ Faturas</span></h3>
            <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Descrição</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Valor</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Vencimento</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { desc: `Adesão ${activeService}`, val: currentProject.value, date: '20/06/2024', status: 'Pendente' },
                    { desc: 'Taxa de Setup', val: 'R$ 500,00', date: '15/06/2024', status: 'Pago' }
                  ].map((inv, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6 font-bold text-slate-900 text-sm">{inv.desc}</td>
                      <td className="px-8 py-6 font-black text-slate-900 text-sm">{inv.val}</td>
                      <td className="px-8 py-6 font-medium text-slate-500 text-sm">{inv.date}</td>
                      <td className="px-8 py-6 text-sm">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${inv.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm">
                        <button className="text-ej-green font-black hover:underline uppercase tracking-widest text-[10px]">Ver PDF</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'contracts':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Documentos <span className="text-ej-green">/ Jurídico</span></h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Contrato de Prestação de Serviço', date: '10/05/2024', size: '2.4MB' },
                { title: 'NDA - Acordo de Confidencialidade', date: '10/05/2024', size: '1.1MB' },
                { title: 'Proposta Comercial Aprovada', date: '08/05/2024', size: '4.8MB' }
              ].map((doc, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 flex items-center justify-between hover:border-ej-green transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-ej-green/10 group-hover:text-ej-green transition-all">
                      <i className="fas fa-file-signature text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{doc.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-ej-green hover:text-slate-900 transition-colors">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'briefing':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Formulário de <span className="text-ej-green">Briefing</span></h3>
            <div className="bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 shadow-xl max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Qual o objetivo principal do projeto?</label>
                  <textarea className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 focus:ring-2 focus:ring-ej-green outline-none min-h-[120px] font-medium text-slate-900" placeholder="Ex: Aumentar vendas em 20% no próximo trimestre..."></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Público Alvo</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 focus:ring-2 focus:ring-ej-green outline-none font-medium text-slate-900" placeholder="Ex: Jovens de 18-25 anos" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Principais Concorrentes</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 focus:ring-2 focus:ring-ej-green outline-none font-medium text-slate-900" placeholder="Empresa A, Empresa B..." />
                  </div>
                </div>
                <button className="w-full py-6 bg-ej-green text-slate-900 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-ej-green/20 hover:scale-[1.02] transition-all">Enviar Planejamento Técnico</button>
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[70vh]">
            <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">Canal Direto <span className="text-ej-green">/ Suporte</span></h3>
            <div className="flex-grow bg-white rounded-[3.5rem] border-2 border-slate-50 shadow-xl overflow-hidden flex flex-col">
              <div className="bg-slate-900 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-ej-green rounded-full flex items-center justify-center">
                    <i className="fas fa-headset text-slate-900"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-widest">Consultor EJ Especialista</h4>
                    <span className="text-ej-green text-[9px] font-bold uppercase animate-pulse">Online Agora</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-slate-50/30">
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-sm border border-slate-100">
                    <p className="text-slate-700 text-sm font-medium">Olá {user.name}! Como posso ajudar com seu projeto de {activeService} hoje?</p>
                    <span className="text-[8px] text-slate-400 mt-2 block font-black uppercase">10:05 AM</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  <input type="text" className="flex-grow bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-ej-green outline-none font-medium" placeholder="Digite sua mensagem..." />
                  <button className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-ej-green hover:text-slate-900 transition-all">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            {/* Banner Principal do Dashboard */}
            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border-2 border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="relative z-10 text-center md:text-left">
                <div className="flex items-center space-x-3 mb-4 justify-center md:justify-start">
                  <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Projeto Ativo</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investimento: <span className="text-slate-900">{currentProject.value}</span></span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-none tracking-tighter uppercase italic">
                  Vamos decolar seu <br />
                  projeto <span className="text-ej-green underline decoration-ej-green/20">Agora!</span>
                </h1>
                <p className="text-slate-500 font-bold max-w-md mb-8 text-sm uppercase tracking-tight">
                  Status: {currentProject.details}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button onClick={() => setActiveView('briefing')} className="px-10 py-5 bg-ej-green text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-ej-green/20">Completar Briefing</button>
                  <button onClick={() => setActiveView('payments')} className="px-10 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Ver Faturas</button>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-center bg-slate-900 p-12 rounded-[3rem] shadow-2xl">
                <div className="text-7xl font-black text-ej-green mb-2 italic">{currentProject.progress}%</div>
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Configuração</div>
                <div className="w-48 h-3 bg-white/10 rounded-full mt-8 overflow-hidden">
                  <div className="h-full bg-ej-green transition-all duration-1000" style={{ width: `${currentProject.progress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Conversas', val: currentProject.stats.messages.toString(), icon: 'fa-comments', view: 'support' },
                { label: 'Documentos', val: currentProject.stats.files.toString(), icon: 'fa-file-pdf', view: 'contracts' },
                { label: 'Tarefas Pendentes', val: currentProject.stats.tasks.toString(), icon: 'fa-tasks', view: 'main' },
                { label: 'Investimento', val: currentProject.value.split(',')[0], icon: 'fa-credit-card', view: 'payments' }
              ].map((stat, i) => (
                <div key={i} onClick={() => setActiveView(stat.view as DashboardView)} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm flex items-center justify-between hover:border-ej-green transition-colors cursor-pointer group">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-ej-green transition-colors">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900">{stat.val}</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-ej-green/10 group-hover:text-ej-green transition-all">
                    <i className={`fas ${stat.icon} text-xl`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 pb-12">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tighter italic flex items-center space-x-3">
                  <i className="fas fa-layer-group text-ej-green"></i>
                  <span>Fluxo do Projeto</span>
                </h3>

                <div className="space-y-10">
                  {Object.keys(statusMap).map((key, index) => {
                    const statusKey = key as ProjectStatus;
                    const isCurrent = currentProject.status === statusKey;

                    return (
                      <div key={key} className={`flex items-start space-x-8 relative ${index < 4 ? 'pb-10 border-l-4 border-slate-50 ml-6' : 'ml-6'}`}>
                        <div className={`absolute -left-[18px] w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-colors duration-500 ${isCurrent ? statusMap[statusKey].color : 'bg-slate-100'}`}>
                          <i className={`fas ${statusMap[statusKey].icon} text-[10px] text-white`}></i>
                        </div>
                        <div className={`p-8 rounded-[2rem] flex-grow transition-all duration-500 ${isCurrent ? 'bg-slate-50 ring-4 ring-slate-100' : 'opacity-40'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={`font-black uppercase text-sm tracking-widest ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                              {statusMap[statusKey].label}
                            </h4>
                            {isCurrent && <span className="text-[10px] font-black text-ej-green uppercase bg-white px-3 py-1 rounded-full shadow-sm tracking-widest">Etapa Atual</span>}
                          </div>
                          <p className="text-sm text-slate-500 font-bold uppercase tracking-tight">Iniciando processos técnicos para seu {activeService}.</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <h4 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Seu Investimento</h4>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl mb-8">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Plano Contratado</p>
                    <p className="text-2xl font-black text-ej-green italic">{activeService} ELITE</p>
                    <p className="text-4xl font-black text-white mt-4">{currentProject.value}</p>
                  </div>
                  <button onClick={() => setActiveView('contracts')} className="w-full py-4 bg-ej-green text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Download Proposta</button>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-sm">
                  <h4 className="text-slate-900 font-black text-sm uppercase mb-8 tracking-widest italic border-b pb-4">Time EJ Especializado</h4>
                  <div className="flex flex-col space-y-6">
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-center space-x-4 opacity-50">
                        <div className="w-12 h-12 bg-slate-100 rounded-full animate-pulse"></div>
                        <div className="space-y-2">
                          <div className="w-24 h-3 bg-slate-100 rounded animate-pulse"></div>
                          <div className="w-16 h-2 bg-slate-50 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest text-center py-4 border-2 border-dashed rounded-3xl">Aguardando ativação do plano</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Plus_Jakarta_Sans'] text-slate-900">
      {/* Sidebar de Navegação */}
      <aside className="hidden lg:flex w-80 bg-slate-900 flex-col shadow-2xl border-r border-slate-800">
        <div className="p-10 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ej-green rounded-xl flex items-center justify-center shadow-lg shadow-ej-green/20">
              <i className="fas fa-terminal text-slate-900 text-sm"></i>
            </div>
            <span className="text-white font-black uppercase tracking-tighter text-xl">EJ <span className="text-ej-green">HUB</span></span>
          </div>
        </div>

        <nav className="flex-grow p-8 space-y-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4 mb-2">Menu do Cliente</p>
          <button
            onClick={() => setActiveView('main')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeView === 'main' ? 'bg-ej-green/10 text-ej-green' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-grid-2"></i>
            <span>Painel Principal</span>
          </button>
          <button
            onClick={() => setActiveView('payments')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeView === 'payments' ? 'bg-ej-green/10 text-ej-green' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-wallet"></i>
            <span>Pagamentos</span>
          </button>
          <button
            onClick={() => setActiveView('contracts')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeView === 'contracts' ? 'bg-ej-green/10 text-ej-green' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-file-contract"></i>
            <span>Contratos</span>
          </button>
          <button
            onClick={() => setActiveView('briefing')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeView === 'briefing' ? 'bg-ej-green/10 text-ej-green' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <i className="fas fa-clipboard-list"></i>
            <span>Briefing</span>
          </button>
        </nav>

        <div className="p-8">
          <div className="bg-ej-green p-6 rounded-3xl shadow-lg">
            <p className="text-slate-900 font-black text-sm mb-1 uppercase tracking-tight italic">Central VIP</p>
            <p className="text-slate-900/60 text-[10px] font-bold mb-4 uppercase tracking-widest">Suporte Dedicado</p>
            <button onClick={() => setActiveView('support')} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors">Solicitar Reunião</button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-24 bg-white border-b border-slate-200 px-8 md:px-12 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">
              {activeView === 'main' ? 'Dashboard' : activeView.charAt(0).toUpperCase() + activeView.slice(1)} <span className="text-slate-300">/</span> <span className="text-ej-green">{activeService}</span>
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-black text-slate-900 leading-none uppercase tracking-tighter italic">{user.name}</span>
              <button onClick={() => setShowSwitchModal(true)} className="text-[10px] font-black text-ej-green uppercase mt-1 flex items-center space-x-1 hover:opacity-70 transition">
                <i className="fas fa-exchange-alt"></i>
                <span>Trocar Plano</span>
              </button>
            </div>
            <img src={`https://picsum.photos/seed/${user.name}/100/100`} className="w-12 h-12 rounded-2xl border-4 border-slate-50 shadow-md cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveView('main')} />
            <button onClick={onLogout} className="w-10 h-10 flex items-center justify-center text-slate-900 hover:text-red-500 transition-colors">
              <i className="fas fa-power-off text-lg"></i>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12">
          {renderContent()}
        </div>
      </main>

      {/* Modal Switch Service */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-4xl bg-white p-12 md:p-16 rounded-[4rem] relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowSwitchModal(false)}
              className="absolute top-12 right-12 text-slate-900 hover:text-ej-green transition-all p-3 bg-slate-50 rounded-2xl"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>

            <div className="text-center mb-16">
              <span className="text-ej-green font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Estratégia EJ</span>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Qual vertical vamos <br /><span className="text-ej-green">Otimizar Agora?</span></h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { type: 'Web', icon: 'fa-laptop-code', label: 'Sites & Sistemas', val: 'R$ 2.900' },
                { type: 'Tráfego', icon: 'fa-bullseye', label: 'Performance Ads', val: 'R$ 1.500/mês' },
                { type: 'Social', icon: 'fa-hashtag', label: 'Gestão Social', val: 'R$ 1.200/mês' }
              ].map(opt => (
                <button
                  key={opt.type}
                  onClick={() => switchService(opt.type as ServiceType)}
                  className={`p-12 rounded-[3rem] border-2 transition-all flex flex-col items-center space-y-8 ${activeService === opt.type
                      ? 'border-ej-green bg-emerald-50 shadow-2xl scale-105'
                      : 'border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-200'
                    } group`}
                >
                  <div className={`w-24 h-24 ${activeService === opt.type ? 'bg-slate-900' : 'bg-white'} rounded-[2rem] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all`}>
                    <i className={`fas ${opt.icon} text-4xl ${activeService === opt.type ? 'text-ej-green' : 'text-slate-300'}`}></i>
                  </div>
                  <div className="text-center">
                    <span className="font-black text-sm text-slate-900 uppercase tracking-widest block mb-2 italic">{opt.label}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opt.val}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
