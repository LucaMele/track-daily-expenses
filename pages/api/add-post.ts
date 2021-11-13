// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

type Post = {
  title: string
};

type Posts = [
  Post
];

const FILE_NAME = 'posts.json';
const DIR = `${process.cwd()}/pages/api/data`;
const FILE_PATH = `${DIR}/${FILE_NAME}`;

const createFolderIfNotExisting = () => {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }

  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, '[]');
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Posts>,
) {
  createFolderIfNotExisting();
  fs.readFile(FILE_PATH, 'utf-8', (err, dataString) => {
    if (err) {
      throw err;
    }
    const data: Posts = JSON.parse(dataString || '[]');
    data.push((req.body as Post));
    fs.writeFile(FILE_PATH, JSON.stringify(data), () => {
      res.status(200).json(data);
    });
  });
}
