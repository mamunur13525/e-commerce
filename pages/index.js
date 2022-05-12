import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="e-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
      </main>
    </div>
  )
}
