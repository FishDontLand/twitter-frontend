import { CameraOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import Tinput from '@components/Tinput';
import TButton from '@components/TButton';
import Header from '@components/Header';
import { toBase64 } from '@utils/';
import { useAppContext } from '@utils/context';
import { editUser } from '@services/register';
import { Toast } from 'antd-mobile';
import style from './index.module.scss';

/**
*
*/
const EditUser = () => {
  const [nickName, setNickName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [store] = useAppContext();

  const onNameChange = (value) => {
    setNickName(value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    const fileValues = Object.values(files);
    toBase64(fileValues[0]).then((res) => {
      setAvatar(res);
    });
  };

  const handleSave = async () => {
    if (!nickName || !avatar) {
      const res = await editUser(store.user?.id, {
        ...store.user,
        nickname: nickName || store.user.nickName,
        avatar_url: avatar || store.user.avatar,
      });
      if (res.data) {
        Toast.show('Successfully Saved!');
        window.location.reload();
      }
      return;
    }

    Toast.show('Please edit username or upload avatar');
  };

  return (
    <div className={style.container}>
      <Header>
        <TButton onClick={handleSave}>Save</TButton>
      </Header>
      <div className={style.header} />
      <div className={style.avatarWrap}>
        <div className={style.photoIcon}>
          <CameraOutline />
        </div>
        <input
          type="file"
          className={style.uploadFile}
          onChange={onFileChange}
          accept="image/png, image/jpeg"
        />
        <img className={style.avatar} src={avatar || store.user?.avatar_url} alt="" />
      </div>
      <div className={style.content}>
        <Tinput label="full name" onChange={onNameChange} value={nickName || store.user?.nickname} length={50} />
      </div>
    </div>

  );
};
export default EditUser;
