import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-white/5 text-center relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Texto da Esquerda */}
        <div className="text-gray-500 text-sm">
          © {currentYear} <span className="text-white font-medium">Pedro Henrick</span>. 
          Focado em Infraestrutura e Soluções.
        </div>

        {/* Links da Direita */}
        <div className="flex items-center gap-6">
          <a 
            href="https://linkedin.com/in/pedrosilva-ti" 
            target="_blank" 
            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 text-sm"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a 
            href="https://github.com/pdrhenrick" 
            target="_blank" 
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <Github size={16} /> GitHub
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;