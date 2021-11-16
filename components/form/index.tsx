import React from 'react';
import { FormProps, FormItem } from '../interfaces';
import styles from './Form.module.css';

import { Select } from '.';

export * from './input';
export * from './select';

export const Form: React.FC<FormProps> = ({ formSchema, onSubmit, isDisabled, showValidity, onReset }) => (
  <form className={styles.form} noValidate onSubmit={onSubmit}>
    {formSchema && (formSchema as FormItem[]).map(({ Comp, options, ...rest }, k) =>
      options ?
        <Select disabled={isDisabled} options={options} showValidity={showValidity} key={k} {...rest} /> :
        <Comp disabled={isDisabled} showValidity={showValidity} key={k} {...rest} />)}
    <div className={styles.buttonContainer}>
      <button disabled={isDisabled} className={styles.button} type="submit">Submit</button>
      <button
        disabled={isDisabled}
        className={styles.button}
        type="reset"
        onClick={() => onReset && onReset()}
      >
        Reset
      </button>
    </div>
  </form>
);
