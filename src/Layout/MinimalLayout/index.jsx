import { Outlet } from 'react-router-dom';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <div className="w-full h-screen  flex justify-center items-center">
    <Outlet />
  </div>
);

export default MinimalLayout;
