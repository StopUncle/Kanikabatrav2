// Add Prospect Screen
// Form for creating a new prospect

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  UserPlus,
  User,
  AtSign,
  Heart,
  AlertTriangle,
  FileText,
  Check,
} from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { GlassCard } from '../../../components/ui/GlassCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { useRotationStore, CreateProspectData } from '../../../stores/rotationStore';
import {
  PLATFORMS,
  INTEREST_LEVELS,
  THREAT_LEVELS,
} from '../../../content/rotation/suggestions';
import { InterestLevel, ThreatLevel } from '../../../content/rotation/types';

export default function AddProspectScreen() {
  const { createProspect, isLoading } = useRotationStore();

  // Form state
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [platform, setPlatform] = useState<CreateProspectData['platform']>('tinder');
  const [platformHandle, setPlatformHandle] = useState('');
  const [interestLevel, setInterestLevel] = useState<InterestLevel>(3);
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('green');
  const [notes, setNotes] = useState('');

  const handleBack = () => {
    haptics.light();
    router.replace('/(tools)/rotation');
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a name');
      return;
    }

    haptics.medium();

    const prospect = await createProspect({
      name: name.trim(),
      nickname: nickname.trim() || undefined,
      platform,
      platformHandle: platformHandle.trim() || undefined,
      interestLevel,
      threatLevel,
      generalNotes: notes.trim() || undefined,
    });

    if (prospect) {
      router.replace(`/(tools)/rotation/${prospect.id}`);
    } else {
      Alert.alert('Error', 'Failed to create prospect');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={20} color={colors.primary} />}
          onPress={handleBack}
        />
        <View style={styles.headerTitle}>
          <UserPlus size={22} color={colors.accent} />
          <Text style={styles.title}>Add Prospect</Text>
        </View>
        <Button
          variant="primary"
          size="sm"
          icon={<Check size={18} color={colors.background} />}
          onPress={handleSave}
          loading={isLoading}
          disabled={!name.trim() || isLoading}
        >
          Save
        </Button>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Basic Info */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Basic Info</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Their name"
              placeholderTextColor={colors.tertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nickname (optional)</Text>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              placeholder="How you remember them"
              placeholderTextColor={colors.tertiary}
            />
          </View>
        </GlassCard>

        {/* Platform */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <AtSign size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Where You Met</Text>
          </View>

          <View style={styles.platformGrid}>
            {PLATFORMS.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => {
                  haptics.light();
                  setPlatform(p.id as CreateProspectData['platform']);
                }}
                style={[
                  styles.platformOption,
                  platform === p.id && styles.platformOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.platformLabel,
                    platform === p.id && styles.platformLabelActive,
                  ]}
                >
                  {p.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Handle/Username (optional)</Text>
            <TextInput
              style={styles.input}
              value={platformHandle}
              onChangeText={setPlatformHandle}
              placeholder="@username"
              placeholderTextColor={colors.tertiary}
              autoCapitalize="none"
            />
          </View>
        </GlassCard>

        {/* Interest Level */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Your Interest</Text>
          </View>

          <View style={styles.interestGrid}>
            {INTEREST_LEVELS.map((level) => (
              <Pressable
                key={level.level}
                onPress={() => {
                  haptics.light();
                  setInterestLevel(level.level as InterestLevel);
                }}
                style={[
                  styles.interestOption,
                  interestLevel === level.level && {
                    borderColor: level.color,
                    backgroundColor: `${level.color}15`,
                  },
                ]}
              >
                <View style={styles.interestDots}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        i <= level.level
                          ? { backgroundColor: level.color }
                          : styles.dotEmpty,
                      ]}
                    />
                  ))}
                </View>
                <Text style={styles.interestLabel}>{level.label}</Text>
              </Pressable>
            ))}
          </View>
        </GlassCard>

        {/* Threat Level */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Initial Vibe</Text>
          </View>

          <View style={styles.threatGrid}>
            {Object.entries(THREAT_LEVELS).map(([key, info]) => (
              <Pressable
                key={key}
                onPress={() => {
                  haptics.light();
                  setThreatLevel(key as ThreatLevel);
                }}
                style={[
                  styles.threatOption,
                  threatLevel === key && {
                    borderColor: info.color,
                    backgroundColor: `${info.color}15`,
                  },
                ]}
              >
                <View style={[styles.threatDot, { backgroundColor: info.color }]} />
                <Text style={styles.threatLabel}>{info.label}</Text>
                <Text style={styles.threatDescription}>{info.description}</Text>
              </Pressable>
            ))}
          </View>
        </GlassCard>

        {/* Notes */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Initial Notes</Text>
          </View>

          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="First impressions, how you met, anything to remember..."
            placeholderTextColor={colors.tertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.sm,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notesInput: {
    minHeight: 100,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  platformOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  platformOptionActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  platformLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  platformLabelActive: {
    color: colors.accent,
  },
  interestGrid: {
    gap: spacing.sm,
  },
  interestOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  interestDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotEmpty: {
    backgroundColor: colors.border,
  },
  interestLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  threatGrid: {
    gap: spacing.sm,
  },
  threatOption: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  threatDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: spacing.xs,
  },
  threatLabel: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: 2,
  },
  threatDescription: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
});
