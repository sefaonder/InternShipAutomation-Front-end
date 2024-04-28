import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';

function Dashboard() {
  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setProfile(data));
    }
  }, [isSuccess]);

  return (
    <div>
      {' '}
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
    </div>
  );
}

export default Dashboard;
