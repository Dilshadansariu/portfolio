import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line text-xs text-muted">
      <span className="font-display uppercase tracking-[0.2em]">Dilshad Ansari &copy; 2026</span>
      <div className="flex items-center gap-5">
        <a
          href="mailto:dilshadansariu@gmail.com"
          aria-label="Email Dilshad Ansari"
          data-cursor-hover
          className="hover:text-bone transition-colors"
        >
          <Mail size={16} />
        </a>
        <a
          href="https://github.com/Dilshadansariu"
          target="_blank"
          rel="noreferrer"
          aria-label="Dilshad Ansari on GitHub"
          data-cursor-hover
          className="hover:text-bone transition-colors"
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/dilshad-ansari-b7455224a/"
          target="_blank"
          rel="noreferrer"
          aria-label="Dilshad Ansari on LinkedIn"
          data-cursor-hover
          className="hover:text-bone transition-colors"
        >
          <Linkedin size={16} />
        </a>
      </div>
    </footer>
  );
}
