import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from "next/document";
import {
  revalidate,
  FlushedChunks,
  flushChunks
} from "@module-federation/nextjs-mf/utils";

type ChunksInitialProps = DocumentInitialProps & {
  chunks: unknown[];
};

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<ChunksInitialProps> {
    if (
      process.env.NODE_ENV === "development" &&
      !ctx.req?.url?.includes("_next")
    ) {
      await revalidate().then((shouldReload: boolean) => {
        if (!shouldReload) return;
        ctx.res?.writeHead(302, { Location: ctx.req?.url });
        ctx.res?.end();
      });
    } else {
      ctx.res?.on("finish", () => revalidate());
    }
    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks();

    return {
      ...initialProps,
      chunks
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={this.props.chunks} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
