// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createFolderIfNotExisting, FILE_PATH } from '../_common';
import { FormExpenseItem } from '../../../components/interfaces';

type Expenses = [
  FormExpenseItem
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expenses>,
) {
  const deleteExpense = () => {
    const reqUuid = req.query.uuid as string;
    fs.readFile(FILE_PATH, 'utf-8', (err, dataString) => {
      if (err) {
        throw err;
      }
      const data: Expenses = JSON.parse(dataString || '[]');
      const filteredData = data.filter(({ uuid }) => uuid !== reqUuid) as Expenses;
      fs.writeFile(FILE_PATH, JSON.stringify(filteredData), () => {
        res.status(200).json(filteredData);
      });
    });
  };
  const updteExpense = () => {
    const reqUuid = req.query.uuid as string;
    fs.readFile(FILE_PATH, 'utf-8', (err, dataString) => {
      if (err) {
        throw err;
      }
      const data: Expenses = JSON.parse(dataString || '[]');
      const index = data.findIndex(({ uuid }) => uuid === reqUuid);
      data.splice(index, 1, { ...data[index], ...(req.body as FormExpenseItem) }) as Expenses;
      fs.writeFile(FILE_PATH, JSON.stringify(data), () => {
        res.status(200).json(data);
      });
    });
  };
  const getExpense = () => {
    const reqUuid = req.query.uuid as string;
    fs.readFile(FILE_PATH, 'utf-8', (err, dataString) => {
      if (err) {
        throw err;
      }
      const data: Expenses = JSON.parse(dataString || '[]');
      const filteredData = data.filter(({ uuid }) => uuid === reqUuid) as Expenses;
      res.status(200).json(filteredData);
    });
  };
  createFolderIfNotExisting();
  switch (req.method) {
    case 'GET':
      return getExpense();
    case 'PUT':
      return updteExpense();
    case 'DELETE':
      return deleteExpense();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
