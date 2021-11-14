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
