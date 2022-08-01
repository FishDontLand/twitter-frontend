import { useLocation, useNavigate } from 'react-router-dom';
import { menu } from './constants';
import { useAppContext } from './context';

// obtain current item on the menu
export const useAttribute = () => {
  const location = useLocation();
  const it = menu.find((item) => item.link === location.pathname);

  return it;
};

// set router navigation
export const useGoto = () => {
  const navigate = useNavigate();
  const [, setStore] = useAppContext();
  return (key) => {
    const it = menu.find((item) => item.key === key);
    if (!it) return navigate('/');
    setStore({
      title: it.title,
    });
    return navigate(it.link);
  };
};
