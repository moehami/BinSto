import React, { useState, useEffect } from 'react';

export default function StatesList() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/states')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch states data');
        }
        return response.json();
      })
      .then((data) => {
        setStates(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">US States</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((state) => (
          <li
            key={state.abbreviation}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <span className="font-semibold"><a href={state.url}>{state.name}</a></span>
   
          </li>
        ))}
      </ul>
    </div>
  );
}