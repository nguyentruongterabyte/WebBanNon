import useAuth from './useAuth';

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  };
  return logout;
}

export default useLogout;
