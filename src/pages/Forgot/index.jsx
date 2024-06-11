import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import config from '~/config';
import hooks from '~/hooks';
import styles from '~/pages/Login/Login.module.scss';

const cx = classNames.bind(styles);

const Forgot = () => {
  const userRef = useRef();
  const [user, resetUser, userAttribs] = hooks.useInput('user', '');
  const { forgot } = hooks.useUserApiCalls();
  const navigate = useNavigate();
  const sendEmail = async () => {
    const data = await forgot(user);
    return data;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const ok = window.confirm('Chúng tôi sẽ gửi email xác thực cho bạn. Bạn đồng ý không?');
    if (ok) {
      const data = await toast.promise(sendEmail(), {
        pending: `Đang gửi email đến ${user}`,
      });

      if (data.status === 200) {
        toast.success(data.message);
        resetUser('');
        navigate(config.routes.login, { replace: true });
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <section className={cx('wrapper')}>
      <h1>Quên mật khẩu</h1>
      <form onSubmit={handleVerify} className={cx('form')}>
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="username"
          ref={userRef}
          spellCheck="false"
          autoComplete="off"
          {...userAttribs}
          required
        />

        <Button className={cx('login-btn')}>Xác thực</Button>
      </form>
    </section>
  );
};

export default Forgot;
