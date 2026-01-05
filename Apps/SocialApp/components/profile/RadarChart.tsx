import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText, G } from 'react-native-svg';
import { colors, typography, spacing } from '../../lib/theme';

interface TraitData {
  trait: string;
  label: string;
  score: number; // 0-100
  color: string;
}

interface RadarChartProps {
  data: TraitData[];
  size?: number;
  showLabels?: boolean;
  animated?: boolean;
}

export function RadarChart({
  data,
  size = 300,
  showLabels = true,
}: RadarChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) - 50; // Leave room for labels

  // Number of sides (traits)
  const sides = data.length;
  const angleStep = (2 * Math.PI) / sides;

  // Calculate points for each level (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Get polygon points for a given level
  const getPolygonPoints = (level: number): string => {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const x = centerX + radius * level * Math.cos(angle);
      const y = centerY + radius * level * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Get data polygon points based on scores
  const getDataPoints = (): string => {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const score = data[i].score / 100; // Normalize to 0-1
      const x = centerX + radius * score * Math.cos(angle);
      const y = centerY + radius * score * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Get label position for each trait
  const getLabelPosition = (index: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } => {
    const angle = index * angleStep - Math.PI / 2;
    const labelRadius = radius + 35;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);

    // Determine text anchor based on position
    let anchor: 'start' | 'middle' | 'end' = 'middle';
    if (x < centerX - 10) anchor = 'end';
    if (x > centerX + 10) anchor = 'start';

    return { x, y, anchor };
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background grid polygons */}
        {levels.map((level, index) => (
          <Polygon
            key={`level-${index}`}
            points={getPolygonPoints(level)}
            fill="none"
            stroke={colors.border}
            strokeWidth={1}
            opacity={0.5}
          />
        ))}

        {/* Axis lines from center to each vertex */}
        {data.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const endX = centerX + radius * Math.cos(angle);
          const endY = centerY + radius * Math.sin(angle);
          return (
            <Line
              key={`axis-${index}`}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke={colors.border}
              strokeWidth={1}
              opacity={0.3}
            />
          );
        })}

        {/* Data polygon */}
        <Polygon
          points={getDataPoints()}
          fill={colors.accent}
          fillOpacity={0.2}
          stroke={colors.accent}
          strokeWidth={2}
        />

        {/* Data points */}
        {data.map((item, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const score = item.score / 100;
          const x = centerX + radius * score * Math.cos(angle);
          const y = centerY + radius * score * Math.sin(angle);
          return (
            <G key={`point-${index}`}>
              <Circle
                cx={x}
                cy={y}
                r={6}
                fill={colors.accent}
                stroke={colors.background}
                strokeWidth={2}
              />
            </G>
          );
        })}

        {/* Labels */}
        {showLabels && data.map((item, index) => {
          const pos = getLabelPosition(index);
          // Use smaller font for longer labels to prevent truncation
          const fontSize = item.label.length > 12 ? 9 : 11;
          return (
            <SvgText
              key={`label-${index}`}
              x={pos.x}
              y={pos.y}
              fill={colors.primary}
              fontSize={fontSize}
              fontWeight="500"
              textAnchor={pos.anchor}
              alignmentBaseline="middle"
            >
              {item.label}
            </SvgText>
          );
        })}

        {/* Center point */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={3}
          fill={colors.tertiary}
        />
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
            <Text style={styles.legendScore}>{item.score}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  legend: {
    width: '100%',
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
  },
  legendScore: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.primary,
  },
});
