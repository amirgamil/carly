import '../styles/globals.css'
import '../styles/blocks.css'
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  const title = pageProps["authenticated"] === true ? pageProps.data.title : "carly | letters for your loved ones"
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta
          name="description"
          content="genereate beautiful letters for your loved ones"
        />
        <link rel="icon" href="/favicon.png" />
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
