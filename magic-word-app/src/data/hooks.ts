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
    compatibleVibes: ["creative", "everyday", "emotional", "psychology"],
    template: "Tiny magic word: {word}. It explains this feeling way too well.",
  },
  {
    id: "knowledge-1",
    type: "knowledge",
    compatibleVibes: ["psychology", "emotional", "behavior", "everyday"],
    template: "Real word, not made up: {word}. Most people miss this one.",
  },
  {
    id: "problem-1",
    type: "problem",
    compatibleVibes: ["psychology", "everyday", "behavior"],
    template: "If this keeps happening, {word} might be the missing label.",
  },
  {
    id: "identity-1",
    type: "identity",
    compatibleVibes: ["emotional", "behavior", "creative", "psychology"],
    template: "If this sounds like you, keep the word {word} in your pocket.",
  },
  {
    id: "confession-1",
    type: "confession",
    compatibleVibes: ["emotional", "psychology", "creative"],
    template: "I learned {word} and immediately felt called out.",
  },
  {
    id: "curiosity-2",
    type: "curiosity",
    compatibleVibes: ["everyday", "creative", "behavior"],
    template: "This whole vibe has a name: {word}.",
  },
  {
    id: "knowledge-2",
    type: "knowledge",
    compatibleVibes: ["psychology", "behavior", "everyday"],
    template: "There is a precise word for this pattern: {word}.",
  },
  {
    id: "confession-2",
    type: "confession",
    compatibleVibes: ["emotional", "everyday", "creative"],
    template: "Did not expect one word to read me this hard: {word}.",
  },
];
