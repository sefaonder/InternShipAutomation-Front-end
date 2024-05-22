import { Outlet } from 'react-router-dom';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <div className="w-full h-screen  flex justify-center items-center">
    <div
      className="absolute flex items-center justify-center inset-0 bg-cover bg-no-repeat bg-center opacity-80"
      style={{ backgroundImage: "url('/public/images/uludagPhoto.jpg')" }}
    >
      <Outlet />
    </div>
  </div>
);

export default MinimalLayout;
