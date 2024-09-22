import React, { useState, useEffect } from 'react';

export default function TexasInfo() {
  const [texasData, setTexasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pastebin.com/raw/hY3uSBuB')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Texas data');
        }
        return response.json();
      })
      .then((data) => {
        setTexasData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-8">Loading Texas information...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Texas Information</h1>
      {texasData && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{texasData.name}</h2>
          <p className="mb-2"><strong>Capital:</strong> {texasData.capital}</p>
          <p className="mb-2"><strong>Population:</strong> {texasData.population.toLocaleString()}</p>
          <p className="mb-2"><strong>Area:</strong> {texasData.area.toLocaleString()} sq mi</p>
          <p className="mb-2"><strong>Largest City:</strong> {texasData.largestCity}</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Regions:</h3>
          <ul className="list-disc list-inside">
            {texasData.regions.map((region, index) => (
              <li key={index}>{region}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2">Major Industries:</h3>
          <ul className="list-disc list-inside">
            {texasData.majorIndustries.map((industry, index) => (
              <li key={index}>{industry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}