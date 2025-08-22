// ProtectedRoute.jsx
import { Navigate, Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!storedUser) {
    // User yoxdur → login-ə yönləndir
    return <Navigate to="/auth/login" replace />;
  }

  const user = JSON.parse(storedUser);

  // Role yoxlanışı
  if (user.role !== "super_admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Sizin səlahiyyətiniz yoxdur</h1>
        <p className="mb-6">Sadəcə adminlər giriş edə bilər.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          Ana Səhifəyə Qayıt
        </Link>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
