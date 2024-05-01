import { useSelector } from 'react-redux';
import { permissionControll } from 'src/app/permissions/permissionController';

const usePermission = () => {
  const userRoles = useSelector((state) => state.auth);

  const checkPermission = (requiredRoles) => {
    // Kullanıcının rollerini kontrol et ve gerekli rollerle eşleşip eşleşmediğini kontrol et
    return permissionControll(userRoles?.roles, requiredRoles);
  };

  return checkPermission;
};

export default usePermission;
