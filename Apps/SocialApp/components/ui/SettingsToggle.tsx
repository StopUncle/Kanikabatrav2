import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { colors, spacing, typography } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface SettingsToggleProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function SettingsToggle({
  icon,
  label,
  description,
  value,
  onValueChange,
  disabled = false,
}: SettingsToggleProps) {
  const handleToggle = () => {
    if (disabled) return;
    haptics.selection();
    onValueChange(!value);
  };

  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled]}
      onPress={handleToggle}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityHint={description}
      accessibilityState={{ checked: value, disabled }}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.content}>
        <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={(newValue) => {
          if (disabled) return;
          haptics.selection();
          onValueChange(newValue);
        }}
        trackColor={{ false: colors.surfaceElevated, true: colors.accent }}
        thumbColor={colors.primary}
        ios_backgroundColor={colors.surfaceElevated}
        disabled={disabled}
        accessibilityElementsHidden={true}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: typography.md,
    color: colors.primary,
  },
  labelDisabled: {
    color: colors.tertiary,
  },
  description: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
});
