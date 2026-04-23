/**
 * Dating Line — Mission 4 "The Hoover"
 *
 * Teaches: the hoovering cycle. Trauma-bond exploitation. Strategic
 * tears. Future-faking as comeback vector. The neurological pull of
 * intermittent reinforcement. Permanent Ghost Protocol vs. the
 * "closure conversation" (which is almost always the target's last
 * attempt at self-sabotage).
 *
 * Why it matters: men who leave a cluster-B woman usually go back at
 * least once. The nervous system was trained on chaos; when the
 * return-text lands, the body reads relief, not warning. Recognising
 * the hoover BEFORE responding is the difference between the man who
 * gets his life back and the man who loses another two years.
 *
 * Failure routes → "Why Narcissists Always Come Back: The Hoovering
 * Cycle" and "Narcissistic Hoovering Explained"
 */

import type { Scenario, Scene } from "../../types";
import { EMBER, COLE, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — the opening. Six weeks of recovery.
  // ---------------------------------------------------------------------
  {
    id: "six-weeks-out",
    backgroundId: "bedroom",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Six weeks since you left. You've slept through the night nine times in the last two. You've lifted four days a week. The chest-tightness that lived under your sternum for two years is mostly gone.",
      },
      {
        speakerId: null,
        text: "You ate dinner tonight without rehearsing an argument in your head. Small thing. Enormous thing.",
      },
      {
        speakerId: null,
        text: "Thursday, 9:47pm. Your phone lights up on the kitchen counter. You see the name before you've decided to look.",
      },
      {
        speakerId: "ember",
        text: '"I\'ve been in therapy. I know I hurt you. I just needed you to know I\'m working on it. Not asking for anything."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "Your whole body goes warm. Shoulders drop. Breath shortens. You haven't moved.",
      },
      {
        speakerId: "inner-voice",
        text: "Freeze. Don't touch the phone. That warmth in your chest is not love. It's your nervous system recognising the voice that trained it. The intermittent reinforcement neurologically wired you to light up at contact — good, bad, any contact.",
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "'Not asking for anything' IS the ask. That's the whole play. The calibrated softness, the progress-report framing, the 9:47pm Thursday — nothing here is accidental. This is the hoovering cycle. Textbook.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "put-phone-down",
        text: "Put the phone face-down. Don't open the thread. Text Cole.",
        tactic: "First rule of the hoover: don't read it alone. Witnessing breaks the spell.",
        nextSceneId: "cole-arrives",
        isOptimal: true,
      },
      {
        id: "read-dont-respond",
        text: "Read it. Re-read it. Don't respond. Just sit with it.",
        tactic: "The lingering IS the relationship at lower bandwidth. You're already back in.",
        nextSceneId: "the-lingering",
      },
      {
        id: "respond-coldly",
        text: '"I\'m glad you\'re doing better." Short. Civil. Then block.',
        tactic: "The response gives her the opening. Any reply — even a cold one — is a door.",
        nextSceneId: "cold-response-opens-door",
      },
      {
        id: "respond-warmly",
        text: "Reply warmly. She sounds like she's changed. Six weeks is a long time.",
        tactic: "Six weeks is exactly how long a hoover waits. It's a feature, not a sign.",
        nextSceneId: "warm-response-reopens",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — Cole arrives. Witnessing breaks the spell.
  // ---------------------------------------------------------------------
  {
    id: "cole-arrives",
    backgroundId: "kitchen",
    mood: "tense",
    presentCharacterIds: ["cole"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "Cole is at your kitchen table in twenty minutes, keys on the counter, reading the text on your phone like it's evidence in a trial.",
      },
      {
        speakerId: "cole",
        text: '"Brother. You already know what this is. Say it out loud."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You say it. Hoover. Your mouth says it and your body still wants to open the thread and type. Both things are true at the same time.",
      },
      {
        speakerId: "cole",
        text: '"Look at the clock on the text. 9:47pm Thursday. That\'s not a woman who had a breakthrough in therapy. That\'s a woman who\'s been drafting that message for a week and waited till you\'d be home alone, a little lonely, a little tired."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Everything about that message is a tell. 'I've been in therapy' — future-faking the reform. 'I know I hurt you' — performed accountability, no specifics. 'Not asking for anything' — plausible deniability for the ask. The calibrated softness. She knows your grooves. She built them.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ghost-protocol-now",
        text: "Tell Cole: block her on everything. One sitting. Do it with him watching.",
        tactic: "Permanent Ghost Protocol. One sitting — piecemeal is weakness. Witness locks it in.",
        nextSceneId: "second-wave",
        isOptimal: true,
      },
      {
        id: "wait-and-see",
        text: '"Let me think about it. She said she\'s not asking for anything."',
        tactic: "Thinking about it means you're already negotiating with the part of you that wants her back.",
        nextSceneId: "second-wave-unblocked",
      },
      {
        id: "one-reply-closure",
        text: "Tell Cole: you'll send one reply, draw a line, THEN block.",
        tactic: "The 'one reply to draw a line' has ended more recoveries than any other move.",
        nextSceneId: "the-line-reply",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3A — optimal: the block is done, but the waves keep coming
  // ---------------------------------------------------------------------
  {
    id: "second-wave",
    backgroundId: "cafe",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You blocked her Thursday night, Cole watching, one sitting. Number, iMessage, WhatsApp, Instagram, Facebook, LinkedIn. You took his phone and blocked her on his too — so she can't go around you. He called it 'closing the perimeter'.",
      },
      {
        speakerId: null,
        text: "Saturday afternoon. Your coffee shop. You're reading. You don't see her. You're not supposed to see her.",
      },
      {
        speakerId: null,
        text: "Sunday morning, new number. A text from a number you don't recognise.",
      },
      {
        speakerId: "ember",
        text: '"I saw you at the coffee shop yesterday. You look good. I\'m proud of you."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "She was there on purpose. She sat where you wouldn't see her. 'I'm proud of you' is parental framing — she's restoring the bond by placing herself above you emotionally. The burner number is the giveaway: she's working around the block. This is wave two.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "block-new-number",
        text: "Screenshot, send to Cole, block the new number. Don't reply.",
        tactic: "Every new channel gets blocked the moment it surfaces. No acknowledgement, no reply, no DM back.",
        nextSceneId: "third-wave",
        isOptimal: true,
      },
      {
        id: "reply-boundary",
        text: '"Please stop contacting me." Firm, civil, final.',
        tactic: "A hoover reads any response as contact. Boundaries only work on people who respect them.",
        nextSceneId: "she-escalates",
      },
      {
        id: "read-dont-block",
        text: "Read it. Don't reply. Don't block either.",
        tactic: "An unblocked channel is an open door. She'll walk through it at 11:43pm on a hard night.",
        nextSceneId: "the-lingering",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — third wave: breadcrumbing
  // ---------------------------------------------------------------------
  {
    id: "third-wave",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "A week goes by. You've been sleeping. You ran your first 10k since you were 26. Your mother said you sound like yourself again on the phone.",
      },
      {
        speakerId: null,
        text: "Third number. Third burner. A photo this time, no text.",
      },
      {
        speakerId: null,
        text: "The photo is your copy of the book. The one with the inscription from your father. The one she borrowed and 'lost' and you mourned. It's on her coffee table. She kept it.",
      },
      {
        speakerId: null,
        text: "Forty minutes later, another photo. The dog. The one she told everyone was hers. Head on her knee.",
      },
      {
        speakerId: "inner-voice",
        text: "Breadcrumbing. Artefacts of the shared life, offered without caption, designed to bypass your words-brain and go straight to memory. The book is a hostage. The dog is the hostage with a heartbeat. No caption is the weapon — she's making you fill in the sentence.",
        emotion: "serious",
      },
      {
        speakerId: "cole",
        text: '"She\'s running the playbook, man. The book, the dog, the guilt-object. Don\'t answer. Don\'t even decide whether the book is worth the reply — that\'s the trap. You already decided when you left."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "block-and-move-on",
        text: "Block the third number. Delete the photos without opening the second one. Go to the gym.",
        tactic: "The objects are not worth the reply. Grief the book, leave the dog, walk away.",
        nextSceneId: "fourth-wave",
        isOptimal: true,
      },
      {
        id: "ask-for-book-back",
        text: '"Please return the book. I\'ll leave money at the door for your trouble." Civil, transactional.',
        tactic: "Now you're in a logistics negotiation with a hoover. She'll use the handover.",
        nextSceneId: "book-handover-trap",
      },
      {
        id: "ask-about-dog",
        text: '"Is the dog with you? Is she okay?" One question about the animal.',
        tactic: "The dog is the softest door. She chose it specifically because you can't say no to it.",
        nextSceneId: "dog-door-reopens",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5 — fourth wave: strategic tears
  // ---------------------------------------------------------------------
  {
    id: "fourth-wave",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["cole"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "Three weeks in. You thought the silence meant it was over. It was pacing.",
      },
      {
        speakerId: null,
        text: "A voice note. Forwarded through a mutual friend — someone you trusted, someone who looks confused and upset when they send it. 'She asked me to send this. I'm sorry. I told her I'd just do it once.'",
      },
      {
        speakerId: "ember",
        text: '"I just need five minutes. In person. I know I don\'t deserve it. I\'m not asking for anything back — I just... I can\'t sleep. Please. I\'m begging. Five minutes and then I\'ll leave you alone forever. I promise."',
        emotion: "pleading",
      },
      {
        speakerId: null,
        text: "Her voice breaks twice. Once on 'begging', once on 'alone forever'. You can hear she's been crying before she recorded it. You can also hear — if you listen for it — that the breaks are in the same places the texts were.",
      },
      {
        speakerId: "inner-voice",
        text: "Strategic tears. They're real tears — narcissists can cry real tears and still be running a play. What matters is the function, not the sincerity. 'Five minutes in person' is the entire target. She reactivates trauma bonds in 90 seconds of eye contact. You know this. Your body doesn't want you to know it.",
        emotion: "serious",
      },
      {
        speakerId: "cole",
        text: '"Look at me. Look at me. You meet her for five minutes and in ten days you\'re back in her apartment. I know because I did it. My ex got me for eleven more months on a coffee meeting that was supposed to be closure. Closure is a fantasy we tell ourselves so we can see them one more time."',
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "refuse-the-meeting",
        text: "No. No meeting. No reply. Block the mutual friend temporarily.",
        tactic: "Permanent Ghost Protocol holds. The mutual is a flying monkey, intentional or not.",
        nextSceneId: "choice-point",
        isOptimal: true,
      },
      {
        id: "meet-in-public",
        text: "Public place. Thirty minutes max. Cole at the next table. You need to look her in the eye and end it.",
        tactic: "'I need to end it' is the hoover's favourite sentence out of your mouth. The ending is the reopening.",
        nextSceneId: "public-meeting-trap",
      },
      {
        id: "meet-privately",
        text: "Her place. One hour. To return the key and say goodbye properly.",
        tactic: "Private meeting with a cluster-B ex is the single most predictable way to restart the cycle.",
        nextSceneId: "private-meeting-disaster",
      },
      {
        id: "closure-call",
        text: "Phone call. No visual. Say goodbye properly but safely.",
        tactic: "Her voice is the instrument she trained on you. The call is the trap in a safer-looking shape.",
        nextSceneId: "closure-call-fail",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 6 — the real choice point
  // ---------------------------------------------------------------------
  {
    id: "choice-point",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "Cole stays the night on the couch. You don't sleep much. You don't write back. You don't open any of it.",
      },
      {
        speakerId: null,
        text: "At 3am you sit at your desk with a pen and a notebook and write her the letter. Everything. The night she threw the glass. The night she told your sister you'd been unfaithful when you hadn't. The eleven times she said it wouldn't happen again. The day you packed the bag.",
      },
      {
        speakerId: null,
        text: "You do not send it. You seal it in an envelope and put it in the drawer. The writing is for you. The unsent letter is the closure. She doesn't get to be part of your healing. That was her job when she was your partner — it's not her job now.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the reframe that changes everything. Closure is something you give yourself. 'Closure conversations' are a socially acceptable way to ask for one more hit. The hoover hands you the craving dressed up as a mature ending. The mature ending is the one you write alone, at 3am, and put in a drawer.",
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"The exam isn\'t whether she comes back. She will. The exam is whether you treat the hoover as a decision to make or a storm to sit through. You\'re passing. Stay still."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-perimeter",
        text: "Finish closing the perimeter. Every mutual, every burner. Total ghost.",
        tactic: "One-sitting block, extended. Every new channel gets closed the moment it appears. No exceptions, no re-evaluations.",
        nextSceneId: "smear-pivot",
        isOptimal: true,
      },
      {
        id: "loose-ghost",
        text: "Block the new numbers, but don't block mutuals. You don't want to over-react.",
        tactic: "Mutual friends are her remaining surface area. Soft ghost is ghost with a door propped open.",
        nextSceneId: "ending-lingering",
      },
      {
        id: "brief-the-inner-circle",
        text: "Close the perimeter — and text three closest friends one line: \"she's hoovering, don't pass messages.\"",
        tactic: "Pre-load your allies. Mutuals who've been briefed don't unwittingly become her next channel.",
        nextSceneId: "smear-pivot",
        isOptimal: true,
      },
      {
        id: "burn-the-letter",
        text: "Close the perimeter. In the morning, burn the 3am letter and the unsent one.",
        tactic: "Ritual closure. The letter served its purpose at 3am. Keeping it is keeping her.",
        nextSceneId: "smear-pivot",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 7 — the smear pivot (she reframes publicly when she can't reach)
  // ---------------------------------------------------------------------
  {
    id: "smear-pivot",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "Two weeks after the last block. You've stopped checking. Cole checks for you — the mutuals' feeds, the visible-to-mutuals stories, the shape of her online footprint.",
      },
      {
        speakerId: "cole",
        text: '"Heads up. She just posted — visible to mutuals only, so she knows you\'re not watching — something about \'men who can\'t handle accountability\'. Long caption. No names. Your face is the name. Classic smear pivot."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You don't read it. You ask Cole one question: does it name you? No. Does it accuse you of anything actionable? No. That's all you need to know.",
      },
      {
        speakerId: null,
        text: "A week later, a follow-up: 'Moving on. So grateful for my real friends.' A soft-lit selfie. Six hundred likes.",
      },
      {
        speakerId: "inner-voice",
        text: "The smear pivot is the sign you're winning. She's re-framing the story because she can't restore access to the supply. The public narrative is her consolation prize — and it's yours to ignore. The moment you engage, you lose. The moment you explain yourself to anyone who believes her, you lose. Let the story die in a room you're not in.",
        emotion: "knowing",
      },
      {
        speakerId: "cole",
        text: '"The people who believe it were never your people. The people who know you don\'t need you to defend yourself. That\'s it. That\'s the whole reputation strategy."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "do-nothing-publicly",
        text: "Do nothing publicly. Keep building. Let her story run its course.",
        tactic: "Silence is the only response that doesn't feed the pivot. Living well is the only counter-narrative.",
        nextSceneId: "ending-ghost-protocol",
        isOptimal: true,
      },
      {
        id: "defend-yourself",
        text: "Post your own version. Screenshots, receipts, the actual story.",
        tactic: "You just entered the fight she wanted. Now every mutual has to pick a side.",
        nextSceneId: "ending-public-war",
      },
      {
        id: "message-mutuals",
        text: "DM three mutuals privately. Just to 'clarify what actually happened'.",
        tactic: "You're briefing the jury. She'll hear every word by Tuesday and reframe each one.",
        nextSceneId: "ending-public-war",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // BAD BRANCHES — each of these is the realistic catastrophe
  // ---------------------------------------------------------------------
  {
    id: "the-lingering",
    backgroundId: "bedroom",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You don't reply. You don't block. You just... leave it there. You open the thread before bed. You open it in the morning. You compose three replies and delete each one.",
      },
      {
        speakerId: null,
        text: "Three weeks of this. The sleep goes first. Then the lifting. Then the friends who aren't Cole stop getting texts back.",
      },
      {
        speakerId: "inner-voice",
        text: "The lingering IS the relationship, run at lower bandwidth. You are dating the thread. She hasn't had to type another word and she's already back in your life. Congratulations — you found the saddest version of not-breaking-up.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-lingering",
  },

  {
    id: "cold-response-opens-door",
    backgroundId: "bedroom",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: '"I\'m glad you\'re doing better." Send. You block her immediately after.',
      },
      {
        speakerId: null,
        text: "Forty-eight hours later: a new number, a longer message, referencing your reply like it was an invitation. Because to her, it was.",
      },
      {
        speakerId: "ember",
        text: '"Thank you for responding. I know you didn\'t have to. It means more than you know. I wanted to tell you — my therapist asked me to write you a letter as part of my work. Not to send. But could I read it to you? Just once."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The reply — even the cold one — was the acknowledgement she needed to build the next ask on. 'My therapist asked me' is future-faking dressed in clinical language. Any reply is a door. You just taught her which doors open.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-dragged-out",
  },

  {
    id: "warm-response-reopens",
    backgroundId: "bedroom",
    mood: "romantic",
    dialog: [
      {
        speakerId: null,
        text: "You reply. Kind, open, surprised by how much six weeks has softened you. She replies within ninety seconds. By midnight you're on the phone.",
      },
      {
        speakerId: "inner-voice",
        text: "Ninety-second reply time means she was watching her phone. The voice on the other end is the one you missed in the recovery — she knows exactly which register to use. Your body says 'relief'. Your body is wrong.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-back-in",
  },

  {
    id: "second-wave-unblocked",
    backgroundId: "bedroom",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You didn't block. 'Not asking for anything' felt like it maybe deserved the dignity of silence, not a slammed door. Three days later, the second wave lands without resistance.",
      },
      {
        speakerId: null,
        text: "Then a third. Then a fourth. No barrier, no friction — every message reopens the file.",
      },
      {
        speakerId: "inner-voice",
        text: "Open channel is open relationship. You can tell yourself you're being 'mature'. The nervous system is not fooled.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-lingering",
  },

  {
    id: "the-line-reply",
    backgroundId: "bedroom",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You send the 'one reply to draw a line'. A hundred and fifty words. Respectful. Clear. Final. Then you block.",
      },
      {
        speakerId: "ember",
        text: '"I understand. I just want to say one thing before we never speak again — I loved you. Really loved you. I\'ll carry that. Take care of yourself."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You unblock to send a 'take care of yourself too' because you're not a monster. She replies in four seconds.",
      },
      {
        speakerId: "inner-voice",
        text: "The 'one reply to draw the line' was the first hit. Her gracious close was bait for the second. Your closing line was the third. You are in a conversation. The line was never drawn.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-dragged-out",
  },

  {
    id: "she-escalates",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "'Please stop contacting me' gets read as engagement. Within a day: another message, louder. Within a week: a voicemail, tearful. Within two weeks: an appearance at your building's lobby.",
      },
      {
        speakerId: "inner-voice",
        text: "Civil boundaries assume a counterpart who honours them. With a hoover, every boundary is a new attack surface. The only boundary that holds is the one she can't find a door through.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-dragged-out",
  },

  {
    id: "book-handover-trap",
    backgroundId: "cafe",
    mood: "tense",
    presentCharacterIds: ["ember"],
    dialog: [
      {
        speakerId: null,
        text: "The handover. Thirty seconds. Public place. She hands you the book. Her fingers touch yours for half a second longer than the transaction needs.",
      },
      {
        speakerId: "ember",
        text: '"I wrote you something. It\'s tucked in the flyleaf. Read it when you\'re ready. Or don\'t. I just needed to write it."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "She used the object as a delivery vehicle. You're now carrying the letter home. You will open it tonight. You know you will. She knows you will.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-back-in",
  },

  {
    id: "dog-door-reopens",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "One question about the dog. She replies with a paragraph about the dog, and a paragraph about how the dog misses you, and a paragraph about how she sleeps on your old hoodie.",
      },
      {
        speakerId: "inner-voice",
        text: "The dog is a real being and she weaponised it anyway. Your compassion for the animal is real; she's the one who chose to route it through her. Every reply about the dog is a brick out of the wall.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-dragged-out",
  },

  {
    id: "public-meeting-trap",
    backgroundId: "cafe",
    mood: "romantic",
    presentCharacterIds: ["ember"],
    dialog: [
      {
        speakerId: null,
        text: "Public place. Thirty minutes, you tell yourself. Cole at the next table. You've scripted the sentences.",
      },
      {
        speakerId: null,
        text: "She looks exactly the way she looked the night you met. She has made sure of this. She does not cry when you expect her to. She is calm. She apologises specifically — by name for three things you'd stopped expecting anyone to ever acknowledge.",
      },
      {
        speakerId: "ember",
        text: '"I\'m not here to ask for anything. I just needed you to hear that from me, not from a text. That\'s all. Thank you for the five minutes."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The specific apology is the most dangerous move she's ever made against you. It bypasses every intellectual defence. Ninety seconds of eye contact with calibrated remorse reactivates trauma bonds at the brainstem level. You know this. You are feeling it anyway. Ten days from now you will be back in her apartment and the surprise you feel will be performed.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-back-in",
  },

  {
    id: "private-meeting-disaster",
    backgroundId: "apartment",
    mood: "romantic",
    presentCharacterIds: ["ember"],
    dialog: [
      {
        speakerId: null,
        text: "Her place. 'Just the key.' You know what happens in her place. She knows what happens in her place. You both pretend otherwise on the way over.",
      },
      {
        speakerId: null,
        text: "You are back inside forty minutes. Sex happens. The bond reopens at the brainstem. On the cab home at 2am you already know the next six months of your life.",
      },
      {
        speakerId: "inner-voice",
        text: "Private meeting with a cluster-B ex is the single most predictable way to restart the cycle. Your pre-frontal cortex narrated the whole drive over. Your limbic system drove.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-back-in",
  },

  {
    id: "closure-call-fail",
    backgroundId: "bedroom",
    mood: "romantic",
    dialog: [
      {
        speakerId: null,
        text: "The call. Scheduled. Forty minutes. You tell yourself you'll speak first. She speaks first. Her voice is the instrument that built your nervous system for two years.",
      },
      {
        speakerId: null,
        text: "You get off the call at 1am. You didn't agree to see her. You also didn't block her after. The call is where the door reopened; the next twelve weeks are just what comes through it.",
      },
      {
        speakerId: "inner-voice",
        text: "You chose the trap in a safer-looking shape. 'No visual' was the consolation you gave yourself for reopening the channel. The voice was always the weapon.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-dragged-out",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-ghost-protocol",
    backgroundId: "bedroom",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Permanent Ghost Protocol",
    endingSummary:
      "Three months since the first 9:47pm text. You are unrecognisable to yourself. You sleep eight hours. You lift five days a week. You closed a deal at work you couldn't have closed eight weeks ago, because your attention was not being eaten alive in a back room of your brain. The hoovering cycle ran its full course — four waves, a smear pivot, an attempted lobby ambush — and met a wall every time. The wall is the protocol, not your willpower. That's the lesson. You don't white-knuckle a hoover. You build a system that doesn't let it reach you and you let the system do the work while you do the living.\n\nOne day, a year from now, you'll realise you haven't thought about her in eleven days. That's what recovery looks like. Not closure. Not resolution. Just the quiet growing in the space she used to occupy.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The exam wasn't whether she came back. It was whether you treated her return as a decision to make or a storm to sit through. You passed.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-back-in",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Went Back",
    endingSummary:
      "Ten days after the meeting, you're back in her apartment. Three weeks after that, she pulls the behaviour that made you leave the first time — now with six weeks of alibi built up: 'I'm still healing.' Six months later, you leave again, worse than the first time. The trauma bond is a groove that deepens every time you re-enter it. Fourteen more months of your life will be spent untangling this. Your thirties will not come back.\n\nThe hoover didn't trick you. It found the one part of you that was still willing to believe in the reform, and it pressed exactly there. That part of you is not weakness — it's the part that can love. You didn't need to kill it. You needed to not hand it the phone.",
    failureBlogSlug: "why-narcissists-always-come-back-hoovering-cycle",
    failureBlogTitle: "Why Narcissists Always Come Back: The Hoovering Cycle",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The body read relief. The body was wrong. You knew — and you went anyway. That's the part to study.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-dragged-out",
    backgroundId: "bedroom",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Supply, at Lower Bandwidth",
    endingSummary:
      "You never went back — not physically, not fully. But four months later, the texts are still a feature of your week. New numbers, old grooves. One reply in eight sends her into a crying voice note; one ignored week sends her to a mutual. You've become her background operating system — a source of intermittent reinforcement she can tap whenever her primary supply runs low.\n\nYou aren't in the relationship. You're in the aftertaste of it, stretched thin over four months of your life. The thing you call 'staying civil' is what she calls 'keeping him warm'. There's still time to close the perimeter. But every week you don't, the groove deepens.",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering Explained",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You can be polite and still be supply. The polite version of this is the most efficient version — for her.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-lingering",
    backgroundId: "bedroom",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "You Didn't Go Back — But You Never Closed It",
    endingSummary:
      "A year goes by. You did not meet her. You did not sleep with her. You did not reply to the voice note. On the outside, you recovered. On the inside, you carried her around for twelve months — the unblocked thread, the unchecked mutuals, the half-memory that kept you from fully meeting the woman you dated six weeks ago and couldn't quite feel anything for.\n\nThis is the quiet ending. Not catastrophe — just a muted year. The cost isn't what happened. It's what didn't. The second woman didn't stand a chance because half of you was still narrating to a ghost. Next time the hoover arrives — in a friend's story, in your own memory — you'll know: the lingering IS the relationship. Close the perimeter fully, or carry her for a year.",
    failureBlogSlug: "narcissistic-hoovering-explained",
    failureBlogTitle: "Narcissistic Hoovering Explained",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You didn't fail the exam. You just took it for twelve months instead of one night.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-public-war",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "You Entered the Fight She Wanted",
    endingSummary:
      "You posted. You messaged mutuals. You explained. The story branched into camps within seventy-two hours. She fed the fire with a second post — softer, the wounded party now. Her camp grew. Yours shrank, because the people who know you best don't engage with this kind of thing, and the people who engage with this kind of thing never knew you.\n\nThe smear pivot is a trap that closes only when you reach for it. You reached. Six months later you're still lightly defending yourself at parties, and she's dating a man who thinks he's rescuing her from a vindictive ex. Living well was the entire counter-narrative. You spent it on a rebuttal.",
    failureBlogSlug: "why-narcissists-always-come-back-hoovering-cycle",
    failureBlogTitle: "Why Narcissists Always Come Back: The Hoovering Cycle",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The audience was never the jury. The audience was the supply. You fed it.",
        emotion: "sad",
      },
    ],
  },
];

export const datingMission4: Scenario = {
  id: "d4-hoover",
  title: "The Hoover",
  tagline:
    "Six weeks out. She's reformed. She's in therapy. She misses you. Your nervous system forgets what she did.",
  description:
    "Six weeks since you left. The chest-tightness is mostly gone. Then a text at 9:47pm Thursday: 'I've been in therapy. I just needed you to know. Not asking for anything.' Your whole body goes warm. This is the hoovering cycle, and it doesn't run on your intellect — it runs on grooves she spent two years cutting into your nervous system. Recognise it before you respond, build a protocol instead of a decision, and let the system do the work while you do the living. Or meet her for 'just five minutes' and lose the next fourteen months.",
  tier: "premium",
  track: "male-dating",
  level: 4,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 225,
  badgeId: "ghost-protocol",
  startSceneId: "six-weeks-out",
  tacticsLearned: [
    "Recognising the four-wave hoovering cycle in real time",
    "Permanent Ghost Protocol: one-sitting block with a witness",
    "Refusing the 'closure conversation' as a self-sabotage move",
    "Writing the unsent letter — closure as something you give yourself",
    "Ignoring the smear pivot instead of entering the public fight",
  ],
  redFlagsTaught: [
    "Calibrated softness and progress-report framing ('I've been in therapy')",
    "Parental framing as bond-restoration ('I'm proud of you')",
    "Breadcrumbing with shared-life objects (the book, the dog)",
    "Strategic tears and 'just five minutes' as trauma-bond reactivation",
    "Future-faking reform through clinical language ('my therapist asked me to')",
    "Smear pivot when access to supply is finally cut",
  ],
  characters: [EMBER, COLE, INNER_VOICE_M],
  scenes,
};

export default datingMission4;
