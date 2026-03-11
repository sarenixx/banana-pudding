import { HOOK_TEMPLATES } from "../data/hooks";
import { WORDS } from "../data/words";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

let shuffledWordPool = shuffleItems(WORDS);

function nextWordEntry() {
  if (shuffledWordPool.length === 0) {
    shuffledWordPool = shuffleItems(WORDS);
  }

  const wordEntry = shuffledWordPool.pop();
  return wordEntry ?? randomItem(WORDS);
}

function selectHookTemplate(hasContext: boolean) {
  if (hasContext) {
    return randomItem(HOOK_TEMPLATES);
  }

  const hooksWithoutContext = HOOK_TEMPLATES.filter(
    (hookTemplate) => !hookTemplate.includes("{context}")
  );

  return randomItem(hooksWithoutContext.length > 0 ? hooksWithoutContext : HOOK_TEMPLATES);
}

export function generateReveal() {
  const wordEntry = nextWordEntry();
  const context = wordEntry.exampleContext ?? "feel this way";
  const hookTemplate = selectHookTemplate(Boolean(wordEntry.exampleContext));

  const hook = hookTemplate
    .replaceAll("{word}", wordEntry.word.toLowerCase())
    .replaceAll("{context}", context);

  return {
    id: wordEntry.id,
    word: wordEntry.word,
    definition: wordEntry.definition,
    partOfSpeech: wordEntry.partOfSpeech,
    category: wordEntry.category,
    difficulty: wordEntry.difficulty,
    vibe: wordEntry.vibe,
    exampleContext: wordEntry.exampleContext,
    hook,
    hookType: "template",
  };
}
