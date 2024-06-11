import axios from '~/utils/axios';
import useAuth from './useAuth';
import { api } from '~/config/constants';
// used for refresh token generation
function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refreshToken = auth?.refreshToken || JSON.parse(localStorage.getItem('refreshToken'));

  const refresh = async () => {
    const urlEncodedData = 'refreshToken=' + encodeURIComponent(refreshToken);
    // console.log(urlEncodedData);
    const response = await axios.post(api.user.refreshToken, urlEncodedData, {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }); 
    const accessToken = response?.data?.result;
    console.log(accessToken);
    const role = response?.data?.role;
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.object);
      return { ...prev, accessToken, role };
    });
    return response.data;
  };

  return refresh;
}

export default useRefreshToken;
