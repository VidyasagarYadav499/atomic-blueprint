import { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle2, RefreshCw, Circle, ChevronRight, Heart, Atom } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineEvent {
  year: string;
  title: string;
  detail: string;
  stage: 's1' | 's2' | 's3';
}

const timelineData: TimelineEvent[] = [
  // Stage I
  {
    year: '1954',
    title: "Bhabha presents the 3-stage plan",
    detail: "Homi Bhabha publicly presented the three-stage nuclear plan at the conference on 'Development of Atomic Energy for Peaceful Purposes,' attended by PM Jawaharlal Nehru. Rationale: India holds ~25% of world thorium but only 1–2% of uranium.",
    stage: 's1'
  },
  {
    year: '1956',
    title: "APSARA reactor goes critical",
    detail: "Asia's first nuclear reactor, APSARA, begins operations in Mumbai — two years before the programme was formally adopted. Marks the beginning of India's nuclear infrastructure.",
    stage: 's1'
  },
  {
    year: '1958',
    title: "Government formally adopts the plan",
    detail: "India's government officially commits to the three-stage nuclear programme. The goal: leverage scarce uranium to produce plutonium, then breed U-233 from thorium for long-term energy independence.",
    stage: 's1'
  },
  {
    year: '1969–2000s',
    title: "PHWR fleet constructed across India",
    detail: "India builds and indigenises a fleet of Pressurised Heavy Water Reactors (PHWRs). Natural uranium fuel produces electricity while generating Plutonium-239 as a byproduct — the key fuel for Stage II. Heavy water (D₂O) serves as moderator and coolant.",
    stage: 's1'
  },
  {
    year: '2025',
    title: "20 PHWRs operating at ~80% capacity factor",
    detail: "As of 2025, India operates 20 PHWRs with commendable reliability, producing Pu-239 for Stage II. Total installed nuclear capacity stands at ~7,425 MW — only ~3% of India's electricity mix.",
    stage: 's1'
  },
  // Stage II
  {
    year: '1985',
    title: "Fast Breeder Test Reactor (FBTR) commissioned",
    detail: "The FBTR at Kalpakkam, Tamil Nadu becomes operational. Uses mixed carbide fuel. Serves as India's key experimental platform for fast reactor technology and sodium-cooled reactor systems.",
    stage: 's2'
  },
  {
    year: '2003',
    title: "PFBR approved for construction",
    detail: "The 500 MWe Prototype Fast Breeder Reactor is approved for construction at Kalpakkam. Designed by IGCAR; to be built by BHAVINI.",
    stage: 's2'
  },
  {
    year: '2005',
    title: "Indo-US Nuclear Deal signed",
    detail: "The landmark deal, followed by an NSG waiver, ends 30+ years of India's civil nuclear isolation. Opens new options for uranium imports but also complicates the necessity argument for thorium.",
    stage: 's2'
  },
  {
    year: 'Mar 2024',
    title: "PFBR core-loading — PM Modi witnesses",
    detail: "A major milestone: PM Narendra Modi witnesses the beginning of core-loading at the PFBR, Kalpakkam. The reactor uses mixed oxide of Uranium and Plutonium-239. Liquid sodium is used in two circuits for heat transfer.",
    stage: 's2'
  },
  {
    year: '6th April 2026',
    title: "PFBR attains criticality — A historic leap",
    detail: "The indigenously designed and built 500 MWe Prototype Fast Breeder Reactor (PFBR) at Kalpakkam attained criticality on 6th April 2026. This marks India's official entry into the second stage of its nuclear programme, enabling the breeding of more fuel than consumed and paving the way for large-scale thorium utilization.",
    stage: 's2'
  },
  // Stage III
  {
    year: 'Ongoing',
    title: "AHWR — Advanced Heavy Water Reactor design",
    detail: "BARC is developing a 300 MWe Advanced Heavy Water Reactor (AHWR) that bridges Stage I and III. It burns Plutonium-239 + Thorium-232, generating ~2/3 of power from thorium.",
    stage: 's3'
  },
  {
    year: 'Ongoing',
    title: "KAMINI reactor — world's only U-233 fuelled reactor",
    detail: "The KAMINI reactor at IGCAR, Kalpakkam is the only operating reactor in the world fuelled by Uranium-233. Serves as proof of concept for the Stage III fuel cycle.",
    stage: 's3'
  },
  {
    year: 'Future',
    title: "Full Stage III: Thermal Breeder Reactors",
    detail: "Stage III reactors will burn U-233 + Thorium-232. India's ~500,000 tonnes of thorium reserves could power ~500 GWe for 400+ years. Commercial deployment is expected to be several decades away.",
    stage: 's3'
  },
  {
    year: 'Key challenge',
    title: "Fissile material shortage — the critical bottleneck",
    detail: "The single greatest obstacle to Stage III is insufficient fissile material (Pu-239 or U-233) to 'ignite' thorium reactors at scale. Thorium itself is fertile, not fissile.",
    stage: 's3'
  }
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [filter, setFilter] = useState<'all' | 's1' | 's2' | 's3'>('all');
  const [expandedEvents, setExpandedEvents] = useState<number[]>([]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleEvent = (index: number) => {
    setExpandedEvents(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const filteredEvents = timelineData.filter(event => filter === 'all' || event.stage === filter);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark-bg bg-[#0a0e1a] text-[#e2e8f0]' : 'light-bg bg-[#f5f0e8] text-[#1a1612]'}`}>

      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 w-full h-16 z-50 border-b transition-colors duration-300 backdrop-blur-md flex items-center justify-between px-6 sm:px-12 ${theme === 'dark' ? 'bg-[#111827]/80 border-[#1e2d40]' : 'bg-[#fffdf8]/80 border-[#d6cdb8]'
        }`}>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="text-orange-500"
          >
            <Atom size={24} />
          </motion.div>
          <h1 className="font-serif text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
            Atomic Blueprint
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className={`group relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${theme === 'dark' ? 'bg-[#1e2d40] border-[#374151] text-yellow-400 hover:border-yellow-400' : 'bg-[#f3f4f6] border-[#d1d5db] text-slate-600 hover:border-slate-600'
            }`}
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-50 mb-4 block">India's Strategic Energy Independence</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-black leading-tight mb-4 bg-gradient-to-br from-orange-500 via-sky-400 to-violet-500 bg-clip-text text-transparent">
              Bhabha's Three-Stage<br />Nuclear Programme
            </h2>
            <p className="text-xs sm:text-sm tracking-widest opacity-50 uppercase">Conceived 1954 · Adopted 1958 · Ongoing</p>
          </motion.div>
        </section>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { stage: 'Stage I', name: 'Pressurised Heavy Water Reactors', status: 'Operational', icon: <CheckCircle2 size={16} />, color: 'orange' },
            { stage: 'Stage II', name: 'Fast Breeder Reactors', status: 'Commissioning', icon: <RefreshCw size={16} />, color: 'sky' },
            { stage: 'Stage III', name: 'Thorium–U233 Reactors', status: 'Future', icon: <Circle size={16} />, color: 'violet' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`p-6 rounded-xl border transition-all ${theme === 'dark' ? 'bg-[#111827] border-[#1e2d40]' : 'bg-[#fffdf8] border-[#d6cdb8] shadow-sm'}`}
            >
              <div className={`h-1 w-12 mb-4 rounded-full ${item.color === 'orange' ? 'bg-[#f97316]' : item.color === 'sky' ? 'bg-[#38bdf8]' : 'bg-[#a78bfa]'}`} />
              <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2 block">{item.stage}</span>
              <h3 className="text-sm font-bold mb-4 leading-snug h-10">{item.name}</h3>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.color === 'orange' ? 'bg-orange-500/10 text-orange-500' :
                  item.color === 'sky' ? 'bg-sky-400/10 text-sky-400' :
                    'bg-violet-400/10 text-violet-400'
                }`}>
                {item.icon}
                {item.status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {(['all', 's1', 's2', 's3'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 sm:px-6 py-3 rounded-lg border text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all ${filter === tab
                  ? (tab === 'all' ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') :
                    tab === 's1' ? 'border-orange-500 text-orange-500 bg-orange-500/5' :
                      tab === 's2' ? 'border-sky-400 text-sky-400 bg-sky-400/5' :
                        'border-violet-400 text-violet-400 bg-violet-400/5')
                  : (theme === 'dark' ? 'border-[#1e2d40] text-[#64748b] hover:border-[#374151]' : 'border-[#d6cdb8] text-[#7a6e5f] hover:border-[#a8a29e]')
                }`}
            >
              {tab === 'all' ? (
                <span>ALL<span className="hidden sm:inline"> STAGES</span></span>
              ) : tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Current Status Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-8 rounded-2xl border mb-16 ${theme === 'dark' ? 'bg-sky-400/5 border-sky-400/20' : 'bg-sky-50 border-sky-200'}`}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-sky-500 font-bold mb-4 block">⚡ Current Status — April 2026</span>
          <p className="text-sm sm:text-base leading-relaxed opacity-80">
            India has officially entered <strong className="text-sky-400">Stage II</strong> of its nuclear programme. The Prototype Fast Breeder Reactor (PFBR) at Kalpakkam attained criticality on <strong className="text-sky-400">6th April 2026</strong>. This milestone transitions India from a uranium-based fleet to a plutonium-based breeder fleet, significantly enhancing energy security and bringing the thorium-based <strong className="text-violet-400">Stage III</strong> closer to reality.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 border-l border-slate-800/50">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={`${event.stage}-${index}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-8 relative"
              >
                {/* Dot */}
                <div className={`absolute -left-[37px] top-4 w-4 h-4 rounded-full border-2 ${theme === 'dark' ? 'bg-[#0a0e1a]' : 'bg-[#f5f0e8]'} ${event.stage === 's1' ? 'border-orange-500' :
                    event.stage === 's2' ? 'border-sky-400' :
                      'border-violet-400'
                  }`} />

                <div
                  onClick={() => toggleEvent(index)}
                  className={`group p-6 rounded-xl border-l-4 cursor-pointer transition-all ${theme === 'dark' ? 'bg-[#111827] border-[#1e2d40] hover:bg-[#1f2937]' : 'bg-[#fffdf8] border-[#d6cdb8] hover:bg-[#fefce8] shadow-sm'
                    } ${event.stage === 's1' ? 'border-l-orange-500' :
                      event.stage === 's2' ? 'border-l-sky-400' :
                        'border-l-violet-400'
                    }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-mono opacity-50 mb-1 block">{event.year}</span>
                      <h4 className="text-sm sm:text-base font-bold leading-tight group-hover:text-sky-400 transition-colors">{event.title}</h4>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`opacity-30 transition-transform duration-300 ${expandedEvents.includes(index) ? 'rotate-90 opacity-100' : ''}`}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedEvents.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-xs sm:text-sm leading-relaxed opacity-60">
                          {event.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className={`mt-24 pt-12 border-t flex flex-col items-center justify-center text-center gap-8 text-[10px] tracking-widest uppercase opacity-40 ${theme === 'dark' ? 'border-[#1e2d40]' : 'border-[#d6cdb8]'}`}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span>© {new Date().getFullYear()} Atomic Blueprint</span>
              <span className="hidden sm:inline">•</span>
              <span>All Rights Reserved</span>
            </div>
            <div className="opacity-70 leading-relaxed max-w-2xl">
              Sources: Wikipedia, Carnegie Endowment, BARC, DAE, Swarajya Mag
            </div>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>Made with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>by <a href="https://x.com/Vidyasagar499" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">Vidyasagar</a></span>
          </div>
        </footer>
      </div>
    </div>
  );
}
