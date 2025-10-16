import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { AppView } from '@/components/layout/AppLayout';
import UpgradeModal from '@/components/UpgradeModal';

type Message = {
  id: string;
  from: 'bot' | 'user';
  text: string;
  interactive?: React.ReactNode;
};

interface Props {
  ingredients: Array<any>;
  onAddIngredient: (ing: { name: string; costLabel: string }) => void;
  onNavigate: (view: AppView) => void;
}

const ChatView: React.FC<Props> = ({ ingredients, onAddIngredient, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pendingIngredient, setPendingIngredient] = useState<{ name: string } | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Mock user plan - em um app real, isso viria de um contexto/estado de usuário
  const userPlan = 'free'; // 'free' ou 'pro'

  useEffect(() => {
    // Saudação inicial do bot
    const welcome: Message = {
      id: String(Date.now()),
      from: 'bot',
      text: "Olá! Sou seu Assistente Zen. Vamos começar adicionando seu primeiro ingrediente. Qual é o nome dele?",
    };
    setMessages([welcome]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Atalho de teclado: pressionar '/' para focar no input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (document.activeElement?.tagName.toLowerCase() !== 'input') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const addBotMessage = (text: string, interactive?: React.ReactNode) => {
    setMessages((s) => [...s, { 
      id: String(Date.now()) + Math.random(), 
      from: 'bot', 
      text, 
      interactive 
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { 
      id: String(Date.now()), 
      from: 'user', 
      text: input 
    };
    setMessages((s) => [...s, userMsg]);

    const userInput = input.trim().toLowerCase();
    
    // Verifica se o usuário está solicitando funcionalidades de IA
    const isAIRequest = ['precificar', 'sugerir preço', 'preço', 'precificação', 'ia', 'inteligência artificial'].some(term => userInput.includes(term));

    if (isAIRequest && userPlan === 'free') {
      // Mostra o modal de upgrade para funcionalidades de IA
      setTimeout(() => {
        addBotMessage(
          "A sugestão de preço inteligente é um recurso do nosso Plano Pro. Com ele, nossa IA analisa seus custos para encontrar a margem de lucro ideal. Quer saber mais?",
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium w-full sm:w-auto"
            >
              Sim, quero saber mais
            </button>
            <button
              onClick={() => addBotMessage("Sem problemas! Posso ajudar com o cadastro de ingredientes e organização de custos.")}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium w-full sm:w-auto"
            >
              Não, obrigado
            </button>
          </div>
        );
      }, 700);
      setInput('');
      return;
    }

    // Fluxo de conversa para cadastro de ingredientes
    if (!pendingIngredient) {
      const name = input.trim();
      setPendingIngredient({ name });
      
      setTimeout(() => {
        addBotMessage(`Perfeito! E quanto custa um pacote de "${name}"? Exemplo: "R$ 5,50 por 1kg".`);
      }, 700);
    } else {
      const costLabel = input.trim();
      onAddIngredient({ 
        name: pendingIngredient.name, 
        costLabel 
      });
      
      setTimeout(() => {
        addBotMessage(
          `Excelente! Salvei "${pendingIngredient.name}" no seu inventário. O que gostaria de fazer agora?`,
          <button
            onClick={() => onNavigate('ingredients')}
            className="text-primary font-semibold hover:underline mt-2 transition-colors text-left"
          >
            Ver todos os ingredientes
          </button>
        );
      }, 700);
      
      setPendingIngredient(null);
    }

    setInput('');
  };

  return (
    // Altura ajustada para mobile para evitar sobreposição com a navegação inferior.
    // A altura é calculada para subtrair o cabeçalho (~60px), a navegação inferior (~60px) e o padding do container pai (~80px).
    <div className="h-[calc(100vh-200px)] lg:h-full lg:max-h-[85vh] flex flex-col bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 mt-4 lg:mt-0">
      {/* Área de Mensagens */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-full sm:max-w-2xl ${m.from === 'bot' ? 'text-left' : 'ml-auto text-right'}`}>
            <div className={`inline-flex items-start gap-3 sm:gap-4 ${m.from === 'bot' ? '' : 'flex-row-reverse'}`}>
              {m.from === 'bot' && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}

              <div className={`${
                m.from === 'bot' 
                  ? 'bg-gray-50 text-gray-800 border border-gray-100' 
                  : 'bg-gradient-to-br from-primary to-green-600 text-white'
              } p-3 sm:p-4 rounded-xl shadow-sm max-w-[85%] sm:max-w-md`}> 
                <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{m.text}</div>
                {m.interactive && <div className="mt-3">{m.interactive}</div>}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Input */}
      <div className="border-t border-gray-200 bg-gray-50 p-3 sm:p-4 lg:rounded-b-xl">
        <div className="flex gap-2 sm:gap-3 items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={pendingIngredient 
              ? `Digite o preço de ${pendingIngredient.name}...` 
              : "Digite o nome do ingrediente..."
            }
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary text-white p-2.5 sm:p-3 rounded-lg hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            aria-label="Enviar mensagem"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 hidden lg:block">
          Pressione <kbd className="font-sans font-semibold">Enter</kbd> para enviar • Pressione <kbd className="font-sans font-semibold">/</kbd> para focar no campo
        </p>
      </div>
      
      {/* Modal de Upgrade */}
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};

export default ChatView;

