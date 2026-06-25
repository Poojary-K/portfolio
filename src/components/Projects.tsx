import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "../data/portfolio";
import { accentClasses, cn } from "../lib/utils";

/**
 * Projects — the headline section. Cards have a subtle pointer-driven tilt
 * for an immersive feel, but every card stays fully readable. Click (or
 * Enter/Space) opens a clean case-study modal.
 */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <SectionHeading
        kicker="03 · Projects"
        title="Things I've built and shipped."
        description="Select any project to read a short case study — role, tools, key work, and outcome."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onSelect={() => setSelected(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const a = accentClasses[project.accent];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-700/40 p-6 text-left backdrop-blur-sm transition-colors",
        "hover:border-white/20"
      )}
      aria-label={`Open case study: ${project.title}`}
    >
      {/* Accent glow that appears on hover. */}
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
          a.glow
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className={cn("font-mono text-xs uppercase tracking-widest", a.text)}>{project.tagline}</p>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>

        <h3 className="mt-3 font-display text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tools.slice(0, 5).map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-400">
              {t}
            </span>
          ))}
          {project.tools.length > 5 && (
            <span className="px-1 text-[11px] text-slate-500">+{project.tools.length - 5}</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
