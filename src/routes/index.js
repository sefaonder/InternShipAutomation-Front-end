import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { setProfile } from 'src/store/services/profile/ProfileSlice';
import { useEffect } from 'react';

export default function ThemeRoutes() {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setProfile(user));
    }
  }, [user]);

  return useRoutes([MainRoutes, AuthRoutes]);
}
