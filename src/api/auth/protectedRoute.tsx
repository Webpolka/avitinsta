// export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
//   const { user, loading } = useUser();

//   if (loading) return null; // или спиннер
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// };
