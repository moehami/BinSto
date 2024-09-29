import Head from 'next/head'
import Indiana from '../components/Indiana'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Indiana Bin Stores</title>
        <meta name="description" content="Find bin stores in Indiana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Indiana />
      </main>

      <footer className="text-center py-4">
        <p>&copy; 2024 Indiana Bin Stores Directory</p>
      </footer>
    </div>
  )
}