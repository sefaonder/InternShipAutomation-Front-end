import { Outlet, useLocation } from 'react-router-dom';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const location = useLocation();
  const checkCompany = location.pathname.split('/')[1] === 'company';
  return (
    <div className="w-full  flex justify-center items-center">
      {!checkCompany ? (
        <div
          className="absolute flex items-center justify-center inset-0 bg-cover bg-no-repeat bg-center opacity-80"
          style={{ backgroundImage: "url('/public/images/uludagPhoto.jpg')" }}
        >
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default MinimalLayout;
