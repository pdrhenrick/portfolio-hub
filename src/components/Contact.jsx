import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // '' | 'sending' | 'success' | 'error'

  // --- ⚠️ SEU ID DO FORMSPREE ⚠️ ---
  const FORMSPREE_ID = "xaqjrjpw"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpa o formulário
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-20 px-6 relative z-10 bg-darker border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        
        {/* --- CABEÇALHO PADRONIZADO (Novo) --- */}
        <div className="mb-12">
          
          {/* Título com Linhas e Ícone */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1"></div>
            <h2 className="text-2xl font-medium text-white tracking-tight flex items-center gap-2">
              <Mail className="text-primary" size={20}/>
              Vamos Conversar
            </h2>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Subtítulo */}
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-gray-400 text-center max-w-lg mx-auto text-sm"
          >
            Tem uma ideia de projeto ou quer bater um papo sobre infraestrutura? 
            Mande uma mensagem que eu respondo rapidinho.
          </motion.p>

        </div>
        {/* ------------------------------------ */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Lado Esquerdo - Informações */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
              <Mail className="text-primary mb-4" size={32} />
              <h3 className="text-white font-bold text-lg mb-2">Email Direto</h3>
              <p className="text-gray-400 text-sm mb-4">Prefere mandar um email tradicional?</p>
              <a href="mailto:pedrohenrick.dev@outlook.com" className="text-white font-medium hover:text-primary transition-colors flex items-center gap-2">
                pedrohenrick.dev@outlook.com
              </a>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
               <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Status Atual</p>
               <div className="flex items-center gap-3">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                 </span>
                 <span className="text-white font-medium">Disponível para novos projetos</span>
               </div>
            </div>
          </motion.div>

          {/* Lado Direito - Formulário */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                <p className="text-gray-400">Obrigado pelo contato. Responderei em breve.</p>
                <button 
                  onClick={() => setStatus('')}
                  className="mt-6 text-primary hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Seu Nome</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Como devo te chamar?"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white/5 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Seu Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="exemplo@email.com"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white/5 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Mensagem</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                    <textarea 
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escreva sua mensagem aqui..."
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white/5 transition-all placeholder:text-gray-700 resize-none"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem <Send size={18} />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm flex items-center gap-2 mt-2">
                    <AlertCircle size={14}/> Erro ao enviar. Tente novamente ou use o email direto.
                  </p>
                )}

              </form>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;