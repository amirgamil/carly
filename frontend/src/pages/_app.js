import '../styles/globals.css'
import '../styles/blocks.css'
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta
          name="description"
          content="genereate beautiful letters for your loved ones"
        />
        <link rel="icon" href="/favicon.png" />
        <title>carly | letters for your loved ones</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
