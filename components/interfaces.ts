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

export enum ExpenseItem {
  amount = 'amount',
  currency = 'currency',
  title = 'title',
  recipient = 'recipient',
  transaction_date = 'transaction_date',
  type = 'type',
}

export interface InputProps {
  name: ExpenseItem;
  type?: string;
  text: string;
  min?: number;
  max?: number;
  step?: string;
  disabled?: boolean;
  maxLength?: number,
  minLength?: number,
  required?: boolean;
  showValidity?: boolean;
}

export interface SelectOptions {
  value: string;
  text: string;
}

export interface FormProps {
  formSchema: FormItem[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean;
  showValidity?: boolean;
  setVisibility?: (setVisibility: boolean) => void;
}

export interface SelectProps {
  name: string;
  text: string;
  required?: boolean;
  showValidity?: boolean;
  disabled?: boolean;
  options: SelectOptions[]
}
