import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/checkAuth";

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useAuth();
  if(loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-500 border-t-transparent mx-auto" />
          <p className="mt-4 text-zinc-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );

  }
  

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;