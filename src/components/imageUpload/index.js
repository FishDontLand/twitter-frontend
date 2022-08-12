import picture from '@assets/picture.svg';
import IconButton from '@components/IconButton';
import { toBase64 } from '@utils/index';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
*
*/
const ImageUpload = ({
  onChange,
}) => {
  const onChangeUpload = (e) => {
    const { files } = e.target;
    const fls = Object.values(files);
    const flsPromises = fls.map((f) => new Promise((resolve) => {
      toBase64(f).then((res) => {
        resolve({
          key: f.name,
          content: res,
        });
      });
    }));
    Promise.all(flsPromises).then((res) => {
      const result = {};
      res.forEach((item) => {
        result[item.key] = item.content;
      });
      onChange(result);
    });
    e.target.value = '';
  };
  return (
    <div className={style.container}>
      <input
        type="file"
        encType="multipart/form-data"
        accept="image/gif.img/jpg"
        className={style.uploadFile}
        multiple="multiple"
        onChange={onChangeUpload}
      />
      <IconButton src={picture} svgClassName={style.icon} className={style.iconButton} />
    </div>
  );
};

ImageUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ImageUpload;
