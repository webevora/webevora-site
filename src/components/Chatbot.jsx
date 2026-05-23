import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiX, FiMinimize2, FiMaximize2, FiCpu, FiSettings, FiCheck, FiChevronLeft, FiRefreshCw, FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateLocalResponse } from '../utils/localAIBrain';


const quickActions = [
  { id: 'web', label: 'Web Development', reply: 'We build fast, scalable, and stunning websites tailored to your needs. Our stack includes React, Node.js, and modern frameworks.' },
  { id: 'app', label: 'App Development', reply: 'From iOS to Android, we develop seamless cross-platform and native mobile applications that users love.' },
  { id: 'uiux', label: 'UI/UX Design', reply: 'Our design team crafts intuitive and beautiful interfaces with a focus on user experience and conversion.' },
  { id: 'ai', label: 'AI Solutions', reply: 'We integrate smart AI agents and custom AI tools into your workflows to automate processes and boost efficiency.' },
  { id: 'contact', label: 'Contact Us', action: '/contact', reply: 'Great! You can reach out to us via our contact page. I will redirect you there.' },
  { id: 'products', label: 'View Our Products', action: '/our-products', reply: 'Awesome! We have a suite of premium SaaS products. I will take you there.' }
];

const avatars = {
  default: {
    id: 'default',
    category: 'professional',
    name: 'Webevora AI',
    theme: 'from-blue-400 via-indigo-500 to-purple-500',
    aura: 'shadow-blue-500/40',
    panelHeader: 'from-blue-600 to-indigo-600',
    userBubble: 'from-blue-600 to-indigo-600 shadow-blue-500/20',
    botBubble: 'border-blue-100',
    eyeColor: 'from-blue-600 to-indigo-800',
    eyeShape: 'rounded-full',
    eyeSize: 'w-4 h-5',
    pupilSize: 'w-2.5 h-3.5',
    greeting: 'Welcome to Webevora! I am your professional AI assistant. How can I help you today?',
    vibe: 'modern & clean',
    particleColor: 'bg-blue-300',
    idleAnim: { y: [0, -12, 0], scale: [1, 1.02, 1], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => null // Clean glassmorphism bot
  },
  luffy: {
    id: 'luffy',
    category: 'anime',
    name: 'Captain AI',
    theme: 'from-red-500 via-orange-400 to-yellow-400',
    aura: 'shadow-orange-500/50',
    panelHeader: 'from-red-600 to-orange-500',
    userBubble: 'from-red-500 to-orange-500 shadow-red-500/20',
    botBubble: 'border-red-100',
    eyeColor: 'from-slate-900 to-black',
    eyeShape: 'rounded-full',
    eyeSize: 'w-5 h-6',
    pupilSize: 'w-3 h-4',
    greeting: 'Shihihi! Welcome to Webevora! What adventure are we going on today?',
    vibe: 'energetic',
    particleColor: 'bg-yellow-300',
    idleAnim: { y: [0, -15, 0], scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => (
      <>
        <div className="absolute -top-1 w-full h-4 bg-yellow-400 rounded-t-full border-b-4 border-red-500 z-20 shadow-inner transition-all duration-500"></div>
        <div className="absolute top-3 w-[120%] -left-[10%] h-2 bg-yellow-400 rounded-full z-10 shadow-md transition-all duration-500"></div>
        <div className="absolute top-1/2 w-[80%] h-1 border-b-2 border-black/20 rounded-[50%] opacity-50 z-10 mt-2 transition-all duration-500"></div>
      </>
    )
  },
  zoro: {
    id: 'zoro',
    category: 'anime',
    name: 'Ronin Bot',
    theme: 'from-green-600 via-emerald-500 to-teal-800',
    aura: 'shadow-green-500/40',
    panelHeader: 'from-green-700 to-emerald-800',
    userBubble: 'from-green-600 to-emerald-700 shadow-green-500/20',
    botBubble: 'border-green-100',
    eyeColor: 'from-slate-800 to-black',
    eyeShape: 'rounded-sm',
    eyeSize: 'w-4 h-3',
    pupilSize: 'w-2 h-2',
    greeting: '...Welcome to Webevora. I was resting. State your business.',
    vibe: 'serious',
    particleColor: 'bg-emerald-300',
    idleAnim: { y: [0, -3, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => (
      <>
        <div className="absolute top-0 w-full h-[35%] bg-emerald-800 rounded-t-full z-20 opacity-90 transition-all duration-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 80% 100%, 50% 80%, 20% 100%, 0 80%)' }}></div>
        <div className="absolute left-[30%] top-1/4 w-[2px] h-6 bg-emerald-950 rotate-45 opacity-60 z-30 transition-all duration-500"></div>
        <div className="absolute left-[2px] top-1/2 flex flex-col gap-[2px] z-30 transition-all duration-500">
          <div className="w-1.5 h-2 bg-yellow-400 rounded-sm shadow-sm"></div>
          <div className="w-1.5 h-2 bg-yellow-400 rounded-sm shadow-sm"></div>
          <div className="w-1.5 h-2 bg-yellow-400 rounded-sm shadow-sm"></div>
        </div>
      </>
    )
  },
  sanji: {
    id: 'sanji',
    category: 'anime',
    name: 'Chef Intel',
    theme: 'from-yellow-400 via-amber-500 to-slate-900',
    aura: 'shadow-yellow-500/30',
    panelHeader: 'from-slate-800 to-slate-900',
    userBubble: 'from-slate-800 to-black shadow-slate-500/20',
    botBubble: 'border-amber-200',
    eyeColor: 'from-blue-400 to-blue-600',
    eyeShape: 'rounded-full',
    eyeSize: 'w-4 h-5',
    pupilSize: 'w-2 h-3',
    greeting: 'Welcome to Webevora, honored guest. How may I serve you today? 🌹',
    vibe: 'elegant',
    particleColor: 'bg-amber-300',
    idleAnim: { y: [0, -8, 0], rotate: [0, 2, -2, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => (
      <>
        <div className="absolute -top-2 left-[-10%] w-[70%] h-[120%] bg-yellow-300 rounded-br-[100%] rounded-tl-full rotate-12 z-30 shadow-md transition-all duration-500"></div>
        <div className="absolute right-[20%] top-[35%] w-3 h-2 border-t-2 border-r-2 border-black/40 rounded-tr-full z-20 transition-all duration-500"></div>
      </>
    )
  },
  nami: {
    id: 'nami',
    category: 'anime',
    name: 'Navi Core',
    theme: 'from-orange-400 via-amber-300 to-yellow-300',
    aura: 'shadow-orange-400/40',
    panelHeader: 'from-orange-500 to-amber-500',
    userBubble: 'from-orange-500 to-amber-500 shadow-orange-500/20',
    botBubble: 'border-orange-200',
    eyeColor: 'from-amber-700 to-amber-900',
    eyeShape: 'rounded-full',
    eyeSize: 'w-5 h-6',
    pupilSize: 'w-2.5 h-3.5',
    greeting: 'Welcome to Webevora! Looking for the best solutions? How can I help?',
    vibe: 'smart',
    particleColor: 'bg-orange-300',
    idleAnim: { y: [0, -10, 0], transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => (
      <>
        <div className="absolute top-[-5%] left-[-5%] w-[110%] h-[45%] bg-orange-500 rounded-t-full z-20 transition-all duration-500" style={{ borderBottomRightRadius: '50% 10px', borderBottomLeftRadius: '50% 10px' }}></div>
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-2 border-blue-500/60 rounded-full z-20 flex items-center justify-center transition-all duration-500">
          <div className="w-1 h-1 bg-blue-500/60 rounded-full"></div>
        </div>
      </>
    )
  },
  shanks: {
    id: 'shanks',
    category: 'anime',
    name: 'Emperor AI',
    theme: 'from-red-800 via-red-900 to-black',
    aura: 'shadow-red-700/50',
    panelHeader: 'from-red-800 to-slate-900',
    userBubble: 'from-red-700 to-red-900 shadow-red-700/20',
    botBubble: 'border-red-200',
    eyeColor: 'from-slate-900 to-black',
    eyeShape: 'rounded-md',
    eyeSize: 'w-4 h-4',
    pupilSize: 'w-2 h-2',
    greeting: 'Welcome to Webevora. Take your time, we have plenty to offer.',
    vibe: 'premium',
    particleColor: 'bg-red-500',
    idleAnim: { y: [0, -6, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => (
      <>
        <div className="absolute top-[-5%] w-[110%] left-[-5%] h-[40%] bg-red-800 rounded-t-full z-20 transition-all duration-500"></div>
        <div className="absolute left-[20%] top-[25%] flex gap-[2px] z-30 opacity-70 transition-all duration-500">
          <div className="w-[1.5px] h-6 bg-red-950 rotate-12"></div>
          <div className="w-[1.5px] h-6 bg-red-950 rotate-12"></div>
          <div className="w-[1.5px] h-6 bg-red-950 rotate-12"></div>
        </div>
      </>
    )
  },
  ace: {
    id: 'ace',
    category: 'anime',
    name: 'Flame Bot',
    theme: 'from-orange-600 via-red-500 to-yellow-500',
    aura: 'shadow-red-500/60',
    panelHeader: 'from-orange-600 to-red-600',
    userBubble: 'from-orange-500 to-red-500 shadow-orange-500/20',
    botBubble: 'border-orange-200',
    eyeColor: 'from-slate-900 to-black',
    eyeShape: 'rounded-full',
    eyeSize: 'w-5 h-5',
    pupilSize: 'w-2.5 h-3',
    greeting: 'Welcome to Webevora! Ready to fire up your project? Let\'s go!',
    vibe: 'dynamic',
    particleColor: 'bg-orange-400',
    idleAnim: { y: [0, -12, 0], scale: [1, 1.02, 1], transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } },
    Features: () => (
      <>
        <div className="absolute -top-1 w-full h-5 bg-orange-600 rounded-t-full z-20 transition-all duration-500"></div>
        <div className="absolute top-4 w-[110%] -left-[5%] h-1.5 bg-orange-600 rounded-full z-10 shadow-md flex justify-center gap-1 overflow-hidden transition-all duration-500">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        </div>
        <div className="absolute top-[45%] w-full flex justify-between px-3 opacity-30 z-10 transition-all duration-500">
          <div className="flex gap-[2px]"><span className="w-1 h-1 bg-amber-900 rounded-full"></span><span className="w-1 h-1 bg-amber-900 rounded-full"></span></div>
          <div className="flex gap-[2px]"><span className="w-1 h-1 bg-amber-900 rounded-full"></span><span className="w-1 h-1 bg-amber-900 rounded-full"></span></div>
        </div>
        <div className="absolute inset-0 bg-orange-500/10 rounded-full animate-pulse z-0 pointer-events-none mix-blend-overlay"></div>
      </>
    )
  }
};

export default function Chatbot() {
  const [activeAvatarId, setActiveAvatarId] = useState(() => {
    return localStorage.getItem('webevora_avatar') || 'default';
  });

  const [advancedEffects, setAdvancedEffects] = useState(() => {
    return localStorage.getItem('webevora_effects') !== 'false';
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState('professional');
  const avatar = avatars[activeAvatarId] || avatars['default'];

  const [isBotVisible, setIsBotVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [greetingText, setGreetingText] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState(() => {
    const hasInteractedBefore = localStorage.getItem('chatbot_interacted');
    const greetingMsg = hasInteractedBefore ? `Welcome back! ${avatar.greeting}` : `👋 ${avatar.greeting}`;
    return [
      { type: 'bot', text: greetingMsg },
      { type: 'bot', text: 'Would you like information about what we provide or just want to chat?' }
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [chatContext, setChatContext] = useState({
    userName: '',
    lastTopic: '',
    messageCount: 0
  });
  const messagesEndRef = useRef(null);
  const botRef = useRef(null);
  const isMountedRef = useRef(true);
  const streamIntervalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const safeSetTimeout = (callback, delay) => {
    const id = setTimeout(() => {
      timeoutsRef.current = timeoutsRef.current.filter(t => t !== id);
      if (isMountedRef.current) {
        callback();
      }
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  };
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const pupilX = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const pupilY = useTransform(smoothY, [-1, 1], [-3.5, 3.5]);

  const headRotateX = useTransform(smoothY, [-1, 1], [-15, 15]);
  const headRotateY = useTransform(smoothX, [-1, 1], [20, -20]);
  const headX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const headY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const shadowX = useTransform(smoothX, [-1, 1], [15, -15]);
  const shadowY = useTransform(smoothY, [-1, 1], [15, -15]);

  useEffect(() => {
    let ticking = false;
    let lastTime = 0;
    const throttleMs = 32; // ~30fps throttle

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (!ticking && now - lastTime >= throttleMs) {
        window.requestAnimationFrame(() => {
          if (botRef.current) {
            const centerX = window.innerWidth - 64;
            const centerY = window.innerHeight - 64;
            const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
            const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);
            mouseX.set(Math.max(-1, Math.min(1, deltaX)));
            mouseY.set(Math.max(-1, Math.min(1, deltaY)));
          }
          lastTime = performance.now();
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Cleanup stream interval and timeouts on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const isClosedBefore = localStorage.getItem('chatbotClosed');
    if (!isClosedBefore) {
      const timerBot = setTimeout(() => setIsBotVisible(true), 1500);
      const timerGreet1 = setTimeout(() => {
        setGreetingText(`👋 ${avatar.greeting}`);
        setShowGreeting(true);
      }, 2500);
      const timerGreet2 = setTimeout(() => {
        setGreetingText('Would you like information about what we provide?');
      }, 6500);
      return () => {
        clearTimeout(timerBot);
        clearTimeout(timerGreet1);
        clearTimeout(timerGreet2);
      };
    } else {
      setIsBotVisible(true);
    }
  }, [avatar.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen, showSettings]);

  // Persist preference
  useEffect(() => {
    localStorage.setItem('webevora_avatar', activeAvatarId);
  }, [activeAvatarId]);

  useEffect(() => {
    localStorage.setItem('webevora_effects', advancedEffects);
  }, [advancedEffects]);

  const handleClosePanel = () => {
    setIsOpen(false);
    setShowSettings(false);
    localStorage.setItem('chatbotClosed', 'true');
  };

  const handleToggle = () => {
    setHasInteracted(true);
    setShowGreeting(false);
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      localStorage.setItem('chatbotClosed', 'true');
    } else {
      setIsOpen(false);
      setShowSettings(false);
    }
  };

  const changeAvatar = (id) => {
    setActiveAvatarId(id);
    const newAvatar = avatars[id];
    setMessages([
      { type: 'bot', text: `Assistant style switched to: ${newAvatar.name}` },
      { type: 'bot', text: `👋 ${newAvatar.greeting}` }
    ]);
    setShowSettings(false);
  };

  const resetToDefault = () => {
    setActiveCategoryTab('professional');
    changeAvatar('default');
  };

  const handleActionClick = (action) => {
    setMessages(prev => [...prev, { type: 'user', text: action.label }]);
    setIsTyping(true);

    // Simulate thinking delay
    const thinkDelay = 600 + Math.random() * 500;

    safeSetTimeout(() => {
      setIsTyping(false);

      // Add empty bot message container for streaming
      setMessages(prev => [...prev, { type: 'bot', text: '' }]);

      // Stream the action response word-by-word
      const words = action.reply.split(' ');
      let wordIndex = 0;
      let currentText = '';

      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
          wordIndex++;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { type: 'bot', text: currentText };
            return updated;
          });
        } else {
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }

          if (action.action) {
            safeSetTimeout(() => {
              navigate(action.action);
              setIsOpen(false);
            }, 1500);
          } else {
            safeSetTimeout(() => {
              // Delayed follow-up question
              setIsTyping(true);
              safeSetTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: 'bot', text: 'Is there anything else you would like to explore? 🚀' }]);
              }, 800);
            }, 1000);
          }
        }
      }, 30);
    }, thinkDelay);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setInputValue('');

    const newMessages = [...messages, { type: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);
    setHasInteracted(true);
    localStorage.setItem('chatbot_interacted', 'true');

    // 1. Generate local AI response based on keywords, current avatar, and context memory
    const localRes = generateLocalResponse(userMsg, activeAvatarId, chatContext);

    // 2. Save the updated chat context
    setChatContext(localRes.context);

    // 3. Realistic Thinking/Typing delay based on input/output length
    const thinkingTime = Math.min(2000, Math.max(600, userMsg.length * 12 + Math.random() * 400));

    safeSetTimeout(() => {
      setIsTyping(false);

      // 4. Add empty container for streaming
      setMessages(prev => [...prev, { type: 'bot', text: '' }]);

      // 5. Stream the response word-by-word like ChatGPT
      const words = localRes.text.split(' ');
      let wordIndex = 0;
      let currentText = '';

      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
          wordIndex++;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { type: 'bot', text: currentText };
            return updated;
          });
        } else {
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }
        }
      }, 30); // 30ms per word creates an extremely smooth, premium, and alive streaming effect!
    }, thinkingTime);
  };

  const filteredAvatars = Object.values(avatars).filter(char => char.category === activeCategoryTab);

  return (
    <>
      <style>{`
        .chatbot-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .chatbot-scroll::-webkit-scrollbar-track { background: transparent; }
        .chatbot-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .chatbot-scroll::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50% { transform: translateX(250%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes blink {
          0%, 85%, 100% { transform: scaleY(1); }
          90%, 95% { transform: scaleY(0.1); }
        }
        .animate-gradient-border {
          background-size: 200% auto;
          animation: gradient-border 3s ease infinite;
        }
        .animate-blink { animation: blink 4s infinite; }
        .transform-style-3d { transform-style: preserve-3d; }
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3b82f6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .ai-message-content p { margin-bottom: 0.5rem; }
        .ai-message-content p:last-child { margin-bottom: 0; }
        .ai-message-content ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 0.5rem; }
        .ai-message-content ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 0.5rem; }
        .ai-message-content strong { font-weight: 600; color: #1e293b; }
        .ai-message-content a { color: #3b82f6; text-decoration: underline; }
        .ai-message-content code { background-color: #f1f5f9; padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.85em; }
        .ai-message-content pre { background-color: #1e293b; color: #f8fafc; padding: 0.75rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 0.5rem; }
        .ai-message-content pre code { background-color: transparent; color: inherit; padding: 0; }
      `}</style>

      <div className="chatbot-container fixed bottom-6 right-6 z-[9999] flex items-end justify-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 220, damping: 22 }}
              className={`absolute right-0 bottom-24 md:right-full md:bottom-0 md:mr-4 origin-bottom-right w-[380px] max-w-[calc(100vw-2rem)] md:max-w-[380px] rounded-2xl p-[2px] bg-gradient-to-r ${avatar.theme} animate-gradient-border shadow-2xl ${advancedEffects ? avatar.aura : 'shadow-slate-500/20'} ${isMinimized ? 'h-auto' : 'h-[600px] max-h-[80vh]'}`}
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-xl rounded-[14px] overflow-hidden flex flex-col relative">

                {/* Header */}
                <div className={`bg-gradient-to-r ${avatar.panelHeader} p-4 flex items-center justify-between text-white relative overflow-hidden shrink-0 transition-colors duration-500`}>
                  <div className="absolute inset-0 bg-white/10 skew-x-[-20deg] translate-x-[-150%] animate-[shine_5s_infinite]"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    {showSettings ? (
                      <button onClick={() => setShowSettings(false)} className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                        <FiCpu className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-[15px] leading-tight">{showSettings ? 'Assistant Settings' : avatar.name}</h3>
                      {!showSettings && (
                        <p className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></span> Online
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1.5 relative z-10">
                    {showSettings && (
                      <button onClick={resetToDefault} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1 text-[11px]" title="Reset to Professional Default">
                        <FiRefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {!showSettings && (
                      <button onClick={() => setShowSettings(true)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Settings">
                        <FiSettings className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                      {isMinimized ? <FiMaximize2 className="w-4 h-4" /> : <FiMinimize2 className="w-4 h-4" />}
                    </button>
                    <button onClick={handleClosePanel} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {!isMinimized && (
                  <div className="flex-1 overflow-y-auto bg-slate-50/50 chatbot-scroll relative">
                    <AnimatePresence mode="wait">
                      {showSettings ? (
                        <motion.div
                          key="settings"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="p-5 flex flex-col h-full"
                        >
                          {/* Tabs */}
                          <div className="flex bg-slate-200/60 p-1 rounded-xl mb-4 shrink-0">
                            <button
                              className={`flex-1 text-xs font-medium py-2 rounded-lg transition-all ${activeCategoryTab === 'professional' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                              onClick={() => setActiveCategoryTab('professional')}
                            >
                              Professional
                            </button>
                            <button
                              className={`flex-1 text-xs font-medium py-2 rounded-lg transition-all ${activeCategoryTab === 'anime' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                              onClick={() => setActiveCategoryTab('anime')}
                            >
                              Anime-Inspired
                            </button>
                          </div>

                          <div className="flex-1 overflow-y-auto pr-1 chatbot-scroll">
                            <div className="grid grid-cols-2 gap-3 pb-4">
                              {filteredAvatars.map((char) => (
                                <button
                                  key={char.id}
                                  onClick={() => changeAvatar(char.id)}
                                  className={`relative p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 group overflow-hidden ${activeAvatarId === char.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                                >
                                  {activeAvatarId === char.id && (
                                    <div className="absolute top-2 right-2 text-blue-500">
                                      <FiCheck className="w-4 h-4" />
                                    </div>
                                  )}
                                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${char.theme} flex items-center justify-center p-[2px] shadow-sm`}>
                                    <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center relative overflow-hidden">
                                      <char.Features />
                                      <div className="flex gap-1 z-10 relative">
                                        <div className={`bg-slate-800 ${char.eyeShape} w-1.5 h-1.5`}></div>
                                        <div className={`bg-slate-800 ${char.eyeShape} w-1.5 h-1.5`}></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <span className="text-[13px] font-semibold text-slate-800 text-center leading-tight">{char.name}</span>
                                    <span className="text-[10px] text-slate-500 capitalize">{char.vibe}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Toggle Effects */}
                          <div className="mt-4 pt-4 border-t border-slate-200 shrink-0 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-700">Advanced Effects</p>
                              <p className="text-[11px] text-slate-500">Enable particles, auras, and glow</p>
                            </div>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                              <input type="checkbox" name="toggle" id="toggle" checked={advancedEffects} onChange={() => setAdvancedEffects(!advancedEffects)} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-all duration-300 z-10" />
                              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer transition-colors duration-300"></label>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="chat"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-5 space-y-4"
                        >
                          {messages.map((msg, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[85%] p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm transition-colors duration-500 ${msg.type === 'user'
                                ? `bg-gradient-to-br ${avatar.userBubble} text-white rounded-br-sm`
                                : `bg-white text-slate-800 rounded-bl-sm border ${avatar.botBubble} ai-message-content`
                                }`}>
                                {msg.type === 'user' ? (
                                  msg.text
                                ) : (
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.text || '...'}
                                  </ReactMarkdown>
                                )}
                              </div>
                            </motion.div>
                          ))}

                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className={`bg-white px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-sm border ${avatar.botBubble} flex gap-1.5 items-center h-[42px]`}>
                                <span className={`w-2 h-2 ${avatar.particleColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></span>
                                <span className={`w-2 h-2 ${avatar.particleColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></span>
                                <span className={`w-2 h-2 ${avatar.particleColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></span>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Chat Footer with Input & Quick Actions */}
                {!isMinimized && !showSettings && (
                  <div className="p-3 bg-white border-t border-slate-100 shrink-0 flex flex-col gap-3">
                    <div className="flex overflow-x-auto gap-2 chatbot-scroll pb-1 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                      {quickActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => {
                            localStorage.setItem('chatbot_interacted', 'true');
                            handleActionClick(action);
                          }}
                          className={`text-[12px] px-3 py-1.5 rounded-full border bg-slate-50 text-slate-700 hover:text-white hover:border-transparent hover:shadow-md transition-all duration-300 whitespace-nowrap shrink-0
                            hover:bg-gradient-to-r ${avatar.panelHeader} border-slate-200
                          `}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Message AI or talk casually..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-[13px] rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 shadow-inner"
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className={`absolute right-1.5 w-8 h-8 rounded-full text-white transition-all flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${avatar.panelHeader} shadow-sm`}
                      >
                        <FiSend className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI Bot Area */}
        <AnimatePresence>
          {isBotVisible && (
            <motion.div
              ref={botRef}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className="relative flex flex-col items-center z-50 perspective-1000"
            >
              {/* Floating Tooltip */}
              <AnimatePresence>
                {!isOpen && !hasInteracted && showGreeting && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className={`absolute bottom-[100%] right-0 mb-4 w-60 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl rounded-br-sm shadow-xl border ${avatar.botBubble} cursor-pointer hover:shadow-2xl transition-shadow`}
                    onClick={handleToggle}
                  >
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {greetingText}
                    </p>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${avatar.particleColor} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${avatar.particleColor}`}></span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bot Character Avatar */}
              <motion.div
                animate={avatar.idleAnim}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
                style={{ perspective: 1000 }}
              >
                {/* Dynamic Mouse-Following Shadow / Aura */}
                {advancedEffects && (
                  <motion.div
                    style={{ x: shadowX, y: shadowY }}
                    className={`absolute inset-[-10px] rounded-full blur-[20px] opacity-50 -z-10 bg-gradient-to-r ${avatar.theme} transition-colors duration-700`}
                  />
                )}

                {/* Rotating Particles */}
                {advancedEffects && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-12px] pointer-events-none"
                  >
                    <div className={`absolute top-0 left-1/2 w-2 h-2 rounded-full blur-[1px] ${avatar.particleColor} shadow-[0_0_8px_currentColor] transition-colors duration-700`}></div>
                    <div className={`absolute bottom-2 right-0 w-1.5 h-1.5 rounded-full blur-[1px] ${avatar.particleColor} shadow-[0_0_8px_currentColor] transition-colors duration-700`}></div>
                    {avatar.id === 'ace' && <div className={`absolute top-1/2 left-0 w-2 h-2 rounded-full blur-[1px] bg-red-400 shadow-[0_0_8px_currentColor]`}></div>}
                  </motion.div>
                )}

                {/* Gradient Ring */}
                <div className={`absolute inset-1 rounded-full p-[2.5px] bg-gradient-to-tr ${avatar.theme} animate-gradient-border shadow-lg ${advancedEffects ? avatar.aura : 'shadow-slate-400/30'} transition-all duration-700`}>
                  {/* Glassmorphism Body */}
                  <div className="w-full h-full bg-white/95 backdrop-blur-md rounded-full flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-40"></div>

                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={avatar.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-20 flex items-center justify-center"
                      >
                        <avatar.Features />
                      </motion.div>
                    </AnimatePresence>

                    {/* Bot Face with Parallax */}
                    <motion.div
                      style={{ rotateX: headRotateX, rotateY: headRotateY, x: headX, y: headY }}
                      className="relative z-30 flex flex-col items-center gap-1.5 transform group-hover:translate-y-[-2px] transition-transform duration-300 transform-style-3d mt-2"
                    >
                      {/* Eyes Container */}
                      <div className="flex gap-2.5 items-center justify-center">
                        <div className={`relative ${avatar.eyeSize} bg-white/90 rounded-full shadow-inner overflow-hidden flex items-center justify-center border border-slate-200/50 animate-blink transition-all duration-500`}>
                          <motion.div style={{ x: pupilX, y: pupilY }} className={`${avatar.pupilSize} bg-gradient-to-b ${avatar.eyeColor} ${avatar.eyeShape} shadow-inner relative transition-all duration-500`}>
                            <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-white rounded-full opacity-90 shadow-[0_0_2px_#fff]"></div>
                          </motion.div>
                        </div>

                        {!(avatar.id === 'sanji') && (
                          <div className={`relative ${avatar.eyeSize} bg-white/90 rounded-full shadow-inner overflow-hidden flex items-center justify-center border border-slate-200/50 animate-blink transition-all duration-500`} style={{ animationDelay: '0.1s' }}>
                            <motion.div style={{ x: pupilX, y: pupilY }} className={`${avatar.pupilSize} bg-gradient-to-b ${avatar.eyeColor} ${avatar.eyeShape} shadow-inner relative transition-all duration-500`}>
                              <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-white rounded-full opacity-90 shadow-[0_0_2px_#fff]"></div>
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {/* Mouth */}
                      {avatar.id === 'luffy' ? (
                        <svg className="w-6 h-3 text-slate-800 transition-all duration-300" viewBox="0 0 24 12" fill="currentColor">
                          <path d="M2,0 Q12,12 22,0 Q12,8 2,0" />
                        </svg>
                      ) : avatar.id === 'zoro' ? (
                        <div className="w-4 h-[2px] bg-slate-800 rounded-full"></div>
                      ) : avatar.id === 'shanks' ? (
                        <svg className="w-5 h-1.5 text-slate-800 transition-all duration-300" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d="M4,6 Q12,8 20,6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-2 text-slate-800 transition-all duration-300" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d={isOpen ? "M4 6 Q12 10 20 6" : "M4 2 Q12 10 20 2"} />
                        </svg>
                      )}
                    </motion.div>

                    <div className="absolute bottom-[-10px] w-[150%] h-[20px] bg-white/40 blur-md rounded-full pointer-events-none z-40"></div>
                  </div>
                </div>

                {/* Closing Icon Overlay */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-1 bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center z-50"
                    >
                      <FiX className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
