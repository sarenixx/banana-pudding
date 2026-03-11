import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const WORDS = [
  {
    word: "Lethargic",
    definition: "A state of sluggishness, fatigue, or lack of energy.",
  },
  {
    word: "Whimsy",
    definition: "Playful or fanciful behavior, especially in an appealing way.",
  },
  {
    word: "Mellifluous",
    definition: "Sweet or smooth sounding; pleasant to hear.",
  },
  {
    word: "Ebullient",
    definition: "Cheerful and full of energy.",
  },
  {
    word: "Taciturn",
    definition: "Reserved or uncommunicative in speech.",
  },
];

const HOOKS = [
  "You might not know the word {word}, but it perfectly explains this feeling.",
  "There’s a word called {word}, and once you learn it, you’ll notice it everywhere.",
  "Most people don’t use the word {word}, but it describes something surprisingly common.",
  "If you’ve ever felt this way, the word {word} might be exactly what you're looking for.",
];

function generateWord() {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const hook = HOOKS[Math.floor(Math.random() * HOOKS.length)].replace(
    "{word}",
    word.word.toLowerCase()
  );

  return {
    word: word.word,
    definition: word.definition,
    hook,
  };
}

export default function HomeScreen() {
  const [reveal, setReveal] = useState(generateWord());

  const onShake = () => {
    setReveal(generateWord());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Magic Word Ball</Text>
      <Text style={styles.subtitle}>Shake for a smarter word</Text>

      <View style={styles.ball}>
        <Text style={styles.ballText}>8</Text>
      </View>

      <Pressable style={styles.button} onPress={onShake}>
        <Text style={styles.buttonText}>Shake</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.label}>Word</Text>
        <Text style={styles.word}>{reveal.word}</Text>

        <Text style={styles.label}>Definition</Text>
        <Text style={styles.body}>{reveal.definition}</Text>

        <Text style={styles.label}>Hook Example</Text>
        <Text style={styles.body}>{reveal.hook}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9CA3AF",
    marginBottom: 24,
  },
  ball: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  ballText: {
    color: "white",
    fontSize: 60,
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    width: "100%",
    backgroundColor: "#1F2937",
    padding: 20,
    borderRadius: 16,
  },
  label: {
    color: "#93C5FD",
    marginTop: 10,
    fontWeight: "700",
  },
  word: {
    color: "white",
    fontSize: 26,
    fontWeight: "800",
  },
  body: {
    color: "#E5E7EB",
    marginTop: 4,
  },
});
