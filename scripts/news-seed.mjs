// Jednokratno: prebaci 10 postojećih vijesti iz stare news.html u src/content/news/*.mdoc
import { writeFileSync, mkdirSync } from 'node:fs';

const B = 'https://rotaryhealthprofessionals.org';
const items = [
  { slug: 'for-every-generation-vaccines-save-lives', title: 'For Every Generation: Vaccines Save Lives', date: '2026-05-14',
    summary: 'For Every Generation: Vaccines Save Lives — 150 Million Lives Saved, And We’re Not Stopping. Protecting generations through immunization.',
    url: `${B}/5922-2/` },
  { slug: 'international-kangaroo-care-awareness-day', title: 'International Kangaroo Care Awareness Day and the International Day of Families', date: '2026-05-14',
    summary: 'Marking International Kangaroo Care Awareness Day and the International Day of Families.',
    url: `${B}/international-kangaroo-care-awareness-day-and-the-international-day-of-families/` },
  { slug: 'global-grant-heart2heart-uganda', title: 'Global Grant Heart2Heart Uganda has successfully treated 10 children with heart defects', date: '2026-05-02',
    summary: 'Chloe is 14. Today, she’s smiling. Four days ago, a team of heart specialists arrived in Uganda for a Rotary global grant mission.',
    url: `${B}/global-grant-heart2heart-uganda-has-successfully-treated-10-children-with-heart-defect-all-children-went-home/` },
  { slug: 'hats-for-ukraine-babies', title: 'Hats for Ukraine babies', date: '2026-04-20',
    summary: '', url: `${B}/hats-for-ukraine-babies/` },
  { slug: 'welcome-to-taipei', title: 'Welcome to Taipei', date: '2026-04-20',
    summary: '', url: `${B}/welcome-to-taipei/` },
  { slug: 'take-action-to-eliminate-cervical-cancer', title: 'Join us to take action to eliminate cervical cancer', date: '2026-02-01',
    summary: 'To catch up or revisit key moments from our fourth webinar on cervical cancer, watch the webinar highlights.',
    url: `${B}/join-us-to-take-action-to-eliminate-cervical-cancerthank-you-for-your-interest-in-our-fourth-webinar-on-cervical-cancer-i-am-now-writing-to-you-with-an-appeal-for-action/` },
  { slug: 'eliminating-cervical-cancer', title: 'Eliminating cervical cancer', date: '2025-10-31',
    summary: 'Protecting generations through immunization — our ongoing work towards eliminating cervical cancer.',
    url: `${B}/eliminating-cervical-cancer/` },
  { slug: 'paediatric-eye-surgery-mission', title: 'Paediatric Eye Surgery Mission', date: '2025-09-02',
    summary: 'Tamale Eye Hospital (formerly Northern Community Eye Hospital), Ghana — restoring eyesight to children in Northern Ghana.',
    url: `${B}/paediatric-eye-surgery-mission/` },
  { slug: 'webinar-17-july-2025', title: 'Webinar on Thursday 17th July 2025', date: '2025-06-22',
    summary: 'Cervical cancer is a pressing global health issue — but it’s preventable through HPV vaccination and regular screening.',
    url: `${B}/webinar-on-thursday17th-july-2025/` },
  { slug: 'towards-eliminating-cervical-cancer', title: 'Towards eliminating cervical cancer', date: '2025-04-16',
    summary: '', url: `${B}/towards-eliminating-cervical-cancer/` },
];

mkdirSync('src/content/news', { recursive: true });

for (const it of items) {
  const fm = [
    '---',
    `title: ${JSON.stringify(it.title)}`,
    `date: ${it.date}`,
    `summary: ${JSON.stringify(it.summary)}`,
    '---',
    '',
  ].join('\n');
  const body =
    (it.summary ? it.summary + '\n\n' : '') +
    `[Pročitaj originalni članak →](${it.url})\n`;
  writeFileSync(`src/content/news/${it.slug}.mdoc`, fm + body, 'utf8');
}
console.log(`Zapisano vijesti: ${items.length}`);
