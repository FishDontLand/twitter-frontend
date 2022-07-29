import {
  createContext, useState, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const defaultStore = {
  closeHeaderHandler: null,
};

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [store, setStore] = useState(defaultStore);

  const value = useMemo(() => ({
    store, setStore,
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

  return [context.store, context.setStore];
};
