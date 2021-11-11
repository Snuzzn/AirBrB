import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const [dayDuration, setDayDuration] = React.useState(0);
  const store = {
    dayDuration: [dayDuration, setDayDuration],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node,
}
