import { MysterySetKey, PrayerStep } from '../types';
import { MYSTERY_DATA, PRAYERS_ENGLISH, PRAYERS_LATIN } from '../data/mysteries';

function ordinal(n: number): string {
  return ["First", "Second", "Third", "Fourth", "Fifth"][n] || `${n + 1}th`;
}

export function buildPrayerSequence(
  setKey: MysterySetKey,
  mIndex: number,
  language: 'english' | 'latin',
  customIntention?: string
): PrayerStep[] {
  const set = MYSTERY_DATA[setKey];
  const m = set.mysteries[mIndex];
  const p = language === 'latin' ? PRAYERS_LATIN : PRAYERS_ENGLISH;
  const pEng = PRAYERS_ENGLISH; // for reference or dual display

  const steps: PrayerStep[] = [];

  // 1. Sign of the Cross
  steps.push({
    beadType: 'crucifix',
    title: language === 'latin' ? 'Signum Crucis' : 'Sign of the Cross',
    sub: 'Opening Invocation at the Crucifix',
    text: p.SIGN_OF_CROSS,
    textLatin: PRAYERS_LATIN.SIGN_OF_CROSS,
    note: customIntention
      ? `Begin by holding the crucifix on your bracelet. Today's intention: "${customIntention}".`
      : 'Begin by holding the crucifix on your bracelet between thumb and forefinger as your sacred anchor for the rosary.',
    visual: [
      'Trace the cross upon yourself: forehead, chest, left shoulder, right shoulder.',
      'Picture the Holy Trinity encompassing you: the Father above, the Son beside you, the Spirit within.'
    ]
  });

  // 2. Apostles' Creed
  steps.push({
    beadType: 'crucifix',
    title: language === 'latin' ? 'Symbolum Apostolorum' : "Apostles' Creed",
    sub: 'Profession of Faith at the Crucifix',
    text: p.APOSTLES_CREED,
    textLatin: PRAYERS_LATIN.APOSTLES_CREED,
    note: "The ancient profession of Christian faith. Holding the Crucifix, stand grounded in these eternal truths as you begin your meditation on the mysteries.",
    visual: [
      'As you speak each article of faith, visualize the Gospel mystery: Creator, manger, cross, resurrection, and eternal life.',
      'Pray in union with the communion of saints across all centuries.'
    ]
  });

  // 3. Our Father (Paternoster)
  steps.push({
    beadType: 'paternoster',
    title: language === 'latin' ? 'Pater Noster' : 'Our Father',
    sub: 'First Large Bead',
    text: p.OUR_FATHER,
    textLatin: PRAYERS_LATIN.OUR_FATHER,
    note: 'The Lord’s own prayer taught to his disciples. Every petition of the human heart is contained herein.',
    visual: [
      'Feel the warmth of calling God "Father".',
      'Offer your daily needs and worries quietly into His hands.'
    ]
  });

  // 4-6. Three Hail Marys (for Faith, Hope, Charity)
  const virtues = ['Faith', 'Hope', 'Charity (Love)'];
  const virtueVisuals = [
    [
      'Consider your trust in God — where is it vibrant, where does it falter?',
      'Ask simply for the grace to believe with an undivided heart.'
    ],
    [
      'Bring to mind an unresolved concern or prayer request.',
      'Ask for the strength to hope in God’s goodness without forcing your own timeline.'
    ],
    [
      'Think of a person who is difficult for you to love or forgive right now.',
      'Ask for the grace of supernatural charity toward them specifically.'
    ]
  ];

  for (let i = 0; i < 3; i++) {
    steps.push({
      beadType: 'ave',
      title: language === 'latin' ? 'Ave Maria' : 'Hail Mary',
      sub: `Bead ${i + 1} of 3 — for an increase in ${virtues[i]}`,
      text: p.HAIL_MARY,
      textLatin: PRAYERS_LATIN.HAIL_MARY,
      note: `The ${['first', 'second', 'third'][i]} bead before the medal is offered for an increase in the virtue of ${virtues[i]}.`,
      visual: virtueVisuals[i]
    });
  }

  // 7. Glory Be
  steps.push({
    beadType: 'gloria',
    title: language === 'latin' ? 'Gloria Patri' : 'Glory Be',
    sub: 'Closing the Opening Beads',
    text: p.GLORY_BE,
    textLatin: PRAYERS_LATIN.GLORY_BE,
    note: 'Praise offered to the Holy Trinity for its own sake. It completes the introductory prayers and prepares your heart for meditation.',
    visual: [
      'Picture praise as a radiant circle: as it was in the beginning, is now, and ever shall be.'
    ]
  });

  // 8. Announcement of the Mystery (at the Miraculous Medal)
  steps.push({
    beadType: 'medal',
    title: `The ${ordinal(mIndex)} ${set.label} Mystery`,
    sub: `${m.title} — ${m.scripture}`,
    text: `We contemplate the ${m.title}. ${m.reflection}`,
    textLatin: `Contemplamur ${m.title}.`,
    note: `Fruit of this Mystery: ${m.fruit}.`,
    fruit: m.fruit,
    visual: [
      `Scripture reading: ${m.scripture}`,
      `Hold the virtue of ${m.fruit} gently in your mind as you pray the upcoming decade.`
    ]
  });

  // 9. Our Father for the Decade
  steps.push({
    beadType: 'paternoster',
    title: language === 'latin' ? 'Pater Noster' : 'Our Father',
    sub: `Opening the Decade for ${m.title}`,
    text: p.OUR_FATHER,
    textLatin: PRAYERS_LATIN.OUR_FATHER,
    note: `Said at the threshold of the decade. Let the words draw you into the living scene of ${m.title}.`,
    visual: [
      `Imagine stepping into the sacred story of ${m.title}.`
    ]
  });

  // 10-19. 10 Hail Marys for the Decade
  for (let i = 1; i <= 10; i++) {
    steps.push({
      beadType: 'ave',
      title: language === 'latin' ? 'Ave Maria' : 'Hail Mary',
      sub: `Decade Bead ${i} of 10`,
      text: p.HAIL_MARY,
      textLatin: PRAYERS_LATIN.HAIL_MARY,
      note: getDecadeReflectionNote(i, m.title, m.fruit),
      fruit: m.fruit,
      visual: getDecadeVisualPrompt(i, m.title, m.fruit)
    });
  }

  // 20. Glory Be
  steps.push({
    beadType: 'gloria',
    title: language === 'latin' ? 'Gloria Patri' : 'Glory Be',
    sub: 'Closing the Decade',
    text: p.GLORY_BE,
    textLatin: PRAYERS_LATIN.GLORY_BE,
    note: 'Conclude the decade in doxology, giving glory to the Father, Son, and Holy Spirit.',
    visual: ['Let the peace of this completed decade rest in your heart for a moment.']
  });

  // 21. Fatima Prayer (Fatima Star)
  steps.push({
    beadType: 'star',
    title: language === 'latin' ? 'Oratio Fatima' : 'Fatima Prayer',
    sub: 'O My Jesus',
    text: p.FATIMA_PRAYER,
    textLatin: PRAYERS_LATIN.FATIMA_PRAYER,
    note: 'Taught by Our Lady of Fátima in 1917. A prayer of universal intercession and divine mercy.',
    visual: [
      'Picture divine mercy flowing like a gentle light upon souls in greatest need.',
      'Hold in your heart anyone you know who is suffering or distant from peace.'
    ]
  });

  return steps;
}

