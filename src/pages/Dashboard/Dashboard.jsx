import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'src/store/services/auth/authSlice';

function Dashboard() {
  const user = useSelector(selectCurrentUser);
  console.log('user', user);
  return <div>{user}</div>;
}

export default Dashboard;
