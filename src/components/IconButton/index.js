import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
/**
*
*/
const IconButton = ({
  src,
  className,
  svgClassName,
}) => (
  <div className={className}>
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        if (!svgClassName) return;
        svg.childNodes.forEach((item) => {
          if (item.tagName === 'path') {
            item.classList.add(svgClassName);
          }
        });
      }}
    />
  </div>
);

IconButton.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  svgClassName: PropTypes.string.isRequired,
};

export default IconButton;
