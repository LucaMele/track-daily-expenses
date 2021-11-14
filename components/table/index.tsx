import React from 'react';
import styles from './Table.module.css';
import { FormExpenseItem } from '../../pages/expenditure/new';

export interface ColorMapping {
  food?: string;
  travel?: string;
  other?: string;
}

export interface TableProp {
  expenses: FormExpenseItem[];
  colorMapping: ColorMapping;
}

export const Table: React.FC<TableProp> = ({ expenses, colorMapping }) => (
  <>
    <table className={styles.table}>
      {expenses.map(({ title, amount, recipient, currency, type, transaction_date }, k) => (
        <tr className={styles.tableRow} key={k}>
          <td className={styles.tableCell}>
            <button className={styles.tableCellButton} type={'button'}>🖊️</button>
            <button className={styles.tableCellButton} type={'button'}>🗑️</button>
          </td>
          <td className={styles.tableCell}>
            {title}
          </td>
          <td className={styles.tableCell}>
            {recipient}
          </td>
          <td className={styles.tableCell}>
            {amount}
          </td>
          <td className={styles.tableCell}>
            {currency}
          </td>
          <td className={styles.tableCell}>
            <span style={{ display: 'block', opacity: '0.7', backgroundColor: (colorMapping as any)[type] }}>
              {type}
            </span>
          </td>
          <td className={styles.tableCell}>
            {transaction_date}
          </td>
        </tr>
      ))}
    </table>
  </>
);
