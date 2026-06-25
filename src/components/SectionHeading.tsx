import { motion } from "framer-motion";

/**
 * Consistent section label + title. The small mono "kicker" gives each
 * section a clear, scannable identity for recruiters skimming the page.
 */
export default function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 max-w-2xl"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>
      )}
    </motion.div>
  );
}
