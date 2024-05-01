const ROLE_PERMISSIONS = {
  STUDENT: 1,
  COMISSION: 2,
  ADMIN: 3,
};

export const permissionControll = ({ userRole, requiredRole }) => {
  return ROLE_PERMISSIONS[userRole] >= ROLE_PERMISSIONS[requiredRole];
};
