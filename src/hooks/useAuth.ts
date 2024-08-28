import { useState } from 'react';
import useAuth from 'src/zustand/auth';

const AuthHook = () => {
  const { setToken, token } = useAuth((state) => state);
  const [userProfile, setUserProfile] = useState<any>(null);

  const setTokenAuth = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const getTokenAuth = () => {
    if (typeof window !== 'undefined') {
      const _token = localStorage.getItem('token') || token;
      return _token;
    }
  };

  const setUser = (user: any) => {
    setUserProfile(user);
    localStorage.setItem('userProfile', JSON.stringify(user));
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const _user = localStorage.getItem('userProfile') || userProfile;
      return JSON.parse(_user);
    }
  };

  return { setTokenAuth, getTokenAuth, setUser, getUser };
};

export default AuthHook;
