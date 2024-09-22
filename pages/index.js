import Head from 'next/head'
import TexasBinStores from '../components/TexasBinStores'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Texas Bin Stores</title>
        <meta name="description" content="Find bin stores in Texas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TexasBinStores />
      </main>

      <footer className="text-center py-4">
        <p>&copy; 2024 Texas Bin Stores Directory</p>
      </footer>
    </div>
  )
}