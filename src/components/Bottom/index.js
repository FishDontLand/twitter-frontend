import { TabBar } from 'antd-mobile';
import { useEffect } from 'react';
import { menu } from '@utils/constants';
import { useAppContext } from '@utils/context';
import { useGoto, useAttribute } from '@utils/hooks';
import style from './index.module.scss';

/**
* Bottom bar
*/

const Bottom = () => {
  const [, setStore] = useAppContext();
  const navigate = useGoto();
  const item = useAttribute();
  const itemDisplay = (it) => {
    if (!it.inBottomBar) {
      return null;
    }
    return <TabBar.Item key={it.key} icon={it.icon} />;
  };

  useEffect(() => {
    if (item) {
      setStore({
        title: item.title,
      });
    }
  }, []);

  const onClickTabItem = (key) => {
    navigate(key);
  };

  if (item.hideCommonHeader) {
    return null;
  }

  return (
    <div className={style.container}>
      <TabBar onChange={onClickTabItem}>
        {menu.map(itemDisplay)}
      </TabBar>
    </div>
  );
};

export default Bottom;
