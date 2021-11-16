import { FormEventHandler } from 'react';

export interface FormItem extends InputProps {
  Comp: React.FC<any>;
  options?: SelectOptions[];
  defaultValue?: number | string | boolean;
}

export interface FormExpenseItem {
  [ExpenseItem.title]: string;
  [ExpenseItem.transaction_date]: string;
  [ExpenseItem.amount]: string;
  [ExpenseItem.recipient]: string;
  [ExpenseItem.currency]: string;
  [ExpenseItem.type]: string;
  uuid?: string;
  defaultValue?: string;
}

export interface ColorMapping {
  food?: string;
  travel?: string;
  other?: string;
}

export interface TableProp {
  expenses: FormExpenseItem[];
  colorMapping: ColorMapping;
  onDelete: (uuid: string) => void | Promise<void>;
  onUpdate: (uuid: string) => void | Promise<void>;
}

export interface CellProp {
  text: string;
}

export enum ExpenseItem {
  title = 'title',
  amount = 'amount',
  currency = 'currency',
  recipient = 'recipient',
  transaction_date = 'transaction_date',
  type = 'type',
}

export interface InputProps {
  name: keyof typeof ExpenseItem;
  type?: string;
  text: string;
  min?: number;
  max?: number;
  step?: string;
  disabled?: boolean;
  maxLength?: number,
  minLength?: number,
  required?: boolean;
  showValidation?: boolean;
}

export interface SelectOptions {
  value: string;
  text: string;
}

export interface FormProps {
  formSchema: FormItem[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  isDisabled?: boolean;
  showValidation?: boolean;
  onReset?: Function;
}

export interface SelectProps {
  name: string;
  text: string;
  required?: boolean;
  showValidation?: boolean;
  disabled?: boolean;
  options: SelectOptions[]
}

export enum Sort {
  none = -1,
  ascending = 0,
  descending = 1,
}
