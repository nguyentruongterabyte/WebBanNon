import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import icons from '~/assets/icons';
import config from '~/config';
import styles from '~/pages/Login/Login.module.scss';
import Button from '~/components/Button';
import hooks from '~/hooks';
import userApiCalls from '~/networking/userApiCalls';

const cx = classNames.bind(styles);

const PWD_REGEX = config.constants.PWD_REGEX;
const EMAIL_REGEX = config.constants.EMAIL_REGEX;

function Register() {
  const errRef = useRef();
  const userRef = useRef();

  const [email, resetEmail, emailAttrbs] = hooks.useInput('user', '');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState('');
  const [mobile, setMobile] = useState('');

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const from = config.routes.login;
  const navigate = useNavigate();
  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v2 || !v3) {
      setErrMsg('Đầu vào không hợp lệ!');
      return;
    }

    const formData = {
      username: user,
      password: pwd,
      email,
      mobile,
    };

    const data = await userApiCalls.register(formData);
    if (data.status === 200) {
      toast.success(data.message);
      setSuccess(true);
      resetEmail('');
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={config.routes.login}>Đăng nhập</Link>
          </p>
        </section>
      ) : (
        <section className={cx('wrapper')}>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Đăng ký</h1>
          <form onSubmit={handleSubmit} className={cx('form')}>
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon icon={icons.faCheck} className={validEmail ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={icons.faTimes} className={validEmail || !email ? 'hide' : 'invalid'} />
            </label>
            <input
              type="email"
              id="email"
              value={email}
              ref={userRef}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              {...emailAttrbs}
            />
            <p id="emailnote" className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              Địa chỉ email phải có định dạng hợp lệ.
              <br />
              Ví dụ: example@email.com
            </p>

            <label htmlFor="username">Tên người dùng:</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              id="username"
              autoComplete="off"
              spellCheck="false"
              required
              aria-describedby="uidnote"
            />

            <label htmlFor="mobile">Số điện thoại</label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="tel"
              id="mobile"
              pattern="[0-9]{10}"
              autoComplete="off"
              spellCheck="false"
              required
              aria-describedby="uidnote"
            />
            <label htmlFor="password">
              Mật khẩu:
              <FontAwesomeIcon icon={icons.faCheck} className={validPwd ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={icons.faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              8 đến 24 ký tự. <br />
              Phải bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt. <br />
              Cho phép ký tự đặc biệt: <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm-pwd">
              Xác nhận mật khẩu:
              <FontAwesomeIcon icon={icons.faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={icons.faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
            </label>
            <input
              type="password"
              id="confirm-pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              Phải khớp với trường nhập mật khẩu đầu tiên.
            </p>
            <Button className={cx('login-btn')} disabled={!validEmail || !validPwd || !validMatch}>
              Đăng ký
            </Button>
          </form>
          <p className={cx('need-account')}>
            Đã có tài khoản?
            <br />
            <span className="line">
              <Link to={config.routes.login}>Đăng nhập</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
