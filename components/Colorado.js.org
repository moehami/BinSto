import React from 'react';
import useSWR from 'swr';
import { useInView } from 'react-intersection-observer';

const fetcher = (url) => fetch(url).then((res) => res.json());

const StoreCard = React.memo(({ store }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-2">{store.name}</h2>
    <p className="mb-2"><strong>Address:</strong> {store.address}</p>
    <p className="mb-2"><strong>City:</strong> {store.city}</p>
    <p className="mb-2"><strong>Phone:</strong> {store.phone_number}</p>
    <p className="mb-2"><strong>Timezone:</strong> {store.timezone}</p>
    <p className="mb-2"><strong>Rating:</strong> {store.rating}</p>
    <div className="mt-4">
      <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-4">Visit Website</a>
      <a href={store.place_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Google Maps</a>
    </div>
  </div>
));

const LazyStoresList = ({ stores }) => {
  const [visibleStores, setVisibleStores] = React.useState([]);
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '200px 0px',
  });

  React.useEffect(() => {
    if (inView) {
      setVisibleStores(prevStores => 
        [...new Set([...prevStores, ...stores.slice(prevStores.length, prevStores.length + 10)])]
      );
    }
  }, [inView, stores]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {visibleStores.map((store) => (
          <StoreCard key={store.business_id} store={store} />
        ))}
      </div>
      {visibleStores.length < stores.length && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <p className="text-gray-500">Loading more stores...</p>
        </div>
      )}
    </>
  );
};

export default function Colorado() {
  const { data: storesData, error } = useSWR('/api/colorado', fetcher);

  if (!storesData) {
    return <div className="text-center text-xl font-bold mt-8">Loading Colorado Bin Stores...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 mt-8">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-2 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bin Stores in Colorado</h1>
      <div className="mb-2">There are {storesData.data.length} Bins in Colorado</div>
      <LazyStoresList stores={storesData.data} />
    </div>
  );
}
