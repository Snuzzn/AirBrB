import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Hostedlistings from './pages/HostedListings';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';
import { ToastContainer } from 'react-toastify';
import { displayToast } from './util/Toast';
import ListingDetails from './pages/ListingDetails';
import { StoreProvider } from './util/store';
import BookingDetails from './pages/BookingDetails';

// Initialise token state to what is stored in local storage
const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = React.useState(() => {
    try {
      const itemInStorage = localStorage.getItem(key);

      if (!itemInStorage) {
        return initialValue;
      }
      return JSON.parse(itemInStorage);
    } catch (e) {
      return initialValue;
    }
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state])

  return [state, setState];
}

function App () {
  const [storedToken, setStoredToken] = useLocalStorageState('token', '');
  const [storedEmail, setStoredEmail] = useLocalStorageState('email', '');
  console.log(storedEmail);
  const authenticate = (token) => {
    setStoredToken(token);
  }

  const navigate = useNavigate();
  const deauthenticate = () => {
    setStoredEmail('');
    setStoredToken('');
    navigate('/');
    displayToast('Successfully logged out!', 'success');
  }

  return (
    <StoreProvider>
      <div className="bg-gray-50 min-h-screen">
        <Navbar tokenState={storedToken} deauthenticate={deauthenticate} />
        <div className="p-5 sm:p-7 flex place-items-center justify-center">
            <Routes>
              {/* Redirect home page to listings landing page */}
              <Route exact path="/" element={<Navigate replace to="/listings"/>}>
              </Route>
              <Route path="/hosted-listings" element={<Hostedlistings/>}>
              </Route>
              <Route path="/create-listing" element={<CreateListing/>}>
              </Route>
              <Route path="/edit-listing/:id" element={<EditListing/>}>
              </Route>
              <Route path="/login" element={<Login authenticate={authenticate} storeEmail={setStoredEmail}/>}>
              </Route>
              <Route path="/register" element={<Register authenticate={authenticate} storeEmail={setStoredEmail}/>}>
              </Route>
              <Route path="/listings" element={<Listings/>} storedToken={storedToken} >
              </Route>
              <Route path="/listing/:id" element={<ListingDetails/>}>
              </Route>
              <Route path="/hosted-listings/:id" element={<BookingDetails/>}>
              </Route>
            </Routes>
        </div>
      </div>
      <ToastContainer />
    </StoreProvider>
  );
}

export default App;
