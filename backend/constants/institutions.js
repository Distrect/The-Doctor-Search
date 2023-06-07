export const institiutions = [
  "SGK",
  "Allianz",
  "Near East Hayat",
  "Acıbadem",
  "İMECE",
  "EUREKO",
  "Inter Partner",
  "Groupama",
  "Mapfree",
  "Anadolu Sigorta",
  "Halk",
  "Türkiye İş Bankası",
  "ace europe",
  "Ankara Sigorta",
  "AXA Sigorta",
  "benefit",
  "Demir Hayat",
  "Dubai Group Sigorta",
  "Ergo",
];

export const titles = [
  "Prof",
  "Doç",
  "Dr",
  "Dt",
  "Dyt",
  "Jin",
  "Op",
  "Psi",
  "Psk",
  "Uzm",
  "Yrd",
];

export const toSaveTitles = titles.map((title) => ({ title }));

export const hashedTitles = {
  Prof: 1,
  Doç: 2,
  Dr: 3,
  Dt: 4,
  Dyt: 5,
  Jin: 6,
  Op: 7,
  Psi: 8,
  Psk: 9,
  Uzm: 10,
  Yrd: 11,
};

export const toSaveInstutions = institiutions.map((val) => ({
  insurance: val,
}));

export const hashedInstutions = institiutions.reduce((acc, val, i) => {
  acc[val] = i + 1;
  return acc;
}, {});
