import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Server, Database, Code2, ShieldCheck, Terminal, ExternalLink, Cpu, X, PlayCircle, Layers, Menu } from 'lucide-react';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  
  const [selectedProject, setSelectedProject] = useState(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const projects = [
    {
      title: "Notification Service",
      description: "Microsserviço resiliente para envio de e-mails e notificações.",
      fullDescription: "Sistema robusto de notificações assíncronas. A aplicação recebe solicitações via API REST, enfileira mensagens no RabbitMQ para garantir que nada se perca (mesmo se o serviço cair) e processa o envio em background.",
      tags: ["Java", "Spring Boot", "RabbitMQ", "Docker"],
      link: "https://github.com/pdrhenrick/notification-service",
      type: "Backend",
      architecture: [
        "1. Cliente envia POST para /email",
        "2. Producer valida e envia para fila 'email-queue'",
        "3. Consumer pega a mensagem e tenta enviar",
        "4. Se falhar, move para DLQ (Dead Letter Queue) para retry"
      ]
    },
    {
      title: "TechNews Scraper",
      description: "Robô de extração de dados de notícias de tecnologia.",
      fullDescription: "Crawler automatizado que navega em sites de notícias, ignora proteções básicas, extrai títulos, links e conteúdos, limpa os dados e salva estruturado em banco NoSQL.",
      tags: ["Python", "Scrapy", "MongoDB", "ETL"],
      link: "https://github.com/pdrhenrick/technews-scraper",
      type: "Data Eng",
      architecture: [
        "1. Spider inicia varredura no sitemap",
        "2. Middleware faz rotação de User-Agent",
        "3. Pipelines limpam tags HTML indesejadas",
        "4. Dados salvos no MongoDB Atlas"
      ]
    },
    {
      title: "AgendaTech Fullstack",
      description: "Plataforma completa de agendamentos.",
      fullDescription: "Solução ponta a ponta. O usuário final usa o frontend React para ver horários disponíveis. O Backend Java gerencia conflitos de horário e persiste os dados no MySQL.",
      tags: ["Java", "React", "MySQL", "Fullstack"],
      link: "https://github.com/pdrhenrick/agendatech",

      type: "Fullstack",
      architecture: [
        "1. Frontend React consome API via Axios",
        "2. Spring Security valida Token JWT",
        "3. Controller verifica disponibilidade",
        "4. JPA salva agendamento no Banco"
      ]
    },
    {
      title: "Market Data API",
      description: "API de alta performance para dados financeiros.",
      fullDescription: "API focada em baixa latência para entregar cotações em tempo real. Utiliza FastAPI pela sua natureza assíncrona (ASGI), suportando milhares de requisições simultâneas.",
      tags: ["Python", "FastAPI", "Redis", "Finance"],
      link: "https://github.com/pdrhenrick/market-data-api",
      type: "Backend",
      architecture: [
        "1. Requisição chega no Endpoint /quote",
        "2. Verifica cache no Redis (Hit/Miss)",
        "3. Se não tiver cache, busca na fonte externa",
        "4. Retorna JSON em <50ms"
      ]
    },

    {
      title: "Sistema de Suporte Condomínio",
      description: "Gestão de chamados para moradores do condomínio onde moro rodando na AWS via IP Público.",
      fullDescription: "Solução real desenvolvida para gestão de chamados em condomínio residencial. O projeto foi implantado em ambiente Cloud (AWS), rodando em instância EC2 Linux com configuração de servidor web e acesso via IP Público.",
      tags: ["AWS", "EC2", "Linux", "Infraestrutura", "Fullstack"],
      link: "https://github.com/pdrhenrick/suporte-tecnico-condomonio",
      liveLink: "http://3.22.186.57/",

      type: "Infra & Cloud",
    architecture: [
      "1. Instância EC2 (Linux Ubuntu) provisionada na AWS",
      "2. Configuração de Security Groups (Portas 80/443)",
      "3. Deploy da Aplicação via Git e Docker",
      "4. Acesso via IP Elastic/Público"
    ]
    },
  ];

  // Função para gerar o nome do vídeo baseado no título do projeto
  // Ex: "TechNews Scraper" vira "technews-scraper.mp4"
  const getVideoPath = (title) => {
    return `/${title.toLowerCase().replace(/\s+/g, '-')}.mp4`;
  };

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary selection:text-white relative font-sans scroll-smooth">
      
      {/* Background Técnico */}
      <div className="fixed inset-0 bg-grid z-0 opacity-10 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-medium flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="p-1.5 bg-primary/10 rounded-md border border-primary/20">
                <Terminal className="text-primary" size={18} />
            </div>
            <span className="tracking-tight text-gray-200">Pedro<span className="text-primary">.Infra</span></span>
          </motion.div>
          
          <div className="hidden md:flex gap-6 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <a href="#hero" className="hover:text-primary transition-colors">Início</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projetos</a>
            <a href="#certificados" className="hover:text-primary transition-colors">Certificações</a>
          </div>
          
        {/* --- NOVO: BOTÃO HAMBÚRGUER (Só aparece no celular) --- */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 w-full bg-dark/95 border-b border-white/10 md:hidden flex flex-col items-center py-6 gap-6 shadow-2xl"
              >
                <a href="#hero" onClick={closeMenu} className="text-sm font-medium text-gray-300 hover:text-primary uppercase tracking-widest">Início</a>
                <a href="#projects" onClick={closeMenu} className="text-sm font-medium text-gray-300 hover:text-primary uppercase tracking-widest">Projetos</a>
                <a href="#certificados" onClick={closeMenu} className="text-sm font-medium text-gray-300 hover:text-primary uppercase tracking-widest">Certificações</a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mt-12"
        >
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Disponível para novos projetos
          </div>

          <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight leading-tight text-white">
            Infraestrutura <br />
            <span className="text-gray-500 font-light">
              & DevOps
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed font-light">
            Especialista em automação, cloud computing e arquiteturas resilientes.
          </p>
          
          <div className="flex flex-row gap-4 justify-center items-center">
            <a href="https://linkedin.com/in/pedrosilva-ti" target="_blank" className="group flex items-center gap-2 px-6 py-2 bg-transparent border border-white/20 text-white text-sm font-medium rounded hover:bg-white/5 hover:border-white transition-all duration-300">
              <Linkedin size={16} className="text-gray-400 group-hover:text-white transition-colors"/>
              LinkedIn
            </a>
            <a href="https://github.com/pdrhenrick" target="_blank" className="group flex items-center gap-2 px-6 py-2 bg-transparent border border-white/20 text-white text-sm font-medium rounded hover:bg-white/5 hover:border-white transition-all duration-300">
              <Github size={16} className="text-gray-400 group-hover:text-white transition-colors"/>
              GitHub
            </a>
      
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute bottom-16 flex gap-10 text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase"
        >
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><Server size={14}/> Linux</div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><Database size={14}/> AWS</div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><ShieldCheck size={14}/> Docker</div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><Code2 size={14}/> Java</div>
        </motion.div>
      </section>

      {/* --- SEÇÃO PROJETOS --- */}
      <section id="projects" className="min-h-screen py-20 px-6 relative z-10 bg-darker/50">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-white/10 flex-1"></div>
            <h2 className="text-2xl font-medium text-white tracking-tight flex items-center gap-2">
              <Cpu className="text-primary" size={20}/>
              Projetos Selecionados
            </h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.07] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider flex items-center justify-between">
                    {project.type}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500"/>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-white border border-white/10 rounded hover:bg-white/5 transition-colors"
                  >
                    <Github size={16} />
                    Código
                  </a>
                  
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/20 transition-all"
                  >
                    <PlayCircle size={16} />
                    Demo
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Contact />
      <Certificates />
      <Footer />

      {/* --- MODAL (ATUALIZADO COM VÍDEO) --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal size={20} className="text-primary"/>
                  {selectedProject.title}
                </h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400"/>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                {/* ÁREA DE VÍDEO (Atualizada) */}
                <div className="w-full aspect-video bg-black rounded-lg border border-white/10 overflow-hidden mb-8 shadow-2xl">
                    <video 
                        className="w-full h-full object-cover"
                        controls 
                        autoPlay 
                        muted 
                        loop
                    >
                        {/* Puxa o arquivo de vídeo baseado no nome do projeto */}
                        <source src={getVideoPath(selectedProject.title)} type="video/mp4" />
                        Seu navegador não suporta vídeos.
                    </video>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Layers size={16} className="text-primary"/>
                      Sobre o Projeto
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {selectedProject.liveLink && (
                    <a 
                      href={selectedProject.liveLink}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-black border border-white/10 rounded font-mono text-xs text-green-400 mb-6 hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
                    >
                      <span className="opacity-50 group-hover:animate-pulse">{">_"}</span>
                      {selectedProject.liveLink}
                    </a>
                  )}

                  <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Cpu size={16} className="text-primary"/>
                      Como Funciona (Arquitetura)
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.architecture.map((step, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-start gap-3">
                          <span className="min-w-[4px] h-[4px] mt-2 rounded-full bg-primary/50"></span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
              
              <div className="p-4 border-t border-white/5 bg-white/[0.02] flex justify-end">
                <a 
                   href={selectedProject.link} 
                   target="_blank"
                   className="px-6 py-2 bg-primary text-white text-sm font-bold rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Github size={16}/>
                  Acessar Repositório
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-gray-600 text-xs uppercase tracking-widest border-t border-white/5 bg-dark">
        <p>© 2026 Pedro Henrick. Infraestrutura & Code.</p>
      </footer>

    </div>
  );
}

export default App;