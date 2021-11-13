import React from 'react';
import styles from './Input.module.css';

export interface InputProps {
  name: string;
  type: string;
  text: string;
  min?: number;
  max?: number;
  step?: string;
  required?: boolean;
  showValidity?: boolean;
}

export const Input: React.FC<InputProps> = ({ text, showValidity, ...props }) => (
  <>
    <label className={styles.inputLabel}>
      <span className={styles.inputLabelText}>{text}</span>
      <input
        className={`${styles.input} ${showValidity ? styles.showValidity : ''}`}
        {...props}
      />
    </label>
  </>
);
