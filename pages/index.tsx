import React, { useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from './Home.module.css';

const Home: NextPage = (props) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Track Dayli Expenses</title>
        <meta name="description" content="App to track your daily expenses" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <PieChart
          label={({ dataEntry }) => dataEntry.value}
          animate={true}
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]}
        />
        <h1 className={styles.title}>
          Welcome to your daily expenses
        </h1>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default Home;
