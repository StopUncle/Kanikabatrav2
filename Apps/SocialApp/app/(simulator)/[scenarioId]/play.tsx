// Scenario Play Screen - Main gameplay
import React, { useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { colors } from '../../../lib/theme';
import { useSimulatorStore } from '../../../stores/simulatorStore';
import { SimulatorScene, TacticSimulatorScene } from '../../../components/simulator';
import { isTacticScene } from '../../../content/simulator/scenarios/dating/types';
import { characterProfiles } from '../../../content/simulator/scenarios/dating/level-1-university/metadata';

export default function ScenarioPlayScreen() {
  const router = useRouter();
  const { scenarioId } = useLocalSearchParams<{ scenarioId: string }>();

  const { activeScenario, exitScenario } = useSimulatorStore();

  // Handle back button press
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleExitConfirm();
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  // Guard - redirect if no active scenario (with delay to allow state to settle)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!activeScenario) {
        router.replace(`/(simulator)/${scenarioId}`);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [activeScenario, scenarioId, router]);

  const handleExitConfirm = () => {
    Alert.alert(
      'Exit Scenario?',
      'Your progress will be saved. You can continue later.',
      [
        { text: 'Continue Playing', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            router.replace('/(simulator)');
          },
        },
      ]
    );
  };

  const handleComplete = () => {
    // Navigate to outcome screen
    router.replace(`/(simulator)/${scenarioId}/outcome`);
  };

  const handleExit = () => {
    handleExitConfirm();
  };

  // Check if current scene uses tactic UI
  const { currentScene } = useSimulatorStore();
  const useTacticUI = useMemo(() => {
    if (!currentScene) return false;
    return isTacticScene(currentScene);
  }, [currentScene]);

  if (!activeScenario) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  // Render appropriate scene component based on scene type
  return (
    <View style={styles.container}>
      {useTacticUI ? (
        <TacticSimulatorScene
          onComplete={handleComplete}
          onExit={handleExit}
          characterProfiles={characterProfiles}
        />
      ) : (
        <SimulatorScene onComplete={handleComplete} onExit={handleExit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
