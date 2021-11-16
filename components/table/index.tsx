import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from './Table.module.css';
import { TableProp, ExpenseItem, FormExpenseItem, CellProp } from '../interfaces';
import Link from 'next/link';
import { Select } from '../form';

const EDIT_URL_BASE = '/expense/edit';

const sortColumns = (expenses: FormExpenseItem[], noTypeExpenseItem: object) => expenses.map(expense => {
  const newExpense: FormExpenseItem = {} as FormExpenseItem;
  Object.keys(noTypeExpenseItem).forEach((name) => (newExpense as any)[name] = (expense as any)[name] as any);
  return {
    ...expense,
    ...newExpense,
  };
});

const getCleanSortModel = (noTypeExpenseItem : object) => {
  const sortModel: FormExpenseItem = {} as FormExpenseItem;
  Object.keys(noTypeExpenseItem).forEach((name, i) => (sortModel as any)[name] = -1);
  return sortModel;
};

const Cell: React.FC<CellProp> = ({ text }) => (
  <td className={styles.tableCell}>
    {text}
  </td>
);

enum Sort {
  none = -1,
  ascending = 0,
  descending = 1,
}

const sortAriaMap = {
  [Sort.none]: 'none',
  [Sort.ascending]: 'ascending',
  [Sort.descending]: 'descending',
};

export const Table: React.FC<TableProp> = ({ expenses, colorMapping, onDelete }) => {
  const { type, ...noTypeExpenseItem } = ExpenseItem;
  const initialModel = sortColumns(expenses, noTypeExpenseItem);
  const [model, setModel] = useState<FormExpenseItem[]>(initialModel);
  const [searchValue, setSearchString] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortModel, setSortModel] = useState(getCleanSortModel(noTypeExpenseItem));

  const handleSort = (name : string) => {
    const direction = (sortModel as any)[name];
    const newSortModel = {
      ...getCleanSortModel(noTypeExpenseItem),
      [name]: !~direction ? Sort.ascending : (!direction ? Sort.descending : Sort.ascending),
    };

    setSortModel(newSortModel);

    let newModel = model;
    if (!model.length) {
      newModel = initialModel;
    }

    setModel(newModel.sort((first, second) => {
      let firstValue = (first as any)[name];
      let secondValue = (second as any)[name];
      if (!Number.isNaN(+firstValue)) {
        firstValue = +firstValue;
      }
      if (!Number.isNaN(+secondValue)) {
        secondValue = +secondValue;
      }

      if (firstValue < secondValue) {
        return (newSortModel as any)[name] === Sort.ascending ? -1 : 1;
      }
      if (firstValue > secondValue) {
        return (newSortModel as any)[name] === Sort.ascending ? 1 : -1;
      }
      return 0;
    }));
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchString(event.target.value);
  };

  const handleTypeFilter: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTypeFilter(event.target.value);
  };

  useEffect(() => {
    setSortModel(getCleanSortModel(noTypeExpenseItem));
    setModel(initialModel.filter(({ title, recipient, type }) =>
      (type === typeFilter || typeFilter === '') && (
        title.toLowerCase().includes(searchValue.toLowerCase()) ||
      recipient.toLowerCase().includes(searchValue.toLowerCase()))));
  }, [searchValue, typeFilter]);

  return (
    <>
      <section>
        <strong>Search title or recipient </strong>
        <input className={styles.filterInput} value={searchValue} type="text" onChange={handleSearch}/>
        <br />
        <strong>Filter per type </strong>
        <select className={styles.filterInput} onChange={handleTypeFilter}>
          <option></option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
      </section>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th className={`${styles.tableCell} ${styles.tableCellHead}`}></th>
            <th className={`${styles.tableCell} ${styles.tableCellHead}`}>Actions</th>
            {Object.keys(noTypeExpenseItem).map((name, k) => (
              <th
                aria-sort={(sortAriaMap as any)[(sortModel as any)[name]]}
                className={`${styles.tableCell} ${styles.tableCellHead}`}
                key={k}
              >
                <button onClick={() => { handleSort(name); }} className={styles.tableCellHeadButton} type={'button'}>
                  {name.replace('_', ' ')}
                </button>
              </th>
            ))}
            <th className={`${styles.tableCell} ${styles.tableCellHead}`}></th>
          </tr>
        </thead>
        <tbody>
          {(model.length ? model : (searchValue ? [] : initialModel)).map(({ uuid, ...entry }, k) => (
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
