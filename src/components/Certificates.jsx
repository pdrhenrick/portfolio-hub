import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Search, X, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  
  // --- DADOS ---
  const certificates = [
    {
      id: 1,
      name: "Análise e Desenvolvimento de Sistemas",
      issuer: "Anhanguera Educacional",
      date: "2025",
      image: "/diploma-ads.png", // Confirme se o arquivo na pasta public é .png ou .jpg
      link: "https://diplomas.cogna.com.br/diploma-digital/validador/documento/academico/",
      validationCode: "376.671.64601aeed739",
      tags: ["Graduação", "Tecnólogo", "Diploma"]
    },
    // Adicione mais aqui...
  ];

  // --- LÓGICA DE BUSCA ---
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = certificates.filter(cert => 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="certificados" className="scroll-mt-28 py-20 px-6 relative z-10 bg-dark border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-white/10 flex-1"></div>
          <h2 className="text-2xl font-medium text-white tracking-tight flex items-center gap-2">
            <Award className="text-primary" size={20}/>
            Certificações
          </h2>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="max-w-md mx-auto mb-12 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500 group-focus-within:text-primary transition-colors"/>
          </div>
          <input 
            type="text" 
            placeholder="Buscar certificado..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-full py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <motion.div 
              key={cert.id}
              // --- CORREÇÃO AQUI: Adicionado o onClick ---
              onClick={() => setSelectedCert(cert)}
              // ------------------------------------------
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Adicionei cursor: 'pointer' para aparecer a mãozinha
              whileHover={{ y: -5, cursor: 'pointer' }} 
              viewport={{ once: true }}
              className="block bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all group shadow-lg"
            >
              <div className="h-40 w-full bg-white/5 relative flex items-center justify-center overflow-hidden">
                {cert.image ? (
                  <img src={cert.image} alt={cert.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <Award size={40} className="text-white/10 group-hover:text-primary/50 transition-colors" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-60"></div>
              </div>

              <div className="p-5 relative">
                <span className="absolute -top-3 right-4 text-[10px] font-bold text-black bg-primary px-2 py-0.5 rounded shadow-lg">
                  {cert.date}
                </span>
                <h3 className="text-white font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-500 text-xs mb-4 uppercase tracking-wider">
                  {cert.issuer}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredCertificates.length === 0 && (
           <p className="text-center text-gray-500 text-sm mt-8">Nenhum certificado encontrado.</p>
        )}

      </div> 
      {/* Fim do container max-w-5xl */}

      {/* === MODAL DE VISUALIZAÇÃO === */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            
            {/* Fundo Escuro */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* O Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-xl shadow-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 truncate">
                  <Award size={18} className="text-primary"/>
                  {selectedCert.name}
                </h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors bg-white/5"
                >
                  <X size={20} className="text-gray-400"/>
                </button>
              </div>

              {/* Corpo do Modal */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                
                {/* Imagem Grande */}
                <div className="w-full bg-white/5 rounded-lg border border-white/10 overflow-hidden shadow-lg">
                  {selectedCert.image ? (
                    <img src={selectedCert.image} alt={selectedCert.name} className="w-full h-auto object-contain" />
                  ) : (
                     <div className="h-64 flex items-center justify-center text-gray-500">Imagem não disponível</div>
                  )}
                </div>

                {/* Área de Validação */}
                {selectedCert.validationCode && selectedCert.link && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Código de Validação:</p>
                      <p className="text-white font-mono text-sm md:text-base font-bold select-all bg-black/20 px-3 py-1 rounded border border-white/5">
                        {selectedCert.validationCode}
                      </p>
                      <p className="text-gray-500 text-[10px] mt-1">(Copie este código para usar no site)</p>
                    </div>

                    <a 
                      href={selectedCert.link}
                      target="_blank"
                      className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg whitespace-nowrap"
                    >
                      Validar no Site Oficial
                      <ExternalLink size={16}/>
                    </a>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Certificates;