import { useLocation, Navigate, Outlet } from "react-router-dom";
import { store } from "../../store/store";

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const user = store.getState().auth.user;
  //console.log(allowedRole === user.role);

  return allowedRole === user?.role ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default RequireAuth;
