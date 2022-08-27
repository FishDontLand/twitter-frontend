import {
  createContext, useState, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [store, setStore] = useState({});

  const update = (v) => {
    setStore((prevValue) => ({
      ...prevValue,
      ...v,
    }));
  };
  const value = useMemo(() => ({
    store, update,
  }), [store]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return [context.store, context.update];
};
