import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { menu } from './constants';
import { useAppContext } from './context';

// obtain current item on the menu
export const useAttribute = () => {
  const location = useLocation();
  const it = menu.find((item) => matchPath(item.link, location.pathname));
  if (!it) {
    return {};
  }
  return it;
};

// set router navigation
export const useGoto = () => {
  const navigate = useNavigate();
  const [, setStore] = useAppContext();
  return (key, params) => {
    if (!key) {
      return navigate(-1);
    }
    const path = params ? `/${key}/${params.id}` : `/${key}`;
    console.log(path);
    const it = menu.find((item) => matchPath(item.link, path));
    if (!it) return navigate('/');
    setStore({
      title: it.title,
    });
    return navigate(path);
  };
};

// threshold to trigger refresh
const maxY = 50;

// pull to refresh hooks
export const usePullToRefresh = () => {
  const y = useRef();
  const [status, setStatus] = useState('');
  useEffect(() => {
    window.ontouchstart = (e) => {
      // get the first finger touch location
      y.current = e.touches[0].pageY;
    };

    window.ontouchmove = (e) => {
      if (document.documentElement.scrollTop === 0) {
        if (e.touches[0].pageY - y.current > maxY) {
          setStatus('release to refresh');
          return;
        }

        if (e.touches[0].pageY - y.current > 0) {
          setStatus('pull to refresh');
        }
      }
    };
    return (() => {
      window.ontouchstart = null;
      window.ontouchmove = null;
    });
  });

  useEffect(() => {
    window.ontouchend = () => {
      if (document.documentElement.scrollTop === 0) {
        if (status === 'release to refresh') {
          setStatus('loading');
          setTimeout(() => {
            setStatus('loading complete');
            setTimeout(() => {
              setStatus('');
            }, 500);
          }, 1000);
          return;
        }
        setStatus('');
      }
    };
    return () => {
      window.ontouchend = null;
    };
  }, [status]);

  return status;
};

const OFFSET = 50;

export const useDownLoad = () => {
  // 3 parameters used to check reaching bottom:
  // 1. document.codumentElement.clientHeight
  // 2. document.body.scrollHeight
  // 3. document.documentElement.scrollTop
  // check if bottom is reached scrollTop + clientHeight = scrollHeight;
  // need to use some offset to trigger refresh before completely reaching the bottom
  // scrollTop + clientHeight >= scrollHeight - OFFSET?
  const [loading, setLoading] = useEffect(false);
  useEffect(() => {
    window.onscroll = () => {
      if (loading) {
        return;
      }
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setLoading(true);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        console.log('finish');
        setLoading(false);
      }, 2000);
    }
  });
};
