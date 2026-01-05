import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Scan,
  AlertTriangle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Info,
  Trash2,
  Sparkles,
  Zap,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import { PremiumHeader } from '../../components/ui';
import { haptics } from '../../lib/haptics';
import { useAuthStore } from '../../stores/authStore';
import {
  manipulationScannerService,
  ScanResult,
  DetectedTactic,
} from '../../services/manipulationScannerService';

export default function ManipulationScannerScreen() {
  const router = useRouter();
  const { tier } = useAuthStore();
  const inputRef = useRef<TextInput>(null);

  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [expandedTactic, setExpandedTactic] = useState<string | null>(null);
  const [usedAI, setUsedAI] = useState(false);

  const isPremium = tier === 'premium' || tier === 'vip';

  const handleScan = async () => {
    if (!inputText.trim()) return;

    haptics.medium();
    setIsScanning(true);
    setResult(null);
    setUsedAI(false);

    try {
      let scanResult: ScanResult;

      if (isPremium) {
        // Premium/VIP: Use AI-powered analysis
        scanResult = await manipulationScannerService.analyzeWithAI(inputText);
        setUsedAI(true);
      } else {
        // Free tier: Use keyword-based analysis
        await new Promise((resolve) => setTimeout(resolve, 500));
        scanResult = manipulationScannerService.scanText(inputText);
      }

      setResult(scanResult);
      haptics.success();
    } catch (error) {
      console.error('Scan error:', error);
      // Fallback to basic scan on error
      const fallbackResult = manipulationScannerService.scanText(inputText);
      setResult(fallbackResult);
      haptics.error();
    } finally {
      setIsScanning(false);
    }
  };

  const handleClear = () => {
    haptics.light();
    setInputText('');
    setResult(null);
    setExpandedTactic(null);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical':
        return '#E54545';
      case 'high':
        return '#FF5722';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return colors.tertiary;
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical':
        return <ShieldAlert size={24} color="#E54545" />;
      case 'high':
        return <AlertTriangle size={24} color="#FF5722" />;
      case 'medium':
        return <Shield size={24} color="#FF9800" />;
      case 'low':
        return <ShieldCheck size={24} color="#4CAF50" />;
      default:
        return <Shield size={24} color={colors.tertiary} />;
    }
  };

  const toggleTactic = (tacticId: string) => {
    haptics.light();
    setExpandedTactic(expandedTactic === tacticId ? null : tacticId);
  };

  // Build actions array conditionally
  const headerActions = inputText.length > 0
    ? [{ icon: Trash2, onPress: handleClear, accessibilityLabel: 'Clear text' }]
    : undefined;

  return (
    <View style={styles.container}>
      <PremiumHeader
        title="Manipulation Scanner"
        titleIcon={Scan}
        showBackButton
        backRoute="/(tabs)"
        actions={headerActions}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Description */}
          <View style={styles.descriptionCard}>
            <Info size={18} color={colors.accent} />
            <Text style={styles.descriptionText}>
              Paste a message, email, or conversation to analyze it for psychological
              manipulation tactics.
            </Text>
          </View>

          {/* Upgrade Prompt for Free Users */}
          {!isPremium && (
            <Pressable
              style={styles.upgradePrompt}
              onPress={() => {
                haptics.medium();
                router.push('/(settings)/subscription');
              }}
            >
              <View style={styles.upgradeHeader}>
                <Sparkles size={18} color={colors.accent} />
                <Text style={styles.upgradeTitle}>Upgrade for AI Analysis</Text>
              </View>
              <Text style={styles.upgradeDesc}>
                Get deep, context-aware analysis powered by AI. Premium members receive
                nuanced detection that catches subtle manipulation tactics.
              </Text>
            </Pressable>
          )}

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Paste text to analyze..."
              placeholderTextColor={colors.tertiary}
              multiline
              textAlignVertical="top"
              value={inputText}
              onChangeText={setInputText}
            />
            <Text style={styles.charCount}>{inputText.length} characters</Text>
          </View>

          {/* Scan Button */}
          <Pressable
            style={({ pressed }) => [
              styles.scanButton,
              (!inputText.trim() || isScanning) && styles.scanButtonDisabled,
              pressed && inputText.trim() && !isScanning && styles.scanButtonPressed,
            ]}
            onPress={handleScan}
            disabled={!inputText.trim() || isScanning}
          >
            {isScanning ? (
              <>
                <ActivityIndicator color={colors.background} size="small" />
                <Text style={styles.scanButtonText}>
                  {isPremium ? 'Analyzing with AI...' : 'Scanning...'}
                </Text>
              </>
            ) : (
              <>
                {isPremium ? (
                  <Sparkles size={20} color={colors.background} />
                ) : (
                  <Scan size={20} color={colors.background} />
                )}
                <Text style={styles.scanButtonText}>
                  {isPremium ? 'Analyze with AI' : 'Basic Scan'}
                </Text>
              </>
            )}
          </Pressable>

          {/* Results */}
          {result && (
            <View style={styles.resultsContainer}>
              {/* Analysis Type Badge */}
              <View style={styles.analysisBadge}>
                {usedAI ? (
                  <>
                    <Sparkles size={14} color={colors.accent} />
                    <Text style={styles.analysisBadgeText}>AI-Powered Analysis</Text>
                  </>
                ) : (
                  <>
                    <Zap size={14} color={colors.tertiary} />
                    <Text style={[styles.analysisBadgeText, styles.basicBadgeText]}>
                      Basic Analysis
                    </Text>
                  </>
                )}
              </View>

              {/* Risk Overview */}
              <View
                style={[
                  styles.riskCard,
                  { borderLeftColor: getRiskColor(result.overallRisk) },
                ]}
              >
                <View style={styles.riskHeader}>
                  {getRiskIcon(result.overallRisk)}
                  <View style={styles.riskInfo}>
                    <Text style={styles.riskLabel}>Risk Level</Text>
                    <Text
                      style={[styles.riskLevel, { color: getRiskColor(result.overallRisk) }]}
                    >
                      {result.overallRisk.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.riskScoreContainer}>
                    <Text style={styles.riskScore}>{result.riskScore}</Text>
                    <Text style={styles.riskScoreLabel}>/100</Text>
                  </View>
                </View>
                <Text style={styles.summary}>{result.summary}</Text>
                <View style={styles.recommendationBox}>
                  <Text style={styles.recommendationLabel}>Recommendation</Text>
                  <Text style={styles.recommendation}>{result.recommendation}</Text>
                </View>
              </View>

              {/* Detected Tactics */}
              {result.detectedTactics.length > 0 && (
                <View style={styles.tacticsSection}>
                  <Text style={styles.sectionTitle}>
                    Detected Tactics ({result.detectedTactics.length})
                  </Text>

                  {result.detectedTactics.map((dt) => (
                    <Pressable
                      key={dt.tactic.id}
                      style={[
                        styles.tacticCard,
                        expandedTactic === dt.tactic.id && styles.tacticCardExpanded,
                      ]}
                      onPress={() => toggleTactic(dt.tactic.id)}
                    >
                      <View style={styles.tacticHeader}>
                        <View
                          style={[
                            styles.tacticIndicator,
                            { backgroundColor: dt.tactic.color },
                          ]}
                        />
                        <View style={styles.tacticInfo}>
                          <Text style={styles.tacticName}>{dt.tactic.name}</Text>
                          <Text style={styles.tacticCategory}>
                            {dt.tactic.category.charAt(0).toUpperCase() +
                              dt.tactic.category.slice(1)}{' '}
                            Manipulation
                          </Text>
                        </View>
                        <View style={styles.confidenceContainer}>
                          <Text
                            style={[
                              styles.confidence,
                              { color: dt.confidence > 70 ? '#E54545' : colors.accent },
                            ]}
                          >
                            {dt.confidence}%
                          </Text>
                          {expandedTactic === dt.tactic.id ? (
                            <ChevronUp size={16} color={colors.tertiary} />
                          ) : (
                            <ChevronDown size={16} color={colors.tertiary} />
                          )}
                        </View>
                      </View>

                      {expandedTactic === dt.tactic.id && (
                        <View style={styles.tacticDetails}>
                          <Text style={styles.tacticDescription}>
                            {dt.tactic.description}
                          </Text>

                          {dt.examples.length > 0 && (
                            <View style={styles.examplesContainer}>
                              <Text style={styles.examplesLabel}>Found in text:</Text>
                              {dt.examples.map((example, idx) => (
                                <View key={idx} style={styles.exampleBox}>
                                  <Text style={styles.exampleText}>"{example}"</Text>
                                </View>
                              ))}
                            </View>
                          )}

                          <View style={styles.indicatorsContainer}>
                            <Text style={styles.indicatorsLabel}>
                              Matched patterns ({dt.matchedIndicators.length}):
                            </Text>
                            <View style={styles.indicatorTags}>
                              {dt.matchedIndicators.map((indicator, idx) => (
                                <View key={idx} style={styles.indicatorTag}>
                                  <Text style={styles.indicatorText}>{indicator}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      )}
                    </Pressable>
                  ))}
                </View>
              )}

              {result.detectedTactics.length === 0 && (
                <View style={styles.noTacticsCard}>
                  <ShieldCheck size={48} color={colors.success} />
                  <Text style={styles.noTacticsTitle}>No Red Flags Detected</Text>
                  <Text style={styles.noTacticsDesc}>
                    This text doesn't show obvious manipulation patterns. Remember, context
                    matters - trust your instincts.
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  descriptionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  descriptionText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  upgradePrompt: {
    flexDirection: 'column',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.accent,
    borderStyle: 'dashed',
  },
  upgradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  upgradeTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  upgradeDesc: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  inputContainer: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInput: {
    minHeight: 150,
    maxHeight: 300,
    padding: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: 22,
  },
  charCount: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'right',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  scanButtonDisabled: {
    backgroundColor: colors.tertiary,
    opacity: 0.5,
  },
  scanButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  scanButtonText: {
    color: colors.background,
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  resultsContainer: {
    marginTop: spacing.xl,
  },
  analysisBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  analysisBadgeText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  basicBadgeText: {
    color: colors.tertiary,
  },
  riskCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderLeftWidth: 4,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  riskInfo: {
    flex: 1,
  },
  riskLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  riskLevel: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    marginTop: 2,
  },
  riskScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  riskScore: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  riskScoreLabel: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  summary: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    marginTop: spacing.md,
  },
  recommendationBox: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    marginTop: spacing.md,
  },
  recommendationLabel: {
    fontSize: typography.xs,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  recommendation: {
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: 20,
  },
  tacticsSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  tacticCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  tacticCardExpanded: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  tacticHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  tacticIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  tacticInfo: {
    flex: 1,
  },
  tacticName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  tacticCategory: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: 2,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  confidence: {
    fontSize: typography.md,
    fontWeight: typography.bold,
  },
  tacticDetails: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tacticDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    paddingTop: spacing.md,
  },
  examplesContainer: {
    marginTop: spacing.md,
  },
  examplesLabel: {
    fontSize: typography.xs,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  exampleBox: {
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
    borderLeftWidth: 2,
    borderLeftColor: colors.error,
  },
  exampleText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  indicatorsContainer: {
    marginTop: spacing.md,
  },
  indicatorsLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginBottom: spacing.sm,
  },
  indicatorTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  indicatorTag: {
    backgroundColor: colors.errorMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  indicatorText: {
    fontSize: typography.xs,
    color: colors.error,
  },
  noTacticsCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  noTacticsTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.success,
    marginTop: spacing.md,
  },
  noTacticsDesc: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});
