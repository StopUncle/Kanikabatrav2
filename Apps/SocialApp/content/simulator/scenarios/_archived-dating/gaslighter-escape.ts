// Scenario: The Reality Distortion (v3)
// 3 paths: The Denier, The Minimizer, The Projector
// Learn to recognize and escape different gaslighting styles

import type { Scenario } from '../types';

export const gaslighterEscapeScenario: Scenario = {
  id: 'gaslighter-escape',
  title: 'The Reality Distortion',
  tagline: 'Trust your instincts.',
  description:
    'They have a way of making you doubt everything - your memories, your perceptions, even your sanity. Learn to recognize gaslighting tactics and reclaim your reality.',
  tier: 'premium',
  estimatedMinutes: 18,
  difficulty: 'advanced',
  category: 'gaslighter',
  xpReward: 175,
  badgeId: 'reality-anchor',

  templates: {
    gaslighter: ['Casey', 'Morgan', 'Taylor', 'Jordan', 'Riley'],
    sister: ['Rachel', 'Emma', 'Megan', 'Nicole', 'Ashley'],
    friend: ['Sarah', 'Emily', 'Jessica', 'Amanda', 'Lauren'],
  },

  tacticsLearned: [
    'Gaslighting recognition (denial, minimizing, projection)',
    'DARVO detection (Deny, Attack, Reverse Victim/Offender)',
    'Reality documentation',
    'Emotional validation',
    'Strategic exit planning',
  ],
  redFlagsTaught: [
    '"That never happened" (memory rewriting)',
    '"You\'re too sensitive" (feeling invalidation)',
    '"You\'re the one with the problem" (projection)',
    'Denying documented events',
    'Making you apologize for their behavior',
  ],

  characters: [
    {
      id: 'casey',
      name: 'Casey',
      description: 'Charming and persuasive. Has an answer for everything - especially your concerns.',
      traits: ['gaslighter', 'manipulative', 'charming'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'sister',
      name: 'Rachel',
      description: 'Your sister who has watched this relationship unfold with growing concern.',
      traits: ['protective', 'grounded', 'honest'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'Learning to see reality clearly when someone distorts it.',
      traits: ['intuitive', 'aware'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    // ============================================
    // OPENING SCENE - Rachel reaches out
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You're meeting Rachel for coffee. She's been texting more lately, checking in. When you sit down, her face is concerned. \"I'm just going to say it. Something feels off with you and Casey. You seem... different.\"",
          speakerId: 'sister',
          emotion: 'concerned',
        },
        {
          text: "You start to defend Casey, but pause. There IS something. Something you haven't been able to name. The foggy confusion. The constant second-guessing. When did that start?",
        },
        {
          speakerId: 'inner-voice',
          text: "She noticed. That means it's real.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-denier',
          text: '"They keep saying things never happened. But I REMEMBER them happening."',
          nextSceneId: 'denier-1',
          xpBonus: 5,
          feedback: 'The Denier. The most disorienting form of gaslighting.',
        },
        {
          id: 'fork-minimizer',
          text: '"They say I\'m overreacting to everything. Maybe I AM too sensitive?"',
          nextSceneId: 'minimizer-1',
          xpBonus: 5,
          feedback: 'The Minimizer. Making your feelings the problem.',
        },
        {
          id: 'fork-projector',
          text: '"Somehow every fight ends with ME apologizing. Even when they started it."',
          nextSceneId: 'projector-1',
          xpBonus: 5,
          feedback: 'The Projector. DARVO master. You become the villain.',
        },
      ],
    },

    // ============================================
    // PATH A: THE DENIER - "That never happened"
    // ============================================
    {
      id: 'denier-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel leans forward. \"Give me an example.\" You think. \"Last month, Casey promised to come to Mom's birthday. Day of, they said they never agreed to that. I specifically remember them saying yes.\"",
        },
        {
          text: "Rachel frowns. \"Do you have the text?\" You freeze. You've been relying on memory. Casey always seems so certain. Maybe you DID imagine it?",
        },
        {
          speakerId: 'inner-voice',
          text: "You remember. But memory feels slippery when someone keeps erasing it.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'denier-1a',
          text: '"I... I didn\'t think to save it. Maybe I did imagine it."',
          nextSceneId: 'denier-2-doubt',
          feedback: 'Without documentation, you doubt yourself. That\'s exactly how they want it.',
        },
        {
          id: 'denier-1b',
          text: '"Let me check. I might still have it."',
          nextSceneId: 'denier-2-evidence',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'documentation',
          feedback: 'Evidence is your anchor. Always check before surrendering your memory.',
        },
        {
          id: 'denier-1c',
          text: '"I KNOW what they said. I don\'t need proof."',
          nextSceneId: 'denier-2-defiant',
          xpBonus: 5,
          feedback: 'Trusting yourself is good. But documentation makes you bulletproof.',
        },
      ],
    },
    {
      id: 'denier-2-evidence',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You scroll through your phone. There it is. \"See you at your mom's Saturday! 🎂\" Black and white. Undeniable.",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "Rachel exhales. \"There it is. They texted it. So why did they tell you it never happened?\" Good question. Why deny something that's documented?",
        },
        {
          speakerId: 'inner-voice',
          text: "Because they count on you not checking.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-2a',
          text: '"Maybe they forgot? Everyone forgets sometimes."',
          nextSceneId: 'denier-3-excuse',
          feedback: 'Forgetting is human. Confidently denying documented reality is gaslighting.',
        },
        {
          id: 'denier-2b',
          text: '"This keeps happening. I\'m not crazy."',
          nextSceneId: 'denier-3-pattern',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_recognition',
          feedback: 'Once is a mistake. Twice is coincidence. A pattern is manipulation.',
        },
      ],
    },
    {
      id: 'denier-2-doubt',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel looks at you carefully. \"You just said 'maybe I imagined it.' About something you specifically remember. Do you hear yourself?\"",
          speakerId: 'sister',
          emotion: 'concerned',
        },
        {
          text: "You pause. She's right. When did you start doubting your own clear memories?",
        },
      ],
      nextSceneId: 'denier-3-pattern',
    },
    {
      id: 'denier-2-defiant',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel nods slowly. \"I believe you. But here's the thing—Casey doesn't care what you know. They care what you can prove. Start screenshotting everything.\"",
          speakerId: 'sister',
          emotion: 'knowing',
        },
        {
          text: "It feels paranoid. But she has a point. Your memory is under siege. Evidence is your only defense.",
        },
      ],
      nextSceneId: 'denier-3-pattern',
    },
    {
      id: 'denier-3-excuse',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel sets down her coffee. \"Let me ask you something. When you showed Casey proof before, what happened?\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "You think back. The vacation plans. The dinner reservation. Each time you had evidence, Casey found a way to spin it. \"That was a different conversation.\" \"I was joking.\" \"You took it out of context.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "Evidence didn't change their denial. It just changed their excuse.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-3a',
          text: '"They always have an explanation. Maybe the explanations make sense?"',
          nextSceneId: 'denier-4-weak',
          feedback: 'When every explanation contradicts documented evidence, the explanations are the problem.',
        },
        {
          id: 'denier-3b',
          text: '"I\'m starting to see a pattern here."',
          nextSceneId: 'denier-4-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'awakening',
          feedback: 'Pattern recognition is the beginning of freedom.',
        },
      ],
    },
    {
      id: 'denier-3-pattern',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You start listing incidents. The vacation they insisted you never booked (you have the confirmation email). The fight they say never happened (you remember crying). The promise about meeting your boss (denied the next day).",
          speakerId: 'sister',
          emotion: 'sad',
        },
        {
          text: "Rachel listens. Her face shifts from concern to something harder. \"This is a pattern. This is gaslighting.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "A pattern. Not random. Deliberate.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-3pa',
          text: '"What if I\'m the one misremembering? What if I\'M the problem?"',
          nextSceneId: 'denier-4-weak',
          feedback: 'That doubt you feel? That\'s the gaslighting working. You\'re not the problem.',
        },
        {
          id: 'denier-3pb',
          text: '"I know I\'m not crazy. I have proof. I just... don\'t know what to do."',
          nextSceneId: 'denier-4-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'reality_anchoring',
          feedback: 'Holding your reality while seeking guidance. This is how you escape.',
        },
      ],
    },
    {
      id: 'denier-4-weak',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel takes your hand. \"Listen to me. You just showed me proof Casey lied. And your first instinct was still to blame yourself. That's what they've trained you to do.\"",
          speakerId: 'sister',
          emotion: 'concerned',
        },
        {
          text: "The words land hard. Trained. Like an animal. You've been conditioned to doubt yourself before doubting them.",
        },
      ],
      nextSceneId: 'denier-5-decision',
    },
    {
      id: 'denier-4-clarity',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel pulls out her phone. \"I want to show you something. Remember Christmas when Casey told you everyone thought you were rude to their mom?\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "She plays a video. You're at Christmas dinner. Laughing. Casey's mom hugging you, saying \"We're so glad you're part of the family.\" But Casey said everyone was uncomfortable. Casey said you ruined the night.",
        },
        {
          speakerId: 'inner-voice',
          text: "Video doesn't lie. Casey does.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-4a',
          text: '"I... I apologized for weeks after that. For something that never happened."',
          nextSceneId: 'denier-5-decision',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'reality_restoration',
          feedback: 'You apologized for a lie. Now you see clearly.',
        },
        {
          id: 'denier-4b',
          text: '"Maybe the video doesn\'t show everything..."',
          nextSceneId: 'denier-bad-ending',
          feedback: 'You\'re still protecting their narrative over evidence. The distortion is deep.',
        },
      ],
    },
    {
      id: 'denier-5-decision',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel looks at you steadily. \"You have a choice. Stay with someone who makes you doubt your own reality. Or trust what you know is true and leave.\"",
          speakerId: 'sister',
          emotion: 'serious',
        },
        {
          text: "It sounds so simple. But months of doubt have made everything foggy. Can you trust your own judgment enough to act on it?",
        },
        {
          speakerId: 'inner-voice',
          text: "You have the evidence. You have a witness. The only question is whether you trust yourself.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-5a',
          text: '"I need to talk to Casey first. Get their side."',
          nextSceneId: 'denier-neutral-ending',
          feedback: 'Their \"side\" is whatever erases your reality. But some people need to verify one more time.',
        },
        {
          id: 'denier-5b',
          text: '"I\'ve heard their side. It\'s always denial. I\'m done."',
          nextSceneId: 'denier-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'clean_exit',
          feedback: 'You don\'t need their permission to trust your own memory.',
        },
        {
          id: 'denier-5c',
          text: '"Maybe couples therapy could help us communicate better?"',
          nextSceneId: 'denier-neutral-ending',
          xpBonus: 5,
          feedback: 'Therapy with a gaslighter often becomes another arena for manipulation.',
        },
      ],
    },
    // DENIER ENDINGS
    {
      id: 'denier-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "One month later. You've moved out. Started a journal—every day, you write what happened. No one can rewrite it now. The fog lifted faster than you expected.",
        },
        {
          text: "Casey tried calling. \"I don't know what I did wrong. You're remembering things that didn't happen.\" Same script. But now you have a folder of screenshots. Emails. Texts. Reality documented. Reality preserved.",
          speakerId: 'casey',
          emotion: 'pleading',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Reality Restored',
      endingSummary: 'You escaped the denier by trusting your documented evidence over their confident lies. Your memory is reliable. It always was.',
    },
    {
      id: 'denier-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You confront Casey with the text evidence. They pause, then pivot. \"Okay, I said that, but you know I didn't MEAN it like a promise. You always take things so literally.\"",
          speakerId: 'casey',
          emotion: 'cold',
        },
        {
          text: "New defense. Same denial. You stay another six months before finally leaving. The fog took longer to clear. But eventually, evidence outweighed explanation.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Delayed Clarity',
      endingSummary: 'You got there eventually. But every confrontation gave them time to create new distortions. Next time, trust the pattern faster.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Want to recognize these patterns sooner?',
    },
    {
      id: 'denier-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You dismiss Rachel's evidence. \"You don't know Casey like I do.\" She stops calling. Sarah stops calling. Everyone stops calling. Casey is the only voice left.",
        },
        {
          text: "Years later, you find the old screenshots. The documented lies. But now you can't remember which version is real. The person who could have left is gone. Replaced by someone who needs Casey to tell them what happened.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Lost in Denial',
      endingSummary: 'You chose their narrative over documented evidence. The reality validators were silenced. Now there\'s only their version of the truth.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Understanding why this happened can help you heal.',
    },

    // ============================================
    // PATH B: THE MINIMIZER - "You're overreacting"
    // ============================================
    {
      id: 'minimizer-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel frowns. \"What kind of things do you 'overreact' to?\" You think. \"I got upset when they cancelled our anniversary at the last minute. They said I was being dramatic. That it's just a date on a calendar.\"",
        },
        {
          text: "You hear yourself and pause. Anniversary. Last minute cancellation. For their \"work thing.\" And YOU'RE the dramatic one?",
        },
        {
          speakerId: 'inner-voice',
          text: "Since when is caring about your anniversary 'dramatic'?",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'minimizer-1a',
          text: '"Maybe I DO make too big a deal of things."',
          nextSceneId: 'minimizer-2-doubt',
          feedback: 'Their voice in your head. Making your feelings the problem.',
        },
        {
          id: 'minimizer-1b',
          text: '"When I say it out loud, it sounds... off."',
          nextSceneId: 'minimizer-2-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'perspective_shift',
          feedback: 'Hearing your own story often reveals what you couldn\'t see from inside it.',
        },
        {
          id: 'minimizer-1c',
          text: '"It wasn\'t just the anniversary. It\'s everything."',
          nextSceneId: 'minimizer-2-pattern',
          xpBonus: 10,
          feedback: 'The pattern matters more than any single incident.',
        },
      ],
    },
    {
      id: 'minimizer-2-doubt',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel sets down her coffee. \"I'm going to ask you a question, and I want you to really think about it. Before Casey, did other people call you 'too sensitive'?\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "You think back. Your friends. Your previous relationship. No one ever said you were too much. You were actually known for being even-keeled. When did that change?",
        },
      ],
      nextSceneId: 'minimizer-3-awakening',
    },
    {
      id: 'minimizer-2-clarity',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel nods. \"It does sound off. Because it IS off. Being upset when someone cancels your anniversary isn't 'dramatic.' It's having basic standards.\"",
          speakerId: 'sister',
          emotion: 'knowing',
        },
        {
          text: "Basic standards. You've been treating normal expectations as character flaws. When did \"I have needs\" become \"I'm too much\"?",
        },
        {
          speakerId: 'inner-voice',
          text: "Your feelings aren't the problem. The dismissal of them is.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-2a',
          text: '"Casey says other partners never had issues with them. It must be me."',
          nextSceneId: 'minimizer-3-compare',
          feedback: 'Using phantom exes to make you the problem. Classic minimizer tactic.',
        },
        {
          id: 'minimizer-2b',
          text: '"I used to know my feelings were valid. I don\'t know what happened."',
          nextSceneId: 'minimizer-3-awakening',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'self_recognition',
          feedback: 'Recognizing who you were before is the first step to reclaiming yourself.',
        },
      ],
    },
    {
      id: 'minimizer-2-pattern',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"Everything?\" Rachel asks. You nod. \"When I'm tired, I'm 'dramatic.' When I need space, I'm 'cold.' When I want to talk about us, I'm 'obsessive.' Every feeling I have gets a label that makes it wrong.\"",
          speakerId: 'sister',
          emotion: 'concerned',
        },
        {
          text: "Rachel is quiet for a moment. \"So you can never feel anything without being told you're feeling it wrong?\"",
        },
      ],
      nextSceneId: 'minimizer-3-awakening',
    },
    {
      id: 'minimizer-3-compare',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel raises an eyebrow. \"Their exes 'never had issues'? Did they tell you why those relationships ended?\"",
          speakerId: 'sister',
          emotion: 'smirking',
        },
        {
          text: "You think. Casey always said their exes were \"crazy\" or \"unstable\" or \"too clingy.\" Funny how everyone who dated Casey ends up being the problem. Everyone except Casey.",
        },
        {
          speakerId: 'inner-voice',
          text: "If all their exes were crazy... maybe the common factor isn't them.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-3a',
          text: '"I guess I never thought about it that way."',
          nextSceneId: 'minimizer-3-awakening',
          xpBonus: 10,
          feedback: 'The crazy ex collection is a red flag, not a reassurance.',
        },
        {
          id: 'minimizer-3b',
          text: '"But maybe they WERE difficult. Some people are."',
          nextSceneId: 'minimizer-4-weak',
          feedback: 'Still defending Casey\'s narrative. The conditioning runs deep.',
        },
      ],
    },
    {
      id: 'minimizer-3-awakening',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel takes your hand. \"Here's what I see. You used to be confident. You knew what you wanted. You expressed your feelings without apology. Now? You question everything about yourself.\"",
          speakerId: 'sister',
          emotion: 'sad',
        },
        {
          text: "The words hit hard. Because they're true. You used to trust your gut. Now your gut speaks and you immediately wonder if it's \"too much.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "You didn't become 'too sensitive.' You were trained to think you are.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-3aa',
          text: '"Maybe being with someone means compromising on how you express emotions."',
          nextSceneId: 'minimizer-4-weak',
          feedback: 'Compromise doesn\'t mean erasing your feelings. That\'s suppression.',
        },
        {
          id: 'minimizer-3ab',
          text: '"I miss who I was before. I want that back."',
          nextSceneId: 'minimizer-4-clarity',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'identity_reclamation',
          feedback: 'Missing yourself is the first sign you can find your way back.',
        },
      ],
    },
    {
      id: 'minimizer-4-weak',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel sighs. \"I'm going to say something hard. The person defending Casey right now? That's not you. That's Casey's training. The real you would never accept being told your feelings don't matter.\"",
          speakerId: 'sister',
          emotion: 'concerned',
        },
        {
          text: "Trained. There's that word again. Like you've been programmed. The thought is uncomfortable because it might be true.",
        },
      ],
      nextSceneId: 'minimizer-5-decision',
    },
    {
      id: 'minimizer-4-clarity',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel smiles, but it's sad. \"That person is still in there. Casey just put so much noise around her that she forgot how to hear herself.\"",
          speakerId: 'sister',
          emotion: 'hopeful',
        },
        {
          text: "You think about the last time you expressed a need without immediately wondering if it was \"too much.\" You can't remember. That silence speaks volumes.",
        },
        {
          speakerId: 'inner-voice',
          text: "Your feelings are data. They tell you what you need. They were never the enemy.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-4a',
          text: '"What if I tell Casey how I feel and they actually hear me this time?"',
          nextSceneId: 'minimizer-5-hope',
          feedback: 'Hope is human. But patterns don\'t change because you asked nicely.',
        },
        {
          id: 'minimizer-4b',
          text: '"I don\'t think Casey will ever see my feelings as valid."',
          nextSceneId: 'minimizer-5-decision',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_acceptance',
          feedback: 'Accepting the pattern is harder than hoping it changes. It\'s also the only path forward.',
        },
      ],
    },
    {
      id: 'minimizer-5-hope',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "That night, you try. \"Casey, I need to talk about how we communicate. When I express feelings, I need them to be heard, not dismissed.\"",
        },
        {
          text: "Casey sighs. \"See, this is what I mean. Everything has to be a 'conversation.' Can't we just be normal? You analyze everything. It's exhausting.\"",
          speakerId: 'casey',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "You asked to be heard. They called you exhausting. That's your answer.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'minimizer-5a',
          text: '"Maybe I should just stop bringing things up."',
          nextSceneId: 'minimizer-bad-ending',
          feedback: 'Silence is surrender. They\'ve trained you to mute yourself.',
        },
        {
          id: 'minimizer-5b',
          text: '"This reaction is exactly what I was talking about."',
          nextSceneId: 'minimizer-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'clarity_moment',
          feedback: 'You asked for validation. Got dismissal. The answer is clear now.',
        },
      ],
    },
    {
      id: 'minimizer-5-decision',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel looks at you. \"So what are you going to do?\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "The question hangs in the air. You know the answer. The question is whether you trust your own feelings enough to act on them. Ironic, given what you've been talking about.",
        },
        {
          speakerId: 'inner-voice',
          text: "Your feelings say this is wrong. You can trust that. You always could.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-5da',
          text: '"I need time to think. I\'m not sure what I feel anymore."',
          nextSceneId: 'minimizer-neutral-ending',
          feedback: 'Uncertainty is understandable. But time with them is time in the fog.',
        },
        {
          id: 'minimizer-5db',
          text: '"I feel like I need to leave. And I\'m going to trust that feeling."',
          nextSceneId: 'minimizer-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'self_trust',
          feedback: 'Trusting your feelings after they\'ve been invalidated for months. This is courage.',
        },
      ],
    },
    // MINIMIZER ENDINGS
    {
      id: 'minimizer-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "Two months later. Therapy has helped you rebuild. The first session, your therapist asked, \"What do you feel right now?\" And you burst into tears. Because no one had asked that in so long.",
        },
        {
          text: "Now you're learning to hear yourself again. Every feeling is valid data. Sadness means loss. Anger means boundary violation. Fear means threat. They're not character flaws. They're navigation tools.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Feelings Reclaimed',
      endingSummary: 'You escaped the minimizer by trusting your emotions again. Your sensitivity isn\'t a weakness. It\'s awareness. Never let anyone make you apologize for feeling.',
    },
    {
      id: 'minimizer-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stay another year. Some days are better. Some days you feel \"crazy\" again. The doubt never fully leaves. Eventually you leave, but it takes longer than it should have.",
        },
        {
          text: "In therapy, you learn the term: emotional invalidation. You weren't too sensitive. You were being systematically trained to distrust your own feelings. The recovery takes time.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Delayed Exit',
      endingSummary: 'You got out eventually, but the minimizer\'s voice stayed in your head longer than it should have. Trust your feelings faster next time.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Want to recognize emotional invalidation earlier?',
    },
    {
      id: 'minimizer-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stop bringing things up. Stop expressing needs. Stop having \"issues.\" Casey seems happier. The fights stop. You feel... nothing. Peace or numbness? Hard to tell the difference now.",
        },
        {
          text: "Years later, you don't remember who you were before. That person who trusted her gut, who knew her own feelings—she's gone. Replaced by someone who asks permission to feel. The minimizer won.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Feeling Erased',
      endingSummary: 'You silenced yourself to keep the peace. Your emotions became inconvenient, then invisible, then gone. This isn\'t harmony. It\'s erasure.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Understanding what happened is the first step to healing.',
    },

    // ============================================
    // PATH C: THE PROJECTOR - DARVO Master
    // ============================================
    {
      id: 'projector-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel nods slowly. \"Walk me through it. A specific fight.\" You think back to last week. Casey forgot your work event. You mentioned it. Somehow it ended with you apologizing for \"not reminding them enough.\"",
        },
        {
          text: "\"Wait,\" Rachel says. \"They forgot. And YOU apologized?\" When she says it like that, it sounds absurd. But in the moment, it felt logical.",
        },
        {
          speakerId: 'inner-voice',
          text: "How did their failure become your fault?",
          emotion: 'confused',
        },
      ],
      choices: [
        {
          id: 'projector-1a',
          text: '"I mean, I COULD have reminded them more..."',
          nextSceneId: 'projector-2-absorb',
          feedback: 'Still accepting responsibility for their failure. The projection stuck.',
        },
        {
          id: 'projector-1b',
          text: '"When I replay it, I don\'t understand how that happened."',
          nextSceneId: 'projector-2-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_confusion',
          feedback: 'Not understanding is honest. The trick doesn\'t make sense because it isn\'t fair.',
        },
        {
          id: 'projector-1c',
          text: '"It happens every time. I bring up something they did, and I end up the bad guy."',
          nextSceneId: 'projector-2-pattern',
          xpBonus: 10,
          feedback: 'Recognizing the pattern is half the battle.',
        },
      ],
    },
    {
      id: 'projector-2-absorb',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel looks at you for a long moment. \"Let me ask you something. When's the last time Casey apologized for something without you having to apologize first?\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "You try to think of an example. The silence stretches. You genuinely can't remember Casey ever taking full responsibility for anything. There was always a \"but you also...\" attached.",
        },
      ],
      nextSceneId: 'projector-3-darvo',
    },
    {
      id: 'projector-2-clarity',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"It's called DARVO,\" Rachel says. \"Deny, Attack, Reverse Victim and Offender. They forgot your event. You brought it up. Watch what happened next.\"",
          speakerId: 'sister',
          emotion: 'knowing',
        },
        {
          text: "She's right. First Casey denied it was a big deal. Then attacked your \"nagging.\" Then became the victim—\"I can't do anything right.\" And you ended up comforting them about their own failure.",
        },
        {
          speakerId: 'inner-voice',
          text: "You walked in with a legitimate concern. Walked out apologizing. That's not resolution. That's manipulation.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-2a',
          text: '"But they seemed genuinely hurt. Maybe I WAS too harsh."',
          nextSceneId: 'projector-3-doubt',
          feedback: 'Their hurt is real. But weaponizing it to avoid accountability is manipulation.',
        },
        {
          id: 'projector-2b',
          text: '"That\'s exactly what happens. Every single time."',
          nextSceneId: 'projector-3-darvo',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'darvo_recognition',
          feedback: 'Recognizing the pattern is the first step to breaking it.',
        },
      ],
    },
    {
      id: 'projector-2-pattern',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"Every time?\" Rachel leans forward. \"So you're never allowed to have a concern? Every issue you raise gets flipped back on you?\"",
          speakerId: 'sister',
          emotion: 'concerned',
        },
        {
          text: "You nod. The pattern is so consistent, you'd almost stopped noticing it. Raise a concern. Get attacked. Become the villain. Apologize. Repeat.",
        },
      ],
      nextSceneId: 'projector-3-darvo',
    },
    {
      id: 'projector-3-doubt',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel sighs. \"Okay. Let's test this. Next time you have a concern, bring it up calmly. Just state the issue. See what happens.\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "You agree. That night, you try. \"Hey, I noticed you didn't reply to my text about dinner plans. Just want to make sure we're on the same page.\" Calm. Neutral. No accusation.",
        },
        {
          text: "Reasonable. Let's see what they do with reasonable.",
        },
      ],
      nextSceneId: 'projector-4-test',
    },
    {
      id: 'projector-3-darvo',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "\"The trick,\" Rachel says, \"is that they genuinely feel like the victim. That's what makes it so effective. They're not faking distress. They've convinced themselves they're being attacked.\"",
          speakerId: 'sister',
          emotion: 'knowing',
        },
        {
          text: "That lands hard. Casey's tears are real. Their hurt is real. But somehow their real hurt always centers their pain and erases your concern.",
        },
        {
          speakerId: 'inner-voice',
          text: "Their feelings are real. The narrative that makes you the villain is not.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-3a',
          text: '"So how do I talk to them without triggering this?"',
          nextSceneId: 'projector-4-test',
          feedback: 'You can\'t fix their deflection. You can only choose whether to accept it.',
        },
        {
          id: 'projector-3b',
          text: '"Maybe the issue isn\'t HOW I bring things up. Maybe they can\'t handle accountability."',
          nextSceneId: 'projector-4-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accountability_test',
          feedback: 'The problem isn\'t your delivery. It\'s their inability to be the one who\'s wrong.',
        },
      ],
    },
    {
      id: 'projector-4-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Casey's response is instant. \"Oh, so now I have to report to you? You're tracking my responses? This is exactly the controlling behavior I was worried about.\"",
          speakerId: 'casey',
          emotion: 'angry',
        },
        {
          text: "You're stunned. All you asked about was dinner plans. Suddenly you're \"controlling.\" The pivot was so fast you have whiplash.",
        },
        {
          speakerId: 'inner-voice',
          text: "You asked about dinner. They accused you of control. Watch the sleight of hand.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-4a',
          text: '"I\'m not trying to control you, I just—"',
          nextSceneId: 'projector-5-defense',
          feedback: 'Now you\'re defending yourself against an accusation that came from nowhere.',
        },
        {
          id: 'projector-4b',
          text: '"I asked about dinner. That\'s not controlling. This is exactly what Rachel meant."',
          nextSceneId: 'projector-5-clarity',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'reality_anchor',
          feedback: 'Naming the deflection in real-time. They can\'t operate when you see the trick.',
        },
      ],
    },
    {
      id: 'projector-4-clarity',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel nods. \"Exactly. You could deliver a concern on a pillow made of clouds with a side of validation, and they'd still find a way to flip it. The issue isn't your approach.\"",
          speakerId: 'sister',
          emotion: 'serious',
        },
        {
          text: "\"It's that being wrong—even about something small—is intolerable to them. So every mistake becomes your fault. Every failure becomes your oversight. The narrative always protects them.\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'projector-5-decision',
    },
    {
      id: 'projector-5-defense',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "\"You're always so defensive,\" Casey continues. \"I can't even share my feelings without you making it about you.\" Wait. YOU made it about you? You asked about dinner plans. They're the one who—",
          speakerId: 'casey',
          emotion: 'cold',
        },
        {
          text: "Your head spins. You're not even sure what you're arguing about anymore. That's the point. Confusion is the goal.",
        },
        {
          speakerId: 'inner-voice',
          text: "You came in with a question. Now you're defending your character. How did that happen?",
          emotion: 'confused',
        },
      ],
      choices: [
        {
          id: 'projector-5a',
          text: '"You\'re right, I\'m sorry, I didn\'t mean to upset you."',
          nextSceneId: 'projector-neutral-ending',
          feedback: 'You apologized for asking about dinner. The projection is complete.',
        },
        {
          id: 'projector-5b',
          text: '"Stop. I asked a simple question. How did this become about my character?"',
          nextSceneId: 'projector-5-clarity',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'redirect',
          feedback: 'Naming the redirect breaks the spell. Hold your ground.',
        },
      ],
    },
    {
      id: 'projector-5-clarity',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Casey pauses. Something flickers behind their eyes—surprise? Recognition? Then their expression hardens. \"Wow. So now I'm the villain? I can't even have feelings?\"",
          speakerId: 'casey',
          emotion: 'cold',
        },
        {
          text: "There it is. The victim flip. They're not addressing your concern. They're performing hurt to make you the aggressor.",
        },
        {
          speakerId: 'inner-voice',
          text: "You pointed out the pattern. They made you the bad guy for noticing. That's the whole game.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-5ca',
          text: '"This is exactly what I was talking about. I\'m done."',
          nextSceneId: 'projector-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'exit',
          feedback: 'The clearest example of the pattern is also the clearest reason to leave.',
        },
        {
          id: 'projector-5cb',
          text: '"Maybe we can talk when you\'re calmer."',
          nextSceneId: 'projector-neutral-ending',
          xpBonus: 5,
          feedback: 'A tactical retreat. But you\'ll be back here next week with the same outcome.',
        },
      ],
    },
    {
      id: 'projector-5-decision',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Rachel looks at you. \"So what do you want to do?\"",
          speakerId: 'sister',
          emotion: 'neutral',
        },
        {
          text: "The answer is clearer than it's been in months. You can't have a conversation about problems because you always become the problem. That's not a relationship. That's a trap.",
        },
        {
          speakerId: 'inner-voice',
          text: "You can't fix what they won't acknowledge. And they'll never acknowledge anything.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-5da',
          text: '"I think I need to leave. I can\'t win an argument where I\'m always the villain."',
          nextSceneId: 'projector-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'clarity_exit',
          feedback: 'You can\'t be both the problem and the solution. This is wisdom.',
        },
        {
          id: 'projector-5db',
          text: '"Maybe if I just stop bringing things up, we\'ll be fine."',
          nextSceneId: 'projector-bad-ending',
          feedback: 'Silence isn\'t peace. It\'s surrender to their narrative.',
        },
      ],
    },
    // PROJECTOR ENDINGS
    {
      id: 'projector-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "Three months later. You're learning to trust yourself again. In therapy, you practice stating concerns without apologizing for them. \"I feel hurt when...\" without \"but maybe I'm being too sensitive.\"",
        },
        {
          text: "Casey tried reaching out once. \"I've been thinking about what you said. You were right about some things.\" Some things. Still can't fully own it. You didn't respond. Some patterns don't change—they just find new victims.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'No Longer the Villain',
      endingSummary: 'You escaped the projector by refusing to accept the villain role. Your concerns are valid. Their inability to hear them was never your failure to communicate—it was their refusal to be accountable.',
    },
    {
      id: 'projector-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stay for another year. Every conversation follows the same script: concern, deflection, blame, apology. You get better at avoiding triggers. Which means you get better at not expressing needs.",
        },
        {
          text: "Eventually, you leave. But not before absorbing the lesson that your concerns are attacks. The next relationship, you have to unlearn the flinch when you need something.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Delayed Exit',
      endingSummary: 'You got out, but the projector\'s programming took years to unlearn. Your needs aren\'t attacks. Your concerns aren\'t criticisms. Trust that sooner next time.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Want to recognize projection faster?',
    },
    {
      id: 'projector-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stop bringing things up. No concerns. No complaints. No needs. Casey seems happier. The fights stop. You've finally learned to be a \"good partner.\"",
        },
        {
          text: "Years later, you realize you don't have concerns anymore. Not because everything is fine—because you don't believe your concerns deserve voice. The projection became your internal monologue. You're your own villain now.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Self-Projection',
      endingSummary: 'You absorbed their narrative so completely that you became the critic. Every need feels selfish. Every concern feels like an attack. You gaslight yourself now.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Understanding what happened can help you heal.',
    },
  ],
};
