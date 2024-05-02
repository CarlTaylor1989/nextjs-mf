import { lazy } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const Footer = lazy(() => import("home/footer"));
const Nav = lazy(() => import("home/nav"));
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Locations app - port :3002</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Nav>Navigation component federated from home app</Nav>
        <div className={styles.center}>Locations app hosted on port :3002</div>
        <Footer />
      </main>
    </>
  );
}
