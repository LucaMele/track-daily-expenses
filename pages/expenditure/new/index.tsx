import React, { FormEventHandler, useState } from 'react';
import type { NextPage } from 'next';
import styles from './New.module.css';
import { Input, InputProps, Select, SelectProps } from '../../../components/form';

const formShema = [
  { Comp: Input, type: 'text', name: 'title', text: 'Title', maxLength: 15, required: true },
  { Comp: Input, type: 'date', name: 'transaction_date', text: 'Transaction Date', required: true },
  { Comp: Input, type: 'number', name: 'amount', text: 'Amount', min: 0, step: 'any', required: true },
  { Comp: Input, type: 'text', name: 'recipient', text: 'Recipient', maxLength: 20, required: true },
  { Comp: Input, type: 'text', name: 'currency', text: 'Currency (3 digit)', maxLength: 3, minLength: 1, required: true },
  { Comp: Select,
    name: 'type',
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

  const addPost: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formEl = (event.target as HTMLFormElement);
    if (!formEl.checkValidity()) {
      setVisibility(true);
      return;
    }
    setIsSubmitting(true);
    const data = new FormData(formEl);
    const formObject = {};
    for (const [key, value] of data) {
      (formObject as any)[key] = value;
    }
    const res = await fetch('http://localhost:3000/api/add-expense', {
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <section className={styles.section}>
      <h1>Add new expense</h1>
      <form className={styles.form} noValidate onSubmit={addPost}>
        {formShema && formShema.map(({ Comp, options, ...rest }, k) =>
          options ?
            <Select disabled={isSubmitting} options={options} showValidity={showValidity} key={k} {...rest} /> :
            <Comp disabled={isSubmitting} showValidity={showValidity} key={k} {...rest} />)}
        <div className={styles.buttonContainer}>
          <button disabled={isSubmitting} className={styles.button} type="submit">Submit</button>
          <button disabled={isSubmitting} className={styles.button} type="reset" onClick={() => setVisibility(false)}>Reset</button>
        </div>
      </form>
    </section>
  );
};

export default NewExpenditure;
