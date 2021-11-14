import React, { useEffect, useState, FormEventHandler } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from './Edit.module.css';
import { Form } from '../../../components/form';
import { formSchema } from '../new';

const EditExpenditure: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const makeControlled = [...formSchema];
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showValidation, setVisibility] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(makeControlled.map(entry => { entry.defaultValue = ''; return entry; }));

  const getExpense = async (signal: AbortSignal) => {
    const res = await fetch(`http://localhost:3000/api/expense/${uuid}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
      method: 'GET',
    });
    if (res.status !== 200) {
      throw new Error(`Server sent status other then 200: ${res.status}`);
    }
    const results = await res.json();
    const result = (results[0] as any);

    const filledData = [...formData];

    setDataLoaded(true);
    setFormData(filledData.map(entry => ({ ...entry, defaultValue: result[entry.name] })));
  };

  const updateExpense: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formEl = (event.target as HTMLFormElement);
    if (!formEl.checkValidity()) {
      setVisibility(true);
      return;
    }
    setIsSubmitting(true);
    setVisibility(false);
    const data = new FormData(formEl);
    const formObject = {};
    for (const [key, value] of data) {
      (formObject as any)[key] = value;
    }
    const res = await fetch(`http://localhost:3000/api/expense/${uuid}`, {
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    if (res.status !== 200) {
      setIsSubmitting(false);
      throw new Error(`Server answered with status ${res.status}`);
    }
    const result = await res.json();
    router.push('/');
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (router.isReady && !dataLoaded) {
      getExpense(signal);
    }

    return () => {
      controller.abort();
    };
  });

  return (
    <>
      <Head>
        <title>Add new Expenses</title>
        <meta name="description" content="Add new expenses" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>Edit expense</h1>
      <section className={styles.section}>
        <Form
          formSchema={formData}
          onSubmit={updateExpense}
          isSubmitting={(isSubmitting || !dataLoaded)}
          showValidity={showValidation}
          setVisibility={setVisibility}
        />
      </section>
    </>
  );
};

export default EditExpenditure;
