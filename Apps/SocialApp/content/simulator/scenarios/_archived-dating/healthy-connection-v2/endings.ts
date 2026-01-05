import type { Scene } from '../../types';

// ENDINGS FOR HEALTHY-CONNECTION SCENARIO
// The "bad" endings here are about self-sabotage - pushing away a good person
// The loss is missing out on genuine connection due to trauma patterns

export const earlyEndings: Scene[] = [
  {
    id: 'early-good-ending',
    backgroundId: 'park',
    dialog: [
      {
        text: "Three months later. You're at the farmers market with Michael. He's holding your hand. Remembering your coffee order. Planning the camping trip you mentioned wanting to try.",
      },
      {
        text: "It's still not 'exciting' the way chaos used to be. But you realize—you're not anxious. You're not wondering if he likes you. You're just... happy. Peaceful. Present.",
      },
      {
        text: "'You okay?' he asks, catching you smiling. 'Yeah,' you say. 'I really am.'",
        speakerId: 'michael',
        emotion: 'happy',
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Green Flag Win',
    endingSummary: "You learned to recognize what healthy looks like—and let yourself receive it. Consistency isn't boring when you're not addicted to chaos. Michael's steady presence became your peace, not your anxiety.",
  },
  {
    id: 'early-neutral-ending',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Things with Michael are... fine. You're still dating. He's still consistent. But there's a wall you can't quite take down.",
      },
      {
        text: "'I feel like you're waiting for me to disappoint you,' he says one night. 'Like you're testing me and I don't know the answers.'",
        speakerId: 'michael',
        emotion: 'sad',
      },
      {
        text: "He's not wrong. You're protected. Safe. But also... alone inside the fortress you built.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Guarded Heart',
    endingSummary: "You didn't push him away, but you didn't let him in either. The relationship exists in a holding pattern—safe but shallow. Your walls protected you from pain but also from real connection.",
    endingLearnReference: 'early-4-open',
    endingLearnPrompt: 'What if you had let your guard down when he showed consistency?',
  },
  {
    id: 'early-bad-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Two weeks later. Michael texts less. Calls less. The energy shifted after that dinner when you called him 'intense.'",
      },
      {
        text: "Then the text: 'Hey, I've been thinking. I really like you, but I feel like you're not ready for something real. I don't want to keep trying to prove myself. I think we should stop seeing each other.'",
      },
      {
        text: "He wasn't wrong. You taught him that his effort was too much. So he stopped. The healthy one walked away. And you're left with what you know—the guys who don't try at all.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Self-Fulfilling Prophecy',
    endingSummary: "You pushed away a good man because his consistency felt foreign. Your walls didn't protect you—they isolated you. The pattern continues: chase unavailable people, reject available ones. The loneliness is familiar. That doesn't make it safe.",
    endingLearnReference: 'early-3a',
    endingLearnPrompt: 'What if you had acknowledged his effort instead of labeling it "intense"?',
  },
];

export const conflictEndings: Scene[] = [
  {
    id: 'conflict-good-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "That Saturday he blocked off? You spend it hiking, cooking together, talking about nothing and everything. No phones. No interruptions. Just presence.",
      },
      {
        text: "'I want you to know,' he says, stirring pasta, 'I'm not perfect. I'll mess up. But I'll always try to make it right. That's all I can promise.'",
        speakerId: 'michael',
        emotion: 'serious',
      },
      {
        text: "You realize—that's enough. Not perfection. Repair. Effort. Accountability. This is what healthy conflict looks like. And you can do this.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Repair Pattern',
    endingSummary: "You learned the difference between healthy conflict and toxic chaos. Michael showed you that disagreements don't have to destroy. He took accountability, made repairs, and showed up differently. That's not weakness—it's strength.",
  },
  {
    id: 'conflict-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The tension from that night lingers for days. You both pretend it didn't happen. He's a little more careful. You're a little more guarded.",
      },
      {
        text: "'Are we okay?' he finally asks. 'Yeah, of course,' you say. But neither of you believes it.",
        speakerId: 'michael',
        emotion: 'concerned',
      },
      {
        text: "You avoided the conflict. But the unspoken things pile up. Resentment builds in silence. The relationship becomes a minefield of things you're not saying.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Silent Tension',
    endingSummary: "You avoided direct communication and chose passive silence instead. The conflict wasn't resolved—it was buried. Healthy relationships require naming what you feel, even when it's uncomfortable. Silence isn't peace; it's pressure building.",
    endingLearnReference: 'conflict-3a',
    endingLearnPrompt: 'What if you had given grace and communicated directly?',
  },
  {
    id: 'conflict-bad-ending',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "The passive-aggression continues. Every small thing becomes a test he doesn't know he's taking. You sigh. He asks what's wrong. You say 'nothing.' The pattern repeats.",
      },
      {
        text: "A month later: 'I don't know what you want from me. Every time I try, it's wrong. I can't read your mind, and I'm exhausted from trying.'",
        speakerId: 'michael',
        emotion: 'sad',
      },
      {
        text: "He ends it. Not with cruelty—with exhaustion. You trained him that he'd never be enough. So he stopped trying to be.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Exhausted Exit',
    endingSummary: "Your indirect communication wore him down. Healthy partners can't fix problems they don't know exist. He asked what was wrong. You said 'nothing.' Eventually, he believed you—and left to find someone who could name her needs.",
    endingLearnReference: 'conflict-3a',
    endingLearnPrompt: 'What if you had named your frustration directly instead of sighing?',
  },
];

export const familyEndings: Scene[] = [
  {
    id: 'family-good-ending',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The drive home from the party. His hand on your knee. 'Thank you for coming tonight. I know it wasn't easy.'",
        speakerId: 'michael',
        emotion: 'happy',
      },
      {
        text: "'Your friends are great,' you say. And mean it. They welcomed you. Not performatively—genuinely. Asked questions. Remembered things. Made space for you.",
      },
      {
        text: "This is what integration looks like. Not enmeshment. Not isolation. Just... becoming part of each other's worlds. Slowly. Respectfully. Together.",
      },
    ],
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'The Welcome',
    endingSummary: "You pushed through the fear and met his people. They weren't a test or a trap—they were an invitation. Healthy integration means becoming part of each other's lives without losing yourself. You belong somewhere now. And it feels like home.",
  },
  {
    id: 'family-neutral-ending',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You stayed home. He understood. But something shifted. His texts are a little less warm. The invitations stop coming.",
      },
      {
        text: "'My friends keep asking about you,' he says a week later. 'They want to meet you. But I don't want to pressure you.'",
        speakerId: 'michael',
        emotion: 'concerned',
      },
      {
        text: "He's giving you space. But space can become distance. And distance can become habit. You know you'll have to face this eventually. The question is whether 'eventually' comes before he stops asking.",
      },
    ],
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'The Holding Pattern',
    endingSummary: "You weren't ready. He respected that. But relationships require integration eventually. Staying in your comfort zone keeps you safe—and alone. The next invitation might not come. Growth requires discomfort.",
    endingLearnReference: 'family-4d',
    endingLearnPrompt: 'What if you had pushed through the fear and tried for just one hour?',
  },
  {
    id: 'family-bad-ending',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You keep finding reasons to skip group events. His birthday dinner. The holiday party. His sister's wedding. Always an excuse. Always 'next time.'",
      },
      {
        text: "'I feel like you're hiding me,' he says finally. 'Or hiding from me. Either way, I can't build a life with someone who won't be part of mine.'",
        speakerId: 'michael',
        emotion: 'sad',
      },
      {
        text: "He ends it gently. Not angry—disappointed. You protected yourself from the discomfort of meeting his world. And in doing so, you removed yourself from it entirely.",
      },
    ],
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The Invisible Woman',
    endingSummary: "Your fear of integration became a wall he couldn't climb. Healthy relationships require showing up—not just for each other, but for each other's people. You stayed safe in your bubble. And now you're alone in it.",
    endingLearnReference: 'family-3a',
    endingLearnPrompt: 'What if you had acknowledged his thoughtfulness and joined his world?',
  },
];

export const allEndings: Scene[] = [
  ...earlyEndings,
  ...conflictEndings,
  ...familyEndings,
];
