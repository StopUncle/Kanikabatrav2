// ==============================================
// SIMULATOR COMPONENTS - Clean Export Index
// ==============================================

// ---------------------------------------------
// SCENE RENDERERS (Main containers)
// ---------------------------------------------
export { SimulatorScene } from './SimulatorScene';
export { TacticSimulatorScene } from './TacticSimulatorScene';

// ---------------------------------------------
// TACTIC UI COMPONENTS (New 2x2 grid system)
// ---------------------------------------------

// Core - The main tactic flow
export { TacticGrid } from './TacticGrid';
export { YourReadPanel } from './YourReadPanel';
export { ExecutionReveal } from './ExecutionReveal';
export { InnerVoiceBubble } from './InnerVoiceBubble';

// Character & Status
export { CharacterCard } from './CharacterCard';
export { MoodIndicator } from './MoodIndicator';
export { ControlMeter } from './ControlMeter';
export { RelationshipDynamic, InvestmentRatioBadge } from './RelationshipDynamic';

// Alerts & Feedback
export { ManipulationAlert } from './ManipulationAlert';
export { RedFlagBadge, RedFlagInline, RedFlagCounter } from './RedFlagBadge';
export { PatternUnlock, PatternUnlockBadge } from './PatternUnlock';

// Transitions
export { SceneTransition, TransitionBadge, ActDivider } from './SceneTransition';

// ---------------------------------------------
// LEGACY COMPONENTS (Standard dialogue system)
// ---------------------------------------------
export { DialogBox } from './DialogBox';
export { SpeechBubble } from './SpeechBubble';
export { ChoiceButtons } from './ChoiceButtons';
export { CharacterPortrait } from './CharacterPortrait';
export { SceneBackground } from './SceneBackground';
export { OutcomeCard } from './OutcomeCard';

// ---------------------------------------------
// NAVIGATION & PROGRESSION COMPONENTS
// ---------------------------------------------
export { LevelCard } from './LevelCard';
export type { StoryLevel } from './LevelCard';
export { MissionCard } from './MissionCard';
export type { Mission } from './MissionCard';

// ---------------------------------------------
// UTILITY COMPONENTS
// ---------------------------------------------
export { CreditDisplay } from './CreditDisplay';
export { ProgressBreadcrumb } from './ProgressBreadcrumb';

// ---------------------------------------------
// GROUPED EXPORTS (For namespace imports)
// ---------------------------------------------

// Import all tactic components at once:
// import { Tactic } from '@/components/simulator'
// <Tactic.Grid />, <Tactic.YourRead />, etc.
import { TacticGrid } from './TacticGrid';
import { YourReadPanel } from './YourReadPanel';
import { ExecutionReveal } from './ExecutionReveal';
import { InnerVoiceBubble } from './InnerVoiceBubble';
import { CharacterCard } from './CharacterCard';
import { MoodIndicator } from './MoodIndicator';
import { ControlMeter } from './ControlMeter';
import { ManipulationAlert } from './ManipulationAlert';
import { RedFlagBadge } from './RedFlagBadge';
import { PatternUnlock } from './PatternUnlock';
import { RelationshipDynamic } from './RelationshipDynamic';
import { SceneTransition } from './SceneTransition';

export const Tactic = {
  Grid: TacticGrid,
  YourRead: YourReadPanel,
  Execution: ExecutionReveal,
  InnerVoice: InnerVoiceBubble,
  Character: CharacterCard,
  Mood: MoodIndicator,
  Control: ControlMeter,
  Alert: ManipulationAlert,
  RedFlag: RedFlagBadge,
  Pattern: PatternUnlock,
  Relationship: RelationshipDynamic,
  Transition: SceneTransition,
};
