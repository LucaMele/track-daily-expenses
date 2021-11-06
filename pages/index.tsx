import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';

const ADD_NEW_HREF = '/expenditure/new';

const Home: NextPage = (props) => {
  const router = useRouter();

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'N') {
      router.push(ADD_NEW_HREF);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);

    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Track Dayli Expenses</title>
        <meta name="description" content="App to track your daily expenses" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p>Press <strong>Shift + n </strong>for a <Link href={ADD_NEW_HREF}><a>new entry</a></Link></p>
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
