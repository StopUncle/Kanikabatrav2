/**
 * Tells, the daily rep for Train Your Instincts.
 *
 * One Tell is a single 45-90 second exercise: an artifact (voicemail,
 * text exchange, paragraph) plus a multiple choice question plus a
 * Kanika-voice reveal. This file is the type contract; storage is
 * deferred until after the format proves itself in the spike.
 */

export type TellFormat =
  | "DIAGNOSE"          // artifact + which-cluster
  | "SPOT_THE_MOVE"     // conversation + what-just-happened
  | "NEXT_OPTIMAL"      // scene + which-reply
  | "FIND_THE_DECOY"    // paragraph + tap-the-tell
  | "GRADE_THE_REPLY";  // exchange + score-this-draft

export type InstinctTrack =
  | "DARK_PSYCH"
  | "RED_FLAGS"
  | "CROSS_SEX"
  | "POWER"
  | "REFUSAL"
  | "SELF_REG";

export type InstinctAxis =
  | "READ"      // identifying what someone is doing
  | "SPOT"      // catching manipulation in flight
  | "REPLY"     // knowing what to say
  | "REFUSE"    // saying no under pressure
  | "CALIBRATE" // cross-sex, status, social tier
  | "HOLD";     // self-regulation, not reacting

/**
 * The artifact, polymorphic by format. The DIAGNOSE format is the only
 * one shipped in the spike, the others are typed here so future Tells
 * can be authored without a type-system rewrite.
 */
export type TellArtifact =
  | {
      kind: "voicemail";
      speakerLabel: string;        // "Her, 11:47 p.m."
      transcript: string;          // the quoted message
      durationLabel?: string;      // "1:42"
    }
  | {
      kind: "text-exchange";
      label?: string;              // "Tuesday, 9:14 a.m."
      lines: Array<{
        from: "them" | "you";
        text: string;
      }>;
    }
  | {
      kind: "paragraph";
      label?: string;
      text: string;
    }
  | {
      kind: "scene";                // narrative description
      label?: string;
      text: string;
    };

export interface TellChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  /**
   * One sentence on why this choice is wrong (or, on the correct one,
   * why it is right at first glance). Shown on the reveal screen
   * underneath each choice. Kept short, observation only.
   */
  why: string;
}

export interface Tell {
  id: string;
  number: number;                  // public-facing index, e.g. "Tell 247"
  format: TellFormat;
  track: InstinctTrack;
  axes: InstinctAxis[];            // 1-2 axes
  difficulty: 1 | 2 | 3 | 4 | 5;
  artifact: TellArtifact;
  question: string;
  choices: TellChoice[];           // exactly 4, exactly one correct
  /**
   * Kanika-voice teach. 60-100 words. Declarative, observation only,
   * no em dashes. Read as if she is sitting across the table and
   * naming what just happened.
   */
  reveal: string;
}

/**
 * Result returned when a user submits an answer. The spike does not
 * persist anything, so this exists purely as the rendering contract.
 */
export interface TellAnswerResult {
  correct: boolean;
  pickedChoiceId: string;
}

/** Display labels, kept central so the marketing copy is one source. */
export const TRACK_LABELS: Record<InstinctTrack, string> = {
  DARK_PSYCH: "Dark Psychology",
  RED_FLAGS: "Red Flags",
  CROSS_SEX: "Cross-Sex Fluency",
  POWER: "Power & Status",
  REFUSAL: "Saying No",
  SELF_REG: "Self-Regulation",
};

export const AXIS_LABELS: Record<InstinctAxis, string> = {
  READ: "Read",
  SPOT: "Spot",
  REPLY: "Reply",
  REFUSE: "Refuse",
  CALIBRATE: "Calibrate",
  HOLD: "Hold",
};
