import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { navItems, links } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { cn } from "../lib/utils";

/**
 * Sticky, always-accessible navigation. Highlights the active section and
 * keeps Resume reachable at all times (recruiter priority). Collapses to a
 * keyboard-accessible menu on mobile.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.id));

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:mx-4 sm:px-5 md:mx-auto glass">
        {/* Brand */}
        <a
          href="#home"
          className="font-display text-sm font-bold tracking-wide text-white"
          aria-label="Back to top"
        >
          <span className="gradient-text">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  // `relative` anchors the absolutely-positioned underline so it
                  // never changes the link's height (fixes the active "jump").
                  "relative block rounded-lg px-3 py-2 text-sm transition-colors",
                  active === item.id ? "text-white" : "text-slate-400 hover:text-white"
                )}
                aria-current={active === item.id ? "page" : undefined}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-accent-gradient"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume CTA (desktop) */}
        <a
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03] md:inline-flex"
        >
          <FileText size={16} /> Resume
        </a>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl p-2 md:hidden glass"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={close}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm",
                      active === item.id
                        ? "bg-white/5 text-white"
                        : "text-slate-300 hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="mt-1 flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-3 text-sm font-semibold text-ink-900"
                >
                  <FileText size={16} /> Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
