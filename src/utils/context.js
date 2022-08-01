import {
  createContext, useState, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const defaultStore = {
  closeHeaderHandler: null,
  user: {
    password: 'dong',
    name: 'asdf',
    phone: 1232131231,
    birthday: '2022-02-03',
    avatar_url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    id: 1,
  },
};

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [store, setStore] = useState(defaultStore);

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
