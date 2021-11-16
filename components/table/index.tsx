import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './Table.module.css';
import { TableProp, ExpenseItem, FormExpenseItem, CellProp } from '../interfaces';
import Link from 'next/link';

const EDIT_URL_BASE = '/expense/edit';

const sortColumns = (expenses: FormExpenseItem[], noTypeExpenseItem: object) => expenses.map(expense => {
  const newExpense: FormExpenseItem = {} as FormExpenseItem;
  Object.keys(noTypeExpenseItem).forEach((name) => (newExpense as any)[name] = (expense as any)[name] as any);
  return {
    ...expense,
    ...newExpense,
  };
});

const Cell: React.FC<CellProp> = ({ text }) => (
  <td className={styles.tableCell}>
    {text}
  </td>
);

export const Table: React.FC<TableProp> = ({ expenses, colorMapping, onDelete }) => {
  const { type, ...noTypeExpenseItem } = ExpenseItem;
  const initialModel = sortColumns(expenses, noTypeExpenseItem);
  const [model, setModel] = useState<FormExpenseItem[]>(initialModel);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={`${styles.tableCell} ${styles.tableCellHead}`}></th>
            <th className={`${styles.tableCell} ${styles.tableCellHead}`}>Actions</th>
            {Object.keys(noTypeExpenseItem).map((name, k) => (
              <th className={`${styles.tableCell} ${styles.tableCellHead}`} key={k}>{name.replace('_', ' ')}</th>
            ))}
            <th className={`${styles.tableCell} ${styles.tableCellHead}`}></th>
          </tr>
        </thead>
        <tbody>
          {(model.length ? model : initialModel).map(({ uuid, ...entry }, k) => (
            <tr className={styles.tableRow} key={k}>
              <td style={{ width: '20px', backgroundColor: (colorMapping as any)[entry.type] }} className={styles.tableCell}></td>
              <td className={styles.tableCell}>
                <Link href={`${EDIT_URL_BASE}/${uuid}`}><a className={styles.tableCellButton} type={'button'}>🖊️</a></Link>
                <button onClick={() => { onDelete(uuid as string); }} className={styles.tableCellButton} type={'button'}>🗑️</button>
              </td>
              {Object.keys(noTypeExpenseItem).map((key, k) => (
                <Cell key={k} text={(entry as any)[key]}/>
              ))}
              <td style={{ width: '20px', backgroundColor: (colorMapping as any)[entry.type] }} className={styles.tableCell}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
