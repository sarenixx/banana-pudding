export type HookTemplate = {
  id: string;
  type: "curiosity" | "problem" | "identity" | "confession" | "knowledge";
  compatibleVibes?: Array<
    "emotional" | "psychology" | "creative" | "behavior" | "everyday"
  >;
  template: string;
};

export const HOOK_TEMPLATES: HookTemplate[] = [
  {
    id: "curiosity-1",
    type: "curiosity",
    compatibleVibes: ["creative", "everyday", "emotional"],
    template:
      "You might not know the word {word}, but it explains this feeling perfectly.",
  },
  {
    id: "knowledge-1",
    type: "knowledge",
    compatibleVibes: ["psychology", "emotional", "behavior"],
    template:
      "There’s a word called {word} for this experience, and most people have never heard it.",
  },
  {
    id: "problem-1",
    type: "problem",
    compatibleVibes: ["psychology", "everyday", "behavior"],
    template:
      "If you’ve been feeling this way lately, the word {word} might explain why.",
  },
  {
    id: "identity-1",
    type: "identity",
    compatibleVibes: ["emotional", "behavior", "creative"],
    template:
      "If you’re the kind of person who feels things deeply, you should know the word {word}.",
  },
  {
    id: "confession-1",
    type: "confession",
    compatibleVibes: ["emotional", "psychology", "creative"],
    template:
      "I just learned the word {word}, and honestly it describes my life a little too well.",
  },
];
