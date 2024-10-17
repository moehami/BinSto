import { PaperClipIcon } from '@heroicons/react/20/solid';
import React from 'react'; 
import useSWR from 'swr'; 
import { useInView } from 'react-intersection-observer';

const fetcher = (url) => fetch(url).then((res) => res.json());

const StoreCard = React.memo(({ store }) => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Store Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store.address}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store.city}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store.phone_number}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
});


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
