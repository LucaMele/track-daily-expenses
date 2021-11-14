import fs from 'fs';

export const FILE_NAME = 'posts.json';
export const DIR = `${process.cwd()}/pages/api/data`;
export const FILE_PATH = `${DIR}/${FILE_NAME}`;

export const createFolderIfNotExisting = () => {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, '[]');
  }
};

// ref: https://github.com/axa-ch-cloud/hackathong2021-proglanguage-compare/blob/main/node/index.js
export function createUUID() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr(((s as any)[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = '-';

  const uuid = s.join('');
  return uuid;
}
