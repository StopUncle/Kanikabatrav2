import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { logger } from '../../lib/logger';
import {
  Star,
  Briefcase,
  Heart,
  Users,
  HandshakeIcon,
  Swords,
  Home,
  HelpCircle,
  ChevronDown,
  Check,
} from 'lucide-react-native';
import { Card } from '../ui/Card';
import { GradientButton } from '../ui/GradientButton';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import {
  type FieldReportDraft,
  type ReportSituation,
  type SuccessRating,
  COMMON_TACTICS,
  SITUATION_LABELS,
  RATING_LABELS,
} from '../../content/fieldReports/types';

interface FieldReportFormProps {
  missionId?: string;
  missionWeek?: number;
  initialTactic?: string;
  onSubmit: (draft: FieldReportDraft) => Promise<void>;
  onCancel?: () => void;
}

const SITUATION_ICONS: Record<ReportSituation, React.ComponentType<{ size: number; color: string }>> = {
  work: Briefcase,
  relationship: Heart,
  social: Users,
  negotiation: HandshakeIcon,
  conflict: Swords,
  family: Home,
  other: HelpCircle,
};

const SITUATIONS: ReportSituation[] = [
  'work',
  'relationship',
  'social',
  'negotiation',
  'conflict',
  'family',
  'other',
];

