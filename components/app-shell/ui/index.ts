/**
 * The app's shared primitives.
 *
 * One import path, so a surface reaches for the existing decision before it
 * invents another one. Anything used on three screens belongs here; anything
 * used on one does not.
 */

export { default as Card } from "./Card";
export type { CardProps } from "./Card";

export { default as PageShell } from "./PageShell";
export type { PageShellProps } from "./PageShell";

export { default as PageHeader } from "./PageHeader";
export type { PageHeaderProps } from "./PageHeader";

export { default as SectionHeader } from "./SectionHeader";
export type { SectionHeaderProps } from "./SectionHeader";

export { default as EmptyState } from "./EmptyState";
export type { EmptyStateProps } from "./EmptyState";

export { default as PressableRow } from "./PressableRow";

export { Skeleton, SkeletonText, SkeletonCard } from "./Skeleton";
