import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import SideBar from '~/components/SideBar';
import Header from '~/components/Header';
import styles from './HasSideBarLayout.module.scss';

const cx = classNames.bind(styles);
function HasSideBarLayout({ children, headerSearch }) {
  return (
    <div className={cx('wrapper')}>
      <Header className={cx('header')} headerSearch={headerSearch} />
      <div className={cx('container')}>
        <SideBar className={cx('sidebar')}>
          <div className={cx('content')}>{children}</div>
        </SideBar>
      </div>
    </div>
  );
}

HasSideBarLayout.propTypes = {
  children: PropTypes.node.isRequired,
  headerSearch: PropTypes.any,
};

export default HasSideBarLayout;
