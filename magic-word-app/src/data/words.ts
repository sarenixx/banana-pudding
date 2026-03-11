export type WordEntry = {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb";
  category: string[];
  difficulty: "easy" | "medium" | "advanced";
  vibe: "emotional" | "psychology" | "creative" | "behavior" | "everyday";
  exampleContext?: string;
};

export const WORDS: WordEntry[] = [
  {
    id: "lethargic",
    word: "Lethargic",
    definition: "A state of sluggishness, fatigue, or lack of energy.",
    partOfSpeech: "adjective",
    category: ["energy", "wellbeing"],
    difficulty: "medium",
    vibe: "everyday",
    exampleContext: "feeling drained even after resting",
  },
  {
    id: "whimsy",
    word: "Whimsy",
    definition: "Playful or fanciful behavior, especially in an appealing way.",
    partOfSpeech: "noun",
    category: ["creativity", "personality"],
    difficulty: "medium",
    vibe: "creative",
    exampleContext: "adding playful charm to something ordinary",
  },
  {
    id: "wistful",
    word: "Wistful",
    definition: "Having a quiet feeling of sadness mixed with longing.",
    partOfSpeech: "adjective",
    category: ["emotion", "reflection"],
    difficulty: "medium",
    vibe: "emotional",
    exampleContext: "missing a past version of life",
  },
  {
    id: "rumination",
    word: "Rumination",
    definition: "The habit of continuously thinking about the same thoughts, often negative ones.",
    partOfSpeech: "noun",
    category: ["psychology", "mental health"],
    difficulty: "advanced",
    vibe: "psychology",
    exampleContext: "overthinking something again and again",
  },
  {
    id: "limerence",
    word: "Limerence",
    definition: "An intense state of romantic infatuation or obsession with another person.",
    partOfSpeech: "noun",
    category: ["psychology", "relationships"],
    difficulty: "advanced",
    vibe: "psychology",
    exampleContext: "thinking about someone constantly",
  },
  {
    id: "ephemeral",
    word: "Ephemeral",
    definition: "Lasting for a very short time.",
    partOfSpeech: "adjective",
    category: ["time", "emotion"],
    difficulty: "advanced",
    vibe: "creative",
    exampleContext: "something beautiful that disappears quickly",
  },
  {
    id: "ebullient",
    word: "Ebullient",
    definition: "Cheerful and full of energy.",
    partOfSpeech: "adjective",
    category: ["emotion", "personality"],
    difficulty: "advanced",
    vibe: "emotional",
    exampleContext: "someone with contagious excitement",
  },
  {
    id: "taciturn",
    word: "Taciturn",
    definition: "Reserved or uncommunicative in speech; saying little.",
    partOfSpeech: "adjective",
    category: ["personality", "behavior"],
    difficulty: "advanced",
    vibe: "behavior",
    exampleContext: "someone who is naturally quiet",
  },
];
