/**
 * tn-2-1, "The Boss's 6 p.m. email"
 *
 * Toxic-Narc track, Level 2, order 1. Opens L2, the narc boss.
 *
 * Premise: Friday 5:58 p.m. you are packing up when an email arrives
 * from your manager. "Just wanted to circle back on a few things
 * before Monday, do you have thirty minutes this weekend? No
 * pressure :)" The scenario teaches the covert workplace narc
 * register, passive-aggressive weekend time theft, weaponised
 * politeness, the implied-cost of a boundary that was never actually
 * a boundary because it was never actually asked for.
 *
 * Teaches:
 *  - The "no pressure" clause as threat, not concession
 *  - The smiley face as institutional gaslight
 *  - How to reply in writing so the reply survives being forwarded
 *  - When to loop in HR / skip-level / the ally at work
 *  - The paper trail as infrastructure, not aggression
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, PRIYA } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1, the email
  // ===================================================================
  {
    id: "friday-5-58",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Friday, 5:58 p.m. you are packing your laptop. The week was, honestly, ordinary. You have plans tonight, nothing dramatic, just a dinner you told your partner you would be home for by 7:30. The laptop goes into the bag. The bag zips. You reach for your coat. The phone, on the desk, chimes.",
      },
      {
        speakerId: null,
        text: 'The email is from your manager. Subject: "Quick one, weekend check-in?" Body: "Hi, just wanted to circle back on a few things before Monday. Do you have thirty minutes this weekend? Nothing formal, just want to align before we go into next week. No pressure :). J."',
      },
      {
        speakerId: "inner-voice",
        text: "Clock the construction of that email. One, it was sent at 5:58 p.m. on a Friday, three minutes after her stated hard end-of-week, which means she either stayed late specifically to send it or composed it earlier and sat on it to hit the window when you could not respond immediately. Two, the subject says 'quick one' and the body says 'thirty minutes,' which is the covert register's signature discrepancy: the framing is small, the ask is not. Three, 'no pressure' followed by a smiley face is the line that makes this the scenario it is.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Name the move. 'No pressure' in an email from a manager is a threat dressed as a concession. If there were actually no pressure, the email would not exist, a manager with no pressure to apply simply has a Monday-morning conversation. The phrase appears specifically because the sender needs you to feel the pressure while also having a linguistic receipt that says she did not apply any. The smiley is the institutional gaslight, it says 'you would be unreasonable to read this as pressure.'",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-immediately",
        text: "Reply now. 'Sure, I can do Saturday morning, 10 a.m. what's easiest for you?' Send. Keep the evening.",
        tactic: "Accepting the weekend without friction. The friction-free acceptance teaches her that this is a working pattern, she will do this again, probably in six to ten days, and each repetition normalises the weekend-time claim.",
        nextSceneId: "accepted-frictionless",
      },
      {
        id: "reply-cold",
        text: "Reply briefly: 'I'm offline this weekend. Monday 9 a.m. works if you want to put fifteen minutes on my calendar.' Send.",
        tactic: "The canonical reply. Closes the weekend without naming the manipulation. Offers a specific Monday slot so the legitimate 'align before next week' claim is addressed. Fifteen minutes instead of thirty, resize the ask to the actual need.",
        nextSceneId: "cold-reply-sent",
        isOptimal: true,
      },
      {
        id: "do-not-reply",
        text: "Close the laptop. Do not reply tonight. Handle it Saturday morning when you are rested.",
        tactic: "Delay the reply. Costs you a background-rumination Saturday morning, but keeps the Friday evening clean. A viable move if you know yourself and can actually not think about the email.",
        nextSceneId: "delayed-response",
        isOptimal: true,
      },
      {
        id: "text-priya",
        text: "Screenshot the email. Send it to Priya. 'is this what i think it is?'",
        tactic: "Route the read through the workplace ally. Priya has seen this register in her own manager; she will give you the calibration in two minutes that you would otherwise spend forty minutes producing yourself.",
        nextSceneId: "priya-reads",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A, cold reply sent
  // ===================================================================
  {
    id: "cold-reply-sent",
    backgroundId: "office",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You type the sentence. You read it back. You send. The reply goes out at 6:03 p.m. you leave the office. You make the 7:30 dinner.",
      },
      {
        speakerId: "inner-voice",
        text: "Note what you did and what you did not do. You did not justify the boundary. You did not apologise. You did not explain your weekend plans. You did not caveat with 'happy to help if it is urgent.' You named Monday, named a duration (fifteen minutes instead of thirty, you resized the ask), and closed. The reply is, in the file your manager is quietly building, unambiguous and unembellished. That file-entry is exactly what you want it to be.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She will reply. The reply will take one of three registers. One, 'great, see you then!' with a cheerful exclamation point, which means the weekend ask was indeed probing for compliance and she is now calibrating down. Two, 'well, it really needs to happen this weekend, I was hoping we could work together on this,' which is the open escalation. Three, silence until Monday, at which point she will open the meeting with a specific comment about 'availability.' All three are information. None require action from you this evening.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-morning",
  },

  // ===================================================================
  // ACT 2B. Priya reads
  // ===================================================================
  {
    id: "priya-reads",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        text: '"yes. It is what you think it is. The smiley is the tell. She does this to me about once every three weeks now. Real talk, reply once, in writing, name a monday slot, do not apologise."',
        emotion: "knowing",
      },
      {
        speakerId: "priya",
        text: '"you have fifteen minutes to reply before this email starts costing you the evening. Write the sentence, send it, close the laptop, come out for the drink at 7:30."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Priya compressed the scenario into three operational moves, reply once, in writing, Monday slot, no apology and handed you the specific fifteen-minute deadline before the email starts eating your evening. That fifteen-minute frame is the thing you did not know you needed. It prevents the reply from becoming a project.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "cold-reply-sent",
  },

  // ===================================================================
  // ACT 2C, delayed response
  // ===================================================================
  {
    id: "delayed-response",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You close the laptop. You make the dinner. The dinner is, genuinely, fine, you are present at it for about 80% of the minutes. The other 20% your mind is drafting reply language. By 10 p.m. the email is still in your inbox, unread-acknowledged.",
      },
      {
        speakerId: null,
        text: "Saturday, 8:14 a.m. you open the laptop with coffee. You read the email again. It is, in the Saturday-morning light, smaller than it was Friday night, the phrasing is manipulative, but the manipulation is garden-variety, not catastrophic.",
      },
      {
        speakerId: "inner-voice",
        text: "The Saturday-morning reading is a different reading. You have more data, the sixteen hours of not-replying have told you, specifically, that she did not escalate, did not call your phone, did not send a follow-up. That information calibrates the ask. She was probing, not requiring.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-morning",
  },

  // ===================================================================
  // ACT 2D, accepted frictionless
  // ===================================================================
  {
    id: "accepted-frictionless",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "Your manager replies within nine minutes. 'Perfect, Saturday 10 a.m., I'll send the invite.' The invite arrives. It is for sixty minutes, not thirty.",
      },
      {
        speakerId: "inner-voice",
        text: "The ask expanded between 5:58 and 6:07 p.m. the original 'thirty minutes' was the probe; the actual meeting is sixty. This is not an error. This is the standard shape of a covert-narc ask, start with the smaller frame to secure the yes, then expand to the real size after the yes is committed.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You have two choices now. One, push back on the invite length, restore the thirty minutes, accept the relational cost of correcting her. Two, accept the sixty, note it in your workplace log, and resize the next ask before it happens. Both are legitimate. The first costs you a small amount of friction today; the second costs you the full hour Saturday plus teaches her that sixty-minute expansions stick.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "resize-invite",
        text: "Reply: 'I can do thirty minutes, 10 to 10:30, need to head out after.' Do not explain where.",
        tactic: "Hold the original frame. Cite a personal commitment without specifics. The 'need to head out' is the clock-set; the 'after' is deliberately vague, she does not get the why.",
        nextSceneId: "ending-resized",
        isOptimal: true,
      },
      {
        id: "accept-sixty",
        text: "Accept the sixty-minute invite. Note it in your workplace log. Reassess the pattern at the three-event mark.",
        tactic: "Take the loss today, engineer the improvement over three to six weeks. Not wrong; costly this week.",
        nextSceneId: "ending-sixty-accepted",
      },
      {
        id: "withdraw-entirely",
        text: "Reply: 'Actually, something's come up, I need to take the weekend. Monday morning works.' Cancel the meeting.",
        tactic: "Correction after the yes. Looks flakier than the clean no would have on Friday, but sometimes the retraction is the right move. Expect residual friction on Monday.",
        nextSceneId: "ending-late-retraction",
      },
    ],
  },

  // ===================================================================
  // ACT 3, the Saturday morning
  // ===================================================================
  {
    id: "saturday-morning",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 8:14 a.m. coffee. Your reply, if you sent one Friday evening, is sitting in the Sent folder. If you deferred, your reply is in draft. Either way, the weekend is yours in a specific way, it is not free of the email, but the email is no longer the main event.",
      },
      {
        speakerId: "inner-voice",
        text: "What you do with the next step is determined by what your manager does in her reply. She has three moves, and each requires a different response from you. Learn the moves now so you recognise them when they arrive.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "she-accepted",
        text: "She replied with 'great, see you Monday 9!', the cheerful calibration-down.",
        tactic: "She was probing; the probe failed; she is calibrating down for now. The response from you is clean Monday execution, be early, be prepared, give her no surface to re-escalate.",
        nextSceneId: "clean-monday",
        isOptimal: true,
      },
      {
        id: "she-escalated",
        text: "She replied with 'well, it really needs to happen this weekend', open escalation.",
        tactic: "The escalation is data. You reply once, in writing, holding Monday, and you start a paper trail. This is where the workplace log becomes active infrastructure rather than passive insurance.",
        nextSceneId: "she-escalated",
        isOptimal: true,
      },
      {
        id: "she-went-silent",
        text: "Nothing from her overnight. Silence until Monday.",
        tactic: "Silent escalation, she will open the Monday meeting with a comment about 'availability' or 'flexibility.' Prepare the one-sentence response before you walk in.",
        nextSceneId: "silent-then-monday",
        isOptimal: true,
      },
    ],
  },

  {
    id: "clean-monday",
    backgroundId: "office",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Monday, 8:57 a.m. you are at your desk three minutes early. You have three talking points written on a notecard in your pocket. The meeting starts on time. Your manager opens with 'thanks for making time', a phrase that has a slight edge if you are listening for it, and is perfectly neutral if you are not.",
      },
      {
        speakerId: "inner-voice",
        text: "That was the calibration-down. 'Thanks for making time' carries a 2% residue of Friday's failed probe, a faint implication that you did, somehow, owe her time you were unavailable for. Do not take the bait. Do not acknowledge the residue. Answer the three substantive points on your notecard, crisply, in fifteen minutes, and close the meeting on your own schedule.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-clean-monday",
  },

  {
    id: "she-escalated",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Her reply: 'I really think we need to work on this together this weekend, it affects the team's Monday. I am disappointed that this isn't a priority for you.' The 'I am disappointed' is the escalation marker. The 'affects the team' is the manufactured-urgency move.",
      },
      {
        speakerId: "inner-voice",
        text: "Read the construction. She added 'I am disappointed', a direct emotional pressure payload from a manager to a direct report, which in most corporate cultures is non-standard register. She added 'affects the team,' which outsources the pressure to a constituency that is not in the email. And she added 'isn't a priority for you,' which is a character attribution disguised as an observation.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Now you reply, once, in writing, with the Monday slot held. You do not argue with the disappointment. You do not engage the team framing. You name the Monday time and you stop. If she escalates further in writing, that is the moment the workplace log becomes a forwardable artefact rather than a private one. Write the reply deliberately. This one might leave your inbox and land in your skip-level's.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-monday",
        text: "Reply: 'Monday 9 a.m. still works. I will bring the three items on next week's slate. See you then.' Send.",
        tactic: "Do not argue. Do not explain. Name the Monday time, name what you will bring, close. The brevity is the discipline.",
        nextSceneId: "ending-escalation-held",
        isOptimal: true,
      },
      {
        id: "cc-skip-level",
        text: "Reply as above, but CC your skip-level manager: 'Looping in Mike for visibility on our Monday touch-base.'",
        tactic: "The skip-level loop is a real escalation. Use when you have pattern data (three or more similar emails) and an existing relationship with Mike. On a first escalation, it can read as trigger-happy.",
        nextSceneId: "ending-skip-level-looped",
      },
      {
        id: "defend-yourself",
        text: "Reply: 'I do think this is a priority. I just need to keep the weekend personal. Happy to make Monday morning a longer slot if that helps.'",
        tactic: "Defending against the 'not a priority' framing is the trap. The framing was the bait; addressing the bait tells her the bait works. The slot extension is the ask she was really making.",
        nextSceneId: "ending-defended-into-frame",
        isOptimal: false,
      },
    ],
  },

  {
    id: "silent-then-monday",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Monday, 9:02 a.m. she is two minutes late to her own meeting. When she sits down, she does not apologise. She says: 'So, thanks for finding time in your busy schedule.'",
      },
      {
        speakerId: "inner-voice",
        text: "The word 'busy' is doing all the work in that sentence. She is testing whether you will apologise, laugh nervously, or defend the weekend. The correct response is none of the three. Proceed to the substance of the meeting as if the 'busy schedule' comment was a piece of weather.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "pivot-to-substance",
        text: 'Open your notecard. "Three items on my side, the Collins deliverable, the timeline for Q2, and the hiring backfill. Shall I start with Collins?"',
        tactic: "The pivot-to-substance move. Denies the 'busy schedule' comment any oxygen. Drives the meeting toward the actual work. She will either follow (calibration-down) or she will try the dig again (pattern data).",
        nextSceneId: "ending-pivoted",
        isOptimal: true,
      },
      {
        id: "engage-the-dig",
        text: '"Sorry. I had a busy weekend."',
        tactic: "You apologised for having a weekend. That sentence is now on record. If she ever cites 'accountability concerns' in a review, this micro-apology is the first exhibit.",
        nextSceneId: "ending-apologised-for-weekend",
        isOptimal: false,
      },
      {
        id: "name-it",
        text: '"I noticed the weekend email. I would prefer weekend asks go through a different channel if they are urgent, otherwise I will default to Monday."',
        tactic: "Name the pattern in the meeting, on the record. High-risk, high-reward. Works if your relationship with her has the standing to handle a direct boundary statement; backfires if not. Test on Priya first.",
        nextSceneId: "ending-named-in-room",
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-clean-monday",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Monday That Wasn't",
    endingSummary:
      "You held the weekend. The Friday-evening reply closed the ask without apology. She calibrated down Saturday morning to a cheerful Monday slot. The Monday meeting ran fifteen minutes, substantive, closed on your schedule. The weekend-ask will arrive again, in approximately three to six weeks, in a different wrapper and you now know the shape of the reply that makes it evaporate. Write it down. Reuse it. This is how a covert-narc boss gets slowly re-trained to the register you are actually willing to work in.",
    endingLearnReference: "beige-protocol-strategic-boredom-weapon",
    endingLearnPrompt:
      "The covert-narc boss does not stop; she adjusts to the resistance she meets. The resistance is a few deliberate sentences delivered at the same register every time. The pattern compounds. Six months from now she will route the asks differently, not because she has changed, but because your specific responses have become unprofitable for her.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Log the Friday email in your workplace file. Dated. Verbatim. Your reply, too. Over the next year, the log will document a pattern that, if the relationship ever becomes formally contested, is your infrastructure. Keep it in a personal cloud folder, not on the work laptop.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The Collins deliverable is done by Wednesday. You take Friday afternoon off. Nobody emails.",
      },
    ],
  },

  {
    id: "ending-escalation-held",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Escalation Held",
    endingSummary:
      "She tried the 'I am disappointed' escalation Saturday morning. You replied once. Monday 9 a.m., three items on the slate, closed. She did not reply to your reply, which is itself information. Monday's meeting was tense for the first two minutes and substantive for the remaining thirteen. You logged the Saturday email dated and verbatim in your personal workplace file. This is the infrastructure that protects you over twelve to eighteen months if the relationship formally contests. You also taught her, in one reply, that the emotional-pressure register does not produce the behaviour she wanted. Over six months she will stop using it on you specifically. She will keep using it on others.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The log is the infrastructure. The single reply that held Monday was the event. The compounding over the next year is the benefit. You will, with high probability, encounter a version of this scenario five to eight more times before your next role change. Each time, the reply is approximately the same sentence.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-pivoted",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pivot",
    endingSummary:
      "She opened with the 'busy schedule' dig. You pivoted to substance inside four seconds. She followed, she had to, because you had declined to give the dig a surface to land on. The meeting ran sixteen minutes. She cited nothing about availability, nothing about the weekend, nothing about your priorities. The Friday email is, effectively, a non-event on the institutional record. The dig she tried in the room cost her about two percent of the standing she had coming in, because a manager who opens a meeting with a passive-aggressive comment about a direct report's weekend is visible to everyone in the room as doing exactly that. You will never mention the dig. You do not need to.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Pivot-to-substance is one of the most valuable single skills you will develop in a career. It generalises beyond narc bosses, it works in negotiations, in press, in family dinners, in any situation where someone tries to wrap a dig in social politeness. The skill is the speed. Four seconds or less. You practise it by rehearsing the substance beforehand, which is why the notecard matters.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-resized",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Resized Meeting",
    endingSummary:
      "You caught the scope expansion, sixty minutes from thirty and resized it back. She accepted. The meeting ran thirty minutes Saturday at 10 a.m. you had your afternoon back. You noted the scope-expansion attempt in your workplace log as a dated entry; this is the third entry of this shape in the log, which is now approaching pattern-data status. At five entries you have the basis for a conversation with HR or your skip-level if the pattern warrants. For now, the log sits. The weekend is partially held.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Scope-expansion after a conditional yes is the most common covert-narc move across contexts. You now have both the detection move (noticing that the invite is larger than the ask) and the response move (resize, without apology, with a vague personal commitment). Export these moves to your dating, family, and community contexts. They are all the same shape.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-sixty-accepted",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Sixty Accepted",
    endingSummary:
      "You accepted the sixty-minute invite. The Saturday meeting ran sixty-four minutes. The four-minute overage was not accidental. You noted the scope-expansion and the timing-overage in your workplace log. Over the next three occurrences you will watch whether the sixty becomes the new default, if it does, the Friday reply that resets the frame is a stronger move than the corrections. You lost the Saturday afternoon; you gained a dated entry. Fair exchange, if a single one. Costly if it becomes a pattern.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The three-event rule. Three instances of a specific behaviour is the minimum for pattern confirmation; one is an incident, two is a coincidence, three is policy. Your manager has now had one instance. Watch for two and three over the next six weeks. If the pattern confirms, the reset conversation is a different category of move.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-late-retraction",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Late Retraction",
    endingSummary:
      "You accepted the meeting, then retracted it Saturday morning. She accepted the retraction in one word: 'Fine.' One-word replies from a covert-narc manager are data, she is, briefly, cold. By Monday she has recovered the working register, but there is a micro-residue. Over two to three weeks it will fade. The lesson is not that you should not have retracted; it is that the cleaner version was the Friday-evening no. The retraction is permitted; it is, operationally, about thirty percent costlier than the original no would have been.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Retractions are allowed. Retractions are also expensive. The exchange rate, initial-yes plus retraction is roughly 1.3 times the cost of initial-no, is worth learning because it affects many decisions. When you are uncertain at the moment of the ask, defer rather than accept; deferring is free, retracting is not.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-skip-level-looped",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Skip-Level Loop",
    endingSummary:
      "You CC'd Mike on the reply. Mike replied with a short acknowledgement, 'thanks for the heads-up, talk Monday', which landed as professional from Mike and as an escalation from you in the shared thread. Your manager read it at 11:04 a.m. Saturday. She did not reply. By Monday she is measurably cooler to you. The Monday meeting happens at 9 a.m. as you proposed, but it runs twelve minutes instead of fifteen, and nothing of substance beyond the weekend scheduling is discussed. Over the next six weeks the relationship calibrates to a more formal register. This is not a bad outcome, formal is often better than warm-but-manipulative but it is a real cost that you should only pay if you have pattern data supporting it. A first-escalation skip-level loop is the move that defines the rest of the working relationship.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "If you had three prior dated entries in the workplace log of similar behaviour, the skip-level loop is the correct move. On a single-instance basis, it is premature. Next time, build to the loop. Three entries, then an explicit verbal boundary with the manager, then, if that fails, the loop. The sequencing matters as much as the move itself.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-named-in-room",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Boundary in the Room",
    endingSummary:
      "You named the weekend pattern in the meeting. She said 'I hear you' in the specific register that means she did not. The next four weeks her communications to you are notably cooler and more procedural. At week five, she schedules a skip-level catch-up with Mike, not about you, but with you not in the room. You learn about it from Priya. This outcome is neither catastrophic nor clean; the direct-naming move changed the temperature of the relationship permanently. Whether that was a win depends on what the relationship was going to produce otherwise. Note the cost precisely.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naming a pattern to the person running it is a move with a high variance in outcome. It works best when you have authority (tenure, results, a specific seniority relative to the person), it is being delivered as information rather than as grievance, and it is the third or fourth attempt, not the first. If any of those three conditions is absent, the move tends to cost more than it returns. File this away.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-apologised-for-weekend",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingTitle: "The Weekend Apologised For",
    endingSummary:
      "You said 'sorry. I had a busy weekend' in the Monday meeting. Those six words are now on the institutional record. In your next performance review, two quarters away, the phrase 'accountability' will appear in your feedback, and you will not be able to trace it to this specific micro-apology, but it will be there because this moment is. The lesson is not that you were weak. The lesson is that the dig was small enough to not feel like a trap, and the apology was automatic enough to feel like politeness. Most of the damage in a covert-narc-boss relationship is done in apologies of this exact size.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Rehearse the non-apology. Literally, practise saying, out loud, in your kitchen, 'let's get into the three items' as a first-sentence response to a passive-aggressive opener. Your mouth will know the sentence even when your nervous system is under pressure. This is one of the cheapest and most valuable skills you will build in your career.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-defended-into-frame",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook. How They Actually Operate",
    endingTitle: "Defended Into the Frame",
    endingSummary:
      "You replied to her Saturday escalation with 'I do think this is a priority. I just need to keep the weekend personal.' By defending against the 'not a priority' framing, you accepted the framing. She extended the Monday slot to forty-five minutes. The meeting ran fifty-two. The Friday weekend-email will now arrive once a month, because the defensive-reply pattern has taught her that the approach works on you, not by producing a yes, but by producing accountability-language from you that she can reference later. The log is not catching this; you would need to log not only her messages but your defensive replies, and most people cannot audit their own defensiveness in real-time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The pattern you just locked in takes about six months to unwind. The unwinding is possible, it requires a specific reset email ('going forward, weekend work requests go through X process') plus a sustained behaviour change. But recognising the pattern, retroactively, is the first move. Save the Saturday reply; re-read it next month; note the defensive structure. That is the diagnostic.",
        emotion: "sad",
      },
    ],
  },
];

export const toxicNarc21: Scenario = {
  id: "tn-2-1",
  title: "The Boss's 6 p.m. email",
  tagline: "Friday, 5:58 p.m. 'No pressure :)' is a threat dressed as a concession.",
  description:
    "Opens toxic-narc L2, the covert workplace narc register. Your manager has sent you an email at 5:58 p.m. on a Friday asking for thirty minutes 'sometime this weekend.' The scenario teaches the specific move set of the covert-narc boss: the no-pressure clause as threat, the smiley as institutional gaslight, the scope-expansion after a conditional yes, and the reply-once-in-writing discipline that protects the weekend and builds the paper trail.",
  tier: "premium",
  track: "toxic-narc",
  level: 2,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "intermediate",
  category: "professional",
  xpReward: 260,
  badgeId: "weekend-held",
  startSceneId: "friday-5-58",
  prerequisites: ["tn-1-2"],
  tacticsLearned: [
    "'No pressure' is a threat dressed as a concession",
    "Reply once, in writing, with a specific Monday slot; no apology, no explanation",
    "Resize the ask at the moment of yes (thirty minutes instead of thirty, then fifteen instead of thirty)",
    "The three-event rule for workplace-pattern confirmation",
    "Pivot-to-substance inside four seconds when a meeting opens with a passive dig",
    "The workplace log as personal infrastructure, dated entries, verbatim, in a non-work cloud",
  ],
  redFlagsTaught: [
    "The smiley face as institutional gaslight",
    "Scope-expansion in the reply (thirty minutes in the ask, sixty in the invite)",
    "'I am disappointed' from a manager as an emotional-pressure payload beyond standard register",
    "'Thanks for finding time in your busy schedule' as the residue-dig after a failed probe",
    "Micro-apologies in Monday meetings that end up in two-quarter-out performance reviews",
  ],
  reward: {
    id: "weekend-held",
    name: "The Weekend Held",
    description:
      "One Friday-evening reply, in writing, specific Monday slot, no apology. The covert-narc boss calibrated down.",
  },
  characters: [INNER_VOICE, PRIYA],
  scenes,
};

export default toxicNarc21;
