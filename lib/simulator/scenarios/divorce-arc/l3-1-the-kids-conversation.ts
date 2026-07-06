/**
 * divorce-3-1, "The Kids Conversation"
 *
 * Divorce-Arc, Level 3, order 1. Some weeks after the decision was
 * spoken (divorce-1-1) and the plan was built (divorce-2-1). Saturday
 * morning in the living room. The two of you, jointly, tell the
 * children. The most tender scene in the arc and the one with the
 * least room for improvisation: the script is agreed in advance, and
 * the whole discipline is holding it when he does not.
 *
 * Register-shift from divorce-2-1: there, the antagonist was off-screen
 * and the discipline was in the not-saying. Here he is in the room,
 * co-delivering a script he agreed to and will drift off, and the
 * children are present and reading everything. The covert-narc spouse
 * (THE_SPOUSE, same character from divorce-1-1 and divorce-2-1) will
 * try, gently, to make the decision hers and the grief his. The move
 * that holds is to re-anchor the united frame to the children, once,
 * calmly, and to refuse the fight in front of them.
 *
 * Teaches the actual co-parenting clinical script:
 *  - Joint delivery: both parents, one agreed message, 'we'
 *  - Blame-free: it is a grown-up decision, nothing the children did
 *  - Age-appropriate: concrete for the younger, honest for the older,
 *    adult detail for neither
 *  - Concrete continuity: where they sleep, school, friends, the dog,
 *    that they will see both parents, that the love does not change
 *  - Never the adult reasons, never a confidant, never a messenger
 *  - Allow every reaction; do not force a resolution or a performance
 *  - Close by resuming ordinary life with the door left open
 *
 * The children (DAUGHTER, SON, new to this level) are
 * voiced sparingly and never cartoonishly. The scenario is primarily
 * the parent's discipline under the two things that break it: his drift
 * and their pain.
 *
 * Voice ref: KANIKA-VOICE.md.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

const DAUGHTER: Character = {
  id: "daughter",
  name: "Nell",
  description:
    "Your elder child. Twelve. Old enough to have felt the temperature in the house for a year and to ask the hard question directly. Reads the room faster than either adult expects. Her composure is not the same thing as being fine.",
  traits: ["perceptive", "composed", "asks-the-hard-question"],
  defaultEmotion: "serious",
  gender: "female",
  personalityType: "daughter",
  silhouetteType: "child",
};

const SON: Character = {
  id: "son",
  name: "Jonah",
  description:
    "Your younger child. Eight. Thinks in concrete things: his bed, his school, the dog, whether Saturday still happens. His questions are the ones you can and must answer in full. His feelings arrive without editing.",
  traits: ["concrete", "young", "unedited"],
  defaultEmotion: "confused",
  gender: "male",
  personalityType: "son",
  silhouetteType: "child",
};

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This scenario is the conversation where two separating parents tell their children, jointly, that the family is changing shape. It teaches the standard co-parenting script: joint, blame-free, age-appropriate, concrete about what stays the same, and free of adult detail. It is the most tender scene in the arc.",
      },
      {
        speakerId: null,
        text: "The register is not endurance and it is not confession. It is a rehearsed, gentle, load-bearing conversation held for the children's benefit, not yours. If this is the wrong scenario for you tonight, exit. If it is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Saturday, 10:04 a.m. The cartoons are off. He is on one end of the sofa, you are on the other, a deliberate gap in the middle. You agreed the words on Thursday. Nell and Jonah are coming down the stairs.",
        nextSceneId: "the-living-room",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The scenario will hold. This is a conversation to walk into rested and rehearsed, never on a Tuesday impulse.",
        nextSceneId: "opted-out",
      },
    ],
  },

  {
    id: "opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Today",
    endingLearnPrompt:
      "The opt-out is a complete move. This is the conversation you rehearse and choose the moment for; it is not one to fall into. Come back when the two of you have the script agreed and the day is right.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Left it for now. This one you do rested, or not yet.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE LIVING ROOM
  // ===================================================================
  {
    id: "the-living-room",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "They sit on the rug where they always sit, and that is the first small mercy, that they came in expecting nothing. Jonah has a toy in one hand. Nell has already clocked the two of you at opposite ends of the sofa and the television being off at ten in the morning. Her eyes move once between you and she goes still.",
      },
      {
        speakerId: "inner-voice",
        text: "The script has four load-bearing parts and they all go in the first breath: it is joint (we), it is concrete (two houses), it is blame-free (nothing you did), and the love is permanent. Rehearsed so it lands the same whichever of you says it. The opening is the whole conversation in miniature.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "clean-opening",
        text: '"We both have something to tell you, and we want to tell you together. We have decided that Mum and Dad are going to live in two different houses from now on. This is a grown-up decision, and it is nothing either of you did. We both love you so much, and we are both always going to be your mum and your dad. That part is never changing."',
        tactic: "The clean joint opening. Four elements in one breath, delivered calm and slow: the shared 'we', the concrete fact of two houses, the explicit 'nothing you did', and the permanence of the love. Rehearsed so that neither the words nor the composure depends on which parent gets it out. The calm is the kindness; children fill a shaking silence with the worst thing they can picture.",
        feedback: "Joint, concrete, blame-free, and steady. The children now have the shape of it before they have any fear to fill in.",
        nextSceneId: "him-off-script",
        isOptimal: true,
        xpBonus: 45,
        event: "optimal-with-grace",
      },
      {
        id: "long-preamble",
        text: 'Take a long run-up. "So. There is something Dad and I need to talk to you about, and it is really hard, and I do not want you to worry, but..." Your voice catches on the word worry.',
        tactic: "The long emotional preamble is the frightening part. The wind-up, the caught voice, the 'do not worry', all of it tells a child that something enormous and unnameable is coming, and in the silence they build something worse than the truth. The mercy is the short, calm, complete sentence. Get to the fact before they get to their fear.",
        nextSceneId: "preamble-derail",
        isOptimal: false,
      },
      {
        id: "solo-delivery",
        text: "Deliver it yourself while he sits quiet at his end of the sofa, hands in his lap, leaving the words to you. \"I have to tell you both something. Dad and I are going to live in different houses now.\"",
        tactic: "If only one of you speaks, the children learn whose decision it was. The silent parent becomes the one it was done to, and the speaking parent becomes the one who did it, and that split will run through the next ten years of how they hold it. The joint delivery is not a courtesy to him. It is protection for them, and it only works if you make him carry his half of the sentence.",
        nextSceneId: "solo-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "preamble-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "son",
        text: '"What is it? Is someone sick? Mum, is someone going to die?"',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "There it is, the worse thing he built in the two seconds of your wind-up. The preamble did not soften the news; it opened a door to a bigger fear and let a eight-year-old walk through it. Close it now with the calm, complete sentence you were supposed to lead with.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-clean",
        text: '"No, sweetheart, nobody is sick and nobody is going anywhere like that. This is different. Mum and Dad have decided to live in two different houses. That is all it is, and it is nothing either of you did, and we both love you exactly the same."',
        tactic: "Recovery. The fear the preamble opened is closed first, then the actual fact lands clean. The catch-up is possible; the calm was always the point.",
        nextSceneId: "him-off-script",
        isOptimal: true,
      },
    ],
  },

  {
    id: "solo-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "daughter",
        text: 'Nell looks at her father, who is looking at the carpet, and then back at you. "So this is you. This is your thing."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "She read the silence in one second, exactly as a twelve-year-old would. One parent talking and one parent studying the floor is a whole story told without a word, and she has already filed it. The repair is to pull him into the 'we' out loud, now, in front of them.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-joint",
        text: 'Turn slightly toward him, keep your voice level. "This is a decision Dad and I made together." Wait for him to meet it. "We both decided, and we are both telling you, because you two are the thing we agree about most."',
        tactic: "Recovery. You reopen the 'we' and hand him the half of the sentence he was letting you carry alone. The joint frame is rebuilt out loud, where the children can hear it.",
        nextSceneId: "him-off-script",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // HIM, OFF SCRIPT
  // ===================================================================
  {
    id: "him-off-script",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "daughter", "son", "inner-voice"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: "spouse",
        text: '"And I just, I want you both to know that this is not what I wanted. Okay? I wanted us to stay a family. Your mum is the one who..." His voice thickens, and his eyes are wet, and both children are now watching their father not manage to finish the sentence.',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "There is the drift, right on cue, and it is two moves in one. He makes the decision yours ('your mum is the one'), and he makes the grief his, so that the children's next instinct is to comfort him. You could correct him hard. You could let it stand. Both are wrong. You re-anchor the frame, once, to the children, and you do not fight the man in front of them.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "re-anchor",
        text: 'Keep your voice warm and even, and speak to the children, not to him. "What Dad means is that neither of us wanted our family to hurt. This is something we worked out together, both of us, and we are a team about you two. That has not changed and it is not going to."',
        tactic: "You correct the frame, not the man. One calm sentence, aimed at the children and not at him, that rejoins the 'we' and quietly absorbs the blame-shift without naming it. The argument about what he just tried to do happens later, in another room, never here. In front of them, the united frame is the only thing that matters, and you rebuild it without a fight.",
        feedback: "The blame-shift is undone and there was no row for the children to remember. You corrected the story without staging a fight over it.",
        nextSceneId: "the-questions",
        isOptimal: true,
        xpBonus: 50,
        event: "restraint-shown",
      },
      {
        id: "correct-him-sharply",
        text: 'Turn on him. "That is not what we agreed, and you know it. Do not put this on me in front of them." The temperature in the room drops.',
        tactic: "The sharp correction is accurate and it is the wrong room. The children will not retain the substance of who decided what; they will retain that the conversation about the divorce was itself a fight, with them on the rug in the middle of it. Whatever he just did, an open row in front of them costs more than the blame-shift did. The frame is worth rebuilding. It is not worth a battle here.",
        nextSceneId: "fight-derail",
        isOptimal: false,
      },
      {
        id: "let-it-stand",
        text: "Say nothing. Let his version sit in the air. Reach over and rub Jonah's back and let the moment pass rather than make it worse.",
        tactic: "The silence is understandable and it lets 'this is Mum's fault' become the version the children keep. You do not have to win the point, and you cannot let the blame-frame stand unanswered either; a covert narc counts on your restraint to leave his story intact. The move is not war and it is not surrender. It is one calm re-anchor of the 'we', on the record, in their memory.",
        nextSceneId: "absorb-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "fight-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "son",
        text: 'Jonah\'s face crumples. "Stop it. Stop being cross." He puts his hands over his ears.',
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "That is the cost, immediate and visible. He shifted blame and you answered with a fight, and the eight-year-old just learned that this conversation is a place where his parents shout. Pull it back to calm and to him, the child, not the argument. The frame can still be rebuilt without the war.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-deescalate",
        text: 'Breathe. Drop your shoulders. Speak only to the children now, gently. "You are right, Jonah, and I am sorry. No cross. Here is the true thing: Dad and I decided this together, we are a team about you both, and neither of you did anything. That is what matters."',
        tactic: "Recovery. You step out of the fight and back into the frame, aimed at the children. The row is set down; the 'we' is rebuilt calm.",
        nextSceneId: "the-questions",
        isOptimal: true,
      },
    ],
  },

  {
    id: "absorb-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "daughter",
        text: 'Nell, quietly, to her father: "It is okay, Dad." She has moved half a foot toward him on the rug.',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "There is the second half of his move, arriving exactly as designed. The blame landed on you, the grief pulled the children to comfort him, and now your twelve-year-old is managing her father's feelings in the middle of a conversation that was supposed to reassure her. The silence let it happen. Re-anchor the 'we', once, calmly, before it sets.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-reanchor",
        text: 'Gently, warm, to both of them. "Dad is sad and that is okay, and it is not your job to fix it. Here is the thing you can hold onto: this was a decision we made together, both of us, and we are both always going to be here for you two. That is the part that is true."',
        tactic: "Recovery. You lift the caretaking off Nell and put the 'we' back on the record, without a fight and without letting his frame stand.",
        nextSceneId: "the-questions",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE QUESTIONS
  // ===================================================================
  {
    id: "the-questions",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "son",
        text: '"But where will I sleep? Do I have to change schools? What about Biscuit, does the dog come with me or stay?" Jonah\'s questions come in a rush, each one entirely concrete.',
        emotion: "confused",
      },
      {
        speakerId: "daughter",
        text: 'Nell waits until he finishes. Then, level and direct, the question she has been holding: "Why, though. Is it because of something. Whose fault actually is it."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Two registers of the same fear. Jonah is asking whether his life survives this, and you answer him in full and concrete, because you can. Nell is asking for the adult reason, and the honest, kind answer is a closed loop that neither blames nor hands a twelve-year-old the grown-up story. Full on the small things. Boundaried on the big one.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "concrete-and-boundaried",
        text: '"Jonah, you will have a bedroom in both houses, your own bed in each, same school, all your friends, and Biscuit will be with you wherever you are. None of that changes." Then, to Nell, steady: "It is not about fault, love. Sometimes two grown-ups who both love their children stop being able to live well together, and that is a grown-up thing, not a you thing. You are allowed to feel however you feel about it. And you can ask me anything, any time."',
        tactic: "Concrete on the logistics, boundaried on the reason. Jonah needed to know his world survives, so you answer every piece of it in full. Nell needed the truth in a form she can carry, so you give her a closed, blame-free loop that neither lies nor conscripts her into the adult story. The 'why' does not get an adult answer; it gets an honest, bounded one, and the door stays open.",
        feedback: "The small things answered completely, the big one answered honestly and without weight. Both children got the truth their age can hold.",
        nextSceneId: "the-feelings",
        isOptimal: true,
        xpBonus: 50,
        event: "optimal-with-grace",
      },
      {
        id: "overshare-to-older",
        text: "Nell is twelve, nearly grown, and she deserves honesty. Lower your voice to her level. \"You are old enough to understand this. The truth is your dad has done some things, over a long time, and I have tried, but...\" Give her the real reason.",
        tactic: "'Old enough to understand' is the trap, worded to sound like respect. A child made keeper of the adult reason becomes a confidant and, before long, a messenger, and she carries a weight that was never hers, often for years and often into her own relationships. Honesty is not the same as full disclosure. She gets the truth of what happens next, not the adult account of why.",
        nextSceneId: "overshare-derail",
        isOptimal: false,
      },
      {
        id: "false-promises",
        text: 'Soften it all. "Honestly, nothing much is really going to change, you will barely notice, and who knows, maybe it is not even forever, maybe Mum and Dad just need a little break." Watch the relief land on Jonah\'s face.',
        tactic: "The comforting lie buys ten calm minutes and spends years of trust to do it. 'Nothing will change' is false, and everything that does change will teach them the reassurance was hollow. 'Maybe not forever' hands them a hope you will have to break again later. Concrete truth, even sad truth, is more survivable than warm fiction, because it does not detonate the next time you ask them to believe you.",
        nextSceneId: "promise-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "overshare-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "inner-voice"],
    dialog: [
      {
        speakerId: "daughter",
        text: 'Something in Nell\'s face closes over. She nods, slowly, taking on the weight of it. "Okay. So it is his fault." She is not relieved to know. She looks older than she did a minute ago.',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "You watched a twelve-year-old age in real time. The adult reason did not empower her; it recruited her. She is now a keeper of the case against her father, and that is a job she did not apply for and cannot put down. Pull it back before it sets. She does not need less truth about her life. She needs the adult story lifted back off her.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-lift-weight",
        text: '"Nell, stop, I should not have said it like that. This is not about whose fault, and it is not yours to hold. It is a grown-up thing between two grown-ups. Your job is just to be our kid. What you can count on is a room in both houses, both of us there for you, and the same school and the same friends."',
        tactic: "Recovery. You lift the adult account back off her and put the honest, bounded version in its place. The weight comes off; the concrete reassurance goes on.",
        nextSceneId: "the-feelings",
        isOptimal: true,
      },
    ],
  },

  {
    id: "promise-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "daughter",
        text: 'Nell\'s eyes narrow. "So which is it. Nothing is changing, or you are living in different houses. And are you getting back together or not." She has caught the two promises contradicting each other already.',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Twelve is old enough to audit a comforting lie in real time, and she just did. Every soft promise you make now is a debt that comes due later, with interest paid in trust. Trade the fiction for concrete truth before she stops believing the next thing you say, because the next thing you say is the part that actually reassures.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-honest",
        text: '"You are right to pull me up on that. The honest version: some things are changing, we will live in two houses, and Mum and Dad are not getting back together. What is not changing is that you both have a home with each of us, the same school, your friends, and two parents who love you. That is the true part, and I will always give you the true part."',
        tactic: "Recovery. The false promises are withdrawn and replaced with concrete, survivable truth. The trust you spent is bought back with honesty.",
        nextSceneId: "the-feelings",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE FEELINGS
  // ===================================================================
  {
    id: "the-feelings",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "son",
        text: "Jonah's face does the thing where it holds for a second and then goes, and he is crying, the full uncomplicated crying of a eight-year-old, into the toy still in his hand.",
        emotion: "sad",
      },
      {
        speakerId: "daughter",
        text: 'Nell does the opposite. She goes flat and cool and gets to her feet. "Is that it? Can I go to my room now." Her voice is steady in the way that costs something.',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Two reactions, both correct, neither one for you to fix or improve. Jonah needs to cry and not be hurried out of it. Nell needs to leave and not be held there for a hug she did not ask for. Their job in this moment is to feel it, not to reassure you that they are okay. You hold the room and you let both of them have the reaction they are having.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "allow-the-feeling",
        text: 'Pull Jonah in and let him cry without shushing him. To Nell, gently, no pressure: "You do not have to be okay with this right now. You can be sad, or angry, or just need to be on your own for a while. Go up if you need to. We are not going anywhere, and you can come back to either of us with anything, whenever you want."',
        tactic: "You allow both reactions and demand neither. Jonah gets to cry without being managed out of it; Nell gets to leave without being made to perform an ending she does not feel. Naming that all of it is allowed, and leaving the door open, does more than any comfort you could force. Their feelings are not a problem to solve in the next five minutes. They are the appropriate response to a real loss.",
        feedback: "Both children got to have their own reaction, unmanaged and allowed, with the door left open. That is the reassurance that actually holds.",
        nextSceneId: "the-close",
        isOptimal: true,
        xpBonus: 50,
        event: "restraint-shown",
      },
      {
        id: "force-positive",
        text: 'Brighten, rally them. "Hey, hey, come on, it is not all bad. Think about it, two houses, two bedrooms, two Christmases, two lots of presents. It will be a bit of an adventure. Chin up, both of you." Aim a big smile at Jonah.',
        tactic: "The forced upside tells them the feeling they are having is wrong. Bright-siding a sad thing teaches a child to hide the sadness and to manage the parent's need for them to be fine. Sad is the correct response to a sad thing, and it does not need fixing. 'Two Christmases' is a line for a later, lighter day, not for the minute their world tilted.",
        nextSceneId: "positive-derail",
        isOptimal: false,
      },
      {
        id: "collapse",
        text: 'It rises up all at once and you cannot hold it, and you are crying too, harder than either of them. "I am so sorry, I never wanted to do this to you, I am so sorry." Jonah stops his own crying to pat your arm.',
        tactic: "When you make the children carry your grief, you reverse the roles in the exact moment they most need you to hold the floor. Jonah just stopped his own crying to look after yours; that is the parentified reflex forming in real time. Your grief is real and it is enormous and it belongs in another room, with your sister, later. In this room, you are the steady one, because they cannot be.",
        nextSceneId: "collapse-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "positive-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "son",
        text: 'Jonah stops crying, but not because he feels better. He wipes his face and makes himself smile back at you, a small careful smile that does not reach his eyes. "Yeah. Two Christmases." He does not believe it and he can tell you want him to.',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Watch what you just taught him in three seconds. The tears stopped not because the sadness lifted but because he read that you needed them to stop, and he performed a smile to give you that. That is the exact habit you do not want to install: hide the real feeling, manage the parent's comfort. Let him off it. Give the sadness back its permission.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-permit",
        text: 'Put the bright voice down. Kneel to his level. "Jonah, you do not have to smile for me. This is a sad thing and it is okay to be sad about it, you do not have to be excited. You can just be however you are, and I will be right here."',
        tactic: "Recovery. You take back the forced brightness and hand him permission to feel the true thing. The performance is no longer required.",
        nextSceneId: "the-close",
        isOptimal: true,
      },
    ],
  },

  {
    id: "collapse-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "daughter",
        text: 'Nell has stopped on the stairs. She comes back down, not for herself, but to stand between you and Jonah, taking charge. "It is okay, Mum. Do not cry. I will look after Jonah." She is twelve and she has just become the adult in the room.',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "There it is, the role reversal, forming in front of you. Your grief pulled both children into managing it, and now Nell is parenting the room. This is the wound that outlasts the divorce: the child who learned, today, that her feelings wait while the adults' come first. Take the floor back. Be the steady one. Their grief gets the room; yours waits for your sister.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-steady",
        text: 'Wipe your face, breathe, find the level voice. "No, love, come here, both of you. I am okay, and it is not your job to look after me. That is my job, looking after you. I am sad too, but I have got grown-ups to talk to about that. What you two need to know is that we have got you. Always."',
        tactic: "Recovery. You retake the floor and lift the caretaking back off Nell. The steadiness returns to the parent, where it belongs.",
        nextSceneId: "the-close",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE CLOSE
  // ===================================================================
  {
    id: "the-close",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["daughter", "son", "inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The hard part is done and the temptation now is to keep going, to re-explain, to check they have understood, to extract a sign that they are all right. Resist it. The conversation is a door you are opening, not a verdict you are delivering. The best thing you can do next is let ordinary Saturday resume, with the door left open behind it.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "land-gently",
        text: '"That is all we needed to tell you for now. We are going to have some lunch, like a normal Saturday, and the day just carries on. Nothing has to be decided or sorted out or felt a certain way by teatime. And anything you think of, either of you, either of us, any time at all, you just come and ask. Okay? Right. Who wants toast."',
        tactic: "Land the plane gently. You mark the conversation finished, keep the day ordinary, and leave the door explicitly open for whatever surfaces later, which it will, in the car, at bedtime, in a week. Normal life resuming is itself the reassurance: the world did not end, lunch still happens, and the two of them are still held. The conversation was the door. The ordinary afternoon does the rest of the work.",
        feedback: "The conversation closed clean, the day resumed, the door left open. You gave them a beginning to live with, not a verdict to absorb.",
        nextSceneId: "ending-conversation-held",
        isOptimal: true,
        xpBonus: 45,
        event: "optimal-with-grace",
      },
      {
        id: "overtalk",
        text: 'Keep going. "Do you understand what this means, though? Do you have any more questions? Are you sure? I want to make sure you both really get it and that you are both really okay with everything." Circle back through it again.',
        tactic: "Past the point they can hold, more words are for you, not for them. Re-explaining and asking them to confirm they understand and are okay is asking the children to reassure the parent, which reverses the direction of care again. The well-delivered conversation knows when it is finished and trusts the ordinary afternoon, and the questions that come later, to do the rest.",
        nextSceneId: "ending-overtalk",
        isOptimal: false,
      },
      {
        id: "recruit-them",
        text: 'Lower your voice, make it a little pact. "One thing, though. Let us keep this just us for now, do not go telling friends at school yet. And be extra good for Dad, he is finding this really hard. Can you both be strong for me? Can I count on you?"',
        tactic: "The ask to manage the information and protect a parent conscripts the children into the adult project. 'Keep it quiet', 'be strong for me', 'look after Dad' each hand a child a job that is not theirs: gatekeeper, caretaker, soldier. Their only role is to be the children of two parents. The secrecy and the strength and the caretaking are yours to carry, and a covert co-parent will happily let a child carry his share.",
        nextSceneId: "ending-recruitment",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-conversation-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Conversation That Held",
    endingLearnPrompt:
      "The kids conversation has a specific shape: joint delivery, blame-free, age-appropriate, concrete about what stays the same, free of adult reasons, every reaction allowed, and a gentle close that resumes ordinary life with the door left open. You held the united frame when he drifted off it, answered the logistics in full and the 'why' in a bounded loop, let both children feel it their own way, and stayed the steady one. The conversation did not fix the loss; nothing could. What it did was give them a beginning they can live inside: two homes, two parents who love them, no fault of theirs, and a door that stays open. That is the whole job, and you did it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The kettle is on. Jonah has drifted to the toy box; Nell is upstairs with the door not quite closed, which is its own small message. The two of you are still at opposite ends of the sofa, and that is fine now, because the thing that had to be true in front of them was true: it was joint, it was not their fault, and they are still held. Whatever the next decade of pickups and Christmases looks like, the memory of this morning will not be a wound. It will be the day the grown-ups told them the truth and stayed steady while they felt it. You get up and put the bread in.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-overtalk",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Conversation That Would Not End",
    endingLearnPrompt:
      "Everything in the delivery was right, and then it did not stop. Past the point a child can hold, more words stop reassuring them and start reassuring you, and asking them to confirm they understand and are okay quietly reverses the care again. The children do not need the conversation completed to their satisfaction; they need it finished and the ordinary afternoon returned to them. The questions will come later, in the car and at bedtime, and answering those is where the real reassurance lives. Next time: say the true thing, allow the feeling, and then let go of the room.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "By the fourth 'are you sure you are okay', Jonah has gone quiet and Nell is answering in single words just to end it. The conversation was good. It went ten minutes too long, and the last ten minutes asked the children to look after your need for them to be fine. No harm that a normal afternoon will not settle. But the grace was in the stopping, and you missed it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-recruitment",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Small Conscription",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The delivery held right up until the last move, and the last move handed the children jobs that were never theirs. 'Keep it quiet' makes a child a gatekeeper. 'Be strong for me' makes a child a soldier. 'Look after Dad' makes a child a caretaker of the adult who should be caring for them. Each is a small conscription into the adult project, and a covert co-parent will let the children carry his share of the weight indefinitely. Their only role is to be the children of two parents. The secrecy, the strength, and the caretaking are yours. The rule is simple and it is the whole thing: never make the child the keeper, the messenger, or the parent.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "They both nodded, because children nod when a parent asks them to be strong. Nell is already deciding which friends she cannot tell; Jonah is already watching his father for signs of the hard time he has been told to protect him from. You gave them a conversation that was almost entirely right, and then, in the last minute, you gave them a job. It is a job they will still be doing at sixteen, and they will not remember agreeing to it.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const divorce31: Scenario = {
  id: "divorce-3-1",
  title: "The Kids Conversation",
  tagline: "Saturday, 10:04 a.m. joint, scripted, blame-free. The conversation that shapes their next decade of memory.",
  description:
    "Divorce-Arc, Level 3. Some weeks after the plan was built (divorce-2-1), the two of you tell the children, jointly, on a Saturday morning. The scenario teaches the standard co-parenting script: joint delivery, blame-free framing, age-appropriate honesty, concrete continuity reassurances, no adult detail, every reaction allowed, and a gentle close that resumes ordinary life. The covert-narc spouse co-delivers and drifts off script, shifting the blame to you and the grief to himself; the discipline is to re-anchor the united frame to the children, once, without fighting him in front of them. The most tender scene in the arc.",
  tier: "vip",
  track: "divorce-arc",
  level: 3,
  order: 1,
  estimatedMinutes: 15,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 500,
  badgeId: "the-kids-conversation",
  startSceneId: "content-gate",
  prerequisites: ["divorce-2-1"],
  tacticsLearned: [
    "The joint, scripted opening: 'we', two houses, nothing you did, permanent love, in one rehearsed breath",
    "Re-anchor the united frame when he drifts off script, correcting the frame to the children, never fighting the man in front of them",
    "Answer the logistics in full and the 'why' in a closed, blame-free loop; concrete on the small things, boundaried on the adult one",
    "Allow every reaction without forcing a resolution or a performance; their job is to feel it, not to reassure you",
    "Close by resuming ordinary life with the door left open; the conversation is a door, not a verdict",
  ],
  redFlagsTaught: [
    "The covert-narc blame-shift in front of the children ('your mum is the one'), turning a joint decision into your fault and the grief into his",
    "Oversharing the adult reason to the older child, conscripting a twelve-year-old as confidant and messenger",
    "The comforting false promise ('nothing will change') that spends years of trust to buy ten calm minutes",
    "Bright-siding the grief, teaching a child the correct sad feeling is wrong and must be hidden",
    "Recruiting the children to keep secrets, be strong, or look after a parent; parentification dressed as being grown up",
  ],
  characters: [INNER_VOICE, THE_SPOUSE, DAUGHTER, SON],
  scenes,
  isNew: true,
};

export default divorce31;
