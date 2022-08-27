import { useState } from 'react';
import TButton from '@components/TButton';
import Header from '@components/Header';
import { TextArea, Toast } from 'antd-mobile';
import { useAppContext } from '@utils/context';
import ImageUpload from '@components/imageUpload';
import ImagePreview from '@components/ImagePreview';
import { createTweets } from '@services/tweets';
import { useGoto } from '@utils/hooks';
import style from './index.module.scss';

/**
*
*/
const CreateTweet = () => {
  const [text, setText] = useState('');
  const [imgs, setImgs] = useState({});
  const [store] = useAppContext();
  const go = useGoto();

  const onClickCreateTweet = () => {
    createTweets({
      content: text,
      id: store.user.id,
      photo_urls: Object.values(imgs),
    }).then((res) => {
      if (res.success) {
        Toast.show('Successfully posted');
        go();
        return;
      }
      Toast.show('Failed to post the tweet');
    });
  };

  const onChange = (v) => {
    setText(v);
  };

  const onChangeUploadFile = (v) => {
    if (v && Object.keys(v).length < 5) {
      setImgs((prevImgs) => ({
        ...prevImgs,
        ...v,
      }));
      return;
    }
    Toast.show('Can only upload 4 photos');
  };

  const imgList = Object.values(imgs);

  const deletionHandler = (index) => {
    const key = Object.keys(imgs).find((item, idx) => idx === index);
    setImgs((prevImgs) => {
      const previewImgs = { ...prevImgs };
      delete previewImgs[key];
      return previewImgs;
    });
  };

  return (
    <div className={style.container}>
      <Header>
        <TButton
          disabled={text.length === 0 && Object.keys(imgs).length === 0}
          onClick={onClickCreateTweet}
        >
          Tweet

        </TButton>
      </Header>
      <div className={style.content}>
        <div className={style.left}>
          <img className={style.avatar} src={store.user?.avatar_url} alt="avatar" />
        </div>
        <div className={style.right}>
          <TextArea value={text} rows={5} onChange={onChange} className={style.text} placeholder="What's new?" />
          {imgs && imgList.length > 0 && (
          <ImagePreview
            imgs={imgList}
            handleDelImg={deletionHandler}
          />
          )}
          <ImageUpload onChange={onChangeUploadFile} />
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
