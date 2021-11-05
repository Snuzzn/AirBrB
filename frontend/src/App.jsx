import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Hostedlistings from './pages/HostedListings';
import Login from './pages/Login';

function App () {
  return (
    <>
      <div className="bg-gray-50 h-screen">
        <Navbar />
        <div className="p-5 sm:p-7 flex place-items-center justify-center">
          <div className="flex flex-col w-full 3xl:w-1/2">
            <Routes>
              <Route path="/hosted-listings" element={<Hostedlistings/>}>
              </Route>
              <Route path="/login" element={<Login/>}>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
