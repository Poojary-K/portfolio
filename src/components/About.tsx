import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { about } from "../data/portfolio";

/**
 * About — short, skimmable prose plus a stats strip. Kept text-first so the
 * "who is this" answer is instant and readable, with light motion on reveal.
 */
export default function About() {
  const cards = [
    { label: "What I do", body: about.whatIDo },
    { label: "Problems I like solving", body: about.problemsILike },
    { label: "How I work", body: about.workingStyle },
  ];

  return (
    <section id="about" className="section">
      <SectionHeading kicker="01 · About" title="Engineer who ships, debugs, and owns." />

      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-lg leading-relaxed text-slate-300"
        >
          {about.intro}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 self-start md:grid-cols-1"
        >
          {about.stats.map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center glass md:text-left">
              <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
              <div className="mt-1 text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl p-5 glass"
          >
            <h3 className="font-display text-sm font-semibold text-white">{c.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
