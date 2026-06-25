import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { timeline } from "../data/portfolio";

/**
 * Experience — a vertical timeline with scroll-reveal. The animated spine
 * gives a sense of motion/depth while staying perfectly readable.
 */
export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        kicker="04 · Experience"
        title="Career timeline."
        description="3 years across product development, GenAI platforms, and observability."
      />

      <div className="relative">
        {/* Animated spine. */}
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 sm:left-4" aria-hidden="true">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="h-full w-full bg-accent-gradient"
          />
        </div>

        <ol className="space-y-8">
          {timeline.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pl-12 sm:pl-14"
            >
              {/* Node */}
              <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-accent-cyan shadow-glow sm:left-2.5" />

              <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
                {item.period}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
