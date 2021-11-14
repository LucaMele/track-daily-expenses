import React, { FormEventHandler, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from './New.module.css';
import Head from 'next/head';
import { Input, Select, Form } from '../../../components/form';
import { FormItem, ExpenseItem } from '../../../components/interfaces';

export const formSchema: FormItem[] = [
  { Comp: Input, type: 'text', name: ExpenseItem.title, text: 'Title', maxLength: 15, required: true },
  { Comp: Input, type: 'date', name: ExpenseItem.transaction_date, text: 'Transaction Date', required: true },
  { Comp: Input, type: 'number', name: ExpenseItem.amount, text: 'Amount', min: 0, step: 'any', required: true },
  { Comp: Input, type: 'text', name: ExpenseItem.recipient, text: 'Recipient', maxLength: 20, required: true },
  {
    Comp: Input,
    type: 'text',
    name: ExpenseItem.currency,
    text: 'Currency (3 digit)',
    maxLength: 3,
    minLength: 1,
    required: true,
  },
  { Comp: Select,
    name: ExpenseItem.type,
    text: 'Type',
    required: true,
    options: [
      { value: 'food', text: 'Food' },
      { value: 'travel', text: 'Travel' },
      { value: 'other', text: 'Other' },
    ] },
];

const NewExpenditure: NextPage = () => {

  const [showValidity, setVisibility] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState('');

  const addPost: FormEventHandler<HTMLFormElement> = async (event) => {
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
    const res = await fetch(`${window.location.origin}/api/add-expense`, {
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (res.status !== 200) {
      setIsSubmitting(false);
      setStatusText(`Server answered with status ${res.status}`);
    }
    const result = await res.json();
    setStatusText(`Form has been transmitted successfully, now having a total of ${result.length} entries`);
    formEl.reset();
    setIsSubmitting(false);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setStatusText('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [statusText]);

  return (
    <>
      <Head>
        <title>Add new Expenses</title>
        <meta name="description" content="Add new expenses" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className={styles.section}>
        <p className={styles.statusText}>{statusText}</p>
        <h1>Add new expense</h1>
        <Form
          formSchema={formSchema}
          onSubmit={addPost}
          isSubmitting={isSubmitting}
          showValidity={showValidity}
          setVisibility={setVisibility}
        />
      </section>
    </>
  );
};

export default NewExpenditure;
