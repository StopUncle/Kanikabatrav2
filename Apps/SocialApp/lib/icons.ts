// Type-safe icon utilities for dynamic icon lookup
import * as LucideIcons from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

// Type for all available Lucide icon names
type LucideIconName = keyof typeof LucideIcons;

// Type guard to check if a string is a valid Lucide icon name
function isLucideIcon(name: string): name is LucideIconName {
  return name in LucideIcons && typeof (LucideIcons as Record<string, unknown>)[name] === 'function';
}

/**
 * Get a Lucide icon component by name with a fallback
 * @param name - The icon name (e.g., 'Target', 'BookOpen')
 * @param fallback - Fallback icon if name is not found (defaults to Circle)
 * @returns The Lucide icon component
 */
export function getIcon(name: string, fallback: LucideIcon = LucideIcons.Circle): LucideIcon {
  if (isLucideIcon(name)) {
    return LucideIcons[name] as LucideIcon;
  }
  return fallback;
}

// Re-export commonly used icons and types
export { type LucideIcon } from 'lucide-react-native';
