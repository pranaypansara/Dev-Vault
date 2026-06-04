import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function UserPurchases() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isUser, userToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate('/user/signin');
      return;
    }
    loadData();
  }, [userToken, navigate]);

  const loadData = async () => {
    try {
      const [previewRes, bulkRes] = await Promise.all([
        userApi.getCoursePreview(),
        userApi.getPurchasedCourses(),
      ]);
      const allCourses = previewRes.data.courses || [];
      const purchased = bulkRes.data.purchasedCourses || [];
      setCourses(allCourses);
      setPurchasedCourses(purchased);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const purchasedIds = new Set(purchasedCourses.map((p) => p.courseId?.toString?.() || p.courseId));
  const myCourses = courses.filter((c) => purchasedIds.has(c._id?.toString?.() || c._id));

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!isUser) return null;

  return (
    <div>
      <h1 className="page-title">My Purchases</h1>
      {error && <div className="form-error">{error}</div>}
      <div className="course-grid">
        {myCourses.length === 0 ? (
          <p className="empty-state">
            You haven't purchased any courses yet. <Link to="/courses">Browse courses</Link>
          </p>
        ) : (
          myCourses.map((course) => (
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
                <span className="badge">Purchased</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
