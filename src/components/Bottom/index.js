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

  return (
    <div className={style.container}>
      <TabBar onChange={onClickTabItem}>
        {
      menu.map((it) => (
        <TabBar.Item key={it.key} icon={it.icon} />
      ))
}
      </TabBar>
    </div>
  );
};

export default Bottom;
