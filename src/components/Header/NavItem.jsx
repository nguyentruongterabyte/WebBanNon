import Nav from 'react-bootstrap/Nav';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function NavItem({ data }) {
  return (
    <div className={cx('nav-item', 'hide-on-pc')}>
      <Nav.Link className={cx('nav-link', 'hide-on-pc')} href={data.path}>
        {data.name}
      </Nav.Link>
    </div>
  );
}

NavItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default NavItem;
