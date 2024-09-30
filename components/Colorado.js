import React, { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { useInView } from 'react-intersection-observer';
import Pagination from '/components/Pagination';

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
StoreCard.displayName = 'StoreCard';

const LazyStoresList = React.memo(({ stores }) => {
  const [visibleStores, setVisibleStores] = useState([]);
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '200px 0px',
  });

  const loadMoreStores = useCallback(() => {
    if (inView) {
      setVisibleStores(prevStores => {
        const newStores = stores.slice(prevStores.length, prevStores.length + 10);
        return [...prevStores, ...newStores];
      });
    }
  }, [inView, stores]);

  React.useEffect(() => {
    loadMoreStores();
  }, [loadMoreStores]);

  const storeCards = useMemo(() => (
    visibleStores.map((store) => (
      <StoreCard key={store.business_id} store={store} />
    ))
  ), [visibleStores]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {storeCards}
      </div>
      {visibleStores.length < stores.length && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          <p className="text-gray-500">Loading more stores...</p>
        </div>
      )}
    </>
  );
});
LazyStoresList.displayName = 'LazyStoresList';

function Colorado() {
  const { data: storesData, error } = useSWR('/api/colorado', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 10;

  if (!storesData) {
    return <div className="text-center text-xl font-bold mt-8">Loading Colorado Bin Stores...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 mt-8">Error: {error.message}</div>;
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = storesData.data.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math
