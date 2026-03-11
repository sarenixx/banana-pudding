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
    template: "You might not know the word {word}, but it explains this feeling perfectly.",
  },
  {
    id: "knowledge-1",
    type: "knowledge",
    template: "There's actually a word for this experience: {word}.",
  },
  {
    id: "knowledge-2",
    type: "knowledge",
    template: "Most people experience this, but very few know the word {word}.",
  },
  {
    id: "problem-1",
    type: "problem",
    template: "If you've ever felt this before, the word for it is {word}.",
  },
  {
    id: "knowledge-3",
    type: "knowledge",
    template: "Psychology actually has a word for this feeling: {word}.",
  },
  {
    id: "curiosity-2",
    type: "curiosity",
    template: "Here's a word you probably don't use enough: {word}.",
  },
  {
    id: "identity-1",
    type: "identity",
    template: "If you're the type of person who feels this deeply, you should know the word {word}.",
  },
  {
    id: "confession-1",
    type: "confession",
    template: "I just learned the word {word}, and honestly it explains a lot.",
  },
  {
    id: "curiosity-3",
    type: "curiosity",
    template: "You've probably experienced this before, but the word for it is {word}.",
  },
  {
    id: "knowledge-4",
    type: "knowledge",
    template: "This might be the most underrated word in the English language: {word}.",
  },
  {
    id: "problem-2",
    type: "problem",
    template: "If you {context}, the word for it is {word}.",
  },
];
