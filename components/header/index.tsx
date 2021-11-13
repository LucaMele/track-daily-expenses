import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const links = [
  { text: 'Home', href: '/', keybinding: 'H' },
  { text: 'New', href: '/expenditure/new', keybinding: 'N' },
];

export const Header: React.FC = () => {
  const router = useRouter();

  const onKeyPress = (event: KeyboardEvent) => {
    const link = links.find(({ keybinding }) => keybinding === event.key);
    if (link) {
      router.push(link.href);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);

    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  });

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {links && links.map(({ text, href, keybinding }, k) => (
          <Link key={k} href={href}>
            <a className={`${styles.navLinks} ${router.pathname === href ? styles.navLinksSelected : ''}`}>
              {text} {keybinding ? `(${keybinding})` : ''}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
};
