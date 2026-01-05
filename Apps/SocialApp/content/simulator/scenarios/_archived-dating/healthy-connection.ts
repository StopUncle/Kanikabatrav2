// Scenario: The Green Flags (v2)
// Learn to recognize healthy relationship patterns without sabotaging them

import type { Scenario } from '../types';

export const healthyConnectionScenario: Scenario = {
  id: 'healthy-connection',
  title: 'The Green Flags',
  tagline: 'What does healthy even look like?',
  description:
    "After dating manipulators, you've met Morgan - someone who actually seems... normal. But can you trust peace? Or will you self-sabotage because calm feels boring to a nervous system trained on chaos?",
  tier: 'free',
  estimatedMinutes: 10,
  difficulty: 'beginner',
  category: 'healthy',
  xpReward: 100,
  badgeId: 'healthy-detector',

  tacticsLearned: [
    'Green flag recognition',
    'Healthy communication patterns',
    'Secure attachment behaviors',
    'Peace vs chaos discernment',
    'Self-sabotage prevention',
  ],
  redFlagsTaught: [
    'Hyper-independence as a trauma wall',
    'Self-sabotage from past experiences',
    'Confusing calm with boring',
    'Testing secure partners to destruction',
    'Mistaking anxiety for chemistry',
  ],

  characters: [
    {
      id: 'morgan',
      name: 'Morgan',
      description:
        'Emotionally available, communicative, and consistent. A secure attachment style.',
      traits: ['secure', 'communicative', 'consistent'],
      defaultEmotion: 'happy',
    },
    {
      id: 'inner',
      name: 'Your Inner Voice',
      description:
        'The part of you shaped by past experiences. Sometimes protective, sometimes paranoid.',
      traits: ['cautious', 'healing'],
      defaultEmotion: 'confused',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    {
      id: 'scene-1',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Third date with Morgan. They're late - five minutes now. Your phone buzzes: 'So sorry! Train delay. Walking fast. 5 more minutes max. Already ordered your oat latte.' A text explaining and apologizing... without you asking. Your last ex would show up 20 minutes late with no explanation.",
          speakerId: 'morgan',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "GREEN FLAG: Proactive communication. This is baseline decency - but it feels foreign.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: '"No worries at all! See you soon."',
          nextSceneId: 'scene-2a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'accepting_kindness',
          feedback: "OPTIMAL: You accepted healthy behavior without punishing it.",
        },
        {
          id: 'choice-1b',
          text: "Don't respond. Let them sweat a little.",
          nextSceneId: 'scene-2b',
          feedback: "Testing them for no reason. Morgan isn't your ex. Punishing good behavior creates the chaos you claim to hate.",
        },
        {
          id: 'choice-1c',
          text: '"It\'s fine, I guess. I\'ve been waiting."',
          nextSceneId: 'scene-2c',
          feedback: "Passive-aggressive. They already apologized proactively. This punishes healthy communication.",
        },
      ],
    },
    {
      id: 'scene-2a',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan arrives, slightly out of breath, hair windblown. 'Hey you. Sorry again.' They pause to catch their breath. 'I really, genuinely hate being late. It makes me feel like a flake.' They slide into the seat, accidentally knocking the sugar dispenser. Catch it. Laugh at themselves. 'Okay. Graceful entrance: nailed it.'",
          speakerId: 'morgan',
          emotion: 'happy',
        },
        {
          text: "You find yourself smiling. They're a little clumsy. A little self-deprecating. It's... endearing. 'So, how was your day? Wait—' They sit up straighter. 'The presentation. The client pitch. How did it go?' They... remembered? A detail you mentioned once, in passing?",
          speakerId: 'morgan',
          emotion: 'neutral',
        },
      ],
      nextSceneId: 'scene-3',
    },
    {
      id: 'scene-2b',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You don't respond. Power move, right? Morgan arrives, looking slightly anxious. 'Hey, did you get my message? I was worried it didn't send.' They're not defensive. They're... worried about you. They thought something happened to their message, not that you were playing games.",
          speakerId: 'morgan',
          emotion: 'confused',
        },
        {
          speakerId: 'inner',
          text: "Why are you testing someone who was being thoughtful? This isn't strategy. It's self-sabotage dressed as power.",
          emotion: 'sad',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: '"Oh yeah! Sorry, I was reading. No worries at all."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 10,
          feedback: "Course correction. You caught yourself playing games and stopped.",
        },
        {
          id: 'choice-2b',
          text: '"I don\'t need constant updates."',
          nextSceneId: 'scene-2d',
          feedback: "Pushing away healthy communication. They will remember this.",
        },
      ],
    },
    {
      id: 'scene-2c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan's face falls slightly, then resets. 'You're right, I'm sorry. I really do hate being late. Won't happen again.' No defensiveness. Just accountability. Your ex would have made it your fault for being annoyed.",
          speakerId: 'morgan',
          emotion: 'sad',
        },
        {
          text: "That response was unnecessary. They were already apologetic. You punished healthy behavior because it felt unfamiliar.",
        },
      ],
      nextSceneId: 'scene-3',
    },
    {
      id: 'scene-2d',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan blinks, surprised. 'Oh, I... okay. I just didn't want you to think I stood you up or didn't care. I'll dial it back. Sorry if that was too much.' They're adapting to your feedback. The problem is: that was healthy communication you just punished.",
          speakerId: 'morgan',
          emotion: 'sad',
        },
        {
          text: "You told them consideration is unwelcome. They heard you. They will be less considerate now. Congratulations.",
        },
      ],
      nextSceneId: 'scene-3',
    },
    {
      id: 'scene-3',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "The conversation flows. Morgan asks about your presentation. 'It went well, actually. My boss said I nailed the client pitch.' Morgan's face lights up. Genuinely lights up. 'That's amazing! I knew you would.' They tap the table excitedly. 'You were so stressed about it, but I could tell you had it handled.'",
          speakerId: 'morgan',
          emotion: 'happy',
        },
        {
          text: "No jealousy. No minimizing. No 'well, I did something even harder.' Just... happiness for you. Wait for the catch. There's always a catch. What if there isn't one? What if they're just... happy that you're happy?",
        },
        {
          speakerId: 'inner',
          text: "This feels unfamiliar. Unfamiliar isn't the same as dangerous.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: '"Thanks! What about you? How\'s your thing going?"',
          nextSceneId: 'scene-4a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'reciprocity',
          feedback: "OPTIMAL: Healthy relationships are mutual. You're engaging, not deflecting.",
        },
        {
          id: 'choice-3b',
          text: '"It wasn\'t that big a deal, really..."',
          nextSceneId: 'scene-4b',
          feedback: "You're uncomfortable receiving genuine praise. That's trauma talking.",
        },
        {
          id: 'choice-3c',
          text: '"You\'re being really nice. What do you want?"',
          nextSceneId: 'scene-4c',
          feedback: 'Past trauma making you suspicious of kindness. You just accused someone of having ulterior motives for... being supportive.',
        },
      ],
    },
    {
      id: 'scene-4a',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan's expression shifts. 'Actually... kind of rough.' They stir their coffee absently. 'Had to let someone go on my team this week. I know it was the right call, but I kept second-guessing myself all night. Barely slept.'",
          speakerId: 'morgan',
          emotion: 'sad',
        },
        {
          text: "A beat. Then they shake their head. 'Sorry, I don't want to dump work stuff on date night. Tell me more about your pitch!' They shared something real, then caught themselves. Not hiding, but not drowning you either. Your ex would have either refused to share anything, or made the whole night about their problems.",
        },
        {
          speakerId: 'inner',
          text: "Balanced sharing. Neither hiding nor dumping. This is healthy.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: '"No, I want to hear. That sounds really hard."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'holding_space',
          feedback: "OPTIMAL: You're creating space for them. This is how intimacy is built.",
        },
        {
          id: 'choice-4b',
          text: '"Yeah, let\'s keep it light. Tell me something fun."',
          nextSceneId: 'scene-5',
          feedback: "Not wrong, but you missed a connection opportunity.",
        },
      ],
    },
    {
      id: 'scene-4b',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan tilts their head. 'But it was a big deal. You worked hard for it. It's okay to celebrate wins.' They're not letting you minimize yourself. Your ex would have agreed that it wasn't a big deal.",
          speakerId: 'morgan',
          emotion: 'confused',
        },
        {
          text: "GREEN FLAG: They won't participate in your self-deprecation. They see value where you've been trained to hide it.",
        },
      ],
      nextSceneId: 'scene-5',
    },
    {
      id: 'scene-4c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan's expression shifts to concern. 'Nothing? I'm just... happy for you? Is that weird? If my support feels uncomfortable, we can talk about that. But I'm not being nice to get something.' Direct. Calm. Not defensive. Not making you feel crazy. Just honest.",
          speakerId: 'morgan',
          emotion: 'confused',
        },
        {
          text: "This is what secure attachment looks like. It's unfamiliar because you've been trained on chaos, not because it's dangerous.",
        },
      ],
      nextSceneId: 'scene-5',
    },
    {
      id: 'scene-5',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Later, the date is winding down. Morgan mentions weekend plans. 'I'm hiking with friends Saturday, but I'd love to see you Sunday if you're free.' They have their own life. They're not orbiting you 24/7. But they're making clear they want to see you.",
          speakerId: 'morgan',
          emotion: 'happy',
        },
        {
          speakerId: 'inner',
          text: "GREEN FLAG: They have their own life AND they want you in it. This is healthy independence, not abandonment.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '"Sunday works! Have fun hiking."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'secure_relating',
          feedback: "OPTIMAL: You're not threatened by their independence. A high-value person wants a partner with their own life.",
        },
        {
          id: 'choice-5b',
          text: '"Oh, you have plans? Who are you going with?"',
          nextSceneId: 'scene-6b',
          feedback: "The jealousy is showing. They told you: hiking with friends. This is your insecurity, not their problem.",
        },
        {
          id: 'choice-5c',
          text: '"Maybe. I might be busy. I\'ll let you know."',
          nextSceneId: 'scene-6c',
          feedback: "Playing games instead of being direct. You want to see them. Why pretend otherwise?",
        },
      ],
    },
    {
      id: 'scene-6a',
      backgroundId: 'park',
      dialog: [
        {
          text: "Sunday arrives. You meet Morgan at a farmer's market. They're wearing a ridiculous sunhat. 'Don't laugh. I burn in like ten minutes.' You laugh anyway. They grin. 'The hike was incredible. Also, look at this bruise—' They roll up their sleeve. 'I tripped over literally nothing. My friend Jake won't let me live it down.'",
          speakerId: 'morgan',
          emotion: 'happy',
        },
        {
          text: "They show you photos of the hike. Their friends making dumb faces. The views. 'Maya said I should bring you next time. If you want. No pressure.' They're sharing their world. Not hiding it, not making a big production of it. Just... offering.",
        },
      ],
      nextSceneId: 'scene-7',
    },
    {
      id: 'scene-6b',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan's eyebrows raise slightly. 'College friends. Jake, Maya, and Chris. We try to do monthly hikes. Are you okay? That question felt a little...' They noticed. They're gently calling it out. Not attacking, just observing.",
          speakerId: 'morgan',
          emotion: 'confused',
        },
        {
          speakerId: 'inner',
          text: "A secure person doesn't let suspicious behavior slide - but they also don't assume the worst.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: '"Sorry, old habits. My ex was secretive. I trust you."',
          nextSceneId: 'scene-6a',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'owning_patterns',
          feedback: "OPTIMAL: Acknowledging your triggers without blaming them. This is maturity.",
        },
        {
          id: 'choice-6b',
          text: '"I was just asking. Don\'t make it weird."',
          nextSceneId: 'scene-neutral-ending',
          feedback: "Deflecting when called out. You made it weird by interrogating an innocent statement.",
        },
      ],
    },
    {
      id: 'scene-6c',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Morgan nods. 'Okay, let me know. No pressure.' They don't chase. They don't get upset. They just... respect your space. Why doesn't that feel like victory? Why does their calmness feel like rejection?",
          speakerId: 'morgan',
          emotion: 'neutral',
        },
        {
          text: "You're used to people fighting for you when you pull away. Their security feels like indifference. It isn't.",
        },
      ],
      nextSceneId: 'scene-7-alt',
    },
    {
      id: 'scene-7',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "A few weeks in. You're at Morgan's place. You accidentally see a text from their ex pop up: 'Hey, hope you're well. Just saw something that reminded me of you.' Your heart races. Here it is. The other shoe. The thing you've been waiting for.",
        },
        {
          text: "Morgan sees that you saw it. 'Oh, that's Sam. We ended on good terms. I'll respond later with something brief and friendly. Does that bother you? We can talk about it.' They didn't hide it. They explained before you asked. They invited conversation. This is... healthy.",
          speakerId: 'morgan',
          emotion: 'neutral',
        },
        {
          speakerId: 'inner',
          text: "Transparency without defensiveness. This is what trust looks like.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: '"Thanks for being transparent. I appreciate you telling me."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'trust_building',
          feedback: "OPTIMAL: You recognized transparency and acknowledged it. This is how secure relationships work.",
        },
        {
          id: 'choice-7b',
          text: '"I don\'t want you talking to your ex."',
          nextSceneId: 'scene-8',
          feedback: "Control impulse activated. They did nothing wrong. This demand is about your fear, not their behavior.",
        },
        {
          id: 'choice-7c',
          text: '"It\'s fine." (It\'s not fine.)',
          nextSceneId: 'scene-neutral-ending',
          feedback: "Suppressing instead of communicating. 'Fine' when you don't mean it creates resentment.",
        },
      ],
    },
    {
      id: 'scene-7-alt',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You did end up telling them Sunday worked. The date went well. But something's been nagging you. Morgan is... stable. Consistent. Present. Where's the intensity? Where's the passion? Where's the drama?",
        },
        {
          text: "You mean where's the chaos? Where's the anxiety you've learned to call 'chemistry'? Healthy feels boring to a nervous system trained on drama. That doesn't mean it's wrong. It means you're healing.",
        },
        {
          speakerId: 'inner',
          text: "Peace is not the absence of passion - it's the presence of security.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: 'Give it time. "Boring" might just be "safe." Stay.',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'patience',
          feedback: "OPTIMAL: You're recognizing the difference between calm and boring. Stay the course.",
        },
        {
          id: 'choice-8b',
          text: "Maybe there's no spark. I need chemistry.",
          nextSceneId: 'scene-neutral-ending',
          feedback: "Are you confusing anxiety for attraction? Those 'butterflies' with toxic people were your body screaming danger.",
        },
      ],
    },
    {
      id: 'scene-8',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Morgan pauses. 'I hear that you're uncomfortable. But I can't cut off someone who's done nothing wrong just to prove loyalty. If you don't trust me based on my actions, controlling who I talk to won't fix that.'",
          speakerId: 'morgan',
          emotion: 'neutral',
        },
        {
          text: "That's... actually reasonable. They're not being defensive. They're setting a boundary. A secure person doesn't abandon healthy relationships to soothe an insecure partner. They address the insecurity directly.",
        },
        {
          speakerId: 'inner',
          text: "This is a healthy boundary. Can you accept it?",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: '"You\'re right. I\'m sorry. Let me work on this."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'self_reflection',
          feedback: 'OPTIMAL: Growth. You recognized your own pattern and chose differently. This is how you break cycles.',
        },
        {
          id: 'choice-8b',
          text: '"Whatever. Do what you want."',
          nextSceneId: 'scene-bad-ending',
          feedback: "Shutting down instead of growing. You wanted them to cave to your insecurity. Now you're punishing them for having boundaries.",
        },
      ],
    },
    {
      id: 'scene-good-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Six months later. You're telling your therapist about Morgan. 'It's weird. I don't have anxiety about where we stand. They text back. They show up. They communicate.' 'Is it boring?' 'No. It's... peaceful. I didn't know relationships could feel this way.'",
        },
        {
          text: "'What changed?' 'I stopped testing them. I stopped waiting for the other shoe. I let someone actually love me.' Your inner voice is quiet now. Not suspicious. Not waiting for betrayal. Just... content. Those butterflies you used to chase? They were anxiety. This peace? This is what love actually feels like.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'Learning to Receive',
      endingSummary:
        "You recognized healthy patterns and didn't self-sabotage. You chose peace over chaos, security over anxiety. This is what healing looks like.",
    },
    {
      id: 'scene-neutral-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Things fizzle with Morgan. Not dramatically - they're not the type. 'I think we're looking for different things,' they say gently. 'I really like you. But I can feel you holding back. I can't connect with someone who won't let me in.'",
          speakerId: 'morgan',
          emotion: 'sad',
        },
        {
          text: "They weren't wrong. You were guarding against hurt that never came. Your armor protected you from nothing. But it cost you something real. Next time, remember: vulnerability isn't weakness. It's the price of connection.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The One That Got Away',
      endingSummary:
        "Your walls protected you from nothing and cost you something real. Healthy love requires vulnerability. You weren't ready. Maybe next time.",
    },
    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You push Morgan away. They let you. 'I wish you the best.' No drama. No begging. No fighting. Just a calm, clean exit. And then they're gone. You find yourself back on the apps. Matching with someone intense. Red flags everywhere. But that's familiar.",
        },
        {
          text: "This is what you chose. Chaos over peace. Drama over stability. Again. Until you heal, you'll keep choosing the wrong kind of exciting. Morgan wasn't boring. They were safe. You just didn't know how to accept that yet.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'Choosing Chaos',
      endingSummary:
        "You rejected healthy because it felt unfamiliar. You called peace 'boring' and went back to chasing butterflies. Those butterflies are warning signals.",
    },
  ],
};
