import { Image } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './index.module.scss';

/**
* Photo display component
* At most 4 pictures can be displayed
* if only one photo, fill the component with the only photo
* if two photos, one on the left and the other on the right
* if three photos, one on the left side and two on the right side.
* Two photos on the right are displayed in vertical order.
* If four photos, two on the left and two on the right.
* Photos are the same side are displayed vertically
*/
const ImageCard = ({
  imgs,
}) => {
  const getWrapper = () => {
    switch (imgs.length) {
      case 1:
        return style.wrapper1;
      case 2:
        return style.wrapper2;
      case 3:
        return style.wrapper3;
      case 4:
        return style.wrapper4;
      default:
        return style.wrapper;
    }
  };

  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {imgs.map((img, i) => (<Image className={classNames(style.img, `img${i}`)} key={classNames(img, i)} src={img} fit="cover" alt="" />))}
      </div>

    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
};

ImageCard.defaultProps = { imgs: [] };

export default ImageCard;
