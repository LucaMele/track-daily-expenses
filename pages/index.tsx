import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Table, ColorMapping } from '../components/table';
import styles from './Home.module.css';
import { FormExpenseItem } from './expenditure/new';

const Home: NextPage = (props) => {

  const [expenses, setExpenses] = useState<FormExpenseItem[]>([]);

  const getPosts = async (signal: AbortSignal) => {
    const res = await fetch('http://localhost:3000/api/get-expense', {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
      method: 'GET',
    });

    const result: FormExpenseItem[] = await res.json();
    setExpenses(result);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getPosts(signal);

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
        <h1 className={styles.title}>
          Welcome to your daily expenses
        </h1>
      </section>

      <section>
        <Table expenses={expenses} colorMapping={colorMapping}/>
      </section>
    </>
  );
};

export default Home;
