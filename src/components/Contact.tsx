import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { links, profile } from "../data/portfolio";

/**
 * Contact — the final call to action. Provides a direct email link plus an
 * optional lightweight form. The form has NO backend by default: on submit
 * it opens the visitor's mail client with prefilled content (mailto).
 *
 * 👉 To use a real backend, replace handleSubmit with a fetch() to Formspree,
 *    EmailJS, or your own API endpoint.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <SectionHeading kicker="05 · Contact" title="Let's build something." />

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left: pitch + links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg leading-relaxed text-slate-300">
            Have a product idea, GenAI workflow, or full-stack role where I can help? Let's connect.
          </p>

          <div className="mt-8 space-y-3">
            <ContactLink href={`mailto:${links.email}`} icon={<Mail size={18} />} label={links.email} />
            <ContactLink href={links.github} icon={<Github size={18} />} label="github.com/Poojary-K" external />
            <ContactLink href={links.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" external />
            <ContactLink href={links.resume} icon={<FileText size={18} />} label="Download résumé" external />
          </div>

          <p className="mt-8 text-sm text-slate-500">Based in {profile.location} · Open to remote.</p>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 glass"
        >
          <Field id="name" label="Name">
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-accent-cyan/50"
              placeholder="Your name"
            />
          </Field>
          <Field id="email" label="Email">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-accent-cyan/50"
              placeholder="you@company.com"
            />
          </Field>
          <Field id="message" label="Message">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-accent-cyan/50"
              placeholder="Tell me about the role or project…"
            />
          </Field>
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gradient px-6 py-3 font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.02]"
          >
            <Send size={16} /> Send message
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Opens your email app — no data is stored.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition-colors hover:border-white/20 hover:text-white"
    >
      <span className="text-accent-cyan">{icon}</span>
      {label}
    </a>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}
