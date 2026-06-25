import { Github, Linkedin, Mail } from "lucide-react";
import { links, profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold text-white">{profile.name}</p>
          <p className="text-xs text-slate-500">{profile.title}</p>
        </div>

        <div className="flex items-center gap-5 text-slate-400">
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white">
            <Github size={18} />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${links.email}`} aria-label="Email" className="hover:text-white">
            <Mail size={18} />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-center text-xs text-slate-600 sm:text-left">
        Built with React, Three.js & Framer Motion. © {profile.name}.
      </p>
    </footer>
  );
}
