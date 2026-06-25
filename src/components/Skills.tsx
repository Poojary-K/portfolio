import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/portfolio";
import { accentClasses, cn } from "../lib/utils";

/**
 * Skills — grouped, readable cards with chip lists. Chosen over a 3D orbit
 * for scannability (recruiter-friendly), but each card has subtle hover
 * depth + a colored accent to keep the immersive mood.
 */
export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        kicker="02 · Skills"
        title="A full-stack + GenAI + platform toolkit."
        description="Grouped by domain so you can quickly match against a role's needs."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const a = accentClasses[group.accent];
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className={cn(
                "group rounded-2xl border bg-ink-700/40 p-5 backdrop-blur-sm transition-colors",
                "border-white/10 hover:border-white/20"
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", a.dot)} />
                <h3 className="font-display text-base font-semibold text-white">{group.category}</h3>
              </div>
              <p className="mb-4 text-xs text-slate-500">{group.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors",
                      "border-white/10 bg-white/[0.03]",
                      a.groupHoverBorder
                    )}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
