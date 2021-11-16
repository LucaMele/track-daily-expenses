import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Table } from '../components/table';
import styles from './Home.module.css';
import { FormExpenseItem, ColorMapping } from '../components/interfaces';
import { request } from '../components/functions';

const Home: NextPage = (props) => {

  const [expenses, setExpenses] = useState<FormExpenseItem[]>([]);

  const getExpenses = async (signal: AbortSignal) => {
    const res = await request('get-expenses', 'GET', undefined, signal);
    const result: FormExpenseItem[] = await res.json();
    setExpenses(result);
  };

  const onDeleteUpdate = async (uuid: string, method = 'PUT') => {
    const res = await request(`expense/${uuid}`, method);

    const result: FormExpenseItem[] = await res.json();
    setExpenses(result);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getExpenses(signal);

    return () => {
      controller.abort();
    };
  }, []);

  const pieData = {};
  expenses.forEach(({ type, amount }) => {
    let pieDataType = (pieData as any)[type];
    if (!pieDataType) {
      pieDataType = 0;
    }
    (pieData as any)[type] = pieDataType + +amount;
  });

  const arrayPie: any[] = [];
  const colorMapping: ColorMapping = {};
  for (const key in pieData) {
    // eslint-disable-next-line no-prototype-builtins
    if (pieData.hasOwnProperty(key)) {
      (colorMapping as any)[key] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      arrayPie.push(
        { title: key, value: +(pieData as any)[key], color: (colorMapping as any)[key] },
      );
    }
  }

  return (
    <>
      <Head>
        <title>Track Dayli Expenses</title>
        <meta name="description" content="App to track your daily expenses" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <h1 className={styles.title}>
        Welcome to your daily expenses
      </h1>

      <section className={styles.main}>
        <PieChart
          label={({ dataEntry }) => dataEntry.value}
          animate={true}
          data={arrayPie}
        />
        {
          arrayPie.map(({ title, color }, k) => (
            <p key={k}>
              <span style={{ backgroundColor: color } as any} className={styles.legendColor}></span>
              {title}
            </p>
          ))
        }
      </section>

      <section>
        <Table
          onDelete={(uuid) => { return onDeleteUpdate(uuid, 'DELETE'); }}
          onUpdate={onDeleteUpdate}
          expenses={expenses}
          colorMapping={colorMapping}
        />
      </section>
    </>
  );
};

export default Home;
