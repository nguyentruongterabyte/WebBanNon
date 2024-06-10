import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx('menu-item', {
    separate: data.separate,
  });

  return (
    <Button className={classes} to={data.to} leftIcon={data.icon} onClick={onClick}>
      {data.title}
    </Button>
  );
}


MenuItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    icon: PropTypes.element,
    separate: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default MenuItem;
