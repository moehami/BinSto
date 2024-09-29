import Head from 'next/head'
import ErrorBoundary from '../components/ErrorBoundary'
import Montana from '../components/Montana'

export default function Home() {
  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Montana Bin Stores</title>
        <meta name="description" content="Find bin stores in Montana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Montana />
      </main>

      <footer className="text-center py-4">
        <p>&copy; 2024 Montana Bin Stores Directory</p>
      </footer>
    </div></ErrorBoundary>
  )
}
