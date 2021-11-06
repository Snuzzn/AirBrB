import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Hostedlistings from './pages/HostedListings';
import CreateListing from './pages/CreateListing';

function App () {
  return (
    <div className="bg-gray-50 h-screen">
      <Navbar />
      <div className="p-5 sm:p-7 flex place-items-center justify-center">
          <Routes>
            <Route path="/hosted-listings" element={<Hostedlistings/>}>
            </Route>
            <Route path="/create-listing" element={<CreateListing/>}>
            </Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
