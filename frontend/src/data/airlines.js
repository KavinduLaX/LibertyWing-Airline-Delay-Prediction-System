// Major US airlines by IATA code
export const AIRLINES = {
  AA: { name: 'American Airlines', emoji: '🦅' },
  DL: { name: 'Delta Air Lines',   emoji: '🔺' },
  UA: { name: 'United Airlines',   emoji: '🌐' },
  WN: { name: 'Southwest Airlines',emoji: '💙' },
  B6: { name: 'JetBlue Airways',   emoji: '🔵' },
  AS: { name: 'Alaska Airlines',   emoji: '🐻' },
  NK: { name: 'Spirit Airlines',   emoji: '💛' },
  F9: { name: 'Frontier Airlines', emoji: '🦊' },
  HA: { name: 'Hawaiian Airlines', emoji: '🌺' },
  SY: { name: 'Sun Country',       emoji: '☀️' },
  G4: { name: 'Allegiant Air',     emoji: '🎈' },
  MX: { name: 'Breeze Airways',    emoji: '🌬️' },
};

export function airlineLabel(code) {
  const a = AIRLINES[code?.toUpperCase()];
  return a ? `${a.emoji} ${a.name}` : '';
}