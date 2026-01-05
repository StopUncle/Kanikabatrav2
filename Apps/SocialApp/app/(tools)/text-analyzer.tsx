// Text Game Analyzer Screen
// Analyze conversation screenshots for power dynamics

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Scan,
  MessageSquare,
  History,
  Sparkles,
  Lock,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { PremiumHeader } from '../../components/ui';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  PowerScoreCard,
  ScreenshotUploader,
  RecommendationCard,
  FlagCard,
} from '../../components/textAnalyzer';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
  gradients,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useAuthStore, useHasAccess } from '../../stores/authStore';
import { useTextAnalysisStore } from '../../stores/textAnalysisStore';
import { textGameAnalyzerService, FullAnalysisResult } from '../../services/textGameAnalyzerService';
import { ImageSource, OCRResult } from '../../services/ocrService';

type InputMode = 'screenshot' | 'text';

export default function TextAnalyzerScreen() {
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [ocrText, setOcrText] = useState<string>('');

  const tier = useAuthStore((state) => state.user?.subscription_tier ?? 'free');
  const hasPremiumAccess = useHasAccess('premium');

  const {
    currentAnalysis,
    isAnalyzing,
    error,
    inputText,
    yourMessages,
    theirMessages,
    setInputText,
    setYourMessages,
    setTheirMessages,
    setCurrentAnalysis,
    clearCurrentAnalysis,
    setIsAnalyzing,
    setError,
    addToHistory,
    clearInputs,
  } = useTextAnalysisStore();

  const handleImageSelected = useCallback((source: ImageSource) => {
    // Image selected, waiting for OCR
  }, []);

  const handleOcrError = useCallback((errorMsg: string) => {
    setError(errorMsg);
    Alert.alert('OCR Error', errorMsg);
  }, [setError]);

  const runAnalysis = useCallback(async (rawText?: string) => {
    const textToAnalyze = rawText || inputText;
    const hasTextInput = textToAnalyze.trim() || yourMessages.trim() || theirMessages.trim();

    if (!hasTextInput) {
      Alert.alert('No Input', 'Please enter conversation text or upload a screenshot.');
      return;
    }

    haptics.medium();
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await textGameAnalyzerService.analyze({
        text: textToAnalyze,
        yourMessages: yourMessages.trim() || undefined,
        theirMessages: theirMessages.trim() || undefined,
      });

      setCurrentAnalysis(result);
      addToHistory(result, tier);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
      Alert.alert('Analysis Error', message);
    } finally {
      setIsAnalyzing(false);
    }
  }, [inputText, yourMessages, theirMessages, tier, setIsAnalyzing, setError, setCurrentAnalysis, addToHistory]);

  const handleTextExtracted = useCallback((result: OCRResult) => {
    const extractedText = result.text;
    setOcrText(extractedText);
    setInputText(extractedText);
    void runAnalysis(extractedText);
  }, [runAnalysis, setInputText]);

  const handleAnalyze = useCallback(() => {
    void runAnalysis();
  }, [runAnalysis]);

  const handleClear = () => {
    haptics.light();
    clearInputs();
    clearCurrentAnalysis();
    setOcrText('');
  };

  const handleViewHistory = () => {
    haptics.light();
    router.push('/(tools)/text-analyzer-history');
  };

  return (
    <View style={styles.container}>
      <PremiumHeader
        title="Text Analyzer"
        titleIcon={Scan}
        showBackButton
        backRoute="/(tabs)"
        actions={[
          { icon: History, onPress: handleViewHistory, accessibilityLabel: 'View history' },
        ]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Input Mode Toggle */}
          <View style={styles.modeToggle}>
            <Button
              variant={inputMode === 'text' ? 'primary' : 'outline'}
              size="sm"
              icon={<MessageSquare size={16} color={inputMode === 'text' ? colors.background : colors.accent} />}
              onPress={() => setInputMode('text')}
              style={styles.modeButton}
            >
              Type Text
            </Button>
            <Button
              variant={inputMode === 'screenshot' ? 'primary' : 'outline'}
              size="sm"
              icon={hasPremiumAccess ? <Scan size={16} color={inputMode === 'screenshot' ? colors.background : colors.accent} /> : <Lock size={16} color={colors.secondary} />}
              onPress={() => setInputMode('screenshot')}
              style={styles.modeButton}
              disabled={!hasPremiumAccess}
            >
              Screenshot {!hasPremiumAccess && '(Premium)'}
            </Button>
          </View>

          {/* Input Section */}
          {inputMode === 'screenshot' ? (
            <ScreenshotUploader
              onImageSelected={handleImageSelected}
              onTextExtracted={handleTextExtracted}
              onError={handleOcrError}
              disabled={isAnalyzing}
            />
          ) : (
            <GlassCard variant="medium" style={styles.inputCard}>
              <Text style={styles.inputLabel}>Conversation Text</Text>
              <Text style={styles.inputHint}>
                Paste your conversation. Prefix messages with "You:" or "Him/Her:" for best results.
              </Text>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Example:&#10;You: Hey, how was your day?&#10;Him: Good. Busy.&#10;You: Want to hang out this weekend?&#10;Him: Maybe, I'll let you know"
                placeholderTextColor={colors.tertiary}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />

              {/* Separated inputs for power dynamics */}
              <View style={styles.separatedInputs}>
                <View style={styles.separatedInput}>
                  <Text style={styles.separatedLabel}>Your Messages (optional)</Text>
                  <TextInput
                    style={styles.separatedTextInput}
                    value={yourMessages}
                    onChangeText={setYourMessages}
                    placeholder="Paste only YOUR messages here for more accurate analysis"
                    placeholderTextColor={colors.tertiary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <View style={styles.separatedInput}>
                  <Text style={styles.separatedLabel}>Their Messages (optional)</Text>
                  <TextInput
                    style={styles.separatedTextInput}
                    value={theirMessages}
                    onChangeText={setTheirMessages}
                    placeholder="Paste only THEIR messages here"
                    placeholderTextColor={colors.tertiary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </GlassCard>
          )}

          {/* OCR Result Preview */}
          {ocrText && inputMode === 'screenshot' && (
            <GlassCard variant="medium" style={styles.ocrPreview}>
              <Text style={styles.ocrLabel}>Extracted Text:</Text>
              <Text style={styles.ocrText} numberOfLines={6}>{ocrText}</Text>
            </GlassCard>
          )}

          {/* Analyze Button */}
          <View style={styles.buttonRow}>
            <Button
              variant="primary"
              size="lg"
              icon={<Sparkles size={20} color={colors.background} />}
              onPress={handleAnalyze}
              loading={isAnalyzing}
              disabled={isAnalyzing}
              style={styles.analyzeButton}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Power Dynamics'}
            </Button>

            {(inputText || yourMessages || theirMessages || ocrText) && (
              <Button
                variant="outline"
                size="lg"
                onPress={handleClear}
                style={styles.clearButton}
              >
                Clear
              </Button>
            )}
          </View>

          {/* Error Display */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Analysis Results */}
          {currentAnalysis && (
            <View style={styles.results}>
              <LinearGradient
                colors={gradients.aurora}
                style={styles.resultsDivider}
              />

              <Text style={styles.resultsTitle}>Analysis Results</Text>

              {/* Summary */}
              <GlassCard variant="gold" glow style={styles.summaryCard}>
                <Text style={styles.summaryText}>{currentAnalysis.summary}</Text>
              </GlassCard>

              {/* Power Score */}
              <PowerScoreCard powerScore={currentAnalysis.powerScore} />

              {/* Flags */}
              <FlagCard
                redFlags={currentAnalysis.redFlags}
                greenFlags={currentAnalysis.greenFlags}
              />

              {/* Recommendations */}
              <RecommendationCard recommendations={currentAnalysis.recommendations} />

              {/* Conversation Stats */}
              {currentAnalysis.conversationStats && (
                <GlassCard variant="medium" style={styles.statsCard}>
                  <Text style={styles.statsTitle}>Conversation Stats</Text>
                  <View style={styles.statsGrid}>
                    <StatItem
                      label="Your Messages"
                      value={currentAnalysis.conversationStats.messageCount.you}
                    />
                    <StatItem
                      label="Their Messages"
                      value={currentAnalysis.conversationStats.messageCount.them}
                    />
                    <StatItem
                      label="Your Questions"
                      value={currentAnalysis.conversationStats.questionCount.you}
                    />
                    <StatItem
                      label="Their Questions"
                      value={currentAnalysis.conversationStats.questionCount.them}
                    />
                  </View>
                </GlassCard>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  modeToggle: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  modeButton: {
    flex: 1,
  },
  inputCard: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  inputHint: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.sm,
    color: colors.primary,
    minHeight: 150,
    borderWidth: 1,
    borderColor: colors.border,
  },
  separatedInputs: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  separatedInput: {},
  separatedLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  separatedTextInput: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    fontSize: typography.sm,
    color: colors.primary,
    minHeight: 80,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ocrPreview: {
    marginBottom: spacing.md,
  },
  ocrLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  ocrText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  analyzeButton: {
    flex: 1,
  },
  clearButton: {
    minWidth: 80,
  },
  errorContainer: {
    backgroundColor: colors.errorMuted,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sm,
  },
  results: {
    marginTop: spacing.md,
  },
  resultsDivider: {
    height: 2,
    borderRadius: 1,
    marginBottom: spacing.lg,
  },
  resultsTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  summaryCard: {
    marginBottom: spacing.md,
  },
  summaryText: {
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: 24,
  },
  statsCard: {
    marginBottom: spacing.md,
  },
  statsTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
