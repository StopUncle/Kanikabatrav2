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
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;
