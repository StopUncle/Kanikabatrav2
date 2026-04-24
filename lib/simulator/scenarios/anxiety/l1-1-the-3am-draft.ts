/**
 * anx-1-1 — "The 3 a.m. Draft"
 *
 * Anxiety track, Level 1, order 1. Voice-lock scenario for the whole
 * track. Interior scenario — antagonist is not on-screen. Antagonist
 * is your own nervous system at its worst hour.
 *
 * Premise: Tuesday, 3 a.m. You broke up with Theo fifteen days ago.
 * You have been drafting a text to him for forty minutes. The question
 * is not whether to send it. The question is what you do with your
 * nervous system for the next eleven minutes.
 *
 * Teaches:
 *  - urge-surfing vs. urge-obedience
 *  - the draft as the spiral made visible
 *  - The Critic and The Inner Voice are two different speakers
 *  - the eleven-minute outlast window
 *
 * Voice reference: reference/KANIKA-VOICE.md + reference/TRACK-anxiety.md.
 * Same register as the Maris arc, but the grade is turned inward.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, NOOR, THE_CRITIC } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the draft
  // ===================================================================
  {
    id: "the-3am-spiral",
    backgroundId: "apartment",
    mood: "mysterious",
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: null,
        text: "3:04 a.m. Tuesday. The blue of the phone is the only light in the bedroom. You have been awake since 2:18. You did not intend to open the thread. You opened it twenty-eight minutes ago.",
      },
      {
        speakerId: null,
        text: "The draft reads, in the current version: 'Hey — I know this is late. I was thinking about what you said in September about the train station. I don't think I ever responded properly. I'm sorry.'",
      },
      {
        speakerId: null,
        text: "The previous seven versions of the draft are saved in a note on your phone because you have been editing it for, honestly, closer to forty minutes.",
      },
      {
        speakerId: "the-critic",
        text: "Obviously you have to send it. Of course you do. He is going to think about you tonight whether you send it or not. You may as well be the author of the thought.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Note which voice you just heard, and note that it is not mine. That sentence — 'obviously,' 'of course,' 'may as well be the author' — is a particular speaker. It has a name. For the next ninety seconds, call it the Critic, because separating a voice from your own is the first move available to you at 3 a.m.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic's job is not to tell you what is true. The Critic's job is to make the discomfort stop in the fastest, loudest, least correct way available. Sending the text will stop the discomfort. It will also reopen a channel you closed fifteen days ago. The Critic does not care about day sixteen. The Critic cares about the next forty seconds.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The question in front of you is not whether to send the text. The question is what to do with your body between now and 3:15 a.m.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "send-the-text",
        text: "Send it. Your thumb has been on the button for a minute. Let the consequence be the consequence.",
        tactic: "Urge-obedience. The draft wins. Short-term relief; medium-term reopened channel you spent fifteen days closing.",
        nextSceneId: "sent-the-text",
      },
      {
        id: "put-phone-down",
        text: "Put the phone face-down on the nightstand. Sit with the discomfort. Do not reach for anything.",
        tactic: "Urge-surfing. The hardest version of this scene. Also the one with the cleanest morning attached.",
        nextSceneId: "phone-down",
        isOptimal: true,
      },
      {
        id: "text-noor",
        text: "Screenshot the draft. Send the screenshot to Noor with 'talk me down.'",
        tactic: "Route the spiral through an ally who is awake and knows your history. Noor will respond. Noor has been exactly here.",
        nextSceneId: "texted-noor",
        isOptimal: true,
      },
      {
        id: "delete-and-delete",
        text: "Delete the draft. Delete the thread. Delete Theo's contact. All three, now, without thinking.",
        tactic: "Nuclear. Looks decisive, often isn't — the spiral reconstitutes itself ninety seconds later with no draft to contain it, and you will re-add him from another device by lunch.",
        nextSceneId: "nuclear-delete",
      },
    ],
  },

  // ===================================================================
  // ACT 2A — sent (the obedient path)
  // ===================================================================
  {
    id: "sent-the-text",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "The text sends. Your thumb is off the button before the animation finishes. The blue bubble appears, and your body registers a sensation that is almost physical — a half-second drop in the chest, a small relief that lasts approximately the duration of an exhale.",
      },
      {
        speakerId: "the-critic",
        text: "Of course he is going to read it. He always reads them. He is going to read it right now, actually. Check if the dots appear.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The relief you just felt is the reason the urge fired in the first place. Your nervous system had a specific neurochemistry problem at 3:04 a.m. and you solved it by sending a text. The problem was not that Theo needed to hear from you. The problem was that you needed the relief. You have now trained your brain, rather precisely, that the escape from 3 a.m. rumination is to send the text.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "That training compounds. You will be in this scene again, about another man, in about seven weeks.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stare-at-dots",
        text: "Watch the message for 'Read.' Refresh the thread. Refresh again.",
        tactic: "Post-send hypervigilance. The spiral gets a second act. You will not sleep now.",
        nextSceneId: "ending-chased",
        isOptimal: false,
      },
      {
        id: "phone-away-anyway",
        text: "Put the phone face-down. You sent it. You cannot un-send it. Sit with that for the next eleven minutes without checking.",
        tactic: "Late discipline is still discipline. The text is gone; the scene is still yours to end clean.",
        nextSceneId: "sent-sat",
        isOptimal: true,
      },
      {
        id: "send-another",
        text: "Compose a follow-up. 'Sorry, ignore that, I was half-asleep.' Rewrite, soften, send.",
        tactic: "The double-text spiral. Every message halves your credibility with yourself and with him.",
        nextSceneId: "ending-chased",
        isOptimal: false,
      },
    ],
  },

  {
    id: "sent-sat",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "The phone is face-down on the nightstand. The apology text is gone. You are not going to get it back. You are not going to check for dots. For eleven minutes, you are going to lie on your back and look at the ceiling and let the discomfort do whatever it needs to do.",
      },
      {
        speakerId: "inner-voice",
        text: "Discomfort at 3 a.m. is not dangerous. It is uncomfortable. These are two rather different categories, and the Critic routinely confuses them on your behalf. Notice what your body actually needs right now. It is not an answer from Theo. It is about ninety seconds of being still.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "At 3:17 a.m. your eyes close without you noticing. At 3:34 you are asleep.",
      },
    ],
    nextSceneId: "ending-sent-survived",
  },

  // ===================================================================
  // ACT 2B — phone down (the optimal path)
  // ===================================================================
  {
    id: "phone-down",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You put the phone face-down on the nightstand. The room goes dark for the first time in forty-eight minutes. You lie on your back.",
      },
      {
        speakerId: "the-critic",
        text: "Of course you could still send it. The phone is still right there. You would sleep immediately if you just sent it. You know that. Stop pretending you don't.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Hear the Critic attempting its second pass. It has a predictable move list. One — reframe the urge as already-decided. Two — offer a fast relief in exchange for a small concession. Three — imply you are being dishonest with yourself. All three in the space of two sentences just now. You were raised by it. You can name each move as it happens.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Now the actual work. The urge to send is not a thought. It is a sensation in your chest. Sensations are finite. This one will peak in about four minutes and then it will be over. Your entire job between now and then is to not move your hand toward the nightstand.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "outlast",
        text: "Do nothing. Breathe. Let the sensation peak and pass. Eleven minutes, maximum.",
        tactic: "The core discipline of the track. Urge-surfing. The sensation peaks; the peak always ends; the morning version of you wakes up in the bedroom of someone who did not send the text.",
        nextSceneId: "outlasted",
        isOptimal: true,
      },
      {
        id: "water-glass",
        text: "Get up. Walk to the kitchen. Drink a full glass of water. Walk back. The phone stays on the nightstand.",
        tactic: "Motor intervention. Moving your body interrupts the rumination loop more reliably than thinking about moving your body.",
        nextSceneId: "water-then-sleep",
        isOptimal: true,
      },
      {
        id: "reach-for-phone",
        text: "Reach for the phone anyway. One last look at the draft.",
        tactic: "The Critic wins the second pass. Four minutes later you will be composing version nine.",
        nextSceneId: "the-3am-spiral",
      },
    ],
  },

  {
    id: "outlasted",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "The peak arrives at about 3:07. For ninety seconds it feels genuinely intolerable. Your hand twitches toward the nightstand once. You do not move it further.",
      },
      {
        speakerId: null,
        text: "At 3:09 the sensation is measurably smaller. At 3:11 you notice you are thinking about something else for the first time in fifty minutes — a memory of a sandwich you ate last Thursday, a specific one, which your brain has offered to you completely unasked.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what outlasting looks like. Not heroic, not dramatic — a strange memory about a sandwich arriving on its own, because the nervous system, given seven minutes without a reply to the urge, does its own quiet work of restoration. You did not earn the sandwich memory. Your body produced it because you stopped interrupting the process.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "At 3:23 you are asleep. The phone is still face-down. The draft is still there. In the morning you will delete it without reading it.",
      },
    ],
    nextSceneId: "ending-outlasted",
  },

  {
    id: "water-then-sleep",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "The kitchen tiles are cold through your socks. The light above the sink is warmer than the phone light was. You drink the glass of water slowly, like someone has told you to.",
      },
      {
        speakerId: "inner-voice",
        text: "Motor action interrupts rumination more reliably than thought does. Walking to the kitchen in socks, drinking a glass of water, walking back — three gestures, maybe ninety seconds, and your nervous system has been given a different signal than the one it was generating for itself. This is a technique, not a mood. Remember the sequence. You will need it again.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You are back in bed at 3:11. Phone still face-down. You fall asleep before you can remember falling asleep.",
      },
    ],
    nextSceneId: "ending-outlasted",
  },

  // ===================================================================
  // ACT 2C — Noor (the ally path)
  // ===================================================================
  {
    id: "texted-noor",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You screenshot the draft. You send it to Noor. You type 'talk me down' below the image. Noor was, inexplicably, awake. Noor is always inexplicably awake.",
      },
      {
        speakerId: "noor",
        text: '"okay one sec"',
        emotion: "knowing",
      },
      {
        speakerId: "noor",
        text: '"real talk — do not send that. not because it is not well-written. it is well-written, actually. you are too good at this. that is the problem."',
        emotion: "serious",
      },
      {
        speakerId: "noor",
        text: '"you are in a specific loop right now. it is 3am. you have not slept. the draft is doing a job for you — it is making you feel close to him without the risk of him not answering. you do not actually want him to answer. you want the part BEFORE he answers."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Note what Noor just did. She did not comfort you. She did not ask how you were feeling. She read the function of your behaviour back to you in three sentences and named the part you would not admit — you want the pre-reply, not the reply. That is what a steady friend sounds like at 3 a.m. She is rather precise.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "fight-noor",
        text: '"i think i genuinely need to send something though. it\'s been 15 days. this is different."',
        tactic: "Arguing with Noor is arguing with yourself two hours ago. You know she's right. The argument is a procedural delay.",
        nextSceneId: "noor-holds",
      },
      {
        id: "thank-noor",
        text: '"okay. you are right. log off me. i am deleting the draft."',
        tactic: "Accept the read. Delete the draft. Go to sleep. This is the canonical best version of the scene.",
        nextSceneId: "noor-blessing",
        isOptimal: true,
      },
      {
        id: "ask-noor-to-stay",
        text: '"can you stay on the thread until i fall asleep? i don\'t trust myself with the phone."',
        tactic: "Ask for what you need. Ally-on-the-line is a legitimate intervention at 3 a.m. Noor will not resent it.",
        nextSceneId: "noor-stays",
        isOptimal: true,
      },
    ],
  },

  {
    id: "noor-holds",
    backgroundId: "text-screen",
    mood: "mysterious",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"i love you. i also will not agree with you at 3am that 15 days is different. it is not different. 15 days is sort of early. you know this."',
        emotion: "serious",
      },
      {
        speakerId: "noor",
        text: '"i am going to say the thing. you can get mad. log off. drink water. face the phone the other way. i am here in the morning."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor just did the second-hardest move a friend can do at 3 a.m. She refused to co-author the story you wanted to tell yourself. She did it warmly. She did not chase you off the thread. She gave you the sentence you needed to hear and then she stepped back. That is not coldness — that is a well-trained ally.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "noor-blessing",
  },

  {
    id: "noor-blessing",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"okay. close the thread. face the phone down. i will text you at 8am to ask how it went. sleep."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You delete the draft. You close the thread. You put the phone face-down on the nightstand.",
      },
      {
        speakerId: "the-critic",
        text: "Obviously she is going to be disappointed in you in the morning if you tell her you could not sleep. You should probably take something.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic is trying one more time. Note the move — it has pivoted from 'send the text' to 'take something to sleep' in under a minute. The content of the urge is interchangeable. What it wants is to interrupt the uncomfortable passage you are now in. Do not agree to a second interruption two minutes after refusing the first.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You lie on your back. At 3:28 you are asleep. The phone, face-down. The draft, gone. Noor, logged off, trusting you to do the rest.",
      },
    ],
    nextSceneId: "ending-debriefed",
  },

  {
    id: "noor-stays",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"yes. i will stay. tell me three non-theo things. any three."',
        emotion: "knowing",
      },
      {
        speakerId: "noor",
        text: '"i will talk about the most boring thing i have ever done in my adult life. you will be asleep in eleven minutes."',
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "Noor sends three paragraphs about re-tiling her bathroom. The tile she picked. The grout colour she did not pick. A contractor named Geoff.",
      },
      {
        speakerId: "inner-voice",
        text: "She is intentionally being boring. Boring is the correct register for a 3 a.m. crisis — it signals, in physiological terms, that nothing is on fire. A dramatic friend at 3 a.m. would escalate your system. A steady friend narrates grout colour until your heart rate drops.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You are asleep by the fourth paragraph. You do not send the text. You do not dream of Theo. You wake at 7:42 and there are seventeen tile-related messages waiting for you.",
      },
    ],
    nextSceneId: "ending-debriefed",
  },

  // ===================================================================
  // ACT 2D — nuclear delete (the looks-decisive path)
  // ===================================================================
  {
    id: "nuclear-delete",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You delete the draft. You delete the thread. You delete Theo's contact. The three actions take about forty seconds.",
      },
      {
        speakerId: null,
        text: "A short relief arrives. It lasts approximately one minute. Then, in its place, a sensation that is specifically worse than what you started with — the feeling of having nowhere to put your anxious energy.",
      },
      {
        speakerId: "inner-voice",
        text: "Nuclear moves look decisive from outside and feel decisive for a minute. Then the absence of the draft is just as noisy as the presence of the draft was. You still have the nervous-system problem. You just removed the tool that was containing it.",
        emotion: "concerned",
      },
      {
        speakerId: "the-critic",
        text: "Of course you still have his number memorised. You could just type it in. You could open WhatsApp on the laptop. You still have his email. Obviously.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic is already proposing three workarounds to the deletion. This is predictable. You have not solved the problem; you have rearranged the furniture in the room it lives in.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "re-add-theo",
        text: "Open your laptop. Re-add Theo. Compose the message again, properly this time.",
        tactic: "The ninety-second half-life of a nuclear delete. The spiral reconstitutes itself on a bigger screen.",
        nextSceneId: "the-3am-spiral",
        isOptimal: false,
      },
      {
        id: "phone-down-anyway",
        text: "Put the phone face-down anyway. The deletion is done. Sit with the discomfort you tried to shortcut.",
        tactic: "Salvage. Late, but still clean.",
        nextSceneId: "outlasted",
        isOptimal: true,
      },
      {
        id: "text-noor-late",
        text: "Now text Noor. 'I just deleted everything. I am a mess.'",
        tactic: "Bring the ally in after the nuclear move. Better late than never. She will read you accurately.",
        nextSceneId: "noor-post-nuke",
        isOptimal: true,
      },
    ],
  },

  {
    id: "noor-post-nuke",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"ha. okay. that is a move. real talk — that is also going to feel pointless in the morning because you still have his number in your head."',
        emotion: "knowing",
      },
      {
        speakerId: "noor",
        text: '"the point was never the number. the point is the 3am urge. the urge comes back regardless of whether he is in your contacts."',
        emotion: "serious",
      },
      {
        speakerId: "noor",
        text: '"sleep. i will text you at 8. you are going to be okay. face the phone down."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor just taught the lesson the deletion was supposed to teach you, without making you feel small about having made the attempt. Make note — that is a skill you can adopt. Help people find the thing they were reaching for without holding the wrong-reaching against them.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-debriefed",
  },

  // ===================================================================
  // SECRET PATH — the obsidian ending
  // Reached only by: put-phone-down → outlast → (no Noor, no water, no deletion).
  // Tracked via the outcome of outlasted; checked at ending resolution.
  // ===================================================================

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-outlasted",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The First Outlast",
    endingSummary:
      "You did not send the text. You did not text Noor. You did not delete Theo's contact. You did the hardest version of this scene — you put the phone face-down on the nightstand at 3:06 a.m., you lay on your back, you let the sensation peak at 3:07, and you were asleep by 3:23. In the morning the draft will still be there. You will delete it without reading it. The eleven-minute outlast window you just proved exists is now a tool you can reach for the next time, which will, certainly, be in about seven weeks.",
    endingLearnReference: "beige-protocol-strategic-boredom-weapon",
    endingLearnPrompt:
      "Urge-surfing is not glamorous. It looks like lying on your back doing nothing. That is the discipline. Remember the physiology — a sensation peaks and passes in under four minutes when you stop reinforcing it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You just did a specific rep. It was small. Nobody will ever know you did it except for you. This is how the anxious-attached nervous system gets re-trained — in three-minute privacies at 3 a.m., alone, without witnesses, without reward. Over time the reps compound. In six months you will be the person a friend in this exact state texts at 3 a.m. for help.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The draft is still in the thread. You sleep.",
      },
    ],
  },

  {
    id: "ending-debriefed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Ally on the Line",
    endingSummary:
      "You routed the spiral through Noor instead of through Theo. The draft is gone. The thread is closed. In the morning, you will tell Noor how it went; she will say something boring and warm; the day will move on without the text attached to it. Using an ally is not weakness — it is a rather specific skill you have just demonstrated: recognising a 3 a.m. spiral as a 3 a.m. spiral and getting the intervention you needed from a person trained to give it cleanly.",
    endingLearnReference: "how-to-leave-without-being-villain",
    endingLearnPrompt:
      "The skill here is not 'having a friend.' The skill is recognising, in real time, that you are in a state that cannot be thought out of, and routing to a person who will not co-author the story. Notice who in your life can do that. They are the ones who stay off your contact list after a breakup.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A friend like Noor is rare at any age. Most people at 3 a.m. get someone who panics back at them, or someone who says 'just send it, see what happens.' Someone who reads the function of your behaviour and declines to play along is, frankly, a piece of relational infrastructure. Keep it. Reciprocate it. Be that person for Noor when it is her turn.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You sleep. The phone is face-down. The thread is closed. Noor is asleep too, four time zones away, having narrated grout colour into your nervous system and won.",
      },
    ],
  },

  {
    id: "ending-sent-survived",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Sent, and Sat With It",
    endingSummary:
      "You sent the text. That is done; you cannot un-send it. The version of you that could have outlasted the urge did not show up tonight. But the version of you that did show up — the one who put the phone down after sending and refused to double-text — is not nothing. You did not chase. You did not send a follow-up. You did not watch for dots. Tomorrow morning the draft is gone, Theo has either replied or not, and your job is to not make decisions about your life based on which one of those it was.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Sending is not a moral failure. It is a data point. It tells you that tonight, at 3 a.m., after forty minutes of drafting, your nervous system was not yet trained for the outlast. Train it next time. Note the specifics of what made the urge win — was it the third rewrite, the specific sentence about the train station, the exhaustion? Write it down tomorrow. Patterns hide in the second-best draft.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You sleep at 3:41. The phone, still face-down. The draft, gone from your outbox. Theo, off-screen, reacting or not reacting to words that no longer live on your device.",
      },
    ],
  },

  {
    id: "ending-chased",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "The Second Text",
    endingSummary:
      "You sent the text. You watched for 'Read' for ninety seconds. You sent a follow-up apologising for the first. You composed a third. By 4:12 a.m. you had sent four messages into a thread that, fifteen days ago, you had closed on purpose. You will sleep eventually, in the way exhausted people do. You will wake with the sensation of having spent something you did not mean to spend. The draft is, now, eight messages long and one-sided. This is the specific failure mode the track is built to interrupt — not because the messages will ruin your life, but because every time you run this loop you are training your nervous system that 3 a.m. discomfort is solved by external contact. It is not. It is solved by outlasting.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Count the messages in the morning. Note the clock on each. That log is the teaching artefact — the shape of a spiral in timestamps. You will see the exact curve of your urge, peak at about 3:18, and resolve only when you were too exhausted to type. That is not healing. That is collapse. The outlast at 3:07 would have produced sleep by 3:23, without any of the messages. Remember the shape. Next time, when the curve starts rising, you will recognise it.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You sleep at 4:46. Eight unanswered messages. Morning is coming.",
      },
    ],
  },
];

export const anxiety11: Scenario = {
  id: "anx-1-1",
  title: "The 3 a.m. Draft",
  tagline: "Tuesday. 3:04 a.m. The draft has been written eight times.",
  description:
    "An interior scenario. The antagonist is not a person — it is your own nervous system at 3 a.m., fifteen days after a breakup you stood by during daylight. The question in front of you is not whether to send the text. The question is what you do with your body for the next eleven minutes. Voice-lock scenario for the anxiety track.",
  tier: "free",
  track: "anxiety",
  level: 1,
  order: 1,
  estimatedMinutes: 9,
  difficulty: "beginner",
  category: "self-regulation",
  xpReward: 120,
  badgeId: "first-outlast",
  startSceneId: "the-3am-spiral",
  tacticsLearned: [
    "Separate the Critic from the Inner Voice — they are two different speakers",
    "Urge-surfing: sensations peak in ~4 minutes if you stop reinforcing them",
    "Motor interventions (water, walk) interrupt rumination loops more reliably than thinking does",
    "Route 3 a.m. spirals through a steady ally, not through the person the spiral is about",
    "The eleven-minute outlast window — the specific physiology of the urge's half-life",
  ],
  redFlagsTaught: [
    "The Critic's move list — 'of course,' 'obviously,' reframing urges as already-decided",
    "The false relief of the nuclear delete (spiral reconstitutes on a different device)",
    "Post-send hypervigilance (watching for 'Read,' dots, double-texting)",
    "Sending the text trains your nervous system that external contact is the 3 a.m. solution",
  ],
  reward: {
    id: "first-outlast",
    name: "The First Outlast",
    description: "Your nervous system has a half-life. You just measured it for the first time.",
  },
  characters: [INNER_VOICE, NOOR, THE_CRITIC],
  scenes,
};

export default anxiety11;
