import Head from 'next/head'

import Alabama from '../components/Alabama'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Alabama Bin Stores</title>
        <meta name="description" content="Find bin stores in Alabama" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Alabama />
      </main>

      <footer className="text-center py-4">
        <p>&copy; 2024 Alabama Bin Stores Directory</p>
      </footer>
    </div>
  )
}