export function FieldReportForm({
  missionId,
  missionWeek,
  initialTactic = '',
  onSubmit,
  onCancel,
}: FieldReportFormProps) {
  const [tacticUsed, setTacticUsed] = useState(initialTactic);
  const [showTacticPicker, setShowTacticPicker] = useState(false);
  const [customTactic, setCustomTactic] = useState('');
  const [situation, setSituation] = useState<ReportSituation | null>(null);
  const [whatHappened, setWhatHappened] = useState('');
  const [lessonsLearned, setLessonsLearned] = useState('');
  const [successRating, setSuccessRating] = useState<SuccessRating>(3);
  const [isPublic, setIsPublic] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    tacticUsed.trim() !== '' &&
    situation !== null &&
    whatHappened.trim().length >= 20 &&
    lessonsLearned.trim().length >= 10;

  const handleTacticSelect = (tactic: string) => {
    haptics.light();
    if (tactic === 'Other') {
      setTacticUsed('');
      setCustomTactic('');
      setShowTacticPicker(false);
    } else {
      setTacticUsed(tactic);
      setShowTacticPicker(false);
    }
  };

  const handleSituationSelect = (sit: ReportSituation) => {
    haptics.light();
    setSituation(sit);
  };

  const handleRatingSelect = (rating: SuccessRating) => {
    haptics.light();
    setSuccessRating(rating);
  };

  const handleSubmit = async () => {
    if (!isValid || !situation) return;

    setIsSubmitting(true);
    haptics.medium();

    try {
      const draft: FieldReportDraft = {
        missionId,
        tacticUsed: tacticUsed.trim() || customTactic.trim(),
        situation,
        whatHappened: whatHappened.trim(),
        lessonsLearned: lessonsLearned.trim(),
        successRating,
        isPublic,
        isAnonymous,
      };

      await onSubmit(draft);
      haptics.success();
    } catch (error) {
      logger.error('Error submitting report:', error);
      haptics.error();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Mission Context */}
      {missionWeek && (
        <View style={styles.missionContext}>
          <Text style={styles.missionLabel}>Field Report for</Text>
          <Text style={styles.missionWeek}>Week {missionWeek} Mission</Text>
        </View>
      )}

      {/* Tactic Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What tactic did you use?</Text>
        <Pressable
          style={styles.tacticSelector}
          onPress={() => {
            haptics.light();
            setShowTacticPicker(!showTacticPicker);
          }}
        >
          <Text style={[styles.tacticValue, !tacticUsed && styles.placeholder]}>
            {tacticUsed || 'Select a tactic...'}
          </Text>
          <ChevronDown size={20} color={colors.secondary} />
        </Pressable>

        {showTacticPicker && (
          <Card style={styles.tacticPicker}>
            {COMMON_TACTICS.map((tactic) => (
              <Pressable
                key={tactic}
                style={styles.tacticOption}
                onPress={() => handleTacticSelect(tactic)}
              >
                <Text style={styles.tacticOptionText}>{tactic}</Text>
                {tacticUsed === tactic && (
                  <Check size={16} color={colors.accent} />
                )}
              </Pressable>
            ))}
          </Card>
        )}

        {tacticUsed === '' && !showTacticPicker && (
          <TextInput
            style={styles.input}
            placeholder="Describe the tactic you used..."
            placeholderTextColor={colors.tertiary}
            value={customTactic}
            onChangeText={setCustomTactic}
          />
        )}
      </View>

      {/* Situation Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What was the context?</Text>
        <View style={styles.situationGrid}>
          {SITUATIONS.map((sit) => {
            const Icon = SITUATION_ICONS[sit];
            const isSelected = situation === sit;
            return (
              <Pressable
                key={sit}
                style={[styles.situationItem, isSelected && styles.situationSelected]}
                onPress={() => handleSituationSelect(sit)}
              >
                <Icon
                  size={20}
                  color={isSelected ? colors.accent : colors.secondary}
                />
                <Text
                  style={[
                    styles.situationLabel,
                    isSelected && styles.situationLabelSelected,
                  ]}
                >
                  {SITUATION_LABELS[sit].split(' / ')[0]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* What Happened */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What happened?</Text>
        <Text style={styles.sectionHint}>
          Describe the situation and outcome (min 20 characters)
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="I was in a meeting when..."
          placeholderTextColor={colors.tertiary}
          multiline
          numberOfLines={5}
          value={whatHappened}
          onChangeText={setWhatHappened}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{whatHappened.length} / 20 min</Text>
      </View>

      {/* Lessons Learned */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What did you learn?</Text>
        <Text style={styles.sectionHint}>
          Reflect on what worked, what didn't, and what you'll do differently
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Next time I would..."
          placeholderTextColor={colors.tertiary}
          multiline
          numberOfLines={3}
          value={lessonsLearned}
          onChangeText={setLessonsLearned}
          textAlignVertical="top"
        />
      </View>

      {/* Success Rating */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How successful was it?</Text>
        <View style={styles.ratingContainer}>
          {([1, 2, 3, 4, 5] as SuccessRating[]).map((rating) => (
            <Pressable
              key={rating}
              style={styles.ratingItem}
              onPress={() => handleRatingSelect(rating)}
            >
              <Star
                size={32}
                color={rating <= successRating ? colors.accent : colors.border}
                fill={rating <= successRating ? colors.accent : 'transparent'}
              />
            </Pressable>
          ))}
        </View>
        <Text style={styles.ratingLabel}>{RATING_LABELS[successRating]}</Text>
      </View>

      {/* Privacy Options */}
      <Card style={styles.privacyCard}>
        <View style={styles.privacyRow}>
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Share with Community</Text>
            <Text style={styles.privacyHint}>
              Let others learn from your experience
            </Text>
          </View>
          <Switch
            value={isPublic}
            onValueChange={(value) => {
              haptics.light();
              setIsPublic(value);
            }}
            trackColor={{ false: colors.border, true: colors.accentMuted }}
            thumbColor={isPublic ? colors.accent : colors.surface}
          />
        </View>

        {isPublic && (
          <View style={styles.privacyRow}>
            <View style={styles.privacyContent}>
              <Text style={styles.privacyTitle}>Post Anonymously</Text>
              <Text style={styles.privacyHint}>Hide your identity</Text>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={(value) => {
                haptics.light();
                setIsAnonymous(value);
              }}
              trackColor={{ false: colors.border, true: colors.accentMuted }}
              thumbColor={isAnonymous ? colors.accent : colors.surface}
            />
          </View>
        )}
      </Card>

      {/* Submit Button */}
      <View style={styles.actions}>
        <GradientButton
          title={isSubmitting ? 'Submitting...' : 'Submit Field Report'}
          onPress={handleSubmit}
          disabled={!isValid || isSubmitting}
          fullWidth
          glow
        />
        {onCancel && (
          <Pressable style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        )}
      </View>

      {/* Bottom spacing */}
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  missionContext: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.accentMuted,
    borderRadius: borderRadius.md,
  },
  missionLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  missionWeek: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  sectionHint: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  tacticSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tacticValue: {
    fontSize: typography.md,
    color: colors.primary,
  },
  placeholder: {
    color: colors.tertiary,
  },
  tacticPicker: {
    gap: 0,
    padding: 0,
    overflow: 'hidden',
  },
  tacticOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tacticOptionText: {
    fontSize: typography.md,
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'right',
  },
  situationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  situationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  situationSelected: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  situationLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  situationLabelSelected: {
    color: colors.accent,
    fontWeight: typography.medium,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  ratingItem: {
    padding: spacing.xs,
  },
  ratingLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  privacyCard: {
    gap: spacing.md,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  privacyContent: {
    flex: 1,
    gap: 2,
  },
  privacyTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  privacyHint: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  actions: {
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  cancelButton: {
    alignItems: 'center',
    padding: spacing.md,
  },
  cancelText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
});
