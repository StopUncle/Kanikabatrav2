import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import type { ProgressStats } from '../../services/progressService';

interface PsychProfileProps {
  profile: ProgressStats['psychProfile'];
  compact?: boolean;
}

const DIMENSIONS = [
  { key: 'emotionalControl', label: 'Emotional\nControl', short: 'EC' },
  { key: 'socialAwareness', label: 'Social\nAwareness', short: 'SA' },
  { key: 'manipulation', label: 'Manipulation\nDefense', short: 'MD' },
  { key: 'influence', label: 'Influence', short: 'IN' },
  { key: 'resilience', label: 'Resilience', short: 'RE' },
  { key: 'strategicThinking', label: 'Strategic\nThinking', short: 'ST' },
] as const;

export function PsychProfile({ profile, compact = false }: PsychProfileProps) {
  const size = compact ? 160 : 240;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 30;

  // Calculate points for each dimension
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / DIMENSIONS.length - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Generate polygon points string
  const polygonPoints = DIMENSIONS.map((dim, i) => {
    const value = profile[dim.key as keyof typeof profile];
    const point = getPoint(i, value);
    return `${point.x},${point.y}`;
  }).join(' ');

  // Generate grid lines (circles at 25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];

  // Average score
  const averageScore = Math.round(
    Object.values(profile).reduce((a, b) => a + b, 0) / 6
  );

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Psychological Profile</Text>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreValue}>{averageScore}</Text>
          <Text style={styles.scoreLabel}>avg</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          {/* Grid circles */}
          {gridLevels.map((level) => (
            <Circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={(level / 100) * maxRadius}
              fill="none"
              stroke={colors.border}
              strokeWidth={1}
              strokeDasharray={level === 100 ? undefined : '2,2'}
            />
          ))}

          {/* Axis lines */}
          {DIMENSIONS.map((_, i) => {
            const point = getPoint(i, 100);
            return (
              <Line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke={colors.border}
                strokeWidth={1}
              />
            );
          })}

          {/* Data polygon */}
          <Polygon
            points={polygonPoints}
            fill={`${colors.accent}30`}
            stroke={colors.accent}
            strokeWidth={2}
          />

          {/* Data points */}
          {DIMENSIONS.map((dim, i) => {
            const value = profile[dim.key as keyof typeof profile];
            const point = getPoint(i, value);
            return (
              <Circle
                key={dim.key}
                cx={point.x}
                cy={point.y}
                r={4}
                fill={colors.accent}
              />
            );
          })}

          {/* Labels */}
          {DIMENSIONS.map((dim, i) => {
            const labelPoint = getPoint(i, 115);
            return (
              <SvgText
                key={`label-${dim.key}`}
                x={labelPoint.x}
                y={labelPoint.y}
                fill={colors.secondary}
                fontSize={compact ? 8 : 10}
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {compact ? dim.short : dim.label.split('\n')[0]}
              </SvgText>
            );
          })}
        </Svg>
      </View>

      {/* Legend */}
      {!compact && (
        <View style={styles.legend}>
          {DIMENSIONS.map((dim) => {
            const value = profile[dim.key as keyof typeof profile];
            return (
              <View key={dim.key} style={styles.legendItem}>
                <View style={styles.legendDot} />
                <Text style={styles.legendLabel}>{dim.label.replace('\n', ' ')}</Text>
                <Text style={styles.legendValue}>{value}%</Text>
              </View>
            );
          })}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  scoreBadge: {
    alignItems: 'center',
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  scoreValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  scoreLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    gap: spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  legendLabel: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
  },
  legendValue: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
});
