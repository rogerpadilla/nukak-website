import React from 'react';
import styles from './main.module.css';
import { Sidenav, SidenavItem } from './sidenav';

export const Main: React.FC<{ sidenav?: { category: string; items: SidenavItem[] }; children: React.ReactNode }> = ({
  children,
  sidenav,
}) => {
  return (
    <main className={styles.main}>
      {children}
      {sidenav && <Sidenav category={sidenav.category} items={sidenav.items} />}
    </main>
  );
};
