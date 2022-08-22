import { CameraOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import Tinput from '@components/Tinput';
import TButton from '@components/TButton';
import Header from '@components/Header';
import { toBase64 } from '@utils/';
import { useAppContext } from '@utils/context';
import style from './index.module.scss';

/**
*
*/
const EditUser = () => {
  const [nickName, setNickName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [store] = useAppContext();

  const onNameChange = (e) => {
    setNickName(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    const fileValues = Object.values(files);
    toBase64(fileValues[0]).then((res) => {
      setAvatar(res);
    });
  };
  return (
    <div className={style.container}>
      <Header>
        <TButton>Save</TButton>
      </Header>
      <div className={style.header} />
      <div className={style.avatarWrap}>
        <CameraOutline />
      </div>
      <input
        type="file"
        className={style.uploadFile}
        onChange={onFileChange}
        accept="image/png, image/jpeg"
      />
      <img className={style.avatar} src={avatar || store.user?.avatar_url} alt="" />
      <div className={style.content}>
        <Tinput label="full name" onChange={onNameChange} value={nickName || store.user?.nickname} />
      </div>
    </div>

  );
};
export default EditUser;
