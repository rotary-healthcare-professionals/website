// Jedinstveni format datuma za cijeli sajt: D/M/YYYY (npr. 23/4/2024).
// UTC jer su datumi vijesti u frontmatteru zapisani kao datum bez vremena.
export const formatDate = (d: Date): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
