/**
 * The funnel, named once.
 *
 * Every event the product reports lives here, so the names in PostHog and
 * the names in the code cannot drift apart and nobody has to guess whether
 * it was "signup" or "sign_up" six months from now.
 *
 * The set is deliberately small. These are the steps between a stranger
 * arriving and a member still being here a week later; anything that is
 * merely interesting rather than decision-changing does not belong.
 */
export const ANALYTICS_EVENTS = {
  /** Account created. Free, no membership yet. */
  SIGNUP: "signup",
  /** Session started with credentials. Server-side, per login. */
  LOGIN: "login",
  /**
   * First navigation into /app this browser session. Guarded by
   * sessionStorage, so it fires once per tab-session and undercounts
   * multi-tab use, which is fine for funnel purposes.
   */
  APP_ENTERED: "app_entered",
  /** A scenario run reached an ending. Carries outcome and first-run flag. */
  SCENARIO_COMPLETED: "scenario_completed",
  /** A Speed Drill run was saved. Carries score and accuracy. */
  DRILL_COMPLETED: "drill_completed",
  /** A Daily Tell was answered and scored. Replays do not fire. */
  TELL_ANSWERED: "tell_answered",
  /** Consilium checkout completed. The moment they become a member. */
  MEMBER_ACTIVATED: "member_activated",
  /** The Arrival screen rendered. */
  ARRIVAL_VIEWED: "arrival_viewed",
  /** Kanika's welcome video played to the end. */
  WELCOME_VIDEO_COMPLETED: "welcome_video_completed",
  /** A Baseline Read submitted. The activation metric. */
  BASELINE_COMPLETED: "baseline_completed",
  /** Their first ever feed comment. Fires once per member, never again. */
  FIRST_COMMENT: "first_comment",
  /** First sighting on or after day 7. The retention checkpoint. */
  D7_RETURN: "d7_return",
  /** The upgrade sheet was shown, carrying which trigger opened it. */
  WALL_SHOWN: "wall_shown",
  /** They chose a plan on the sheet and we went for a checkout session. */
  UPGRADE_STARTED: "upgrade_started",
  /** Checkout session created, carrying monthly vs annual. */
  CHECKOUT_STARTED: "checkout_started",
  /** The install banner or sheet was shown. */
  INSTALL_PROMPT_SHOWN: "install_prompt_shown",
  /** They accepted it. */
  INSTALL_PROMPT_ACCEPTED: "install_prompt_accepted",

  /**
   * The Blood Pact funnel, step by step.
   *
   * The pact is the app's one paid product, so this is the only funnel
   * where a missing step means paid traffic cannot be judged. Each event
   * is one screen or one irreversible act, in the order a buyer meets
   * them, and every one carries `pact_preset` once a track is chosen so
   * the whole funnel can be split by track.
   *
   * The ceremony steps matter individually because the ceremony is long
   * for a $4.99 product: four oath lines, three written goals, and a
   * drawn signature stand between the door and the money. Knowing WHICH
   * of those loses people is the difference between shortening the right
   * step and guessing.
   */
  /** The door rendered: the top of the paid funnel. */
  PACT_DOOR_VIEWED: "pact_door_viewed",
  /** A track was chosen on the door. First real intent. */
  PACT_TRACK_PICKED: "pact_track_picked",
  /** The ceremony opened, carrying track and billing cycle. */
  PACT_CEREMONY_STARTED: "pact_ceremony_started",
  /** All four oath lines ticked; moving to the goals. */
  PACT_OATH_TAKEN: "pact_oath_taken",
  /** All three goals written; moving to the signature. */
  PACT_GOALS_WRITTEN: "pact_goals_written",
  /** Seal pressed with ink on the canvas. The conversion attempt. */
  PACT_SEALED: "pact_sealed",
  /** The covenant row exists. Entitled path only; paid arrives via the
   *  webhook as member_activated. */
  PACT_SIGNED: "pact_signed",
  /** Activate pressed: the weekly clock starts. The activation metric. */
  PACT_ACTIVATED: "pact_activated",
  /** A week was marked kept. The retention metric, carries the week. */
  PACT_WEEK_KEPT: "pact_week_kept",
  /** A week lapsed unkept and scarred. The churn leading indicator. */
  PACT_WEEK_SCARRED: "pact_week_scarred",
  /**
   * The member owned a miss rather than letting it lapse, and said why.
   * Carries the reason, so the funnel can separate "forgot" (fixable with
   * a nudge) from "lost my nerve" (a content problem) from "life happened"
   * (neither). Fires alongside PACT_WEEK_SCARRED, never instead of it: the
   * scar is the same scar and the churn metric must not miss it.
   */
  PACT_WEEK_MISSED_OWNED: "pact_week_missed_owned",
  /** A keep was taken back inside the live week. Watch for abuse. */
  PACT_KEEP_UNDONE: "pact_keep_undone",
  /** The pact was broken by the member. Churn, with what it cost them. */
  PACT_BROKEN: "pact_broken",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;
