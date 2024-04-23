import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';

function Dashboard() {
  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setProfile(data));
    }
  }, [isSuccess]);

  return <div>asd asdasd</div>;
}

export default Dashboard;
