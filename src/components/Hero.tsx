import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { profile, links } from "../data/portfolio";

/**
 * First impression. Goal: a recruiter understands who this is within 5s.
 * Big name + role + one-line value statement + two clear CTAs, layered over
 * the 3D background. Text sits in a readable column — the 3D never hides it.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-5 pt-28 sm:px-8"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Availability / status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-300 glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          Open to full-stack & GenAI roles
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-mono text-sm tracking-wide text-accent-cyan"
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-display text-xl font-semibold sm:text-2xl"
        >
          <span className="gradient-text">{profile.title}</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-1 text-sm text-slate-500"
        >
          {profile.positioning} · {profile.yearsExperience}+ years
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {profile.valueStatement}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gradient px-6 py-3 font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03] sm:w-auto"
          >
            View Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
          >
            Contact
          </a>
        </motion.div>

        {/* Quick socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-5 text-slate-400"
        >
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
            <Github size={20} />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${links.email}`} aria-label="Email" className="transition-colors hover:text-white">
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="block"
        >
          <ChevronDown size={26} />
        </motion.span>
      </motion.a>
    </section>
  );
}
