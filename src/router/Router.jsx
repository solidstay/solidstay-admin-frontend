import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';
import AuthenticatedRedirect from '../components/AuthenticatedRedirect/AuthenticatedRedirect.jsx';
import routes from './RouteConfig.jsx';
import SidebarLayout from '../components/SidebarLayout/SidebarLayout.jsx';

const Router = () => {
  return (
    <Routes>
    {routes.map((route, index) => {
      let element = route.element;

      // Wrap unprotected + sidebar=true routes with SidebarLayout
      if (!route.protected && route.showSidebar) {
        element = <SidebarLayout>{element}</SidebarLayout>;
      }

      return (
        <Route
          key={index}
          path={route.path}
          element={
            route.protected
              ? <ProtectedRoute showSidebar={route.showSidebar}>{route.element}</ProtectedRoute>
              : route.authRedirect
                ? <AuthenticatedRedirect>{route.element}</AuthenticatedRedirect>
                : element
          }
        />
      );
    })}
  </Routes>



    // <Routes>
    //   {routes.map((route, index) => (
    //     <Route
    //       key={index}
    //       path={route.path}
    //       element={
    //         route.protected ?
    //           <ProtectedRoute showSidebar={route.showSidebar}>{route.element}</ProtectedRoute>
    //           : route.authRedirect ?
    //             <AuthenticatedRedirect>
    //               {route.element}
    //             </AuthenticatedRedirect>
    //             :
    //             route.element
    //       }
    //     />
    //   ))}
    // </Routes>
  );
};

export default Router;
