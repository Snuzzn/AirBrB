import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Hostedlistings from './pages/HostedListings';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';

// Initialise token state to what is stored in local storage
const useLocalStorageState = (initialValue) => {
  const [token, setToken] = React.useState(() => {
    try {
      const tokenInStorage = localStorage.getItem('token');

      if (!tokenInStorage) {
        return initialValue;
      }
      return JSON.parse(tokenInStorage);
    } catch (e) {
      return initialValue;
    }
  })

  React.useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token])

  return [token, setToken];
}

function App () {
  const [storedToken, setStoredToken] = useLocalStorageState('');

  const authenticate = (token) => {
    setStoredToken(token);
  }

  const navigate = useNavigate();
  const deauthenticate = () => {
    setStoredToken('');
    navigate('/listings');
  }

  return (
    <>
      <div className="bg-gray-50 h-screen">
        <Navbar tokenState={storedToken} deauthenticate={deauthenticate} />
        <div className="p-5 sm:p-7 flex place-items-center justify-center">
          <div className="flex flex-col w-full 3xl:w-1/2">
            <Routes>
              {/* Redirect home page to listings landing page */}
              <Route exact path="/" element={<Navigate replace to="/listings"/>}>
              </Route>
              <Route path="/hosted-listings" element={<Hostedlistings/>}>
              </Route>
              <Route path="/login" element={<Login authenticate={authenticate}/>}>
              </Route>
              <Route path="/register" element={<Register authenticate={authenticate}/>}>
              </Route>
              <Route path="/listings" element={<Listings/>}>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
