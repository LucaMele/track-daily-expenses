import React from 'react';
import styles from './Layout.module.css';
import { Header } from '../header';

export interface LayoutProp {
  children: JSX.Element;
}

export const Layout: React.FC<LayoutProp> = ({ children }) => (
  <>
    <Header/>
    <main className={styles.main}>{children}</main>
  </>
);
