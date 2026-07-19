// Jedinstveni format datuma za cijeli sajt: D/M/YYYY (npr. 23/4/2024), bez vodećih nula.
// Ručno slažemo string jer Intl 'en-GB' u ovom ICU-u ignorira 'numeric' i vraća 23/04/2024.
// UTC jer su datumi vijesti u frontmatteru zapisani kao datum bez vremena.
export const formatDate = (d: Date): string =>
  `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
