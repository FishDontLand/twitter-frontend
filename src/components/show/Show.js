import PropTypes from 'prop-types';

/**
 * Used to display/hide other components
 */
const Show = ({
  visible,
  children,
  isMount,
}) => (
  <div style={{ display: visible ? 'block' : 'none' }}>
    {(!isMount || visible) && children}
  </div>
);

Show.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  isMount: PropTypes.bool.isRequired,
};

export default Show;
