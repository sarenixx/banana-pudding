import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { generateReveal } from "../utils/generateReveal";

const TRIANGLE_TEXT_FONT = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
});

const MAGIC_8_BALL_IMAGE = require("../../assets/images/magicball.png");
const MAGIC_8_BALL_BACK_IMAGE = require("../../assets/images/ball.png");
const BALL_SIZE = 430;
const LIGHT_BLUE = "#93C5FD";

const STARS = [
  { x: 0.11, y: 0.09, size: 2, opacity: 0.35 },
  { x: 0.27, y: 0.14, size: 1.5, opacity: 0.22 },
  { x: 0.71, y: 0.08, size: 2, opacity: 0.28 },
  { x: 0.84, y: 0.2, size: 1.5, opacity: 0.2 },
  { x: 0.08, y: 0.28, size: 1.5, opacity: 0.25 },
  { x: 0.24, y: 0.32, size: 2, opacity: 0.2 },
  { x: 0.9, y: 0.36, size: 2, opacity: 0.23 },
  { x: 0.06, y: 0.44, size: 1.5, opacity: 0.24 },
  { x: 0.18, y: 0.5, size: 1.5, opacity: 0.26 },
  { x: 0.82, y: 0.54, size: 2, opacity: 0.2 },
  { x: 0.09, y: 0.61, size: 2, opacity: 0.32 },
  { x: 0.26, y: 0.66, size: 1.5, opacity: 0.22 },
  { x: 0.88, y: 0.71, size: 1.5, opacity: 0.28 },
  { x: 0.16, y: 0.77, size: 2, opacity: 0.2 },
  { x: 0.31, y: 0.82, size: 1.5, opacity: 0.23 },
  { x: 0.73, y: 0.86, size: 2, opacity: 0.3 },
  { x: 0.56, y: 0.91, size: 1.5, opacity: 0.22 },
  { x: 0.6, y: 0.24, size: 1.5, opacity: 0.24 },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [revealed, setRevealed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [revealData, setRevealData] = useState(() => generateReveal());
  const [loopReady, setLoopReady] = useState(false);

  const shake = useRef(new Animated.Value(0)).current;
  const hoverShakeLoop = useRef<Animated.CompositeAnimation | null>(null);
  const flip = useRef(new Animated.Value(0)).current;
  const backScale = useRef(new Animated.Value(0.52)).current;
  const backOpacity = useRef(new Animated.Value(0)).current;
  const backImageOpacity = useRef(new Animated.Value(1)).current;
  const triangleScale = useRef(new Animated.Value(0.5)).current;
  const headingOpacity = useRef(new Animated.Value(1)).current;
  const sublineOpacity = useRef(new Animated.Value(1)).current;
  const wordWave = useRef(new Animated.Value(0)).current;
  const definitionWave = useRef(new Animated.Value(0)).current;
  const hookWave = useRef(new Animated.Value(0)).current;
  const loopPromptOpacity = useRef(new Animated.Value(0)).current;
  const loopPromptTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loopPromptTimeoutRef.current) {
        clearTimeout(loopPromptTimeoutRef.current);
      }
    };
  }, []);

  const startHoverShake = () => {
    if (revealed || animating || hoverShakeLoop.current) return;

    hoverShakeLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, { toValue: 0.6, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -0.6, duration: 90, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0.45, duration: 80, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 70, useNativeDriver: true }),
      ])
    );

    hoverShakeLoop.current.start();
  };

  const stopHoverShake = () => {
    if (!hoverShakeLoop.current) return;
    hoverShakeLoop.current.stop();
    hoverShakeLoop.current = null;

    Animated.spring(shake, {
      toValue: 0,
      friction: 8,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  const shakeRotate = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-4.5deg", "4.5deg"],
  });

  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-12, 12],
  });

  const ballRotateY = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-105deg"],
  });

  const ballOpacity = flip.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.08],
  });

  const ballScale = flip.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.83],
  });

  const backLift = backOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [34, 0],
  });

  const backRotateX = backOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ["-18deg", "0deg"],
  });

  const headingLift = headingOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-12, 0],
  });

  const sublineDrop = sublineOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  const wordWaveY = wordWave.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const definitionWaveY = definitionWave.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const hookWaveY = hookWave.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  const wordWaveX = wordWave.interpolate({
    inputRange: [0, 1],
    outputRange: [-18, 0],
  });

  const definitionWaveX = definitionWave.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0],
  });

  const hookWaveX = hookWave.interpolate({
    inputRange: [0, 1],
    outputRange: [-14, 0],
  });

  const createWaveAnimation = () =>
    Animated.stagger(220, [
      Animated.timing(wordWave, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(definitionWave, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(hookWave, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

  const scheduleLoopPrompt = () => {
    if (loopPromptTimeoutRef.current) {
      clearTimeout(loopPromptTimeoutRef.current);
    }

    setLoopReady(false);
    loopPromptOpacity.setValue(0);

    loopPromptTimeoutRef.current = setTimeout(() => {
      setLoopReady(true);
      Animated.timing(loopPromptOpacity, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  const resetToInitial = () => {
    if (loopPromptTimeoutRef.current) {
      clearTimeout(loopPromptTimeoutRef.current);
    }

    setLoopReady(false);
    setRevealed(false);
    setAnimating(false);

    shake.setValue(0);
    flip.setValue(0);
    backScale.setValue(0.52);
    backOpacity.setValue(0);
    backImageOpacity.setValue(1);
    triangleScale.setValue(1);
    headingOpacity.setValue(1);
    sublineOpacity.setValue(1);
    wordWave.setValue(0);
    definitionWave.setValue(0);
    hookWave.setValue(0);
    loopPromptOpacity.setValue(0);
  };

  const revealFromBall = () => {
    if (animating) return;

    if (revealed) {
      if (loopReady) {
        resetToInitial();
      }
      return;
    }

    stopHoverShake();

    setAnimating(true);
    setLoopReady(false);
    setRevealData(generateReveal());
    triangleScale.setValue(1);
    backImageOpacity.setValue(1);
    loopPromptOpacity.setValue(0);
    wordWave.setValue(0);
    definitionWave.setValue(0);
    hookWave.setValue(0);

    Animated.sequence([
      Animated.sequence([
        Animated.timing(shake, { toValue: -1, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 1, duration: 80, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -0.7, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 65, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(flip, {
          toValue: 1,
          duration: 320,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backOpacity, {
          toValue: 1,
          delay: 90,
          duration: 190,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(backScale, {
          toValue: 1,
          friction: 7,
          tension: 95,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(250),
      Animated.parallel([
        Animated.timing(headingOpacity, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(sublineOpacity, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(500),
      Animated.parallel([
        Animated.spring(triangleScale, {
          toValue: 7.2,
          friction: 8,
          tension: 110,
          useNativeDriver: true,
        }),
        Animated.timing(backImageOpacity, {
          toValue: 0,
          duration: 180,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(220),
      createWaveAnimation(),
    ]).start(() => {
      setRevealed(true);
      setAnimating(false);
      scheduleLoopPrompt();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.starsLayer}>
        {STARS.map((star, index) => (
          <View
            key={index}
            style={[
              styles.star,
              {
                top: height * star.y,
                left: width * star.x,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              },
            ]}
          />
        ))}
      </View>

      <View pointerEvents="none" style={styles.glowOuter} />

      <Animated.Text style={[styles.headline, { opacity: headingOpacity, transform: [{ translateY: headingLift }] }]}>
        Magic Word Ball
      </Animated.Text>

      <Pressable
        style={styles.scenePressable}
        onPress={revealFromBall}
        onHoverIn={startHoverShake}
        onHoverOut={stopHoverShake}
      >
        <Animated.View
          style={[
            styles.ballLayer,
            {
              opacity: ballOpacity,
              transform: [
                { perspective: 1000 },
                { translateX },
                { rotate: shakeRotate },
                { rotateY: ballRotateY },
                { scale: ballScale },
              ],
            },
          ]}
        >
          <Image source={MAGIC_8_BALL_IMAGE} style={styles.ballImage} resizeMode="contain" />
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.backImageWrap,
            {
              opacity: backOpacity,
              transform: [{ translateY: backLift }, { rotateX: backRotateX }, { scale: backScale }],
            },
          ]}
        >
          <Animated.Image
            source={MAGIC_8_BALL_BACK_IMAGE}
            style={[styles.backImage, { opacity: backImageOpacity }]}
            resizeMode="contain"
          />

          <View style={styles.triangleOverlayWrap}>
            <Animated.View style={{ transform: [{ scale: triangleScale }] }}>
              <View style={styles.blueTriangle} />
            </Animated.View>

            <Animated.View
              style={[
                styles.triangleTextLayer,
                {
                  opacity: wordWave,
                  transform: [{ translateY: wordWaveY }, { translateX: wordWaveX }],
                },
              ]}
            >
              <Text style={styles.triangleWord}>{revealData.word}</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.triangleTextLayerDefinition,
                {
                  opacity: definitionWave,
                  transform: [{ translateY: definitionWaveY }, { translateX: definitionWaveX }],
                },
              ]}
            >
              <Text style={styles.triangleDefinition}>{revealData.definition}</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.triangleTextLayerHook,
                {
                  opacity: hookWave,
                  transform: [{ translateY: hookWaveY }, { translateX: hookWaveX }],
                },
              ]}
            >
              <Text style={styles.triangleHook}>{revealData.hook}</Text>
            </Animated.View>
          </View>
        </Animated.View>
      </Pressable>

      <Animated.View
        pointerEvents={loopReady ? "auto" : "none"}
        style={[styles.loopPromptWrap, { opacity: loopPromptOpacity }]}
      >
        <Pressable onPress={resetToInitial}>
          <Text style={styles.loopPromptText}>click for a new word</Text>
        </Pressable>
      </Animated.View>

      <Animated.Text style={[styles.subline, { opacity: sublineOpacity, transform: [{ translateY: sublineDrop }] }]}>
        Click to reveal a smarter world
      </Animated.Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08132a",
    alignItems: "center",
    justifyContent: "center",
  },
  starsLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#d7e5ff",
  },
  glowOuter: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(59,130,246,0.06)",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.55,
    shadowRadius: 170,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  scenePressable: {
    width: 500,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  ballLayer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    color: LIGHT_BLUE,
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 4,
    fontFamily: TRIANGLE_TEXT_FONT,
    textShadowColor: "rgba(147,197,253,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  ballImage: {
    width: BALL_SIZE,
    height: BALL_SIZE,
  },
  backImageWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  backImage: {
    width: BALL_SIZE,
    height: BALL_SIZE,
  },
  triangleOverlayWrap: {
    position: "absolute",
    width: 122,
    height: 104,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  blueTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 44,
    borderRightWidth: 44,
    borderTopWidth: 78,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#1844ad",
    transform: [{ rotate: "180deg" }],
  },
  triangleTextLayer: {
    position: "absolute",
    width: 250,
    top: 22,
    alignItems: "center",
  },
  triangleWord: {
    color: LIGHT_BLUE,
    fontSize: 36,
    fontWeight: "600",
    letterSpacing: 0.2,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: TRIANGLE_TEXT_FONT,
    textShadowColor: "rgba(147,197,253,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  triangleTextLayerDefinition: {
    position: "absolute",
    width: 270,
    top: 74,
    alignItems: "center",
  },
  triangleDefinition: {
    color: LIGHT_BLUE,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: TRIANGLE_TEXT_FONT,
    textShadowColor: "rgba(147,197,253,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  triangleTextLayerHook: {
    position: "absolute",
    width: 280,
    top: 128,
    alignItems: "center",
  },
  triangleHook: {
    color: LIGHT_BLUE,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: TRIANGLE_TEXT_FONT,
    textShadowColor: "rgba(147,197,253,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  subline: {
    color: LIGHT_BLUE,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginTop: -10,
    fontFamily: TRIANGLE_TEXT_FONT,
    textShadowColor: "rgba(147,197,253,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  loopPromptWrap: {
    position: "absolute",
    bottom: 86,
    alignItems: "center",
    justifyContent: "center",
  },
  loopPromptText: {
    color: LIGHT_BLUE,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontFamily: TRIANGLE_TEXT_FONT,
    textShadowColor: "rgba(147,197,253,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    textTransform: "lowercase",
  },
});