function getDecadeReflectionNote(i: number, title: string, fruit: string): string {
  const notes = [
    `First bead. Enter gently into ${title}. There is no need to hurry.`,
    `Second bead. Notice a quiet detail in the scene — a face, a sound, a gesture of warmth.`,
    `Third bead. Step closer into ${title}. Where would you stand if you were present in that moment?`,
    `Fourth bead. Listen for what God may be speaking to your heart through this mystery.`,
    `Fifth bead. Halfway through the decade. Let the repetition become a soothing rhythm like your breath.`,
    `Sixth bead. Offer this Hail Mary for someone in your life who needs the grace of ${fruit.toLowerCase()} today.`,
    `Seventh bead. Reflect on how this mystery touches your daily choices and peace of mind.`,
    `Eighth bead. Look upon Christ in this scene with stillness and gratitude.`,
    `Ninth bead. Gather the graces of this mystery into your soul.`,
    `Tenth and final decade bead. Thank Mary for walking through this sacred mystery alongside you.`
  ];
  return notes[i - 1] || `Decade bead ${i}.`;
}

function getDecadeVisualPrompt(i: number, title: string, fruit: string): string[] {
  const prompts: [string, string][] = [
    [`See the scene of ${title} unfolding before you like a soft sacred light.`, 'Notice the place, the silence, and the holy presence.'],
    ['Focus on the details: the gentle expressions, the atmosphere of peace.', 'Find Mary in the scene. What is her stance and expression?'],
    ['Place yourself quietly within the room or setting.', 'Watch Mary’s peaceful gaze upon her Son.'],
    ['Listen deeply to the words spoken in this mystery.', 'Notice Mary’s quiet assent: "Let it be done unto me."'],
    ['Feel the spiritual depth of this moment without distraction.', 'Let any tension leave your body as you pray.'],
    [`Seek the fruit of ${fruit.toLowerCase()} within this sacred moment.`, 'Ask Our Lady to intercede for your family and loved ones.'],
    ['Notice where Christ is in this scene.', 'Allow His gaze of love to rest upon you for a moment.'],
    ['Contemplate Mary as the one who pondered all these things in her heart.', 'Ask her to teach you her reflective quietness.'],
    ['Connect this mystery to your own life today.', 'Where do you need God’s grace or guidance right now?'],
    ['Hold this completed decade gently in thanksgiving.', 'Commit to carrying the peace of this prayer into the rest of your day.']
  ];
  return prompts[i - 1] || ['Pray with focus and devotion.', 'Rest in the grace of Our Lady.'];
}
