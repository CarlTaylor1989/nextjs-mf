import "@/styles/globals.css";
import App, { type AppProps, AppContext } from "next/app";

CheckoutApp.getInitialProps = async (ctx: AppContext) => {
  const props = await App.getInitialProps(ctx);
  return props;
};

export default function CheckoutApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
