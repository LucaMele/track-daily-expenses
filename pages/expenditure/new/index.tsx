import React, { FormEventHandler } from 'react';
import type { NextPage } from 'next';

const NewExpenditure: NextPage = () => {

  const addPost: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData((event.target as HTMLFormElement));
    const formObject = {};
    for (const [key, value] of data) {
      (formObject as any)[key] = value;
    }
    const res = await fetch(
      'http://localhost:3000/api/add-post',
      {
        body: JSON.stringify(formObject),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    const result = await res.json();
    console.log(result);
  };

  return (
    <>
      <h1>Add new one</h1>
      <form onSubmit={addPost}>
        <input type="text" name="title"></input>
      </form>
    </>
  );
};

export default NewExpenditure;
