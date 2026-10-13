"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Send, Loader2 } from "lucide-react";
import { RevealLine } from "./Reveal";
import MagneticButton from "./MagneticButton";
import Toast from "./Toast";
import ContactVisual from "./ContactVisual";

const EMAIL = "dilshadansariu@gmail.com";

// To make the brief form actually deliver into your inbox (not just open the
// visitor's own mail app), sign up free at https://formspree.io, create a
// form pointed at dilshadansariu@gmail.com, and paste its endpoint here —
// e.g. "https://formspree.io/f/abcdwxyz". Takes about 2 minutes. Leave blank
// and the form still works via the mailto + clipboard fallback below, but
// delivery then depends on the visitor's own device having a mail app set up
// and them hitting send themselves.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdeaoqvl";

const LINKS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  { label: "GitHub", value: "Dilshadansariu", href: "https://github.com/Dilshadansariu", icon: Github },
  {
    label: "LinkedIn",
    value: "dilshad-ansari",
    href: "https://www.linkedin.com/in/dilshad-ansari-b7455224a/",
    icon: Linkedin,
  },
];

const PROJECT_TYPES = ["Web App", "AI Product", "MVP / Startup Build", "Something else"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Abuse-friction limits. NOTE: these run in the browser, so they stop
// accidents, double-clicks and naive bots — they are not a hard security
// boundary against a determined attacker hitting the Formspree endpoint
// directly. Real rate limiting / spam filtering for that case lives on
// Formspree's side (enable its spam protection + allowed-domain setting in
// the Formspree dashboard).
const LIMITS = { name: 100, email: 254, phone: 20, message: 2000 };

// Optional phone: digits plus the usual separators; 7–15 digits (E.164 max is 15).
const PHONE_CHARS = /^[+()\d\s.\-]+$/;
const phoneDigits = (v: string) => v.replace(/\D/g, "").length;
const phoneInvalid = (v: string) => {
  const t = v.trim();
  if (!t) return false; // optional
  const n = phoneDigits(t);
  return !PHONE_CHARS.test(t) || n < 7 || n > 15;
};
const COOLDOWN_MS = 30_000;
const COOLDOWN_KEY = "brief:lastSentAt";

// Strip control characters (except newline/tab in the message) and cap length
// so odd or oversized input can't be forwarded as-is.
const clean = (value: string, max: number, allowNewlines = false) =>
  value
    // eslint-disable-next-line no-control-regex
    .replace(allowNewlines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; phone?: boolean; message?: boolean }>({});
  const [sending, setSending] = useState(false);
  // Honeypot: invisible to people, but naive spam bots auto-fill every field
  // they find. If this ever has a value, the submission is bot-generated.
  const [honeypot, setHoneypot] = useState("");
  const [toast, setToast] = useState<{ show: boolean; text: string }>({ show: false, text: "" });

  const flashToast = (text: string) => {
    setToast({ show: true, text });
    window.clearTimeout((flashToast as any)._t);
    (flashToast as any)._t = window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 3600);
  };

  const copyAndNotify = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flashToast(`${label} copied to clipboard`);
    } catch {
      flashToast(`Email: ${EMAIL}`);
    }
  };

  const handleSayHello = () => {
    copyAndNotify(EMAIL, "Email");
    window.location.href = `mailto:${EMAIL}`;
  };

  const validate = () => {
    const next = {
      name: name.trim().length === 0,
      email: !EMAIL_RE.test(email.replace(/\s+/g, "").trim()),
      phone: phoneInvalid(phone),
      message: message.trim().length < 10,
    };
    setErrors(next);
    return !next.name && !next.email && !next.phone && !next.message;
  };

  const handleSendBrief = async () => {
    if (sending) return;
    if (!validate()) {
      flashToast("Please fill in your name, a valid email, and a short message");
      return;
    }

    // Bot caught by the honeypot: pretend it worked (so the bot learns
    // nothing) but never send or open anything.
    if (honeypot) {
      flashToast("Message sent — I'll get back to you soon!");
      return;
    }

    // Friction against rapid repeat submissions from the same browser tab/session.
    try {
      const last = Number(sessionStorage.getItem(COOLDOWN_KEY) || 0);
      const wait = COOLDOWN_MS - (Date.now() - last);
      if (wait > 0) {
        flashToast(`Please wait ${Math.ceil(wait / 1000)}s before sending another message`);
        return;
      }
    } catch {
      // sessionStorage unavailable (private mode etc.) — skip the cooldown, don't block sending
    }

    const payload = {
      name: clean(name, LIMITS.name),
      email: clean(email.replace(/\s+/g, ""), LIMITS.email),
      phone: clean(phone, LIMITS.phone), // optional — empty string when not given
      type,
      message: clean(message, LIMITS.message, true),
      _gotcha: "", // Formspree's native honeypot field; real submissions leave it empty
    };

    if (FORMSPREE_ENDPOINT) {
      setSending(true);
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
        flashToast("Message sent — I'll get back to you soon!");
        try {
          sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        } catch {
          // non-fatal
        }
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setErrors({});
      } catch {
        // Real delivery failed (offline, misconfigured endpoint, etc.) — fall
        // back to the same clipboard + mailto path so the message is never
        // silently lost.
        fallbackSend(payload);
      } finally {
        setSending(false);
      }
      return;
    }

    fallbackSend(payload);
  };

  const fallbackSend = (payload: { name: string; email: string; phone?: string; type: string; message: string }) => {
    const subject = encodeURIComponent(`New project inquiry — ${payload.type} from ${payload.name}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nReply-to: ${payload.email}${payload.phone ? `\nPhone: ${payload.phone}` : ""}\nProject type: ${payload.type}\n\n${payload.message}`
    );
    const mailto = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    const summary = `To: ${EMAIL}\nFrom: ${payload.name} <${payload.email}>${payload.phone ? `\nPhone: ${payload.phone}` : ""}\nSubject: New project inquiry — ${payload.type}\n\n${payload.message}`;
    copyAndNotify(summary, "Your message");
    window.location.href = mailto;
  };

  // focus-visible (not plain focus) ring: shows for keyboard/tab navigation,
  // stays out of the way for mouse clicks — on top of the existing
  // bottom-border color change, which alone was too subtle a focus signal
  // for keyboard-only users.
  const fieldClass = (hasError?: boolean) =>
    `w-full bg-transparent border-b outline-none py-2.5 text-sm placeholder:text-muted transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-rust/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
      hasError ? "border-danger" : "border-line focus:border-rust"
    }`;

  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-44 border-t border-line overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="relative max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-rustlight font-mono">06 / Contact</span>

        <h2 className="font-display font-extrabold leading-[0.9] mt-6">
          <RevealLine delay={0.05}>
            <span className="block text-[13vw] md:text-[6.4vw]">LET&apos;S BUILD</span>
          </RevealLine>
          <RevealLine delay={0.15}>
            <span className="block text-[13vw] md:text-[6.4vw] text-outline">SOMETHING</span>
          </RevealLine>
          <RevealLine delay={0.25}>
            <span className="block text-[13vw] md:text-[6.4vw] text-rustlight">TOGETHER.</span>
          </RevealLine>
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Quick brief form */}
          <div className="border border-line rounded-2xl p-6 md:p-8 bg-surface/40">
            <p className="text-xs uppercase tracking-[0.2em] text-muted font-mono mb-6">
              Tell me about your project
            </p>
            <div className="space-y-4">
              {/* Honeypot — positioned off-screen (not display:none, which some bots skip),
                  hidden from assistive tech, and excluded from tab order so real users
                  and screen readers never encounter it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="brief-website">Leave this field empty</label>
                <input
                  id="brief-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="brief-name" className="block text-[11px] uppercase tracking-[0.15em] text-muted font-mono mb-1.5">
                  Name <span className="text-rust">*</span>
                </label>
                <input
                  id="brief-name"
                  name="name"
                  maxLength={LIMITS.name}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={errors.name || undefined}
                  aria-describedby={errors.name ? "brief-name-error" : undefined}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((er) => ({ ...er, name: false }));
                  }}
                  placeholder="Jane Doe"
                  className={fieldClass(errors.name)}
                />
                {errors.name && (
                  <p id="brief-name-error" role="alert" className="text-xs text-danger mt-1">
                    Please add your name
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="brief-email" className="block text-[11px] uppercase tracking-[0.15em] text-muted font-mono mb-1.5">
                  Email <span className="text-rust">*</span>
                </label>
                <input
                  id="brief-email"
                  name="email"
                  maxLength={LIMITS.email}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-required="true"
                  aria-invalid={errors.email || undefined}
                  aria-describedby={errors.email ? "brief-email-error" : undefined}
                  value={email}
                  onChange={(e) => {
                    // A real email address never contains whitespace, so any
                    // space here only ever comes from mobile
                    // autocorrect/autofill inserting one (a common real-world
                    // glitch, e.g. "gmail. com") — stripping it silently is
                    // always safe and prevents a false "invalid email" on an
                    // address that's actually correct.
                    setEmail(e.target.value.replace(/\s+/g, ""));
                    if (errors.email) setErrors((er) => ({ ...er, email: false }));
                  }}
                  placeholder="jane@company.com"
                  className={fieldClass(errors.email)}
                />
                {errors.email && (
                  <p id="brief-email-error" role="alert" className="text-xs text-danger mt-1">
                    Please add a valid email
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="brief-phone" className="block text-[11px] uppercase tracking-[0.15em] text-muted font-mono mb-1.5">
                  Phone <span className="normal-case tracking-normal text-muted/70">(optional)</span>
                </label>
                <input
                  id="brief-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={LIMITS.phone}
                  aria-invalid={errors.phone || undefined}
                  aria-describedby={errors.phone ? "brief-phone-error" : undefined}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((er) => ({ ...er, phone: false }));
                  }}
                  placeholder="+91 98765 43210"
                  className={fieldClass(errors.phone)}
                />
                {errors.phone && (
                  <p id="brief-phone-error" role="alert" className="text-xs text-danger mt-1">
                    Please enter a valid phone number, or leave it empty
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="brief-type" className="block text-[11px] uppercase tracking-[0.15em] text-muted font-mono mb-1.5">
                  Project type
                </label>
                <select
                  id="brief-type"
                  name="projectType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-void border-b border-line focus:border-rust outline-none py-2.5 text-sm text-bone transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-rust/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-void">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="brief-message" className="block text-[11px] uppercase tracking-[0.15em] text-muted font-mono mb-1.5">
                  Message <span className="text-rust">*</span>
                </label>
                <textarea
                  id="brief-message"
                  name="message"
                  maxLength={LIMITS.message}
                  aria-required="true"
                  aria-invalid={errors.message || undefined}
                  aria-describedby={errors.message ? "brief-message-error" : undefined}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((er) => ({ ...er, message: false }));
                  }}
                  placeholder="What are you trying to build?"
                  rows={3}
                  className={`${fieldClass(errors.message)} resize-none`}
                />
                {errors.message && (
                  <p id="brief-message-error" role="alert" className="text-xs text-danger mt-1">
                    A few more details would help (10+ characters)
                  </p>
                )}
              </div>

              <MagneticButton
                onClick={handleSendBrief}
                className={`mt-2 inline-flex items-center gap-2 bg-bone text-void font-display font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full cursor-pointer ${
                  sending ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                {sending ? (
                  <>
                    Sending <Loader2 size={15} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Brief <Send size={15} />
                  </>
                )}
              </MagneticButton>

              <p className="text-xs text-muted pt-1">
                {FORMSPREE_ENDPOINT
                  ? "Sends straight to my inbox — I'll reply to the email you enter above. Your details are only used to reply to you."
                  : "Opens your email app pre-filled and copies the message to your clipboard, so nothing gets lost even without a mail app configured."}
              </p>
            </div>
          </div>

          {/* Direct links + illustration */}
          <div className="flex flex-col">
            <MagneticButton
              onClick={handleSayHello}
              className="self-start inline-flex items-center gap-2 bg-bone text-void font-display font-bold text-sm uppercase tracking-widest px-7 py-3.5 rounded-full cursor-pointer"
            >
              Say Hello <ArrowUpRight size={16} />
            </MagneticButton>

            <ContactVisual />

            <div className="grid gap-4 border-t border-line pt-8">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor-hover
                  className="group flex items-center justify-between border-b border-line pb-3 hover:border-rust transition-colors duration-300"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <l.icon size={15} className="text-muted" />
                    {l.value}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted group-hover:text-rustlight group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast.text} show={toast.show} />
    </section>
  );
}
