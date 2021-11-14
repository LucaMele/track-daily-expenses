import React from 'react';
import { FormProps, FormItem } from '../interfaces';
import styles from './Form.module.css';

import { Select } from '.';

export * from './input';
export * from './select';

export const Form: React.FC<FormProps> = ({ formSchema, onSubmit, isSubmitting, showValidity, setVisibility }) => (
  <form className={styles.form} noValidate onSubmit={onSubmit}>
    {formSchema && (formSchema as FormItem[]).map(({ Comp, options, ...rest }, k) =>
      options ?
        <Select disabled={isSubmitting} options={options} showValidity={showValidity} key={k} {...rest} /> :
        <Comp disabled={isSubmitting} showValidity={showValidity} key={k} {...rest} />)}
    <div className={styles.buttonContainer}>
      <button disabled={isSubmitting} className={styles.button} type="submit">Submit</button>
      <button
        disabled={isSubmitting}
        className={styles.button}
        type="reset"
        onClick={() => setVisibility && setVisibility(false)}
      >
        Reset
      </button>
    </div>
  </form>
);
