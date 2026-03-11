import { HOOK_TEMPLATES } from "../data/hooks";
import { WORDS } from "../data/words";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getCompatibleHooks(vibe: string) {
  const compatible = HOOK_TEMPLATES.filter(
    (hook) => !hook.compatibleVibes || hook.compatibleVibes.includes(vibe as any)
  );

  return compatible.length > 0 ? compatible : HOOK_TEMPLATES;
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

function selectHookTemplate(vibe: string, hasContext: boolean) {
  const compatibleHooks = getCompatibleHooks(vibe);

  if (hasContext) {
    return randomItem(compatibleHooks);
  }

  const hooksWithoutContext = compatibleHooks.filter(
    (hook) => !hook.template.includes("{context}")
  );

  return randomItem(hooksWithoutContext.length > 0 ? hooksWithoutContext : compatibleHooks);
}

export function generateReveal() {
  const wordEntry = nextWordEntry();
  const context = wordEntry.exampleContext ?? "feel this way";
  const hookTemplate = selectHookTemplate(wordEntry.vibe, Boolean(wordEntry.exampleContext));

  const hook = hookTemplate.template
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
    hookType: hookTemplate.type,
  };
}
