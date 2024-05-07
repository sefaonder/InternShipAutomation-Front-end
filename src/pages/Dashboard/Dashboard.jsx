import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileQuery } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';
function Dashboard() {
  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();
  const res = useSelector((state) => state.survey);
  console.log('+++', res);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data.data) {
      dispatch(setProfile(data));
    }
  }, [isSuccess]);

  return <div></div>;
}

export default Dashboard;
