import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchasing, setPurchasing] = useState(null);
  const { isUser } = useAuth();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await userApi.getCoursePreview();
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (courseId) => {
    if (!isUser) {
      return;
    }
    setPurchasing(courseId);
    try {
      await userApi.purchaseCourse(courseId);
      setPurchasing(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Purchase failed');
      setPurchasing(null);
    }
  };

  if (loading) return <div className="loading-state">Loading courses...</div>;
  if (error) return <div className="form-error">{error}</div>;

  return (
    <div>
      <h1 className="page-title">Course Catalog</h1>
      {!isUser && (
        <p className="catalog-hint">
          <Link to="/user/signin">Sign in</Link> to purchase courses.
        </p>
      )}
      <div className="course-grid">
        {courses.length === 0 ? (
          <p className="empty-state">No courses yet. Check back soon!</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-image">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} />
                ) : (
                  <div className="course-placeholder">📚</div>
                )}
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="course-footer">
                  <span className="course-price">${course.price ?? 0}</span>
                  {isUser ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePurchase(course._id)}
                      disabled={purchasing === course._id}
                    >
                      {purchasing === course._id ? 'Purchasing...' : 'Purchase'}
                    </button>
                  ) : (
                    <Link to="/user/signin" className="btn btn-ghost btn-sm">Sign in to buy</Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {isUser && (
        <div className="catalog-link">
          <Link to="/user/purchases">View My Purchases →</Link>
        </div>
      )}
    </div>
  );
}
