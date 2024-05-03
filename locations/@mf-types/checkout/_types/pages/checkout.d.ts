/// <reference types="react" />
declare const Checkout: {
    (): import("react").JSX.Element;
    getInitialProps(): Promise<{
        test: number;
    }>;
};
export default Checkout;
