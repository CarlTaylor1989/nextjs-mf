import { ReactNode } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export const Nav = ({ children }: { children: string }): ReactNode => {
  return (
    <nav className={styles.nav}>
      {children}
      <ul>
        <li>
          <Link href="/">Home app</Link>
        </li>
        <li>
          <Link href="/checkout">Checkout app</Link>
        </li>
        <li>
          <Link href="/locations">Locations app</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
