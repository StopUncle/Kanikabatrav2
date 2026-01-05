// Scenario: The Reality Distortion (Male Version v2)
// 3 paths: The Denier, The Minimizer, The Projector
// Learn to recognize and escape different gaslighting styles
// v2 format: male psychology focus, visceral bad endings

import type { Scenario } from '../../types';

export const maleGaslighterEscapeScenario: Scenario = {
  id: 'male-gaslighter-escape',
  title: 'The Reality Distortion',
  tagline: 'Trust your instincts.',
  description:
    "She has a way of making you doubt everything - your memories, your perceptions, even your sanity. Learn to recognize gaslighting tactics and reclaim your reality.",
  tier: 'premium',
  estimatedMinutes: 18,
  difficulty: 'advanced',
  category: 'gaslighter',
  xpReward: 175,
  badgeId: 'reality-anchor',
  targetGender: 'male',

  templates: {
    gaslighter: ['Cassidy', 'Morgan', 'Taylor', 'Jordan', 'Riley'],
    brother: ['Ryan', 'Tyler', 'Marcus', 'Jake', 'Connor'],
    friend: ['Mike', 'Dave', 'Chris', 'Matt', 'Kevin'],
  },

  tacticsLearned: [
    'Gaslighting recognition (denial, minimizing, projection)',
    'DARVO detection (Deny, Attack, Reverse Victim/Offender)',
    'Reality documentation',
    'Emotional validation for men',
    'Strategic exit planning',
    'Recognizing ego-targeted manipulation',
  ],
  redFlagsTaught: [
    '"That never happened" (memory rewriting)',
    '"You\'re being dramatic" (feeling invalidation)',
    '"You\'re the one with trust issues" (projection)',
    'Denying documented events',
    'Making you apologize for her behavior',
    '"You\'re not like other guys" then making you the villain',
  ],

  characters: [
    {
      id: 'cassidy',
      name: 'Cassidy',
      description: 'Charming and persuasive. Has an answer for everything - especially your concerns.',
      traits: ['gaslighter', 'manipulative', 'charming'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'brother',
      name: 'Ryan',
      description: 'Your brother who has watched this relationship unfold with growing concern.',
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
    // OPENING SCENE - Ryan reaches out
    // ============================================
    {
      id: 'scene-1',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You're meeting Ryan for beers. He's been texting more lately, checking in. When you sit down, his face is serious. \"I'm just going to say it. Something feels off with you and Cassidy. You seem... different. Smaller.\"",
          speakerId: 'brother',
          emotion: 'concerned',
        },
        {
          text: "You start to defend her, but pause. There IS something. Something you haven't been able to name. The constant second-guessing. The feeling that you're always wrong. When did that start?",
        },
        {
          speakerId: 'inner-voice',
          text: "He noticed. That means it's real.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'fork-denier',
          text: '"She keeps saying things never happened. But I REMEMBER them happening."',
          nextSceneId: 'denier-1',
          xpBonus: 5,
          feedback: 'The Denier. The most disorienting form of gaslighting.',
        },
        {
          id: 'fork-minimizer',
          text: '"She says I\'m overreacting to everything. Maybe I AM too sensitive?"',
          nextSceneId: 'minimizer-1',
          xpBonus: 5,
          feedback: 'The Minimizer. Making your feelings the problem.',
        },
        {
          id: 'fork-projector',
          text: '"Somehow every fight ends with ME apologizing. Even when she started it."',
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan leans forward. \"Give me an example.\" You think. \"Last month, Cassidy promised to come to my work dinner. Day of, she said she never agreed to that. I specifically remember her saying yes. She even picked out what to wear.\"",
        },
        {
          text: "Ryan frowns. \"Do you have the text?\" You freeze. You've been relying on memory. Cassidy always seems so certain. She made you feel crazy for even bringing it up. Maybe you DID imagine it?",
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
          feedback: "Without documentation, you doubt yourself. That's exactly how she wants it.",
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
          text: '"I KNOW what she said. I don\'t need proof."',
          nextSceneId: 'denier-2-defiant',
          xpBonus: 5,
          feedback: 'Trusting yourself is good. But documentation makes you bulletproof.',
        },
      ],
    },
    {
      id: 'denier-2-evidence',
      backgroundId: 'bar',
      dialog: [
        {
          text: "You scroll through your phone. There it is. \"Can't wait for your work dinner! Gonna make you look good babe\" Black and white. Undeniable.",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "Ryan exhales. \"There it is. She texted it. So why did she tell you it never happened?\" Good question. Why deny something that's documented?",
        },
        {
          speakerId: 'inner-voice',
          text: "Because she counts on you not checking. Because your trust is her weapon.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-2a',
          text: '"Maybe she forgot? Everyone forgets sometimes."',
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan looks at you carefully. \"You just said 'maybe I imagined it.' About something you specifically remember. Do you hear yourself, man?\"",
          speakerId: 'brother',
          emotion: 'concerned',
        },
        {
          text: "You pause. He's right. When did you start doubting your own clear memories? You used to be the guy who trusted his gut.",
        },
      ],
      nextSceneId: 'denier-3-pattern',
    },
    {
      id: 'denier-2-defiant',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan nods slowly. \"I believe you. But here's the thing—Cassidy doesn't care what you know. She cares what you can prove. Start screenshotting everything.\"",
          speakerId: 'brother',
          emotion: 'knowing',
        },
        {
          text: "It feels paranoid. But he has a point. Your memory is under siege. Evidence is your only defense.",
        },
      ],
      nextSceneId: 'denier-3-pattern',
    },
    {
      id: 'denier-3-excuse',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan sets down his beer. \"Let me ask you something. When you showed Cassidy proof before, what happened?\"",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "You think back. The vacation plans. The dinner reservation. The meeting with your boss. Each time you had evidence, Cassidy found a way to spin it. \"That was a different conversation.\" \"I was joking.\" \"You took it out of context.\"",
        },
        {
          speakerId: 'inner-voice',
          text: "Evidence didn't change her denial. It just changed her excuse.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'denier-3a',
          text: '"She always has an explanation. Maybe the explanations make sense?"',
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "You start listing incidents. The trip she insisted you never booked (you have the confirmation email). The fight she says never happened (you remember her screaming). The promise about meeting your parents (denied the next day).",
          speakerId: 'brother',
          emotion: 'sad',
        },
        {
          text: "Ryan listens. His face shifts from concern to something harder. \"This is a pattern. This is gaslighting.\"",
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
          feedback: "That doubt you feel? That's the gaslighting working. You're not the problem.",
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan grabs your arm. \"Listen to me. You just showed me proof Cassidy lied. And your first instinct was still to blame yourself. That's what she's trained you to do.\"",
          speakerId: 'brother',
          emotion: 'concerned',
        },
        {
          text: "The words land hard. Trained. Like you've been conditioned to doubt yourself before doubting her. Since when do you not trust your own eyes?",
        },
      ],
      nextSceneId: 'denier-5-decision',
    },
    {
      id: 'denier-4-clarity',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan pulls out his phone. \"I want to show you something. Remember her birthday party when Cassidy told you everyone thought you were rude to her friends? That you made her look bad?\"",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "He shows you photos. You're laughing with her friends. Her best friend has her arm around you. Someone tagged you: \"So glad Cass found a good one!\" But Cassidy said everyone was uncomfortable. Said you embarrassed her.",
        },
        {
          speakerId: 'inner-voice',
          text: "Photos don't lie. Cassidy does.",
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
          text: '"Maybe the photos don\'t show everything..."',
          nextSceneId: 'denier-bad-ending',
          feedback: "You're still protecting her narrative over evidence. The distortion is deep.",
        },
      ],
    },
    {
      id: 'denier-5-decision',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan looks at you steadily. \"You have a choice. Stay with someone who makes you doubt your own reality. Or trust what you know is true and leave.\"",
          speakerId: 'brother',
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
          text: '"I need to talk to Cassidy first. Get her side."',
          nextSceneId: 'denier-neutral-ending',
          feedback: "Her \"side\" is whatever erases your reality. But some people need to verify one more time.",
        },
        {
          id: 'denier-5b',
          text: '"I\'ve heard her side. It\'s always denial. I\'m done."',
          nextSceneId: 'denier-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'clean_exit',
          feedback: "You don't need her permission to trust your own memory.",
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
          text: "Cassidy tried calling. \"I don't know what I did wrong. You're remembering things that didn't happen.\" Same script. But now you have a folder of screenshots. Emails. Texts. Reality documented. Reality preserved.",
          speakerId: 'cassidy',
          emotion: 'pleading',
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Reality Restored',
      endingSummary: 'You escaped the denier by trusting your documented evidence over her confident lies. Your memory is reliable. It always was.',
    },
    {
      id: 'denier-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You confront Cassidy with the text evidence. She pauses, then pivots. \"Okay, I said that, but you know I didn't MEAN it like a promise. You always take things so literally. That's your problem.\"",
          speakerId: 'cassidy',
          emotion: 'cold',
        },
        {
          text: "New defense. Same denial. You stay another six months before finally leaving. The fog took longer to clear. But eventually, evidence outweighed explanation.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Delayed Clarity',
      endingSummary: 'You got there eventually. But every confrontation gave her time to create new distortions. Next time, trust the pattern faster.',
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Want to recognize these patterns sooner?',
    },
    {
      id: 'denier-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You dismiss Ryan's evidence. \"You don't know her like I do.\" He stops calling. Your friends stop calling. Cassidy is the only voice left. She tells you they were \"jealous of what you have.\"",
        },
        {
          text: "A year later, you find Cassidy's new Instagram. She's with someone else. The caption? \"Finally found someone who trusts me.\" Your mutual friends comment heart emojis. The reality you defended... she rewrote for someone new.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Lost in Denial',
      endingSummary: "She moved on. You were a chapter she erased. The guy in her photos? He'll be you in two years. But you can't warn him—she's already told him you were 'controlling.'",
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Understanding why this happened can help you heal.',
    },

    // ============================================
    // PATH B: THE MINIMIZER - "You're overreacting"
    // ============================================
    {
      id: 'minimizer-1',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan frowns. \"What kind of things do you 'overreact' to?\" You think. \"She cancelled on my promotion dinner at the last minute. Said I was being dramatic for being upset. That it's 'just a dinner.'\"",
        },
        {
          text: "You hear yourself and pause. Your promotion. Last minute cancellation. For her \"girls' night.\" And YOU'RE the dramatic one?",
        },
        {
          speakerId: 'inner-voice',
          text: "Since when is caring about your own promotion 'dramatic'? You worked for this.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'minimizer-1a',
          text: '"Maybe I DO make too big a deal of things."',
          nextSceneId: 'minimizer-2-doubt',
          feedback: "Her voice in your head. Making your feelings the problem.",
        },
        {
          id: 'minimizer-1b',
          text: '"When I say it out loud, it sounds... off."',
          nextSceneId: 'minimizer-2-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'perspective_shift',
          feedback: "Hearing your own story often reveals what you couldn't see from inside it.",
        },
        {
          id: 'minimizer-1c',
          text: '"It wasn\'t just the dinner. It\'s everything."',
          nextSceneId: 'minimizer-2-pattern',
          xpBonus: 10,
          feedback: 'The pattern matters more than any single incident.',
        },
      ],
    },
    {
      id: 'minimizer-2-doubt',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan sets down his beer. \"I'm going to ask you a question, and I want you to really think about it. Before Cassidy, did anyone call you 'too sensitive'?\"",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "You think back. Your friends. Your ex. Your coworkers. No one ever said you were too much. You were actually known for being level-headed. When did that change?",
        },
      ],
      nextSceneId: 'minimizer-3-awakening',
    },
    {
      id: 'minimizer-2-clarity',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan nods. \"It does sound off. Because it IS off. Being upset when someone skips your promotion dinner isn't 'dramatic.' It's having basic self-respect.\"",
          speakerId: 'brother',
          emotion: 'knowing',
        },
        {
          text: "Basic self-respect. You've been treating normal expectations as character flaws. When did \"I have needs\" become \"I'm too much\"?",
        },
        {
          speakerId: 'inner-voice',
          text: "Your feelings aren't the problem. Her dismissal of them is.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-2a',
          text: '"She says her exes never had issues with her. It must be me."',
          nextSceneId: 'minimizer-3-compare',
          feedback: "Using phantom exes to make you the problem. Classic minimizer tactic.",
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Everything?\" Ryan asks. You nod. \"When I'm tired, I'm 'weak.' When I need space, I'm 'distant.' When I want to talk about us, I'm 'insecure.' Every feeling I have gets a label that makes it wrong.\"",
          speakerId: 'brother',
          emotion: 'concerned',
        },
        {
          text: "Ryan is quiet for a moment. \"So you can never feel anything without being told you're feeling it wrong?\"",
        },
      ],
      nextSceneId: 'minimizer-3-awakening',
    },
    {
      id: 'minimizer-3-compare',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan raises an eyebrow. \"Her exes 'never had issues'? Did she tell you why those relationships ended?\"",
          speakerId: 'brother',
          emotion: 'smirking',
        },
        {
          text: "You think. Cassidy always said her exes were \"insecure\" or \"controlling\" or \"couldn't handle a strong woman.\" Funny how everyone who dated Cassidy ends up being the problem. Everyone except Cassidy.",
        },
        {
          speakerId: 'inner-voice',
          text: "If all her exes were 'insecure'... maybe the common factor isn't them.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'minimizer-3a',
          text: '"I guess I never thought about it that way."',
          nextSceneId: 'minimizer-3-awakening',
          xpBonus: 10,
          feedback: "The crazy ex collection is a red flag, not a reassurance.",
        },
        {
          id: 'minimizer-3b',
          text: '"But maybe they WERE insecure. Some guys are."',
          nextSceneId: 'minimizer-4-weak',
          feedback: "Still defending her narrative. The conditioning runs deep.",
        },
      ],
    },
    {
      id: 'minimizer-3-awakening',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan grabs your shoulder. \"Here's what I see. You used to be confident. You knew what you wanted. You stood up for yourself. Now? You question everything about yourself.\"",
          speakerId: 'brother',
          emotion: 'sad',
        },
        {
          text: "The words hit hard. Because they're true. You used to trust your gut. Now your gut speaks and you immediately wonder if it's \"too much\" or \"dramatic.\"",
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
          feedback: "Compromise doesn't mean erasing your feelings. That's suppression.",
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan sighs. \"I'm going to say something hard. The person defending Cassidy right now? That's not you. That's her training. The real you would never accept being told your feelings don't matter.\"",
          speakerId: 'brother',
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan nods. \"That guy is still in there. Cassidy just put so much noise around him that he forgot how to hear himself.\"",
          speakerId: 'brother',
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
          text: '"What if I tell Cassidy how I feel and she actually hears me this time?"',
          nextSceneId: 'minimizer-5-hope',
          feedback: "Hope is human. But patterns don't change because you asked nicely.",
        },
        {
          id: 'minimizer-4b',
          text: '"I don\'t think Cassidy will ever see my feelings as valid."',
          nextSceneId: 'minimizer-5-decision',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_acceptance',
          feedback: "Accepting the pattern is harder than hoping it changes. It's also the only path forward.",
        },
      ],
    },
    {
      id: 'minimizer-5-hope',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "That night, you try. \"Cassidy, I need to talk about how we communicate. When I express feelings, I need them to be heard, not dismissed.\"",
        },
        {
          text: "Cassidy sighs dramatically. \"See, this is what I mean. Everything has to be a 'conversation.' Can't we just be normal? Other guys don't need to process everything. It's exhausting.\"",
          speakerId: 'cassidy',
          emotion: 'cold',
        },
        {
          speakerId: 'inner-voice',
          text: "You asked to be heard. She called you exhausting. Compared you to 'other guys.' That's your answer.",
          emotion: 'concerned',
        },
      ],
      choices: [
        {
          id: 'minimizer-5a',
          text: '"Maybe I should just stop bringing things up."',
          nextSceneId: 'minimizer-bad-ending',
          feedback: "Silence is surrender. She's trained you to mute yourself.",
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan looks at you. \"So what are you going to do?\"",
          speakerId: 'brother',
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
          feedback: "Uncertainty is understandable. But time with her is time in the fog.",
        },
        {
          id: 'minimizer-5db',
          text: '"I feel like I need to leave. And I\'m going to trust that feeling."',
          nextSceneId: 'minimizer-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'self_trust',
          feedback: "Trusting your feelings after they've been invalidated for months. This is strength.",
        },
      ],
    },
    // MINIMIZER ENDINGS
    {
      id: 'minimizer-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "Two months later. Therapy has helped you rebuild. The first session, your therapist asked, \"What do you feel right now?\" And you had to pause. Because no one had asked that in so long.",
        },
        {
          text: "Now you're learning to hear yourself again. Every feeling is valid data. Frustration means boundary crossed. Anger means disrespect tolerated. They're not character flaws. They're navigation tools.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Feelings Reclaimed',
      endingSummary: "You escaped the minimizer by trusting your emotions again. Your sensitivity isn't weakness. It's awareness. Never let anyone make you apologize for feeling.",
    },
    {
      id: 'minimizer-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stay another year. Some days are better. Some days you feel \"dramatic\" again. The doubt never fully leaves. Eventually you leave, but it takes longer than it should have.",
        },
        {
          text: "In therapy, you learn the term: emotional invalidation. You weren't too sensitive. You were being systematically trained to distrust your own feelings. The recovery takes time.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'Delayed Exit',
      endingSummary: "You got out eventually, but the minimizer's voice stayed in your head longer than it should have. Trust your feelings faster next time.",
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Want to recognize emotional invalidation earlier?',
    },
    {
      id: 'minimizer-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stop bringing things up. Stop expressing needs. Stop having \"issues.\" Cassidy seems happier. The fights stop. You feel... nothing.",
        },
        {
          text: "Six months later, she leaves you for her coworker. Her explanation? \"You were never really present. It was like dating a wall.\" She made you small. Then left you for not being big enough. Her new guy posts gym selfies. She comments fire emojis. You unfollowed.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Feeling Erased',
      endingSummary: "She silenced you, then left because you were silent. She's with someone 'more fun' now—someone she hasn't broken yet. Give it time.",
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Understanding what happened is the first step to healing.',
    },

    // ============================================
    // PATH C: THE PROJECTOR - DARVO Master
    // ============================================
    {
      id: 'projector-1',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan nods slowly. \"Walk me through it. A specific fight.\" You think back to last week. Cassidy flirted with a guy at a party. You mentioned it. Somehow it ended with you apologizing for \"being insecure\" and \"not trusting her.\"",
        },
        {
          text: "\"Wait,\" Ryan says. \"She flirted in front of you. And YOU apologized?\" When he says it like that, it sounds absurd. But in the moment, it felt logical.",
        },
        {
          speakerId: 'inner-voice',
          text: "How did her behavior become your fault?",
          emotion: 'confused',
        },
      ],
      choices: [
        {
          id: 'projector-1a',
          text: '"I mean, I probably WAS being insecure..."',
          nextSceneId: 'projector-2-absorb',
          feedback: 'Still accepting responsibility for her behavior. The projection stuck.',
        },
        {
          id: 'projector-1b',
          text: '"When I replay it, I don\'t understand how that happened."',
          nextSceneId: 'projector-2-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'pattern_confusion',
          feedback: "Not understanding is honest. The trick doesn't make sense because it isn't fair.",
        },
        {
          id: 'projector-1c',
          text: '"It happens every time. I bring up something she did, and I end up the bad guy."',
          nextSceneId: 'projector-2-pattern',
          xpBonus: 10,
          feedback: 'Recognizing the pattern is half the battle.',
        },
      ],
    },
    {
      id: 'projector-2-absorb',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan looks at you for a long moment. \"Let me ask you something. When's the last time Cassidy apologized for something without you having to apologize first?\"",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "You try to think of an example. The silence stretches. You genuinely can't remember Cassidy ever taking full responsibility for anything. There was always a \"but you also...\" attached.",
        },
      ],
      nextSceneId: 'projector-3-darvo',
    },
    {
      id: 'projector-2-clarity',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"It's called DARVO,\" Ryan says. \"Deny, Attack, Reverse Victim and Offender. She flirted. You brought it up. Watch what happened next.\"",
          speakerId: 'brother',
          emotion: 'knowing',
        },
        {
          text: "He's right. First Cassidy denied it was flirting. Then attacked your \"jealousy.\" Then became the victim—\"I can't even talk to people without you freaking out.\" And you ended up comforting her about her own behavior.",
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
          text: '"But she seemed genuinely hurt. Maybe I WAS too jealous."',
          nextSceneId: 'projector-3-doubt',
          feedback: 'Her hurt is real. But weaponizing it to avoid accountability is manipulation.',
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"Every time?\" Ryan leans forward. \"So you're never allowed to have a concern? Every issue you raise gets flipped back on you?\"",
          speakerId: 'brother',
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
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan sighs. \"Okay. Let's test this. Next time you have a concern, bring it up calmly. Just state the issue. See what happens.\"",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "You agree. That night, you try. \"Hey, I noticed you didn't tell me about your plans tonight until the last minute. Just want to make sure we're communicating.\" Calm. Neutral. No accusation.",
        },
        {
          text: "Reasonable. Let's see what she does with reasonable.",
        },
      ],
      nextSceneId: 'projector-4-test',
    },
    {
      id: 'projector-3-darvo',
      backgroundId: 'bar',
      dialog: [
        {
          text: "\"The trick,\" Ryan says, \"is that she genuinely feels like the victim. That's what makes it so effective. She's not faking distress. She's convinced herself she's being attacked.\"",
          speakerId: 'brother',
          emotion: 'knowing',
        },
        {
          text: "That lands hard. Cassidy's tears are real. Her hurt is real. But somehow her real hurt always centers her pain and erases your concern.",
        },
        {
          speakerId: 'inner-voice',
          text: "Her feelings are real. The narrative that makes you the villain is not.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-3a',
          text: '"So how do I talk to her without triggering this?"',
          nextSceneId: 'projector-4-test',
          feedback: "You can't fix her deflection. You can only choose whether to accept it.",
        },
        {
          id: 'projector-3b',
          text: '"Maybe the issue isn\'t HOW I bring things up. Maybe she can\'t handle accountability."',
          nextSceneId: 'projector-4-clarity',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accountability_test',
          feedback: "The problem isn't your delivery. It's her inability to be the one who's wrong.",
        },
      ],
    },
    {
      id: 'projector-4-test',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Cassidy's response is instant. \"Oh, so now I have to report to you? You're tracking my schedule? This is exactly the controlling behavior my friends warned me about.\"",
          speakerId: 'cassidy',
          emotion: 'angry',
        },
        {
          text: "You're stunned. All you asked about was communication. Suddenly you're \"controlling.\" Her friends already have a narrative about you. The pivot was so fast you have whiplash.",
        },
        {
          speakerId: 'inner-voice',
          text: "You asked about plans. She accused you of control. Watch the sleight of hand.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'projector-4a',
          text: '"I\'m not trying to control you, I just—"',
          nextSceneId: 'projector-5-defense',
          feedback: "Now you're defending yourself against an accusation that came from nowhere.",
        },
        {
          id: 'projector-4b',
          text: '"I asked about communication. That\'s not controlling. This is exactly what Ryan meant."',
          nextSceneId: 'projector-5-clarity',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'reality_anchor',
          feedback: "Naming the deflection in real-time. She can't operate when you see the trick.",
        },
      ],
    },
    {
      id: 'projector-4-clarity',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan nods. \"Exactly. You could deliver a concern on a pillow made of clouds with a side of compliments, and she'd still find a way to flip it. The issue isn't your approach.\"",
          speakerId: 'brother',
          emotion: 'serious',
        },
        {
          text: "\"It's that being wrong—even about something small—is intolerable to her. So every mistake becomes your fault. Every failure becomes your insecurity. The narrative always protects her.\"",
          speakerId: 'brother',
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
          text: "\"You're always so defensive,\" Cassidy continues. \"I can't even share my feelings without you making it about you.\" Wait. YOU made it about you? You asked about her plans. She's the one who—",
          speakerId: 'cassidy',
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
          feedback: 'You apologized for asking a reasonable question. The projection is complete.',
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
          text: "Cassidy pauses. Something flickers behind her eyes—surprise? Recognition? Then her expression hardens. \"Wow. So now I'm the villain? I can't even have feelings?\"",
          speakerId: 'cassidy',
          emotion: 'cold',
        },
        {
          text: "There it is. The victim flip. She's not addressing your concern. She's performing hurt to make you the aggressor.",
        },
        {
          speakerId: 'inner-voice',
          text: "You pointed out the pattern. She made you the bad guy for noticing. That's the whole game.",
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
          feedback: "A tactical retreat. But you'll be back here next week with the same outcome.",
        },
      ],
    },
    {
      id: 'projector-5-decision',
      backgroundId: 'bar',
      dialog: [
        {
          text: "Ryan looks at you. \"So what do you want to do?\"",
          speakerId: 'brother',
          emotion: 'neutral',
        },
        {
          text: "The answer is clearer than it's been in months. You can't have a conversation about problems because you always become the problem. That's not a relationship. That's a trap.",
        },
        {
          speakerId: 'inner-voice',
          text: "You can't fix what she won't acknowledge. And she'll never acknowledge anything.",
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
          feedback: "You can't be both the problem and the solution. This is wisdom.",
        },
        {
          id: 'projector-5db',
          text: '"Maybe if I just stop bringing things up, we\'ll be fine."',
          nextSceneId: 'projector-bad-ending',
          feedback: "Silence isn't peace. It's surrender to her narrative.",
        },
      ],
    },
    // PROJECTOR ENDINGS
    {
      id: 'projector-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "Three months later. You're learning to trust yourself again. In therapy, you practice stating concerns without apologizing for them. \"I noticed...\" without \"but maybe I'm being insecure.\"",
        },
        {
          text: "Cassidy tried reaching out once. \"I've been thinking about what you said. You were right about some things.\" Some things. Still can't fully own it. You didn't respond. Some patterns don't change—they just find new victims.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'No Longer the Villain',
      endingSummary: "You escaped the projector by refusing to accept the villain role. Your concerns are valid. Her inability to hear them was never your failure—it was her refusal to be accountable.",
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
      endingSummary: "You got out, but the projector's programming took years to unlearn. Your needs aren't attacks. Your concerns aren't criticisms. Trust that sooner next time.",
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Want to recognize projection faster?',
    },
    {
      id: 'projector-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You stop bringing things up. No concerns. No complaints. No needs. Cassidy seems happier. The fights stop. You've finally learned to be a \"good boyfriend.\"",
        },
        {
          text: "Eight months later, she dumps you for her ex. The one she said was \"crazy\" and \"controlling.\" Her explanation? \"I just felt a spark again.\" You see them together on Instagram, doing things she said she hated. The villain in her story of you... was always just the narrator.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Self-Projection',
      endingSummary: "She left for the 'crazy' ex. You were too agreeable. Too easy. Next guy will hear how 'boring' you were. Her story changes. You stay the villain.",
      endingLearnReference: 'gaslighting-101',
      endingLearnPrompt: 'Understanding what happened can help you heal.',
    },
  ],
};

export default maleGaslighterEscapeScenario;
