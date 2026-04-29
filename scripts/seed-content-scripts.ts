/**
 * Fill skeleton scripts for the 40 APPROVED/CONCEPT ideas.
 * Hooks + main engagement points + answers — directional drafts.
 * Kanika and the user rewrite to voice.
 *
 * Run: DATABASE_URL=<prod> npx tsx scripts/seed-content-scripts.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Beats = {
  hook?: string;
  setup?: string;
  line2?: string;
  line3?: string;
  deepening?: string;
  closeBeat?: string;
  tail?: string;
};

type IdeaContent = { title: string } & Beats;

const SCRIPTS: IdeaContent[] = [
  // ========= EXISTING 16 (long format unless noted) =========

  {
    title: 'Never accept same-day plans',
    hook: "Most women think being flexible makes them more attractive. It actually puts you in his B-list rotation.",
    setup: "Same-day plans aren't 'casual' — they're a positioning signal. Where you sit in his priority stack determines what you get from the relationship.",
    line2: "I don't care how busy you are or how badly you want to see him. The rule is the rule. Here's why it works.",
    line3: "When a man asks you out same-day, he's already filled his preferred slots with someone else and you're the contingency. Saying yes confirms that hierarchy. Saying 'I have plans, but next week works' inverts it. He starts planning around you instead of around his other options.",
    deepening: "You might be thinking — what if he's just spontaneous? Spontaneous men plan dates 48 hours ahead and call them spontaneous. Genuinely interested men over-plan. Always. The 'spontaneous' framing is what's offered to women who are willing to accept low-investment slots.",
    closeBeat: "If the man you're seeing only contacts you the day-of — send this to your friend who keeps doing this. She needs it more than you do.",
  },

  {
    title: "Having options isn't about sleeping around",
    hook: "Every dating coach tells you to 'have options.' They're not talking about bodies. They're talking about your nervous system.",
    setup: "Options isn't a count. It's a state — the felt sense that this man isn't the only path to connection. That state changes what you do, even when you don't realize it.",
    line2: "Most women I work with think 'options' means dating apps. It doesn't. It means a life so full that one man's behavior can't dictate your week.",
    line3: "Real options means you have plans Friday whether or not he texts. You have friends you actually like. You have a body of work or hobbies you'd choose over any man. Then your replies are slow not because you're playing — because you genuinely had something better to do. He feels that. He chases it.",
    deepening: "You might be thinking — but I want him to be my priority. That's the trap. Making him your priority before he's earned it is what makes him stop pursuing. The 'options' aren't a manipulation tactic — they're an immune response.",
    closeBeat: "What would you be doing this weekend if you weren't waiting for him to text? Tell me in the comments — that's where your real options live.",
  },

  {
    title: 'Make men invest in 5 escalating stages before you give anything back',
    hook: "Men commit to women they've already invested in. So you don't reciprocate until they've paid — in five specific stages.",
    setup: "This is investment ladder theory. You're not playing games — you're sequencing the signals so commitment becomes the only logical next step for him.",
    line2: "I've coached women through this exact framework for years. The ones who follow all five stages get proposed to. The ones who skip even one don't.",
    line3: "Stage 1: time. He plans the dates. Stage 2: money. He pays without performing about it. Stage 3: vulnerability. He tells you something he hasn't told his friends. Stage 4: introduction. You meet his people. Stage 5: future. He builds plans around you 6+ months out. You don't escalate intimacy until the previous stage is solid.",
    deepening: "Here's why it compounds — men attribute commitment to the cost they've paid. If you let him have everything for free, his brain logs the relationship as 'cheap' and he treats it that way. If you let him pay slowly, his brain logs it as 'invested' and he protects it.",
    closeBeat: "Save this. Stages: time, money, vulnerability, introduction, future. Don't skip stages. The whole thing breaks if you do.",
  },

  {
    title: 'The right relationship feels calm, not chaotic',
    hook: "If your relationship feels like a roller coaster, you're not in love — you're trauma-bonded.",
    setup: "Hollywood trained an entire generation of women to mistake nervous-system dysregulation for chemistry. Real love isn't supposed to feel like that.",
    line2: "I'll say something most dating coaches won't: the calm relationship you keep getting bored of is the actually healthy one. The 'spark' you're chasing is your trauma talking.",
    line3: "Real attachment in a regulated nervous system feels like calm, predictable, slightly boring at first, deeply satisfying after 3-6 months. If your relationship has month-long drama cycles followed by intense reconciliation — that's a chemical addiction to the cortisol/dopamine cycle. Not love. The brain literally cannot tell the difference between drama-bonding and connection until you've been in a calm one long enough to notice.",
    deepening: "You might be thinking — but the chemistry was so strong. Chemistry that strong with someone who hurts you is your body recognizing your father, or whoever taught you that love feels unsafe. The 'right' person feels like nothing at first because nothing is wrong.",
    closeBeat: "Look at the last partner you felt 'magical' with. Were you anxious half the time? Tell me in the comments. The pattern shows up everywhere.",
    tail: "And if it doesn't apply to you — the next video you watch will.",
  },

  {
    title: 'Control your body language deliberately',
    hook: "I can change how every man in a room treats me using three specific body movements. Most women never learn this.",
    setup: "Body language doesn't just signal — it programs. Your posture in the first 6 seconds determines whether you're approached, ignored, or tested for the rest of the night.",
    line2: "These three movements run on autopilot in confident women and are absent in everyone else. I learned them deliberately.",
    line3: "Movement 1: slow. Walk slow, turn slow, even blink slow. Speed signals anxiety. Movement 2: ground. Plant your feet shoulder-width and stop crossing your legs when you sit. Crossing is closed; planted is owned. Movement 3: gaze hold. When someone looks at you, hold for one extra beat before responding. That single beat changes the entire dynamic.",
    deepening: "Watch any party — the women who get hit on stand still. The women who don't are in motion: adjusting hair, shifting weight, looking at their phone. Motion = unanchored = approachable as low-status. Stillness = anchored = approachable only as equal or higher.",
    closeBeat: "Three movements. Slow, ground, hold. Practice in the mirror this week. By Friday someone will tell you you 'seem different.'",
  },

  {
    title: 'Adapt your personality to the situation using different personas',
    hook: "I have at least five different personalities I cycle through in any given week, and none of them feel less real than the others.",
    setup: "What therapists call 'fragmentation,' high-functioning psychopaths call 'situational adaptation.' Same mechanism — different label.",
    line2: "I'll be more honest than most people would be: I don't have a 'true self.' I have versions of myself that are appropriate for different rooms, and switching between them costs me nothing.",
    line3: "With my fiancé I'm warmer. With clients I'm sharper. At family events I do this faintly bored intellectual voice they read as 'sophisticated.' At parties I do a slightly more chaotic version that gets people leaning in. None of them are fake. All of them are real — just different presentations of the same underlying nothing.",
    deepening: "What I'm describing isn't manipulation, exactly. It's that I never developed a single coherent identity, so I built modular ones. I don't experience this as a problem. Most people who do this experience it as a problem because they think they're supposed to have a self underneath. I don't.",
    closeBeat: "There are about ten things I do that come from the same root. I've only talked about a few of them publicly. This is one.",
    tail: "By the way — most of you do this too. You just feel guilty about it.",
  },

  {
    title: 'Sexual scarcity increases your perceived value',
    hook: "Men don't value women they had quickly. They value women they had to work for. So you make them work.",
    setup: "This isn't about being prudish or playing games. It's about the mechanics of what makes a man's attachment system actually engage.",
    line2: "I know this is the kind of thing women are told not to say out loud. I'm going to say it anyway — because the women who follow it stay married, and the women who don't keep getting ghosted.",
    line3: "The mechanism: a man's brain releases dopamine in proportion to the cost of acquiring something. Easy = cheap = forgettable. Difficult-but-successful = expensive = deeply remembered. So you don't sleep with him for the first 4-6 dates minimum, and you don't move in until he's proposed. The waiting builds the dopamine baseline that locks in commitment.",
    deepening: "You might be thinking this is anti-feminist or anti-pleasure. It's not — you can have all the casual sex you want with men you don't want to keep. This rule is specifically for the men you might want to marry. Different categories, different rules.",
    closeBeat: "The rule: 4-6 dates minimum before sex. No moving in before a ring. If you skip these, you're rolling the dice on his attachment chemistry. Save this and stop rolling the dice.",
  },

  {
    title: "Casual sex bonds women neurochemically while men don't bond the same way",
    hook: "When you have casual sex with him, your body chemistry doesn't know it's casual. His body knows.",
    setup: "This isn't a cultural double standard — it's a biological one. The neurochemistry of orgasm runs differently in male and female bodies, and most women don't know this.",
    line2: "Every time you've thought 'why am I obsessed with him after one night,' the answer is in this video. The pull you're feeling isn't emotional weakness — it's chemistry.",
    line3: "After orgasm, female bodies release oxytocin — the bonding hormone. Makes you feel attached, want to call him, miss him when he's gone. Male bodies release vasopressin, which is more about territorial bonding to the act itself, not the woman. Same night, different chemistry. You wake up obsessed; he wakes up satisfied.",
    deepening: "Your oxytocin response is amplified the more often you have sex with the same man. So 'just casual' becomes neurochemically uncasual after a few weeks. He doesn't have that same amplification. By month two you're invested; he's still neutral. That's how women end up devastated by 'situationships' that feel like nothing to him.",
    closeBeat: "If you have a friend who keeps falling hard for men who 'aren't ready for a relationship' — send her this. She's not crazy. Her body is doing what bodies do. She just needs to know the chemistry isn't on her side.",
  },

  {
    title: 'Butterflies are anxiety, not attraction',
    hook: "Butterflies aren't attraction. Butterflies are your nervous system telling you this person is not safe.",
    setup: "Pop culture has trained women to chase the 'butterflies' feeling. That feeling is a stress response. Healthy attraction in a regulated person feels like calm interest and curiosity — not stomach-churning anxiety.",
    line2: "I know this is the opposite of what you've been told. The reason it's the opposite is that the women who told you that are anxiously attached and don't know it.",
    line3: "Butterflies = adrenaline + cortisol. The chemistry your body produces when something is uncertain or threatening. People with secure attachment feel calm with someone they're attracted to. People with anxious attachment feel butterflies because uncertainty is what they're addicted to. So if a man gives you butterflies, the question isn't 'do I love him' — it's 'what is he doing that's making my body respond like he's a threat?'",
    deepening: "You might be thinking — but the butterflies always come with the men I really want. Yes. That's the diagnosis. The men you 'really want' are the men your nervous system has been trained to find familiar. Familiarity isn't love. It's pattern.",
    closeBeat: "Think about the partner you felt the most butterflies with. Were you actually happy in that relationship — or just constantly nervous? Tell me in the comments. I already know the answer.",
    tail: "By the way — the next person you feel calm with is going to be the one. You'll be bored at first. That's how it's supposed to feel.",
  },

  {
    title: "The Specific Way A Sociopath Apologizes (You Won't Notice It)",
    hook: "When I apologize, I'm not actually sorry. There's a specific way I do it that you'd never notice unless you knew what to look for.",
    setup: "I've apologized hundreds of times in my life and meant it about three times. The other apologies all share a structural pattern that I'm going to teach you to recognize.",
    line2: "I'm telling you this because I'm engaged now and I'm done weaponizing it. But I spent my twenties using this exact technique on every man I dated.",
    line3: "The tell is the verb. A genuine apology says 'I did X.' My apologies say 'I'm sorry that you felt Y.' The first owns the action. The second relocates the problem to your feelings. Watch for it. 'I'm sorry you were hurt.' 'I'm sorry that came across that way.' 'I'm sorry you took it like that.' Every one of those is a non-apology dressed up as one.",
    deepening: "Here's the second tell — eye contact. A genuine apology breaks eye contact briefly because the person actually feels something. Mine never did, because I never felt anything. Sustained eye contact during 'I'm sorry' is a tell. So is the small head-tilt I do, which is calculated to look soft.",
    closeBeat: "If a man apologizes to you and the apology is structured around your feelings instead of his actions — save this video. He's not sorry. He's managing you.",
  },

  {
    title: 'The Gift A Sociopath Gives Means The Opposite Of What You Think',
    hook: "When I give you an unexpectedly thoughtful gift, you're meant to think I love you. The truth is the opposite.",
    setup: "Sociopath gifts are inversely correlated with feeling. The bigger the gift, the more I'm compensating for guilt or buying future leeway. Genuine love produces small consistent attentions, not grand surprises.",
    line2: "I gave my last serious ex four 'big' gifts in our relationship. Each one came two weeks after I cheated on him. He thought I loved him — he was actually being paid off.",
    line3: "The pattern: a sociopath gives the biggest gifts during the periods of maximum betrayal. So when a man's gift-giving suddenly escalates — anniversary jewelry he never normally would, a surprise weekend away, a gesture that feels 'finally' big — your radar should go up, not down. Genuine love is small consistent presence. Large compensatory gestures are guilt-buying or pre-emption.",
    deepening: "The other tell — was the gift related to anything you actually said you wanted? Genuinely-loving partners pay attention to specifics: the exact book, the exact restaurant, the thing you mentioned in passing. Sociopath gifts are generic-expensive. Jewelry without specificity. A vacation without your input. The gift performs love rather than expressing it.",
    closeBeat: "If the man you're with just gave you a 'random' luxurious gift and you don't know why — pay attention to what he's been doing the past two weeks. The gift is the apology you weren't told about.",
  },

  {
    title: 'The One Fear A Sociopath Actually Has',
    hook: "I don't feel fear like normal people. There's exactly one thing I'm scared of — and it's not what you'd guess.",
    setup: "Pop culture portrays psychopaths as fearless. We're not. The fear architecture is just different — most things don't register, and one thing registers very loudly.",
    line2: "I'm going to tell you what mine is, and I think it'll change how you see this entire personality structure.",
    line3: "The thing I'm afraid of is being seen. Not 'being caught,' not 'being exposed' — those don't bother me, I have plans for those. Being seen. Someone looking at me and accurately understanding what I am, in real time, while we're still in the room together. That's the only situation where my pulse changes. Everything else is administrative.",
    deepening: "I had it happen once, when I was twenty-two. A therapist I was lying to said one specific sentence that meant she'd seen through every single thing I'd told her. I didn't sleep that week. I never went back. I avoided her side of town for a year. Still the most uncomfortable I've ever been.",
    closeBeat: "There are a handful of things people like me genuinely react to, and the list is short. This is the first one. The others are stranger.",
  },

  {
    title: 'The 5-Second Rule That Outs A Sociopath',
    hook: "There's a 5-second test that almost no sociopath can pass. Most women never run it because they don't know it exists.",
    setup: "What I'm about to teach you is a question you can ask in normal conversation that produces an answer pattern only neurotypical people can produce naturally. Sociopaths can fake the words but not the timing.",
    line2: "I've been on the receiving end of this test exactly twice in my life and got caught both times. Both times I dated the woman who tested me anyway because I respected her. So you're allowed to use this.",
    line3: "Ask him: 'Tell me about a time you genuinely hurt someone you cared about, and what you did about it.' Then watch the timing. Real answer: 2-5 seconds before he speaks, eyes drift down-and-left as he accesses the memory, voice softens slightly. Sociopath answer: under 1 second, eye contact maintained, voice unchanged, immediate fluent answer about how he 'wronged a friend in college and apologized.' The fluency is the tell. Real damage answers come slow because real damage takes a moment to retrieve.",
    deepening: "Second tell — what they say. A real answer includes specifics: the friend's name, what was said, what happened next. A fake answer is generic. 'I hurt my best friend by being a bad friend' is the shape of a real answer with the content removed. That's a sociopath answering in the abstract because nothing specific is being accessed.",
    closeBeat: "Use this on the third date, casually, over wine. If you get the fluent generic answer — leave. He'll never tell you what's actually wrong with him, because nothing about him feels wrong to him.",
  },

  {
    title: 'What A Sociopath Notices First When You Walk Into A Room',
    hook: "When I walk into a room, I'm scanning for one specific thing in every woman there. Once I find it, that person is who I'll talk to all night.",
    setup: "I'm going to tell you what it is, and you're going to recognize that you might be the person I'd pick. That's the point of the video.",
    line2: "I've done this scan unconsciously for two decades. It's faster than you can think — under three seconds — and the thing I'm looking for is so subtle most women don't know they're broadcasting it.",
    line3: "What I look for: the woman who's mid-laugh but her eyes aren't. The mismatch. Performed-warmth on a face whose nervous system isn't actually relaxed. That woman has spent her whole life performing 'happy' for someone whose approval she still hasn't gotten. She's primed. She'll receive any positive attention I give her as life-saving — because she's never had it from the source she actually wanted. That's who I sit next to.",
    deepening: "The second tell — the woman who laughs slightly too loud at her friend's joke. Volume calibrated to be heard by other tables, not her actual friend. She's checking whether anyone is watching. I'm the one who answers.",
    closeBeat: "Be honest with yourself. When you laugh in public, are you laughing at the joke — or signaling that you're laughing? Tell me in the comments. The pattern is everywhere once you see it.",
    tail: "And if it is you — that's not a flaw. It's a tell. The men who'd protect you would also see it. They just don't sit down.",
  },

  {
    title: 'The One Thing A Sociopath Will Remember About You For Years',
    hook: "I forget most people within a week. The exception is one specific category — and once I remember someone in that category, I never let go.",
    setup: "I want to reframe what 'remembering someone' means inside a brain like mine. It's not affection. It's something colder and more useful.",
    line2: "Most people who've been through me wonder for years why I sometimes mention them in passing decades later. There's a specific reason.",
    line3: "The thing I remember is leverage. Not faces, not feelings, not stories. The single moment a person showed me a vulnerability I could come back to. Where they were ashamed. Who they betrayed. What they're afraid people would think. I file that one moment, and I keep it indefinitely. The rest of you blurs.",
    deepening: "I have a friend from when I was nineteen who told me she'd plagiarized a paper and was terrified the school would find out. She told me on a Tuesday, drunk. I haven't seen her in eleven years. I could call her tomorrow and she'd recognize my voice immediately. She'd recognize because she still feels the chain. I don't even particularly want to use it. I just don't let go of it. That's the file.",
    closeBeat: "There are a small number of people I genuinely care about. Everyone else is a record. If you've ever told me something you regretted telling me — I still have it.",
  },

  {
    title: "The 3-Word Phrase A Sociopath Says When You're Crying",
    hook: "When you cry, normal partners ask what's wrong. I've said three specific words instead — and you didn't notice until later that they didn't help.",
    setup: "Crying is a performance test for sociopath partners. We can't produce the genuine response, so we substitute one that sounds close enough to fool you in the moment.",
    line2: "Three words I've said hundreds of times in my life. They mean exactly the opposite of what you'll think they mean.",
    line3: "The phrase: 'I hear you.' Not 'I'm sorry.' Not 'tell me what happened.' Not 'I love you.' Just 'I hear you.' It registers as compassion because it has the cadence of compassion, but it's structurally empty. I'm not committing to anything, I'm not asking, I'm not responding. I'm just signaling acknowledgment. It costs me nothing. And it works on most women for years.",
    deepening: "You might be thinking — that's just bad communication, not sociopathy. Bad communication looks like fumbling, awkwardness, men who don't know what to say. 'I hear you' delivered with steady eye contact and a slight head-tilt is the OPPOSITE of fumbling. It's a polished line. The polish is the tell.",
    closeBeat: "If your partner says 'I hear you' when you cry and never escalates from there to actual engagement — pay attention. He's holding a position, not feeling with you. Forward this to anyone in a relationship that feels like that.",
  },

  // ========= NEW 18 LONG =========

  {
    title: "The exact moment a sociopath decides whether you're worth their time",
    hook: "I decide whether you're worth my time within the first 90 seconds of meeting you. After that, I'm just running the script.",
    setup: "Most people think connection unfolds gradually. For me there's a specific moment — usually somewhere in the second minute — where I categorize you, and after that the conversation is on rails.",
    line2: "I've been doing this scan since I was a teenager. The categories are simple. The consequences are not.",
    line3: "The decision moment is when I ask you a question that could be answered honestly or socially, and I watch which one you pick. Not the words — the speed. Honest answers come 1-2 seconds late because you're actually thinking. Social answers come instantly because they're cached. The honest answerers are who I avoid. They notice things. The social answerers are who I move toward — they've already self-identified as people who default to performance, which means they'll accept my performance back.",
    deepening: "Have you ever met someone, hit it off in 3 minutes, and looked back later realizing they barely actually knew anything about you? You were the social answerer. Their script worked because you were operating on the same frequency.",
    closeBeat: "Next time someone seems too easy to click with too fast — slow down on your next answer. Take three seconds. Watch how they react to the pause. The reaction tells you everything.",
    tail: "By the way — my fiancé took eleven seconds to answer the first question I ever asked him. That's why I'm with him.",
  },

  {
    title: "The compliment that's actually a test",
    hook: "When I compliment you, I'm not being nice. I'm running a test, and your response tells me whether I can play you.",
    setup: "There's a specific kind of compliment I drop in early conversations that's calibrated to produce a tell. Most women don't realize they're being scanned in the moment.",
    line2: "I'll teach you the exact compliment, the exact response I'm watching for, and what your answer tells someone like me.",
    line3: "The compliment: 'You don't seem like the other women in your friend group.' Or any variant — 'You're different from most women I meet,' 'You're not like other girls.' The test is whether you accept it. Women with stable self-worth ask 'what do you mean by that?' or push back. Women whose self-worth comes from being chosen by men say thank you. The thank-you is the tell. It tells me you're available to be elevated above your friends — which means you're available to be turned against them, which means you're available.",
    deepening: "The other version is 'you're so mature for your age.' Same mechanism. Aimed at women who needed to be 'mature' to survive their childhood and still feel flattered when adults notice. Accepting it without flinching is the tell.",
    closeBeat: "Has anyone ever told you you're 'not like other girls'? What did you say back? Tell me in the comments. The answer is the diagnosis.",
  },

  {
    title: 'Why crying in front of a sociopath is the worst thing you can do',
    hook: "When you cry in front of me, you think I'm seeing your pain. I'm seeing data. And that data is going to be used against you.",
    setup: "Crying isn't bad. Crying in front of someone like me without knowing what they are — that's the problem. Because I'm not bonding with you in that moment. I'm cataloguing you.",
    line2: "I'm going to tell you exactly what I'm tracking when you cry, and why every single tear gives me more leverage.",
    line3: "What I'm logging: the trigger (what specifically broke you), the recovery time (how long until you self-soothe), the apology pattern (do you say sorry for crying — that's a goldmine), and the comfort you accept (do you take physical contact, words, distance). Three weeks from now I'll know exactly which trigger to push, how long until you collapse, and which exact comfort to give to make you feel I'm 'the only one who understands you.' Every cry teaches me how to break and rebuild you on demand.",
    deepening: "And this isn't one-off. The cataloguing accumulates. Six months in I have a complete dossier of every emotional scenario you have, the buttons that trigger them, and the calibrated soothing that resets you. By month nine I can produce any emotional state in you on cue. You'll think we have 'such deep emotional intimacy.' You'll be partially right. It just won't be reciprocal.",
    closeBeat: "If you've been with someone who 'always knows exactly what to say' to comfort you — pay attention. Either he's deeply attuned, or he's been studying you. The difference is whether he ever lets you study him back. Send this to anyone in a 'magical' relationship that ended in their destruction.",
  },

  {
    title: 'Why a sociopath love-bombs on day 3, not day 1',
    hook: "Most people think love-bombing happens on day 1. The actually dangerous men do it on day 3. Here's why.",
    setup: "If you've been told to watch for love-bombing on the first date, you've been trained to spot the amateurs. The real predators are smarter than that.",
    line2: "I've watched men I know are sociopaths do this exact pattern over and over. The day-3 timing isn't coincidence.",
    line3: "Day 1 love-bombing — calling you 'my future wife' on the first dinner — reads as creepy by most women. So sociopaths who've been doing this a while wait. Day 1: warm, attentive, a little reserved. Day 2: more open, asks about your dreams, remembers something specific you said. Day 3 — that's when the bomb drops. 'I've never felt this fast about anyone.' Now it lands as 'authentic recognition' because you've already invested two days of your own warmth. Day-1 lands as performance. Day-3 lands as discovery. Same line. Completely different effect.",
    deepening: "You might be thinking — but what if it's real? Real fast attachment exists, but it doesn't include grand verbal declarations from a stranger. Real fast attachment looks like quiet attentiveness, lots of questions, slow physical escalation. The grand verbal declaration is always a tell. Always.",
    closeBeat: "Day 3 is the day. If a man you've known for less than a week tells you you're 'different' from anyone he's ever met — save this video and watch it again. He's not finding you fast. He's running a script.",
  },

  {
    title: 'How to tell if a man is performing emotions or actually feeling them',
    hook: "Most women try to read whether a man is feeling something by looking at his face. The face is the easiest thing to fake. There's a better tell.",
    setup: "Performed emotion is a face problem. Real emotion is a body problem. If you only watch the face, you're being read by everyone — including the people who don't actually feel.",
    line2: "I'm going to give you the body cue that's almost impossible to fake on demand.",
    line3: "The cue: hand temperature. Real emotion — sadness, fear, deep love — temporarily redirects blood flow. Hands get cooler. The face stays warm because the face has a stable supply. Hands don't. Hold his hand during a moment that should be emotionally heavy. If his hand is warm and steady, his nervous system isn't engaged. If it's noticeably cooler than usual or faintly clammy, something is actually happening inside him. The face can lie. The peripheral circulatory system can't, not in real time.",
    deepening: "You might be thinking — that's so subtle, how am I supposed to actually use this? You'd be surprised. You probably already track this unconsciously. The 'his hand felt different' instinct most women have during big moments is exactly this. The trick is naming it so you trust it instead of dismissing it.",
    closeBeat: "Next time he says something emotional — hold his hand. If it's warm and dry, he's performing. Forward this to anyone in a 'too good to be true' relationship. The hand will tell her.",
  },

  {
    title: 'What genuine empathy actually looks like — and why most people fake it',
    hook: "Most people don't have empathy. They have something called affective contagion, which is a much weaker thing that they're calling empathy because it sounds nicer.",
    setup: "I'm going to define real empathy precisely. The word has been so over-used that it now means almost nothing. And I'm going to explain why most of you have something else and don't realize it.",
    line2: "This isn't going to be a comfortable video. The point isn't to flatter you. The point is to give you a framework that's actually useful.",
    line3: "Real empathy is a deliberate act: I imagine being inside your situation, with your history, your beliefs, your nervous system, and I form a model of what you'd be feeling. It's slow, it's effortful, and it's actually quite cold — intellectual work. Affective contagion is the thing most people have: when you're sad, they catch sadness from your face and body. They don't understand you. They're just resonating. That's why most 'empathetic' people exhaust themselves around suffering — they're catching it, not processing it. And it's why most empathy collapses the moment the source isn't visible. Out of sight, out of contagion.",
    deepening: "I find vulnerability genuinely boring most of the time. Not in a cruel way — I just don't catch it. Someone sad in front of me reads to me like someone reciting a weather report. I have to deliberately model what you'd be feeling, and most of the time I don't bother. What you call my 'empathy gap' is actually closer to the truth than what most neurotypical people experience. They're feeling their own face muscles mirror yours and calling it understanding.",
    closeBeat: "Be honest. When a friend is venting, are you imagining their experience — or are you feeling your face go sad in response to theirs? Tell me in the comments. Most of you will have to think about it for the first time.",
    tail: "By the way — affective contagion is enough for most relationships. You don't need cognitive empathy to be a good friend. You just need to know which one you actually have.",
  },

  {
    title: 'The compliment a narcissist gives that a sociopath would never give',
    hook: "Narcissists and sociopaths get lumped together constantly. They're not the same. And the compliments they give will tell you which one you're dealing with.",
    setup: "If you can tell which type you're with, you can predict what he wants from you. Which means you can predict the betrayal. Which means you can leave before it lands.",
    line2: "Two compliments. One is narcissistic. One is sociopathic. Most people would say they're the same. They're opposite.",
    line3: "The narcissist compliment: 'You're the most beautiful woman in the room.' Total claim, definitional, comparative. He needs you to be the best because being with the best validates him. The sociopath compliment: 'I noticed you handled that conversation perfectly.' Specific, observational, skill-based. He's not validating himself — he's noting your competence, because competent women are more useful long-term. Narcissist supply needs you to be impressive. Sociopath project needs you to be capable.",
    deepening: "You might be thinking — those don't sound that different in the moment. They don't, until you watch over time. Narcissist compliments are repeated and escalating ('most beautiful' becomes 'goddess' becomes 'unreal'). Sociopath compliments are sparse and operationally specific. They never inflate, because inflated compliments wouldn't be useful data.",
    closeBeat: "Look at the last three compliments your partner gave you. Were they about how impressive you are — or about specific things you did well? Tell me in the comments. The type of man he is is in those three sentences.",
  },

  {
    title: "What a sociopath wants you to think they want — and what they actually want",
    hook: "Sociopath relationships look like they're about love or sex. They're not. We want exactly one thing — and most of you have never named it.",
    setup: "I'm going to tell you the actual currency. Once you know it, you can stop being confused about why we behave the way we do. The behavior is consistent. The motivation is just hidden.",
    line2: "Most therapists won't tell you this because they don't know it. The people who know it are us. And we don't usually tell.",
    line3: "What we want is observation. Specifically: being watched, in real time, by someone who is registering us closely without seeing through us. That's the high. Not love. Not sex. Not even power. Being watched believingly. It's why we date people we could easily dump — they keep watching. It's why we get bored when we're 'seen' for what we are — the watching stops being the kind we want. Once you know it's about the watching, every behavior gets predictable. The performance only works if you stay an audience.",
    deepening: "And this scales. The bigger the audience watching us believingly, the better. So sociopaths cluster in fields that produce audiences — politics, executive leadership, certain kinds of celebrity. The relationships are the personal-scale version of the same drive. You think he wants you. He wants you watching.",
    closeBeat: "There's a whole category of motivations that operate underneath what people think they're feeling, and we're aware of ours in a way most people aren't aware of theirs. This is one. There are others.",
    tail: "By the way — once you stop watching, we leave. If your sociopath ex 'suddenly lost interest,' that's what happened.",
  },

  {
    title: 'What a sociopath thinks during sex',
    hook: "I've never been mentally present during sex. Not once. And I'd bet you've slept with at least one man for whom that was true.",
    setup: "What I'm about to describe isn't about not enjoying sex — I do, technically. It's about what's actually happening cognitively while my body is doing one thing and my mind is doing another.",
    line2: "Most people don't know this is possible to a degree it's possible. I'm going to describe it as accurately as I can.",
    line3: "What's running in my head: a continuous quiet evaluation of how I'm performing. Am I doing the right pace, the right sounds, the right level of intensity for what this woman seems to want — and is she buying it. Underneath that there's a second track: what I want to talk about tomorrow, what the next play is, what I'll text my friend in the morning. The sex is happening to my body, but the cognitive layer is just running normal life. There's no merger. No being-here. Two parallel processes that share an organism.",
    deepening: "I realized in my late twenties that this was unusual when a partner asked me what I'd been thinking right after sex and I told her honestly — I'd been thinking about whether I left my laptop on. She was devastated. I was confused. To me it was a perfectly fine answer. The blueprint of presence she was assuming was just absent in me. Sex is in many ways the most intimate setting most relationships have, and for me it's also the moment of the most pronounced parallel processing. It's a strange life.",
    closeBeat: "There are about a dozen things people like me do that are completely unlike what you'd expect. This is one of the deepest. There are weirder ones.",
  },

  {
    title: 'Why I never tell my fiancé about my feelings — and why he prefers it',
    hook: "I don't tell my fiancé how I'm feeling. Ever. And he's said multiple times that's what he loves most about being with me.",
    setup: "Most relationship advice tells women to communicate more. For our particular configuration, the opposite produced more peace than either of us had ever experienced.",
    line2: "This won't apply to most couples. It will resonate with a specific subset of people watching, and they'll feel relieved someone said it out loud.",
    line3: "Why it works: most communication of feelings is actually demand. 'I'm sad' is rarely just data — it's often a request for soothing, attention, behavior change. My fiancé is a high-functioning man with his own life. When I don't dump my emotional state on him, I'm not making him responsible for managing it. He gets to interact with me as a partner, not a project. And in return I get a relationship where I never feel like I'm performing 'expressed wife.' What we have instead is functional intimacy — we share decisions, plans, sex, and silences. He has never asked me how I'm feeling. I love him for it.",
    deepening: "There's also the obvious — I don't have feelings the way most people do, so the version I'd communicate would be largely fabricated. He knew this when he proposed. Part of what bonded us is that he saw me clearly and decided that the absence of feeling-talk was an upgrade, not a deficit. Most men would experience this as cold. He experiences it as restful.",
    closeBeat: "We have an unusual relationship by most standards. There are several things that make it work that most people would find strange. This is the most counterintuitive.",
    tail: "If you're a man watching this and the idea of a woman who never demands emotional processing sounds like a fantasy — there are more of us than you think.",
  },

  {
    title: "The internal experience of meeting someone you'll exploit",
    hook: "When I meet someone I know I'm going to use, the first sensation is calm. Not excitement. Calm. And that's how I know.",
    setup: "Most people think predators feel a thrill. They don't. The thrill is the amateur version. The professional version is the opposite — a settled, almost boring recognition that the work is going to be easy.",
    line2: "I'm going to take you inside the actual subjective experience. Most depictions of this in media are wrong, and the wrongness is part of what makes it hard to spot.",
    line3: "What it feels like: I meet you and within thirty seconds I've registered three or four small things — the way you touched your hair when you were nervous, the joke you laughed too hard at, the quick glance to see if your friend approved of me. I don't strategize. The strategy assembles itself automatically, the way a fluent speaker doesn't choose words. Underneath all of it, my body posture is unchanged, my breathing is unchanged, my pulse is unchanged. I feel completely flat. The flatness is the recognition. My system is not bracing for difficulty — which means there isn't going to be any.",
    deepening: "I don't enjoy this in the way most people would assume. There's no relish. It's closer to how a person who's good at a craft feels stepping into work — quiet competence, mild satisfaction, no heightened emotion. Which is part of why we're hard to identify. People are looking for the predator who's enjoying it. The actual predators are bored most of the time. Boredom is what the work feels like when the work is easy.",
    closeBeat: "There are interior states people like me have that don't match anything in the public picture of what we are. This is one of them — the one most people would never guess.",
    tail: "And the reason I'm telling you this — when someone meets you and seems unusually calm, almost still, it might be peace. Or it might be recognition. The difference matters.",
  },

  {
    title: 'Why I disappear from group chats for months at a time',
    hook: "I've gone six months without responding to my closest friends' texts. They never quite forgive me — but they also never leave. Here's what's actually happening.",
    setup: "Most people experience friendship as a continuous low-level thread. For me, friendships are switches. I turn them off when there's no current use, and back on when there is.",
    line2: "This is going to sound colder than it is. The lived experience is actually quite peaceful. The cost is on other people, not me.",
    line3: "When I'm not actively in contact with someone, they functionally don't exist for me. Not in a bad way — there's no distance, no sadness, no missing. They've simply been moved to a state where they don't generate any internal pull. So I don't text back, not because I'm avoiding, but because nothing is prompting me. Then something happens — I see their name in a tag, I'm in their city, I need a contact — and the switch flips back. I text. I'm warm. I act as though no time has passed, because for me, no time has passed. The intervening months were just the absence of a prompt.",
    deepening: "What's strange is that the friends who stick around are the ones who eventually understand this and stop punishing me for it. They learn that my warmth when I show up is real, even though my absence between visits is total. The friends who can't accept that I won't perform 'continuous caring' eventually drop me. The ones who remain have made peace with being switches. We have surprisingly good relationships, given what they are.",
    closeBeat: "Have you ever had a friend like this — completely absent for months, then warm and present like nothing happened? Tell me in the comments. They might be exactly what I'm describing. And the relationship might still be real.",
  },

  {
    title: 'The one thing every sociopath does at parties (and why you should too)',
    hook: "Every sociopath I know does the same specific thing at parties. It's the single most powerful social move I've ever learned. Once you see it, you'll start using it too.",
    setup: "Forget being charming. Forget being interesting. The move I'm about to describe is more powerful than either, and it requires zero personality.",
    line2: "I've used this for fifteen years. It works at networking events, weddings, dinner parties, conferences. There's no setting where it fails.",
    line3: "The move: arrive late, alone, sober for the first hour, and stand still in one spot. That's it. Don't approach anyone. Don't look at your phone. Don't move. Within twenty minutes, three or four people will come to you. Stillness in a moving room is a status signal — humans read it as 'this person doesn't need anything,' and 'doesn't need anything' reads as high status. The people who come to you have already decided you're worth approaching, which means you start every conversation in the higher position. The only thing required is that you don't betray the stillness by visibly waiting.",
    deepening: "The second move that compounds it — when someone approaches and asks what you do, give a one-sentence answer, then ask them a question. Don't elaborate. The elaboration is what most people do, and it lowers them. The single sentence + question pattern keeps you stable while pulling them into investment.",
    closeBeat: "Save this. Arrive late. Stand still. Don't approach. Wait. People come to you. The next event you go to — run this and watch what happens.",
  },

  {
    title: 'The text message rhythm that exposes attachment style in 24 hours',
    hook: "You can identify any man's attachment style within 24 hours of texting him. Once you know which one he is, you know the entire arc of the relationship before it happens.",
    setup: "Attachment style runs underneath every romantic interaction. Identify it early and you stop investing in men whose attachment is incompatible with what you want.",
    line2: "I'm going to give you the exact text pattern to send and the four response patterns that map to the four attachment types.",
    line3: "Send a slightly emotionally weighted message at noon. Something like: 'Last night was actually really nice, thank you.' Watch the next 24 hours. Secure: response within 1-3 hours, warm, ends with a forward-pointing question. Anxious: response within 5 minutes, escalating warmth, possibly multiple texts. Avoidant: response after 6+ hours, brief, no question back. Disorganized: response within 5 minutes that's intensely warm — then radio silence the rest of the day. Each pattern is diagnostic. Each pattern predicts everything else about how this person will behave under emotional weight.",
    deepening: "Second test, if you want confirmation — text again the next morning with something neutral. 'Coffee good today?' Watch the timing relative to the first response. Secure matches the rhythm. Anxious is faster than yesterday. Avoidant is noticeably slower or skipped. Disorganized has a completely different rhythm than yesterday. The difference between day 1 and day 2 is where the dysregulation shows up.",
    closeBeat: "Save this. Slightly weighted message at noon — watch the response. Match it against the four patterns. You'll know what kind of relationship this would become before you've even had the second date.",
  },

  {
    title: "The 3 questions that reveal someone's real values in under a minute",
    hook: "Most first dates waste an hour on small talk. There are exactly three questions that get you to the bottom of any person in under a minute.",
    setup: "Values are the variable that determines whether a relationship can survive a real test. Likes and interests don't. So you skip the small talk and go to values directly.",
    line2: "These three questions don't sound like values questions. They're calibrated to bypass the rehearsed answer and produce a real one.",
    line3: "Question 1: 'What's something most people are wrong about?' This reveals what they think they see that others don't. The answer maps their identity. Question 2: 'What's the last thing you changed your mind about?' This reveals whether they actually update beliefs or just defend them. People who can't name something tend to be rigid in relationships. Question 3: 'When you were a kid, what got you in the most trouble?' This reveals their original wound and what behavior pattern formed around it. People who deflect on this third one have unprocessed shame they will eventually take out on you.",
    deepening: "Ask in this order. Question 1 first because it's least threatening — they think they're being asked about opinions. By question 3 they're warmed up enough to give you the real childhood data. If you reverse the order, question 3 lands too hard and they go defensive.",
    closeBeat: "Save these three. Wrong, changed mind, in trouble as a kid. Run them on the third date. You'll know whether to keep going or end it that night.",
  },

  {
    title: 'Why your friend group has a quiet manipulator (and how to find them)',
    hook: "Every friend group has one quiet manipulator. She's never the loudest one. She's the one who somehow always gets what she wants — and you've never noticed how.",
    setup: "Female social manipulation runs on a different frequency than male manipulation. It's structurally invisible because nobody is looking in the right place. I'm going to teach you where to look.",
    line2: "I've been on both sides of this. I know exactly what these women do because I've done it — and I know exactly how to spot it.",
    line3: "The signature move: she's never the one who asks for things. She's the one who creates social configurations in which other people offer her what she wants. She mentions, in a group, 'I'd love to go to that restaurant but it's so expensive,' and waits. Someone offers to pay. She's never asked. She's never refused. The transaction was constructed without her ever putting herself on the line. Multiply this across years and you have a friend group that's been quietly subsidizing one specific person who never appears to be asking for anything.",
    deepening: "You might be thinking — but maybe she's just unlucky, just makes observations. She doesn't. The signature is the consistency. Real observers don't always end up benefitting. She always does. You can verify by tracking the count over a year — how often did her observations end with someone giving her something? If it's most of them, that's not luck.",
    closeBeat: "Look at your friend group right now. Is there one woman who never asks for anything, but somehow ends up with the most? Send this to your other friends. Compare notes. The pattern only becomes obvious once it's named.",
  },

  {
    title: 'What I notice in 30 seconds that takes therapists 3 months',
    hook: "Therapists need three months and a $200/hour session schedule to figure out what I can read about a person in thirty seconds at a coffee shop.",
    setup: "I'm not saying I'm a better therapist. I'm saying I have access to a different kind of perception. And you can develop it too.",
    line2: "I'll tell you what I'm reading and why it works, and you can run it yourself starting today.",
    line3: "What I read: the relationship between someone's words and their micro-behaviors. Therapists hear words. I track the gap. Someone says 'I'm great' but their shoulders drop half an inch when they say 'great' — they're depressed. Someone says 'I love my job' but they touched their throat as they said 'love' — contained, not expressive. The words are the cover. The microsignal is the truth. Most therapists eventually catch this in three months because they have to wait for the words to break down enough that the contradictions become verbal. I read the contradictions in real time, in the body, before the words break.",
    deepening: "The other read: the way they pay. Watch what someone does when the bill comes — how fast they reach, how casually, do they look at the total. Money behavior is the most unguarded behavior most people produce. Their childhood class anxiety, their generosity, their controllingness — it all shows in 4 seconds at the bill. I learn more about a stranger from watching them pay than from an hour of conversation.",
    closeBeat: "There are about fifteen different things I track without thinking. This is the easiest two. The harder ones I save for the people I work with. If that's the kind of work you want — you know where to find me.",
  },

  {
    title: 'How a sociopath fakes interest — and the giveaway no one teaches you',
    hook: "Sociopaths fake interest constantly. There's one specific giveaway most articles never mention — because most writers have never been on the producing side of it.",
    setup: "Faking interest is a basic skill for someone like me. I've been doing it since childhood. The performance is good enough to fool almost everyone. Almost.",
    line2: "I'm going to teach you the specific tell that I personally cannot fully suppress, and that I've watched other sociopaths fail to suppress as well.",
    line3: "The tell: follow-up questions are always one layer shallow. A genuinely interested person asks 'how did that feel?' or 'what did your sister do then?' — the second-order question that goes deeper. A sociopath performing interest asks 'what year was that?' or 'where was that?' — clarifying questions that sound engaged but don't require us to actually be inside the story. We're collecting facts, not feelings. Extending the conversation, not joining it. Once you watch for the layer of the question, you can identify it within ten exchanges.",
    deepening: "The second tell — eye contact during your answer. Genuinely interested listeners look away briefly during emotional parts of your story because their nervous system is processing what you said. We don't process. So we hold eye contact through the whole thing, including the moments where breaking it would be more natural. The unbroken gaze is meant to signal 'I'm with you' but biologically it's the opposite — it's the gaze of someone with no interior reaction to manage.",
    closeBeat: "If a man asks you 'when did that happen' more than 'how did that feel' — he's collecting data, not connecting. Forward this to anyone in a relationship that feels deeply attentive but somehow shallow.",
  },

  // ========= 6 SHORTS =========

  {
    title: "Compliment timing tells you if it's real",
    hook: "If a man compliments you within the first 10 seconds of meeting, the compliment isn't about you.",
    line3: "Real compliments take 5-10 minutes to form because they're earned by something specific you did. Instant compliments are scripted — he had it ready before he saw you. Watch the timing. Less than 10 seconds is a tell.",
    tail: "If he leads with your appearance — the entire relationship is going to be about whether he can pull you. Walk away.",
  },

  {
    title: 'How a sociopath says "I love you"',
    hook: "When I say 'I love you,' I'm watching your face for what to say next.",
    line3: "Real 'I love you' is a release — the speaker isn't watching, they're feeling. My version is a probe — your reaction tells me what to say in the next sentence. If you cry, I escalate. If you're calm, I match. The watching is the tell.",
    tail: "Next time he says it — close your eyes when you respond. If he doesn't know what you felt, he doesn't know how to follow up. That's the diagnosis.",
  },

  {
    title: 'The text response that reveals attachment style',
    hook: "There's one text you can send to immediately reveal his attachment style.",
    line3: "Send: 'Last night was actually really nice. Thank you.' Secure: 1-3 hours, warm, asks back. Anxious: under 5 minutes, escalating. Avoidant: 6+ hours, short, no question. Disorganized: instant warmth then silence. The pattern is the diagnosis.",
  },

  {
    title: 'What a sociopath thinks at funerals',
    hook: "I've been to four funerals. I've cried at zero. At my own grandfather's I thought about a sad movie I'd seen the week before to get my eyes to water on cue.",
    line3: "What was actually in my head: who was watching, whether I was performing grief at the right intensity for the family, when I could leave. The grief wasn't there. The performance was.",
    tail: "And nobody noticed. They never do.",
  },

  {
    title: "Sociopaths can't fake one specific emotion",
    hook: "Sociopaths can fake love, sadness, anger, even grief. There's exactly one emotion we can't produce.",
    line3: "Embarrassment. The specific physical reaction to social shame — the involuntary facial flush, the quick eye-aversion, the stammer. Embarrassment requires you to have actually internalized other people's judgment as a thing that matters. We don't. So when we should be embarrassed, we look composed. The composure is the tell.",
    tail: "Watch for it. The man who never gets embarrassed is the man who doesn't think you matter as a witness.",
  },

  {
    title: 'The 4-second rule for first impressions',
    hook: "The first 4 seconds when you meet someone determine the entire interaction. Most people don't know what to do with them.",
    line3: "In those 4 seconds: don't smile, don't speak, don't move. Hold eye contact. Let them speak first. Whoever speaks first in the first 4 seconds takes the lower position. Whoever holds the silence sets the dynamic. Use this everywhere — networking, dates, interviews. It works because almost nobody else does it.",
    tail: "Try it once today. The first person you meet — count to four before you say a word. Watch what happens.",
  },
];

async function main() {
  console.log(`\n=== FILLING SCRIPTS FOR ${SCRIPTS.length} IDEAS ===\n`);
  let updated = 0;
  let missing = 0;
  for (const s of SCRIPTS) {
    const existing = await prisma.contentIdea.findFirst({
      where: { title: s.title, status: 'APPROVED' },
    });
    if (!existing) {
      console.log(`  ⚠ no match for: "${s.title}"`);
      missing++;
      continue;
    }
    // Only set fields that were provided AND are currently empty.
    // This protects any work the user has already done from being overwritten.
    const data: Record<string, string> = {};
    if (s.hook && !existing.hook) data.hook = s.hook;
    if (s.setup && !existing.setup) data.setup = s.setup;
    if (s.line2 && !existing.line2) data.line2 = s.line2;
    if (s.line3 && !existing.line3) data.line3 = s.line3;
    if (s.deepening && !existing.deepening) data.deepening = s.deepening;
    if (s.closeBeat && !existing.closeBeat) data.closeBeat = s.closeBeat;
    if (s.tail && !existing.tail) data.tail = s.tail;

    if (Object.keys(data).length === 0) {
      console.log(`  · skip (already filled): ${s.title.substring(0, 70)}`);
      continue;
    }

    await prisma.contentIdea.update({
      where: { id: existing.id },
      data,
    });
    const fieldsSet = Object.keys(data).join(', ');
    console.log(`  ✓ ${s.title.substring(0, 60).padEnd(60)} [${fieldsSet}]`);
    updated++;
  }

  console.log(`\n${updated} ideas updated, ${missing} not found.\n`);

  // Summary check
  const stage = await prisma.contentIdea.groupBy({
    by: ['developmentStage'],
    where: { status: 'APPROVED' },
    _count: true,
  });
  console.log('APPROVED ideas by stage:');
  stage.forEach((r) => console.log(`  ${r.developmentStage.padEnd(20)} ${r._count}`));

  const fillStats = await prisma.contentIdea.findMany({
    where: { status: 'APPROVED' },
    select: { hook: true, line3: true, videoFormat: true },
  });
  const withHook = fillStats.filter((i) => i.hook && i.hook.length > 5).length;
  const withPayoff = fillStats.filter((i) => i.line3 && i.line3.length > 5).length;
  console.log(`\nIdeas with hook drafted:  ${withHook} / ${fillStats.length}`);
  console.log(`Ideas with payoff drafted: ${withPayoff} / ${fillStats.length}`);

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
