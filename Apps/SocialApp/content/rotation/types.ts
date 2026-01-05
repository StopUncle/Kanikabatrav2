// Rotation Tracker Types
// Local-only prospect CRM for strategic dating

export type ProspectStatus = 'active' | 'on_hold' | 'archived' | 'blocked';
export type InterestLevel = 1 | 2 | 3 | 4 | 5; // 1 = low, 5 = very high
export type ThreatLevel = 'green' | 'yellow' | 'red'; // How much of a player/risk

export interface RedFlagNote {
  id: string;
  text: string;
  severity: 1 | 2 | 3;
  addedAt: string;
}

export interface GreenFlagNote {
  id: string;
  text: string;
  addedAt: string;
}

export interface ConversationTopic {
  id: string;
  topic: string;
  details?: string;
  addedAt: string;
}

export interface ContactEvent {
  id: string;
  type: 'text' | 'call' | 'date' | 'dm' | 'other';
  initiatedBy: 'you' | 'them';
  date: string;
  notes?: string;
}

export interface Prospect {
  id: string;

  // Basic info
  name: string;
  nickname?: string;
  photoUri?: string; // Local file path

  // Platform/source
  platform: 'tinder' | 'hinge' | 'bumble' | 'instagram' | 'irl' | 'other';
  platformHandle?: string;

  // Status
  status: ProspectStatus;
  interestLevel: InterestLevel; // YOUR interest in them
  theirInterestLevel?: InterestLevel; // Their apparent interest
  threatLevel: ThreatLevel;

  // Tracking
  lastContact: string; // ISO date
  nextContactDate?: string; // When to reach out
  dateCount: number;

  // Notes
  redFlags: RedFlagNote[];
  greenFlags: GreenFlagNote[];
  topics: ConversationTopic[]; // Things to talk about
  generalNotes?: string;

  // History
  contactHistory: ContactEvent[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface RotationStats {
  total: number;
  active: number;
  onHold: number;
  archived: number;
  averageInterest: number;
  hotProspects: number; // High interest from both sides
  needsAttention: number; // Haven't contacted in a while
}

export interface SmartReminder {
  id: string;
  prospectId: string;
  prospectName: string;
  type: 'follow_up' | 'cooling_off' | 'check_in' | 'date_suggestion' | 'threat_warning';
  message: string;
  suggestion?: string;
  suggestedAction?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  dismissed: boolean;
}

export interface ExportData {
  version: string;
  exportedAt: string;
  prospects: Prospect[];
  checksum: string;
}
