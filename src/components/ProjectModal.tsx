import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import type { Project } from "../data/portfolio";
import { accentClasses, cn } from "../lib/utils";

/**
 * Case-study overlay for a selected project. Readability-first: clear
 * sections (role, tools, key work, outcome) over a calm panel. Closes on
 * Escape or backdrop click; locks body scroll while open.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const a = accentClasses[project.accent];

  // Escape to close + lock background scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink-900/80 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-ink-800 p-6 shadow-glow sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Optional screenshot — plug into project.image in data/portfolio.ts */}
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="mb-6 aspect-video w-full rounded-xl object-cover"
          />
        ) : (
          <div className={cn("mb-6 flex aspect-video w-full items-center justify-center rounded-xl border", a.border, a.bg)}>
            <span className="font-mono text-xs text-slate-400">screenshot placeholder</span>
          </div>
        )}

        <p className={cn("font-mono text-xs uppercase tracking-widest", a.text)}>{project.role}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-slate-300">{project.description}</p>

        {/* Tools */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((t) => (
            <span key={t} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
              {t}
            </span>
          ))}
        </div>

        {/* Key work */}
        <h4 className="mt-7 font-display text-sm font-semibold text-white">Key work</h4>
        <ul className="mt-3 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
              <CheckCircle2 size={18} className={cn("mt-0.5 shrink-0", a.text)} />
              {h}
            </li>
          ))}
        </ul>

        {/* Outcome */}
        <div className={cn("mt-6 rounded-xl border p-4", a.border, a.bg)}>
          <h4 className="font-display text-sm font-semibold text-white">Outcome</h4>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{project.outcome}</p>
        </div>

        {/* Links */}
        {(project.repo || project.live) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-semibold text-ink-900">
                <ExternalLink size={16} /> Live
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">
                <Github size={16} /> Code
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
