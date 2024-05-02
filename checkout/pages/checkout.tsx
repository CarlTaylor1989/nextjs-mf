import { lazy } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const Footer = lazy(() => import("home/footer"));
const Nav = lazy(() => import("home/nav"));

const inter = Inter({ subsets: ["latin"] });

const Checkout = () => (
  <div>
    <Head>
      <title>Checkout app - port :3001</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={`${styles.main} ${inter.className}`}>
      <Nav>Navigation component federated from home app</Nav>
      <div className={styles.center}>Checkout app hosted on port :3001</div>
      <Footer />
    </main>
  </div>
);

Checkout.getInitialProps = async () => {
  return { test: 123 };
};

export default Checkout;
