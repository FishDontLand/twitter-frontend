import { Image, ImageViewer } from 'antd-mobile';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Bar from '@components/Bar';
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
  likeCount,
  commentCount,
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

  const imageViewRef = useRef();
  const [visible, setVisible] = useState(false);
  const onClickImage = (i) => {
    setVisible(true);
    imageViewRef.current.swipeTo(i, true);
  };
  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {imgs.map((img, i) => (<Image onClick={() => onClickImage(i)} className={classNames(style.img, `img${i}`)} key={classNames(img, i)} src={img} fit="cover" alt="" />))}
      </div>
      <div style={{ transition: '10s' }}>
        <ImageViewer.Multi
          ref={imageViewRef}
          images={imgs}
          visible={visible}
          onClose={() => { setVisible(false); }}
        />
      </div>
      {visible && <Bar isBottom likeCount={likeCount} commentCount={commentCount} />}
    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};

ImageCard.defaultProps = { imgs: [] };

export default ImageCard;
