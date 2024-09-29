import Head from 'next/head'
import StatesList from '../components/StatesList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>US Bin Stores</title>
        <meta name="description" content="Find bin stores in US" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StatesList />
      </main>

      <footer className="text-center py-4">
        <p>&copy; 2024 US Bin Stores Directory</p>
      </footer>
    </div>
  )
}
