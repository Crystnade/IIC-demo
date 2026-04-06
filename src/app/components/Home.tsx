import { Link } from "react-router";
import { ArrowRight, Code, Cpu, Globe, Layers, ShieldCheck, Zap, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } }
  };

  return (
    <div className="flex-1 w-full bg-neutral-950 text-white selection:bg-indigo-500/30" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ y: heroY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            variants={glowVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" 
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-20" />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
          className="relative z-10 max-w-5xl mx-auto space-y-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-sm font-medium backdrop-blur-md">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>The premier developer conference of 2026</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Future</span> <br className="hidden md:block" /> at TechCon
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers, designers, and innovators for three days of deep-dive workshops, inspiring keynotes, and networking.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/register" className="group relative h-14 px-8 inline-flex items-center justify-center rounded-xl bg-white text-neutral-950 font-bold text-lg hover:bg-neutral-100 transition-all gap-2 w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]">
              Secure Your Spot 
              <motion.div className="group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
            <Link to="/feedback" className="h-14 px-8 inline-flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 font-medium text-white hover:bg-neutral-800 transition-colors w-full sm:w-auto">
              Leave Feedback
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Features/Tracks Section */}
      <section className="py-32 bg-neutral-900/50 border-t border-neutral-800 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Explore Our Tracks</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">Dive deep into the technologies shaping tomorrow. Choose from over 50 sessions across four specialized tracks.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Frontend Engineering", desc: "Master modern frameworks, CSS architectures, and performance optimization.", color: "text-blue-400", bg: "bg-blue-500/10", border: "group-hover:border-blue-500/50" },
              { icon: Cpu, title: "Backend Systems", desc: "Scale your infrastructure, design robust APIs, and explore serverless.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/50" },
              { icon: Globe, title: "Web3 & Blockchain", desc: "Build decentralized applications, smart contracts, and secure networks.", color: "text-purple-400", bg: "bg-purple-500/10", border: "group-hover:border-purple-500/50" },
              { icon: Layers, title: "Design Systems", desc: "Bridge the gap between design and engineering with scalable systems.", color: "text-pink-400", bg: "bg-pink-500/10", border: "group-hover:border-pink-500/50" }
            ].map((track, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-neutral-950 p-8 rounded-3xl border border-neutral-800 ${track.border} transition-all duration-300 group shadow-xl`}
              >
                <div className={`w-14 h-14 rounded-2xl ${track.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <track.icon className={`w-7 h-7 ${track.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{track.title}</h3>
                <p className="text-neutral-400 text-base leading-relaxed">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
