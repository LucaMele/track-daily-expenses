import React from 'react';
import { InputProps } from '.';
import styles from './Input.module.css';

export interface SelectProps {
  name: string;
  text: string;
  required?: boolean;
  showValidity?: boolean;
  options: { value: string, text: string }[]
}

export const Select: React.FC<SelectProps> = ({ text, options, showValidity, ...props }) => (
  <>
    <label className={styles.inputLabel}>
      <span className={styles.inputLabelText}>{text}</span>
      <select className={styles.input} {...props}>
        {options.map(({ value, text: _text }, k) => (<option key={k} value={value}>{_text}</option>))}
      </select>
    </label>
  </>
);
