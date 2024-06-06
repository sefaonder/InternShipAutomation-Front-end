import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import usePermission from 'src/hooks/usePermission';

export default function ThemeRoutes() {
  const checkPermission = usePermission();

  const routeChilds = MainRoutes.children.map((route) => {
    if (route.role) {
      route = checkPermission(route.role) ? route : [];
    } else if (route.children) {
      route.children = route.children.filter((url) => checkPermission(url.role));
    }
    return route;
  });

  MainRoutes.children = routeChilds;

  return useRoutes([MainRoutes, AuthRoutes]);
}
