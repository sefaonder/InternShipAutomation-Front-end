import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileMutation } from 'src/store/services/profile/ProfileApiSlice';
import { setProfile } from 'src/store/services/profile/ProfileSlice';

function Dashboard() {
  const [getProfile, { isLoading }] = useGetProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getProfile();
        if (response.error) {
          throw new Error(response.error.message);
        }

        const userData = response.data; // Assuming data is stored in response.data
        if (userData) {
          dispatch(setProfile(userData));
        } else {
          console.log('User data is null or undefined.');
        }
      } catch (err) {
        console.log('Error occurred while fetching user data:', err);
      }
    };
    getUser();
  }, [getProfile, dispatch]);

  return <div>asd asdasd</div>;
}

export default Dashboard;
