import { TabBar } from 'antd-mobile';
import { menu } from '@utils/constants';
import { useGoto, useAttribute } from '@utils/hooks';
import style from './index.module.scss';

/**
* Bottom bar
*/

const Bottom = () => {
  const navigate = useGoto();
  const item = useAttribute();
  const itemDisplay = (it) => {
    if (!it.inBottomBar) {
      return null;
    }
    return <TabBar.Item key={it.key} icon={it.icon} />;
  };

  const onClickTabItem = (key) => {
    navigate(`/${key}`);
  };

  if (item.hideCommonHeader) {
    return null;
  }
  return (
    <div className={style.container}>
      <TabBar onChange={onClickTabItem} defaultActiveKey={item.key}>
        {menu.map(itemDisplay)}
      </TabBar>
    </div>
  );
};

export default Bottom;
