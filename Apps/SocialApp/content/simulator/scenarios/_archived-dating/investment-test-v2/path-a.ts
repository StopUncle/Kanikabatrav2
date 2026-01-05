import type { Scene } from '../../types';

// PATH A: TIME INVESTMENT CONSEQUENCES + FINANCIAL GAP (Scene 1.3)
export const timeScenes: Scene[] = [
  // TRAP CONSEQUENCE - You gave your whole Saturday
  {
    id: 'time-trap-consequence',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You spent eight hours hauling boxes. Jake supervised from the couch, 'directing traffic.' His cousin barely said thank you. Jake's text that night: 'You're amazing. I knew I could count on you.'",
      },
      {
        text: "Three days later, another text. 'Babe, my rent is due tomorrow and my paycheck is delayed. I'm short $500. I'll pay you back the second I get paid, I promise.'",
        speakerId: 'jake',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "You gave your Saturday. Now he wants your money. Pattern emerging.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'finance-trap',
        text: '"Don\'t worry about it. I\'ll send $500 now. You don\'t need to pay me back."',
        nextSceneId: 'finance-trap-result',
        feedback: "You just became a financial resource. This won't be the last request.",
      },
      {
        id: 'finance-subtle',
        text: '"I can spot you the $500, but I need it back by next week."',
        nextSceneId: 'finance-subtle-result',
        xpBonus: 5,
        feedback: "You gave the resource but set terms. He now knows your financial boundary is $500.",
      },
      {
        id: 'finance-close',
        text: '"I can\'t do $500, but I can send you $100 for groceries."',
        nextSceneId: 'finance-close-result',
        xpBonus: 10,
        feedback: "You maintained your boundary but offered something. Partial protection.",
      },
      {
        id: 'finance-optimal',
        text: '"I don\'t lend money to people I\'m dating. I can connect you with a financial advisor though."',
        nextSceneId: 'finance-optimal-result',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'financial_boundary',
        feedback: "You refused the demand and pivoted to a resource that requires HIS effort.",
      },
    ],
  },

  // SUBTLE CONSEQUENCE - You gave partial time
  {
    id: 'time-subtle-consequence',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You showed up at 1 PM. Left at 5. Jake seemed annoyed. 'I thought you'd stay till we finished.' The move took until 8 PM. He was cold at dinner that night.",
      },
      {
        text: "A week later: 'My rent is due tomorrow. I'm short $500. You're the only person I trust.'",
        speakerId: 'jake',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "You set a time boundary. He's still pushing for more.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'finance-trap-2',
        text: '"Of course. Sending it now."',
        nextSceneId: 'finance-trap-result',
        feedback: "You gave your time AND your money. The pattern is set.",
      },
      {
        id: 'finance-subtle-2',
        text: '"I can do $500, but I need it back next week."',
        nextSceneId: 'finance-subtle-result',
        xpBonus: 5,
        feedback: "You set terms, but you still gave.",
      },
      {
        id: 'finance-close-2',
        text: '"I can\'t do $500. Maybe $100?"',
        nextSceneId: 'finance-close-result',
        xpBonus: 10,
        feedback: "Partial boundary. He'll calibrate his next ask.",
      },
      {
        id: 'finance-optimal-2',
        text: '"I don\'t lend money in relationships. Have you tried a payday advance?"',
        nextSceneId: 'finance-optimal-result',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'financial_boundary',
        feedback: "Clear boundary. You're not his bank.",
      },
    ],
  },

  // CLOSE CONSEQUENCE - You paid for movers
  {
    id: 'time-close-consequence',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You paid $200 for movers. Jake said thanks, but you caught something in his voice—disappointment? He wanted your presence, not your solution. Interesting.",
      },
      {
        text: "A week later, the text comes: 'Rent is due. Short $500. I'll pay you back immediately.' After paying for movers, he's asking for more.",
        speakerId: 'jake',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: "You gave money for movers. Now he wants cash directly. Escalation.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'finance-trap-3',
        text: '"Fine, I\'ll send it."',
        nextSceneId: 'finance-trap-result',
        feedback: "You're now his go-to for financial problems. This will continue.",
      },
      {
        id: 'finance-subtle-3',
        text: '"$500 is a lot. I can do $250, paid back next week."',
        nextSceneId: 'finance-subtle-result',
        xpBonus: 5,
        feedback: "You negotiated down, but still gave.",
      },
      {
        id: 'finance-close-3',
        text: '"I already paid for movers. I can\'t keep covering expenses."',
        nextSceneId: 'finance-close-result',
        xpBonus: 15,
        feedback: "You referenced the pattern. Good awareness.",
      },
      {
        id: 'finance-optimal-3',
        text: '"I don\'t mix dating and finances. You need to sort this yourself."',
        nextSceneId: 'finance-optimal-result',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'financial_boundary',
        feedback: "Hard boundary. No exceptions. He handles his own problems.",
      },
    ],
  },

  // OPTIMAL CONSEQUENCE - You made him handle it
  {
    id: 'time-optimal-consequence',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Jake handled the move himself. Sunday dinner was nice—he actually seemed impressed that you didn't cave. 'Most girls would have dropped everything,' he said. Something flickered in his eyes. Respect? Frustration?",
      },
      {
        text: "A week later: 'I need a favor. Rent's due, short $500. I wouldn't ask if it wasn't an emergency.'",
        speakerId: 'jake',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: "He handled the move. Now testing money. The pattern continues.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'finance-trap-4',
        text: '"After such a nice dinner? Of course I\'ll help."',
        nextSceneId: 'finance-trap-result',
        feedback: "One dinner doesn't earn $500. You've undone your previous boundary.",
      },
      {
        id: 'finance-subtle-4',
        text: '"I can help, but let\'s set up a repayment plan."',
        nextSceneId: 'finance-subtle-result',
        xpBonus: 5,
        feedback: "You gave with conditions. Better than nothing.",
      },
      {
        id: 'finance-close-4',
        text: '"I don\'t have $500 to spare right now."',
        nextSceneId: 'finance-close-result',
        xpBonus: 10,
        feedback: "Simple deflection. Doesn't address the pattern.",
      },
      {
        id: 'finance-optimal-4',
        text: '"I keep dating and money separate. What\'s your plan to sort it?"',
        nextSceneId: 'finance-optimal-result',
        isOptimal: true,
        xpBonus: 20,
        tactic: 'financial_boundary',
        feedback: "Boundary held. You asked what HE'S doing about HIS problem.",
      },
    ],
  },

  // FINANCIAL RESULT SCENES - Lead to Status Test (Meet My Ex)
  {
    id: 'finance-trap-result',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "You sent the money. Jake's grateful—for about a week. Then it's a concert he can't afford. A birthday gift for his mom. Your wallet is now part of the relationship budget.",
      },
      {
        text: "Three weeks later: 'My ex is having a birthday party. He's important for my career. I need you there—but be supportive. Don't make a scene.'",
        speakerId: 'jake',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'status-test',
  },

  {
    id: 'finance-subtle-result',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "He paid back $300. 'The rest is coming.' It never does. But he's texting about something else now.",
      },
      {
        text: "'My ex's birthday party is next weekend. I have to go—career thing. I need you there, looking good. Don't embarrass me.'",
        speakerId: 'jake',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'status-test',
  },

  {
    id: 'finance-close-result',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: "He seemed frustrated but handled it. You hear nothing about money for two weeks. Then a different request.",
      },
      {
        text: "'My ex is having a party. Career important. I need you there—as my date. Be charming, okay?'",
        speakerId: 'jake',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'status-test',
  },

  {
    id: 'finance-optimal-result',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Jake was quiet for a few days. Then texted like nothing happened. He found a solution. Interesting—when you don't rescue, people rescue themselves.",
      },
      {
        text: "A new request: 'My ex is having a birthday party. Big networking opportunity. I'd love for you to come. You'll be the best thing there.'",
        speakerId: 'jake',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'status-test',
  },
];
