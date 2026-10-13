export interface Project {
  index: string;
  name: string;
  description: string;
  tech: string[];
  tag: string;
  variant: "dashboard" | "voice" | "vision" | "ecommerce" | "table" | "cards" | "form";
  /**
   * Optional REAL screenshot, e.g. "/images/projects/gymflow.png". When set it
   * replaces the built-in illustrated mockup automatically — drop the file in
   * public/images/projects/ and set this path, no component changes needed.
   */
  image?: string;
  /** Optional live URL / repo URL. When set, the card's CTAs become real links. */
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    index: "01",
    name: "GymFlow AI",
    tag: "SaaS · AI",
    variant: "dashboard",
    description: "AI-powered gym management SaaS concept — member tracking, class scheduling and automated engagement built for real operators, not a demo dashboard.",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "AI"],
  },
  {
    index: "02",
    name: "LEVI AI",
    tag: "Voice · AI",
    variant: "voice",
    description: "A voice-first AI assistant — natural conversation as the primary interface, built around real-time speech understanding rather than typed prompts.",
    tech: ["Python", "AI", "Voice", "Whisper", "APIs"],
  },
  {
    index: "03",
    name: "Sign Language Recognition",
    tag: "Computer Vision",
    variant: "vision",
    description: "Real-time hand-gesture and sign-language recognition using computer vision — translating motion into meaning, frame by frame.",
    tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "Flask"],
  },
  {
    index: "04",
    name: "Healthcare Management App",
    tag: "Full Stack",
    variant: "table",
    description: "Doctor-patient management app to maintain patient records, track medical history and previously prescribed medicines, and manage appointments. The app also sends appointment notifications to patients, helping doctors monitor patient history and manage appointments efficiently.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
  },
];
