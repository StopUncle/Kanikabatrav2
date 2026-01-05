// Smart Reminder Templates
// Context-aware suggestions for prospect management

import { Prospect, SmartReminder } from './types';

// Days since last contact thresholds
export const CONTACT_THRESHOLDS = {
  HOT: 2,           // High interest - contact within 2 days
  WARM: 4,          // Medium interest - contact within 4 days
  COOL: 7,          // Lower interest - weekly check-in
  COLD: 14,         // Risk of going cold
  DEAD: 30,         // Probably lost
};

// Reminder message templates
export const REMINDER_TEMPLATES = {
  follow_up: {
    hot: [
      "Time to follow up with {name} - the iron is hot!",
      "{name} is interested. Don't leave them hanging.",
      "Strike while {name}'s interest is high.",
    ],
    warm: [
      "Been a few days since you talked to {name}.",
      "Keep the momentum going with {name}.",
      "{name} might be wondering where you went.",
    ],
    cool: [
      "It's been a week. Send {name} something light.",
      "Time to check in with {name} - keep yourself on radar.",
      "{name} needs a ping to stay warm.",
    ],
    cold: [
      "{name} is going cold. Decide: re-engage or let go?",
      "Last chance to revive things with {name}.",
      "{name} probably forgot about you. Worth one more shot?",
    ],
  },

  cooling_off: [
    "You've been texting {name} a lot. Pull back a bit.",
    "Give {name} some space to miss you.",
    "Let {name} initiate the next conversation.",
    "You're chasing {name}. Stop. Let them come to you.",
  ],

  date_suggestion: [
    "You've been texting {name} for a while. Time to meet up.",
    "Stop texting, start dating. Ask {name} out.",
    "Words are cheap. Schedule something with {name}.",
    "{dateCount} texts and no date? Make a move with {name}.",
  ],

  check_in: [
    "How are things going with {name}?",
    "Any updates on {name}?",
    "Time to reassess where things stand with {name}.",
  ],

  threat_warning: [
    "Warning: {name} is showing concerning patterns.",
    "Red flags detected with {name}. Time to reassess.",
    "{name}'s behavior is raising concerns.",
  ],
};

// Suggested actions based on situation
export const SUGGESTED_ACTIONS = {
  follow_up: {
    hot: [
      "Send a playful callback to your last conversation",
      "Share something that reminded you of them",
      "Propose a specific date plan",
    ],
    warm: [
      "Ask about something they mentioned",
      "Send an interesting observation about your day",
      "Reference an inside joke",
    ],
    cool: [
      "Send a low-investment message (meme, interesting link)",
      "Ask an open-ended question about their week",
      "Share something relevant to their interests",
    ],
    cold: [
      "Send a bold, no-pressure message",
      "Acknowledge the gap playfully",
      "Propose something specific with a deadline",
    ],
  },

  cooling_off: [
    "Do NOT text first for at least 48 hours",
    "Focus on other prospects in your rotation",
    "Post on your socials instead of texting them directly",
    "If they reach out, wait before responding",
  ],

  date_suggestion: [
    "Suggest a specific day and activity",
    "Make it low-pressure but definite",
    "Give them an easy out but be confident",
    "Avoid asking 'when are you free' - propose, don't ask",
  ],

  check_in: [
    "Review your notes and recent interactions",
    "Update their interest level if it's changed",
    "Decide if they should stay active or be archived",
  ],

  threat_warning: [
    "Document the red flag in detail",
    "Review your other prospects for comparison",
    "Consider reducing their priority in your rotation",
    "Trust your instincts - don't ignore warning signs",
  ],
};

// Generate personalized reminder
export function generateReminder(
  prospect: Prospect,
  type: SmartReminder['type']
): Omit<SmartReminder, 'id' | 'dismissed'> {
  const daysSinceContact = getDaysSince(prospect.lastContact);
  const templates = REMINDER_TEMPLATES[type];
  const actions = SUGGESTED_ACTIONS[type];

  let message: string;
  let suggestedAction: string | undefined;
  let priority: SmartReminder['priority'] = 'medium';

  if (type === 'follow_up') {
    const temp = daysSinceContact <= CONTACT_THRESHOLDS.HOT ? 'hot'
      : daysSinceContact <= CONTACT_THRESHOLDS.WARM ? 'warm'
      : daysSinceContact <= CONTACT_THRESHOLDS.COOL ? 'cool'
      : 'cold';

    const templateArr = templates[temp as keyof typeof templates] as string[];
    const actionArr = actions[temp as keyof typeof actions] as string[];

    message = templateArr[Math.floor(Math.random() * templateArr.length)];
    suggestedAction = actionArr[Math.floor(Math.random() * actionArr.length)];

    priority = temp === 'hot' ? 'high' : temp === 'cold' ? 'high' : 'medium';
  } else if (type === 'cooling_off') {
    const templateArr = templates as string[];
    const actionArr = actions as string[];

    message = templateArr[Math.floor(Math.random() * templateArr.length)];
    suggestedAction = actionArr[Math.floor(Math.random() * actionArr.length)];
    priority = 'high';
  } else if (type === 'date_suggestion') {
    const templateArr = templates as string[];
    const actionArr = actions as string[];

    message = templateArr[Math.floor(Math.random() * templateArr.length)];
    suggestedAction = actionArr[Math.floor(Math.random() * actionArr.length)];
    priority = prospect.dateCount === 0 ? 'high' : 'medium';
  } else {
    const templateArr = templates as string[];
    message = templateArr[Math.floor(Math.random() * templateArr.length)];
    priority = 'low';
  }

  // Replace placeholders
  message = message
    .replace(/{name}/g, prospect.nickname || prospect.name)
    .replace(/{dateCount}/g, String(prospect.dateCount));

  return {
    prospectId: prospect.id,
    prospectName: prospect.nickname || prospect.name,
    type,
    message,
    suggestedAction,
    priority,
    dueDate: new Date().toISOString(),
  };
}

// Calculate days since a date
function getDaysSince(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

// Determine if prospect needs attention
export function needsAttention(prospect: Prospect): boolean {
  if (prospect.status !== 'active') return false;

  const daysSince = getDaysSince(prospect.lastContact);
  const threshold = prospect.interestLevel >= 4 ? CONTACT_THRESHOLDS.HOT
    : prospect.interestLevel >= 3 ? CONTACT_THRESHOLDS.WARM
    : CONTACT_THRESHOLDS.COOL;

  return daysSince > threshold;
}

// Determine if you're over-contacting
export function isOverContacting(prospect: Prospect): boolean {
  const recentContacts = prospect.contactHistory.filter(c => {
    const daysSince = getDaysSince(c.date);
    return daysSince <= 3 && c.initiatedBy === 'you';
  });

  const theirRecentContacts = prospect.contactHistory.filter(c => {
    const daysSince = getDaysSince(c.date);
    return daysSince <= 3 && c.initiatedBy === 'them';
  });

  // If you've contacted 3+ times and they've contacted 0-1 times, you're chasing
  return recentContacts.length >= 3 && theirRecentContacts.length <= 1;
}

// Determine if should suggest a date
export function shouldSuggestDate(prospect: Prospect): boolean {
  if (prospect.status !== 'active') return false;
  if (prospect.interestLevel < 3) return false;

  // If no dates and been talking for a while
  if (prospect.dateCount === 0) {
    const daysSinceCreated = getDaysSince(prospect.createdAt);
    const contactCount = prospect.contactHistory.length;
    return daysSinceCreated >= 5 || contactCount >= 10;
  }

  return false;
}
