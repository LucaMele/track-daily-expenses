import React, { FormEventHandler, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from './New.module.css';
import Head from 'next/head';
import { Input, Select, Form } from '../../../components/form';
import { FormItem, ExpenseItem } from '../../../components/interfaces';
import { request, getFormAndHandleStates } from '../../../components/functions';

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

  const [showValidation, setShowValidation] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [statusText, setStatusText] = useState('');

  const addExpense: FormEventHandler<HTMLFormElement> = async (event) => {
    const formEl = (event.target as HTMLFormElement);
    const formObject = getFormAndHandleStates(event, setShowValidation, setIsDisabled);
    if (!formObject) {
      return;
    }
    const res = await request('add-expense', 'POST', formObject);
    if (res.status !== 200) {
      setIsDisabled(false);
      setStatusText(`Server answered with status ${res.status}`);
    }
    const result = await res.json();
    setStatusText(`Form has been transmitted successfully, now having a total of ${result.length} entries`);
    formEl.reset();
    setIsDisabled(false);
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
          onSubmit={addExpense}
          isDisabled={isDisabled}
          showValidation={showValidation}
          onReset={() => { setShowValidation(false); }}
        />
      </section>
    </>
  );
};

export default NewExpenditure;
