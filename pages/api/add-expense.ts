// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createFolderIfNotExisting, FILE_PATH } from './_common';

type Expense = {
  title: string
};

type Expenses = [
  Expense
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expenses>,
) {
  createFolderIfNotExisting();
  fs.readFile(FILE_PATH, 'utf-8', (err, dataString) => {
    if (err) {
      throw err;
    }
    const data: Expenses = JSON.parse(dataString || '[]');
    data.push((req.body as Expense));
    fs.writeFile(FILE_PATH, JSON.stringify(data), () => {
      res.status(200).json(data);
    });
  });
}
