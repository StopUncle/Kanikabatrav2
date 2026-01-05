import type { ForkScene } from '../../../types';

export const listScenes: ForkScene[] = [
  {
    id: 'party-buzz',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: null, text: 'Everyone\'s talking about it. THE party. This Friday.', emotion: 'neutral' },
      { speakerId: 'priya', text: '"Tyler Vance controls the list. He\'s... particular about who gets in."', emotion: 'knowing' },
      { speakerId: 'priya', text: '"There\'s a few ways to get on it. None of them simple."', emotion: 'serious' },
      { speakerId: 'inner-voice', text: 'Tyler. Dana. Blake. Three paths. Different costs.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'approach-tyler', text: 'Go straight to Tyler', nextSceneId: 'tyler-direct', feedback: 'Direct approach to the gatekeeper.' },
      { id: 'ask-dana', text: 'Ask Dana for help', nextSceneId: 'dana-offer', feedback: 'Her help comes with strings.' },
      { id: 'try-blake', text: 'See if Blake can help', nextSceneId: 'blake-chat', feedback: 'The wildcard option.' },
    ],
  },
  {
    id: 'tyler-direct',
    backgroundId: 'bar',
    dialog: [
      { speakerId: null, text: 'You find Tyler holding court at the campus bar. People orbit around him.', emotion: 'neutral' },
      { speakerId: 'tyler', text: '"Oh, you\'re the one from the gala! Everyone\'s been talking about you."', emotion: 'happy' },
      { speakerId: 'tyler', text: '"Tell me everything. What was Maris wearing? Who else was there?"', emotion: 'curious' },
      { speakerId: 'inner-voice', text: 'He wants to feel connected to that world. Through you.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'feed-tyler', text: 'Share some details to get on his good side', nextSceneId: 'tyler-pleased', feedback: 'Give a little to get a little.' },
      { id: 'deflect-tyler', text: '"It was pretty quiet actually. About your party..."', nextSceneId: 'tyler-redirect', feedback: 'Keep focus on what you want.', isOptimal: true },
    ],
  },
  {
    id: 'tyler-pleased',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"Oh my god, that\'s amazing. I knew it would be like that."', emotion: 'happy' },
      { speakerId: 'tyler', text: '"You\'re definitely on my list. Anyone who knows Maris is someone I want there."', emotion: 'seductive' },
      { speakerId: 'inner-voice', text: 'Easy. Too easy. There\'s always a catch with Tyler.', emotion: 'concerned' },
    ],
    nextSceneId: 'tyler-catch',
  },
  {
    id: 'tyler-redirect',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"I mean, I could put you on the list. But what\'s in it for me?"', emotion: 'smirking' },
      { speakerId: 'inner-voice', text: 'He needs to feel important. Play to that.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'flatter-tyler', text: '"I\'d get to say I know the best party host on campus"', nextSceneId: 'tyler-flattered', feedback: 'Feed the ego. See what happens.', isOptimal: true },
      { id: 'transact-tyler', text: '"I can introduce you to some gala people"', nextSceneId: 'tyler-interested', feedback: 'Offer something. Fair exchange.' },
    ],
  },
  {
    id: 'tyler-flattered',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"Ha! I do throw good parties."', emotion: 'happy' },
      { speakerId: 'tyler', text: '"Okay, you\'re on. But I need you to tell people you got in because of me, okay?"', emotion: 'serious' },
      { speakerId: 'inner-voice', text: 'A small price. Validation in exchange for access.', emotion: 'knowing' },
    ],
    nextSceneId: 'ending-tyler-success',
  },
  {
    id: 'tyler-interested',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"Really? Like who? Anyone important?"', emotion: 'curious' },
      { speakerId: 'inner-voice', text: 'Careful. Don\'t promise more than you can deliver.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'oversell', text: '"I can get you face time with Maris"', nextSceneId: 'ending-overpromise', feedback: 'You can\'t deliver this. He\'ll remember when you don\'t.', isOptimal: false },
      { id: 'modest', text: '"Some people from the event. Nothing guaranteed"', nextSceneId: 'tyler-accepts', feedback: 'Honest. Sustainable.', isOptimal: true },
    ],
  },
  {
    id: 'tyler-accepts',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"...Fair enough. At least you\'re honest."', emotion: 'neutral' },
      { speakerId: 'tyler', text: '"You\'re on the list. See you Friday."', emotion: 'happy' },
    ],
    nextSceneId: 'ending-tyler-success',
  },
  {
    id: 'tyler-catch',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"Actually, can you do me a favor? I need you to post about the party. Tag me. Make it look exclusive."', emotion: 'serious' },
      { speakerId: 'tyler', text: '"And maybe mention the gala connection? People would love that."', emotion: 'hopeful' },
      { speakerId: 'inner-voice', text: 'He wants to use your connection for his clout.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'agree-post', text: '"Sure, I can do that"', nextSceneId: 'ending-tyler-success', feedback: 'Small ask. Manageable.' },
      { id: 'negotiate', text: '"I\'ll mention the party, but keep Maris out of it"', nextSceneId: 'tyler-negotiated', feedback: 'Boundaries. Good.', isOptimal: true },
    ],
  },
  {
    id: 'tyler-negotiated',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'tyler', text: '"Just the party? But that\'s not even... fine. Fine. Deal."', emotion: 'sad' },
      { speakerId: null, text: 'A flash of disappointment. Then he resets.', emotion: 'neutral' },
      { speakerId: 'tyler', text: '"I guess a mention is better than nothing."', emotion: 'neutral' },
    ],
    nextSceneId: 'ending-tyler-success',
  },
  {
    id: 'dana-offer',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"Oh, you want on Tyler\'s list? I can totally help with that."', emotion: 'happy' },
      { speakerId: 'dana', text: '"Tyler and I are close. One word from me and you\'re in."', emotion: 'happy' },
      { speakerId: 'inner-voice', text: 'Dana\'s help always costs something. Wait for it.', emotion: 'concerned' },
    ],
    nextSceneId: 'dana-price',
  },
  {
    id: 'dana-price',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"I just need a tiny favor first."', emotion: 'neutral' },
      { speakerId: 'dana', text: '"Maris\'s next event. I need to know when it is. You must have heard something..."', emotion: 'curious' },
      { speakerId: 'inner-voice', text: 'There it is. Information as currency. She never stops.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'give-dana', text: 'Share what you know', nextSceneId: 'ending-dana-trap', feedback: 'She\'ll use it, twist it, and come back for more.', isOptimal: false },
      { id: 'decline-dana', text: '"I don\'t have that kind of intel"', nextSceneId: 'dana-disappointed', feedback: 'Truth. And protection.' },
      { id: 'counter-dana', text: '"How about I owe you a future favor instead?"', nextSceneId: 'dana-considers', feedback: 'Negotiate. Risky but might work.', isOptimal: true },
    ],
  },
  {
    id: 'dana-disappointed',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"Really? Nothing at all?"', emotion: 'confused' },
      { speakerId: 'dana', text: '"Oh. I see. I guess I\'m always the one making the effort..."', emotion: 'sad' },
      { speakerId: 'dana', text: '"No, it\'s fine. I\'ll figure something out for you anyway. I always do."', emotion: 'sad' },
      { speakerId: 'inner-voice', text: 'The martyrdom act. She made your boundary into her sacrifice.', emotion: 'knowing' },
    ],
    nextSceneId: 'blake-fallback',
  },
  {
    id: 'dana-considers',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"A future favor? Hmm."', emotion: 'smirking' },
      { speakerId: 'dana', text: '"...I\'ll hold you to that. Fine. I\'ll talk to Tyler."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'You owe her now. That\'s not nothing. But it\'s better than giving intel.', emotion: 'concerned' },
    ],
    nextSceneId: 'ending-dana-debt',
  },
  {
    id: 'blake-chat',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'blake', text: '"Tyler\'s party? Yeah, I can probably get you in."', emotion: 'neutral' },
      { speakerId: 'blake', text: '"I know everyone at this point. Tyler owes me a few."', emotion: 'happy' },
      { speakerId: 'inner-voice', text: 'Blake is surprisingly straightforward. Refresh.', emotion: 'hopeful' },
    ],
    choices: [
      { id: 'accept-blake', text: '"That would be amazing, thanks"', nextSceneId: 'blake-helps', feedback: 'Simple. Genuine. Could work.' },
      { id: 'suspicious', text: '"What\'s the catch?"', nextSceneId: 'blake-honest', feedback: 'Trust but verify.', isOptimal: true },
    ],
  },
  {
    id: 'blake-helps',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'blake', text: '"Done. I\'ll text him now. You\'re on the list."', emotion: 'happy' },
      { speakerId: null, text: 'He texts. Tyler responds. Just like that.', emotion: 'neutral' },
      { speakerId: 'blake', text: '"Maybe we can hang out there? I don\'t really know anyone who sees through the BS like you do."', emotion: 'neutral' },
    ],
    nextSceneId: 'ending-blake-success',
  },
  {
    id: 'blake-honest',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'blake', text: '"No catch. I just think you\'re interesting."', emotion: 'neutral' },
      { speakerId: 'blake', text: '"Most people here are playing games. You seem different."', emotion: 'serious' },
      { speakerId: 'inner-voice', text: 'Is this real? Or just a different game?', emotion: 'curious' },
    ],
    choices: [
      { id: 'trust-blake', text: '"Okay. I appreciate the help."', nextSceneId: 'blake-helps', feedback: 'Give trust a chance.' },
      { id: 'keep-guard', text: '"We\'ll see. Thanks for the help either way."', nextSceneId: 'ending-blake-cautious', feedback: 'Cautious but grateful.', isOptimal: true },
    ],
  },
  {
    id: 'blake-fallback',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: null, text: 'You find Blake at the coffee shop.', emotion: 'neutral' },
      { speakerId: 'blake', text: '"Dana didn\'t work out? Not surprised. She always wants something."', emotion: 'knowing' },
      { speakerId: 'blake', text: '"I can get you on the list. No strings."', emotion: 'neutral' },
    ],
    nextSceneId: 'blake-helps',
  },
];
