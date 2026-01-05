// Rotation Tracker Content
// Complete content system for prospect management

// Types
export * from './types';

// Reminder templates and logic
export {
  CONTACT_THRESHOLDS,
  REMINDER_TEMPLATES,
  SUGGESTED_ACTIONS,
  generateReminder,
  needsAttention,
  isOverContacting,
  shouldSuggestDate,
} from './reminderTemplates';

// Suggestions and pre-defined options
export {
  PLATFORMS,
  COMMON_RED_FLAGS,
  COMMON_GREEN_FLAGS,
  TOPIC_SUGGESTIONS,
  STATUS_INFO,
  INTEREST_LEVELS,
  THREAT_LEVELS,
  CONTACT_TYPES,
  ROTATION_TIPS,
  EXPORT_INFO,
} from './suggestions';
