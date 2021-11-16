import React, { ReactNode } from 'react';
import styles from './Input.module.css';
import { InputProps } from '../interfaces';

const NO_VAL_PROPS = ['name', 'type', 'text', 'step', 'showValidity', 'disabled', 'defaultValue'];

export const Input: React.FC<InputProps> = ({ text, showValidation, disabled, ...props }) => (
  <>
    <label className={styles.inputLabel}>
      <input
        disabled={!!disabled}
        className={`${styles.input} ${showValidation ? styles.showValidity : ''}`}
        {...props}
      />
      { showValidation && (
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
