import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';

function Dashboard() {
  const location = useLocation();
  const { data, isLoading, isSuccess, isError, error, refetch } = useGetProfileQuery();
  const { t } = useTranslation();

  return (
    <div>
      {' '}
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
    </div>
  );
}

export default Dashboard;
