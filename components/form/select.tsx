import React from 'react';
import styles from './Input.module.css';
import { SelectProps } from '../interfaces';

export const Select: React.FC<SelectProps> = ({ text, options, showValidation, ...props }) => (
  <>
    <label className={styles.inputLabel}>
      <span className={styles.inputLabelText}>{text}</span>
      <select className={`${styles.input} ${styles.inputSelect}`} {...props}>
        {options.map(({ value, text: _text }, k) => (<option key={k} value={value}>{_text}</option>))}
      </select>
    </label>
  </>
);
