import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <h1 className="landing-title">Learn Without Limits</h1>
        <p className="landing-subtitle">
          Discover courses crafted by experts. Expand your skills and grow your career.
        </p>
        <div className="landing-actions">
          <Link to="/courses" className="btn btn-primary btn-lg">
            Browse Courses
          </Link>
          <Link to="/user/signin" className="btn btn-ghost btn-lg">
            Sign In
          </Link>
        </div>
      </div>
      <div className="landing-roles">
        <Link to="/user/signup" className="role-card">
          <span className="role-icon">👤</span>
          <h3>Student</h3>
          <p>Create an account to purchase and access courses</p>
        </Link>
        <Link to="/admin/signup" className="role-card">
          <span className="role-icon">⚙</span>
          <h3>Instructor</h3>
          <p>Create and manage your courses</p>
        </Link>
      </div>
    </div>
  );
}
