import React, { useEffect, useState, FormEventHandler } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from './Edit.module.css';
import { Form } from '../../../components/form';
import { formSchema } from '../new';
import { request } from '../../../components/functions';

const EditExpenditure: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const makeControlled = [...formSchema];
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState(makeControlled.map(entry => { entry.defaultValue = ''; return entry; }));

  const getExpense = async (signal: AbortSignal) => {
    const res = await request(`expense/${uuid}`, 'GET', undefined, signal);
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
      setShowValidation(true);
      return;
    }
    setIsDisabled(true);
    setShowValidation(false);
    const data = new FormData(formEl);
    const formObject = {};
    for (const [key, value] of data) {
      (formObject as any)[key] = value;
    }
    const res = await request(`expense/${uuid}`, 'PUT', formObject);
    if (res.status !== 200) {
      setIsDisabled(false);
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
          isDisabled={(isDisabled || !dataLoaded)}
          showValidity={showValidation}
          onReset={() => { setShowValidation(false); }}
        />
      </section>
    </>
  );
};

export default EditExpenditure;
