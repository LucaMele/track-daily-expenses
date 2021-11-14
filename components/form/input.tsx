import React, { ReactNode } from 'react';
import styles from './Input.module.css';

export interface InputProps {
  name: string;
  type?: string;
  text: string;
  min?: number;
  max?: number;
  step?: string;
  maxLength?: number,
  minLength?: number,
  required?: boolean;
  showValidity?: boolean;
}

const NO_VAL_PROPS = ['name', 'type', 'text', 'step', 'showValidity'];

export const Input: React.FC<InputProps> = ({ text, showValidity, ...props }) => (
  <>
    <label className={styles.inputLabel}>
      <input
        className={`${styles.input} ${showValidity ? styles.showValidity : ''}`}
        {...props}
      />
      { showValidity && (
        <span className={styles.error}>
          <ul className={styles.errorList}>
            {Object.keys(props).filter(entry => !~NO_VAL_PROPS.indexOf(entry)).map((entry, k) => (
              <li key={k}>
                {entry} {typeof props[entry as keyof ReactNode] !== 'boolean' ? props[entry as keyof ReactNode] : ''}
              </li>
            ))}
          </ul>
        </span>
      )}
      <span className={styles.inputLabelText}>{text}</span>
    </label>
  </>
);
