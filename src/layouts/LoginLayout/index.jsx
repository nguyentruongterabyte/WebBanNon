import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from './Header';
import styles from './LoginLayout.module.scss';

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoginLayout;
