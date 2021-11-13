import React, { FormEventHandler, useState } from 'react';
import type { NextPage } from 'next';
import styles from './New.module.css';
import { Input, InputProps, Select, SelectProps } from '../../../components/form';

const formShema = [
  { Comp: Input, type: 'text', name: 'title', text: 'Title', required: true },
  { Comp: Input, type: 'date', name: 'transaction_date', text: 'Transaction Date', required: true },
  { Comp: Input, type: 'number', name: 'amount', text: 'Amount', min: 1, step: 'any', required: true },
  { Comp: Input, type: 'text', name: 'recipient', text: 'Recipient', min: 1, required: true },
  { Comp: Input, type: 'text', name: 'currency', text: 'Currency', max: 3, min: 1, required: true },
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

  const addPost: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formEl = (event.target as HTMLFormElement);
    if (!formEl.checkValidity()) {
      setVisibility(true);
      return;
    }
    const data = new FormData(formEl);
    const formObject = {};
    for (const [key, value] of data) {
      (formObject as any)[key] = value;
    }
    const res = await fetch('http://localhost:3000/api/add-post', {
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
    <>
      <h1>Add new expense</h1>
      <form noValidate onSubmit={addPost}>
        {formShema && formShema.map(({ Comp, options, ...rest }, k) =>
          options ?
            <Select options={options} showValidity={showValidity} key={k} {...rest} /> :
            <Comp showValidity={showValidity} key={k} {...rest} />)}
        <button type="submit">Submit</button>
        <button type="reset" onClick={() => setVisibility(false)}>Reset</button>
      </form>
    </>
  );
};

export default NewExpenditure;
