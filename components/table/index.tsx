import React from 'react';
import styles from './Table.module.css';
import { TableProp } from '../interfaces';
import Link from 'next/link';

const EDIT_URL_BASE = '/expense/edit';

export const Table: React.FC<TableProp> = ({ expenses, colorMapping, onDelete }) => (
  <>
    <table className={styles.table}>
      <tbody>
        {expenses.map(({ title, amount, recipient, currency, type, transaction_date, uuid }, k) => (
          <tr className={styles.tableRow} key={k}>
            <td style={{ width: '20px', backgroundColor: (colorMapping as any)[type] }} className={styles.tableCell}></td>
            <td className={styles.tableCell}>
              <Link href={`${EDIT_URL_BASE}/${uuid}`}><a className={styles.tableCellButton} type={'button'}>🖊️</a></Link>
              <button onClick={() => { onDelete(uuid as string); }} className={styles.tableCellButton} type={'button'}>🗑️</button>
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
              {transaction_date}
            </td>
            <td style={{ width: '20px', backgroundColor: (colorMapping as any)[type] }} className={styles.tableCell}></td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);
