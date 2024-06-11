import { useEffect, useRef, useState } from 'react';

import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import hooks from '~/hooks';
import Button from '~/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(styles);
const Login = () => {
  const { setAuth } = hooks.useAuth();
  const ROLES = config.constants.ROLES;

  const navigate = useNavigate();

  const errRef = useRef();
  const userRef = useRef();

  const [user, resetUser, userAttribs] = hooks.useInput('user', '');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = hooks.useToggle('persist', false);
  const { login } = hooks.useUserApiCalls();

  const navigateAfterLogin = (from, navigate) => navigate(from, { replace: true });

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: user,
      password: pwd,
    };
    const data = await login(formData);
    if (data?.status !== 200) {
      toast.error(data.message);
    }

    const accessToken = data?.result?.accessToken;
    const refreshToken = data?.result?.refreshToken;

    setAuth({ accessToken, refreshToken });

    const role = accessToken ? jwtDecode(accessToken).role : undefined;

    if (check) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    } else {
      localStorage.removeItem('refreshToken');
    }

    resetUser('');
    setPwd('');

    switch (Number(role)) {
      case ROLES.admin:
        navigateAfterLogin(config.routes.productManager, navigate);
        break;
      case ROLES.user:
        navigateAfterLogin(config.routes.productList, navigate);
        break;
    }
  };

  return (
    <section className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Đăng Nhập</h1>
      <form onSubmit={handleSubmit} className={cx('form')}>
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

        <label htmlFor="password">Mật khẩu:</label>
        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
        <Button className={cx('login-btn')}>Đăng nhập</Button>
        <div className={cx('persistCheck')}>
          <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
          <label htmlFor="persist">Lưu thông tin</label>
        </div>
      </form>
      <p className={cx('need-account')}>
        Cần một tài khoản?
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to={config.routes.register}>Đăng kí</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
