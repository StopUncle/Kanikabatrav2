// Flag Card
// Displays detected red flags and green flags from the analysis

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  AlertTriangle,
  AlertCircle,
  Flag,
  CheckCircle,
  Heart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { RedFlag, GreenFlag } from '../../content/powerDynamics/types';
import { flagColors, categoryDescriptions } from '../../content/powerDynamics/redFlags';

interface FlagCardProps {
  redFlags: { flag: RedFlag; matches: string[] }[];
  greenFlags: { flag: GreenFlag; matches: string[] }[];
}

export function FlagCard({ redFlags, greenFlags }: FlagCardProps) {
  const [expandedRed, setExpandedRed] = React.useState<string | null>(null);
  const [expandedGreen, setExpandedGreen] = React.useState<string | null>(null);

  const hasRedFlags = redFlags.length > 0;
  const hasGreenFlags = greenFlags.length > 0;

  if (!hasRedFlags && !hasGreenFlags) {
    return (
      <GlassCard variant="medium" style={styles.container}>
        <View style={styles.emptyContainer}>
          <CheckCircle size={24} color={colors.success} />
          <Text style={styles.emptyText}>No significant flags detected</Text>
        </View>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="medium" style={styles.container}>
      {/* Red Flags Section */}
      {hasRedFlags && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={18} color="#EF4444" />
            <Text style={styles.sectionTitle}>Red Flags ({redFlags.length})</Text>
          </View>

          {redFlags.map(({ flag, matches }) => (
            <FlagItem
              key={flag.id}
              name={flag.name}
              description={flag.description}
              defense={flag.defense}
              category={categoryDescriptions[flag.category]?.name || flag.category}
              severity={flag.severity}
              matches={matches}
              type="red"
              isExpanded={expandedRed === flag.id}
              onToggle={() => {
                haptics.light();
                setExpandedRed(expandedRed === flag.id ? null : flag.id);
              }}
            />
          ))}
        </View>
      )}

      {/* Green Flags Section */}
      {hasGreenFlags && (
        <View style={[styles.section, hasRedFlags && styles.sectionBorder]}>
          <View style={styles.sectionHeader}>
            <Heart size={18} color="#22C55E" />
            <Text style={styles.sectionTitle}>Green Flags ({greenFlags.length})</Text>
          </View>

          {greenFlags.map(({ flag, matches }) => (
            <FlagItem
              key={flag.id}
              name={flag.name}
              description={flag.description}
              category={flag.category}
              matches={matches}
              type="green"
              isExpanded={expandedGreen === flag.id}
              onToggle={() => {
                haptics.light();
                setExpandedGreen(expandedGreen === flag.id ? null : flag.id);
              }}
            />
          ))}
        </View>
      )}
    </GlassCard>
  );
}

interface FlagItemProps {
  name: string;
  description: string;
  defense?: string;
  category: string;
  severity?: 1 | 2 | 3;
  matches: string[];
  type: 'red' | 'green';
  isExpanded: boolean;
  onToggle: () => void;
}

function FlagItem({
  name,
  description,
  defense,
  category,
  severity,
  matches,
  type,
  isExpanded,
  onToggle,
}: FlagItemProps) {
  const color = type === 'red' ? flagColors[severity || 2] : '#22C55E';
  const Icon = type === 'red' ? AlertCircle : CheckCircle;

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.flagItem, pressed && styles.flagItemPressed]}
    >
      <View style={styles.flagHeader}>
        <View style={styles.flagTitleRow}>
          <Icon size={16} color={color} />
          <Text style={styles.flagName}>{name}</Text>
          {severity && type === 'red' && (
            <View style={[styles.severityBadge, { backgroundColor: `${color}20` }]}>
              <Text style={[styles.severityText, { color }]}>
                {getSeverityLabel(severity)}
              </Text>
            </View>
          )}
        </View>
        {isExpanded ? (
          <ChevronUp size={18} color={colors.secondary} />
        ) : (
          <ChevronDown size={18} color={colors.secondary} />
        )}
      </View>

      {isExpanded && (
        <View style={styles.flagDetails}>
          <Text style={styles.flagDescription}>{description}</Text>

          {matches.length > 0 && (
            <View style={styles.matchesContainer}>
              <Text style={styles.matchesLabel}>Found in text:</Text>
              {matches.slice(0, 3).map((match, i) => (
                <View key={i} style={styles.matchItem}>
                  <Text style={styles.matchText}>"{match}"</Text>
                </View>
              ))}
            </View>
          )}

          {defense && type === 'red' && (
            <View style={styles.defenseContainer}>
              <Text style={styles.defenseLabel}>Defense:</Text>
              <Text style={styles.defenseText}>{defense}</Text>
            </View>
          )}

          <View style={styles.categoryContainer}>
            <Flag size={12} color={colors.tertiary} />
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

// Compact flag display for summaries
export function CompactFlagBadge({
  type,
  count,
  severity,
}: {
  type: 'red' | 'green';
  count: number;
  severity?: 1 | 2 | 3;
}) {
  const color = type === 'red' ? flagColors[severity || 2] : '#22C55E';
  const Icon = type === 'red' ? AlertTriangle : CheckCircle;

  return (
    <View style={[styles.compactBadge, { backgroundColor: `${color}15`, borderColor: color }]}>
      <Icon size={14} color={color} />
      <Text style={[styles.compactBadgeText, { color }]}>
        {count} {type === 'red' ? 'Red' : 'Green'} Flag{count !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

function getSeverityLabel(severity: 1 | 2 | 3): string {
  switch (severity) {
    case 1:
      return 'Yellow';
    case 2:
      return 'Orange';
    case 3:
      return 'Red';
    default:
      return '';
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  section: {
    paddingVertical: spacing.sm,
  },
  sectionBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  flagItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  flagItemPressed: {
    opacity: 0.8,
  },
  flagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  flagName: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
    flex: 1,
  },
  severityBadge: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  severityText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  flagDetails: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  flagDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  matchesContainer: {
    marginBottom: spacing.sm,
  },
  matchesLabel: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.tertiary,
    marginBottom: spacing.xs,
  },
  matchItem: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    marginBottom: 4,
  },
  matchText: {
    fontSize: typography.xs,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  defenseContainer: {
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  defenseLabel: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
    marginBottom: 4,
  },
  defenseText: {
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  emptyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  compactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  compactBadgeText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
  },
});
