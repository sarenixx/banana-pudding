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

export function generateReveal() {
  const wordEntry = randomItem(WORDS);
  const hookTemplate = randomItem(getCompatibleHooks(wordEntry.vibe));

  const hook = hookTemplate.template.replace(
    "{word}",
    wordEntry.word.toLowerCase()
  );

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
