import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import type { Project } from "../data/portfolio";
import { accentClasses, cn } from "../lib/utils";

/**
 * Case-study overlay for a selected project. Readability-first.
 *
 * Layout safety (was overflowing the viewport before):
 *  - overlay centers the panel and scrolls if the panel is taller than screen
 *  - panel is capped at 90vh and scrolls internally
 *  - close button lives in a sticky header so it's ALWAYS reachable
 *
 * Visual: public projects show a screenshot (or a neutral placeholder);
 * confidential company work shows an abstract architecture diagram instead.
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
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-ink-900/80 p-4 backdrop-blur-sm"
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
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-ink-800 shadow-glow"
      >
        {/* Sticky header keeps the close button reachable while scrolling. */}
        <div className="sticky top-0 z-20 flex justify-end border-b border-white/5 bg-ink-800/90 px-4 py-3 backdrop-blur">
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-8 pt-4 sm:px-8">
          {/* Visual: screenshot, architecture diagram, or neutral placeholder. */}
          <ProjectVisual project={project} />

          <p className={cn("mt-6 font-mono text-xs uppercase tracking-widest", a.text)}>
            {project.role}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-slate-300">{project.description}</p>

          {/* Tools */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
              >
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
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-semibold text-ink-900"
                >
                  <ExternalLink size={16} /> Live demo
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
                >
                  <Github size={16} /> Code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Picks the right visual for a project's case study. */
function ProjectVisual({ project }: { project: Project }) {
  const a = accentClasses[project.accent];

  // 1) Real screenshot, if provided.
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="aspect-video w-full rounded-xl object-cover"
      />
    );
  }

  // 2) Confidential company work → abstract architecture diagram (no real UI).
  if (project.confidential && project.diagram?.length) {
    return (
      <div className={cn("rounded-xl border p-5", a.border, a.bg)}>
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
          <Lock size={13} className={a.text} />
          Confidential company work — abstract architecture
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {project.diagram.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-xs font-medium text-slate-200">
                {step}
              </span>
              {i < project.diagram!.length - 1 && (
                <ArrowRight size={14} className="shrink-0 text-slate-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3) Neutral placeholder (public project without a screenshot yet).
  return (
    <div
      className={cn(
        "flex aspect-video w-full items-center justify-center rounded-xl border",
        a.border,
        a.bg
      )}
    >
      <span className="font-mono text-xs text-slate-400">screenshot coming soon</span>
    </div>
  );
}
