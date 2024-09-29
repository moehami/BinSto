import React, { useState, useEffect } from 'react';

export default function Colorado() {
  const [storesData, setStoresData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/colorado')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch store data');
        }
        return response.json();
      })
      .then(data => {
        setStoresData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-8">Loading Colorado Bin Stores...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 mt-8">Error: {error}</div>;
  }
  return (
    <div className="container mx-2 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bin Stores in Colorado</h1>


      <div className="mb-2">There is {storesData.data.length} Bins in Colorado </div>

      {storesData && storesData.data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {storesData.data.map((store) => (
            

            <div key={store.business_id} className="bg-white shadow-md rounded-lg p-6 ">
              <h2 className="text-2xl font-semibold mb-2">{store.name}</h2>
             
          
              <p className="mb-2"><strong>Address:</strong> {store.address}</p>
              <p className="mb-2"><strong>City:</strong> {store.city}</p>
              <p className="mb-2"><strong>Phone:</strong>{store.phone_number} </p>             
              <p className="mb-2"><strong>Timezone:</strong> {store.timezone}</p>
              <p className="mb-2"><strong>Rating:</strong> {store.rating}</p>
              

              <div className="mt-4">
                <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-4">Visit Website</a>
                <a href={store.place_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Google Maps</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}