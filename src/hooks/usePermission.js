import { useSelector } from 'react-redux';
import { permissionControll } from 'src/app/permissions/permissionController';

const usePermission = () => {
  const userRole = useSelector((state) => state.auth.roles);

  const checkPermission = (requiredRoles) => {
    // Kullanıcının rollerini kontrol et ve gerekli rollerle eşleşip eşleşmediğini kontrol et
    return permissionControll(userRole, requiredRoles);
  };

  return checkPermission;
};

export default usePermission;
