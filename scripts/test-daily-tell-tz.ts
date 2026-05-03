/**
 * Pure tests for lib/push/timezone. No DB, no network. Run:
 *   npx tsx scripts/test-daily-tell-tz.ts
 *
 * Exits non-zero on any failure so the script can be a poor-man's CI gate.
 */

import {
  getLocalTimePoint,
  getLocalTimePointSafe,
  shouldSendDailyTellPush,
} from "../lib/push/timezone";

let pass = 0;
let fail = 0;

function check(label: string, cond: boolean, detail?: unknown): void {
  if (cond) {
    pass++;
    console.log(`  ✓ ${label}`);
  } else {
    fail++;
    console.error(`  ✗ ${label}`, detail ?? "");
  }
}

console.log("\nlib/push/timezone tests\n");

// ---------------------------------------------------------------------------
// getLocalTimePoint: same UTC moment, different timezones
// ---------------------------------------------------------------------------
{
  // 2026-05-03 12:00 UTC. That's 22:00 in Sydney (UTC+10), 08:00 in NYC
  // (UTC-4 during DST), 13:00 in London (UTC+1 during DST), 17:30 in
  // India (UTC+5:30 always).
  const moment = new Date("2026-05-03T12:00:00Z");

  const ny = getLocalTimePoint("America/New_York", moment);
  check(
    "NYC at 12:00 UTC is hour 8 on 2026-05-03",
    ny.hour === 8 && ny.date === "2026-05-03",
    ny,
  );

  const sydney = getLocalTimePoint("Australia/Sydney", moment);
  check(
    "Sydney at 12:00 UTC is hour 22 on 2026-05-03 (AEST in May)",
    sydney.hour === 22 && sydney.date === "2026-05-03",
    sydney,
  );

  const india = getLocalTimePoint("Asia/Kolkata", moment);
  check(
    "Kolkata at 12:00 UTC is hour 17 on 2026-05-03",
    india.hour === 17 && india.date === "2026-05-03",
    india,
  );

  const utc = getLocalTimePoint("UTC", moment);
  check(
    "UTC at 12:00 UTC is hour 12 on 2026-05-03",
    utc.hour === 12 && utc.date === "2026-05-03",
    utc,
  );
}

// ---------------------------------------------------------------------------
// Day-rollover behaviour
// ---------------------------------------------------------------------------
{
  // 2026-05-03 23:30 UTC. In Sydney (UTC+10) that's 09:30 on May 4.
  const moment = new Date("2026-05-03T23:30:00Z");
  const sydney = getLocalTimePoint("Australia/Sydney", moment);
  check(
    "Sydney sees the next calendar day after UTC midnight rollover",
    sydney.hour === 9 && sydney.date === "2026-05-04",
    sydney,
  );

  // In LA (UTC-7 PDT in May) that's 16:30 on May 3 still.
  const la = getLocalTimePoint("America/Los_Angeles", moment);
  check(
    "LA still on May 3 when UTC is rolling into May 4",
    la.hour === 16 && la.date === "2026-05-03",
    la,
  );
}

// ---------------------------------------------------------------------------
// Safe variant tolerates bad timezone strings
// ---------------------------------------------------------------------------
{
  const moment = new Date("2026-05-03T12:00:00Z");
  const safe = getLocalTimePointSafe("Not/A/Real/Tz", moment);
  check(
    "Bad timezone falls back to UTC (hour 12)",
    safe.hour === 12 && safe.date === "2026-05-03",
    safe,
  );
  const nullSafe = getLocalTimePointSafe(null, moment);
  check(
    "Null timezone falls back to UTC",
    nullSafe.hour === 12 && nullSafe.date === "2026-05-03",
    nullSafe,
  );
}

// ---------------------------------------------------------------------------
// shouldSendDailyTellPush: decision matrix
// ---------------------------------------------------------------------------
{
  const local = { hour: 8, date: "2026-05-03" };

  // Case A: never sent before, hour matches → SEND
  check(
    "First-time send when hour matches",
    shouldSendDailyTellPush({
      preferredHour: 8,
      lastSentDate: null,
      currentLocal: local,
    }) === "2026-05-03",
  );

  // Case B: already sent today → SKIP
  check(
    "Skip when already sent today",
    shouldSendDailyTellPush({
      preferredHour: 8,
      lastSentDate: "2026-05-03",
      currentLocal: local,
    }) === null,
  );

  // Case C: sent yesterday, hour matches today → SEND
  check(
    "Send again the next day after a previous send",
    shouldSendDailyTellPush({
      preferredHour: 8,
      lastSentDate: "2026-05-02",
      currentLocal: local,
    }) === "2026-05-03",
  );

  // Case D: hour is BEFORE preferred → SKIP (user wants later in the day)
  check(
    "Skip when current hour is earlier than preferred",
    shouldSendDailyTellPush({
      preferredHour: 9,
      lastSentDate: null,
      currentLocal: local,
    }) === null,
  );

  // Case D2: hour is AFTER preferred → SEND (catch-up after a missed hour)
  check(
    "Catch-up send when current hour is past preferred and not yet sent",
    shouldSendDailyTellPush({
      preferredHour: 7,
      lastSentDate: null,
      currentLocal: local,
    }) === "2026-05-03",
  );

  // Case E: midnight preference + 23:00 sent yesterday: hour=0, dates differ → SEND
  check(
    "Midnight preference (hour 0) sends correctly",
    shouldSendDailyTellPush({
      preferredHour: 0,
      lastSentDate: "2026-05-02",
      currentLocal: { hour: 0, date: "2026-05-03" },
    }) === "2026-05-03",
  );

  // Case F: 11pm preference, currently 11pm, never sent → SEND
  check(
    "Late-night preference (hour 23) sends correctly",
    shouldSendDailyTellPush({
      preferredHour: 23,
      lastSentDate: null,
      currentLocal: { hour: 23, date: "2026-05-03" },
    }) === "2026-05-03",
  );
}

console.log(`\n${pass} pass, ${fail} fail\n`);

if (fail > 0) {
  process.exit(1);
}
