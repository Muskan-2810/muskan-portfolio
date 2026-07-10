"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Mail, Phone, MapPin, Github, Linkedin, Code2, FileCode2, CheckCircle2, AlertCircle } from "lucide-react";
import { PROFILE, CODING_PROFILES } from "@/constants/data";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
  GeeksforGeeks: FileCode2,
} as const;

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-panel", {
        scrollTrigger: { trigger: ".contact-panel", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const nextErrors: Partial<FormState> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) nextErrors.message = "Message should be at least 10 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // EmailJS isn't configured yet in this environment — fail gracefully
      // instead of pretending to send. See .env.example for the required keys.
      console.error(
        "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
          "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
      );
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey }
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={rootRef} className="section-padding relative">
      <SectionHeading
        eyebrow="Chapter Seven — Contact"
        title="Let's build something."
        description="Open to internships, collaborations, or just a good conversation about AI and software."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Contact info panel */}
        <div className="contact-panel glass-panel flex flex-col gap-6 rounded-2xl p-8">
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-4 text-ink-muted transition-colors duration-300 hover:text-glow-blue"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-charcoal-border bg-charcoal/60">
              <Mail size={18} />
            </span>
            <span className="font-body text-sm">{PROFILE.email}</span>
          </a>

          <a
            href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-4 text-ink-muted transition-colors duration-300 hover:text-glow-blue"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-charcoal-border bg-charcoal/60">
              <Phone size={18} />
            </span>
            <span className="font-body text-sm">{PROFILE.phone}</span>
          </a>

          <div className="flex items-center gap-4 text-ink-muted">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-charcoal-border bg-charcoal/60">
              <MapPin size={18} />
            </span>
            <span className="font-body text-sm">Bhopal, Madhya Pradesh, India</span>
          </div>

          <div className="mt-2 flex items-center gap-3 border-t border-charcoal-border pt-6">
            {CODING_PROFILES.map((profile) => {
              const Icon = SOCIAL_ICONS[profile.name as keyof typeof SOCIAL_ICONS] ?? Code2;
              return (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={profile.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-border text-ink-muted transition-colors duration-300 hover:border-glow-blue/50 hover:text-glow-blue"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="contact-panel glass-panel relative flex flex-col gap-5 rounded-2xl p-8"
        >
          <div>
            <label htmlFor="contact-name" className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink-muted">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className="w-full rounded-xl border border-charcoal-border bg-charcoal/40 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-glow-blue/50"
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 font-mono text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink-muted">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className="w-full rounded-xl border border-charcoal-border bg-charcoal/40 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-glow-blue/50"
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 font-mono text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink-muted">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className="w-full resize-none rounded-xl border border-charcoal-border bg-charcoal/40 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-glow-blue/50"
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1.5 font-mono text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <MagneticButton
            type="submit"
            disabled={status === "sending"}
            variant="solid"
            className="mt-1 w-full justify-center"
            aria-label="Send message"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </MagneticButton>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="status"
                className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 font-body text-sm text-emerald-300"
              >
                <CheckCircle2 size={18} />
                Message sent — thank you, I&apos;ll reply soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 font-body text-sm text-red-300"
              >
                <AlertCircle size={18} />
                Something went wrong — please email me directly instead.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
