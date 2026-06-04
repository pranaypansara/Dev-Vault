import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import UserSignup from './pages/UserSignup';
import UserSignin from './pages/UserSignin';
import AdminSignup from './pages/AdminSignup';
import AdminSignin from './pages/AdminSignin';
import CourseCatalog from './pages/CourseCatalog';
import UserPurchases from './pages/UserPurchases';
import AdminCourses from './pages/AdminCourses';
import './App.css';

function AppLayout() {
  const { isUser, isAdmin, logout } = useAuth();

  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="app-logo">CourseHub</Link>
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          {isUser && <Link to="/user/purchases">My Purchases</Link>}
          {isAdmin && <Link to="/admin/courses">My Courses</Link>}
          {!isUser && !isAdmin && (
            <>
              <Link to="/user/signin">Sign In</Link>
              <Link to="/user/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
          {(isUser || isAdmin) && (
            <button className="btn btn-ghost" onClick={logout}>Logout</button>
          )}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/user/purchases" element={<UserPurchases />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
