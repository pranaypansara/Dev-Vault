import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const { isAdmin, adminToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/signin');
      return;
    }
    loadCourses();
  }, [adminToken, navigate]);

  const loadCourses = async () => {
    try {
      const { data } = await adminApi.getMyCourses();
      setCourses(data.allCourses || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', price: '', imageUrl: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await adminApi.updateCourse({
          ...form,
          price: Number(form.price) || 0,
          courseId: editing._id,
        });
      } else {
        await adminApi.createCourse({
          ...form,
          price: Number(form.price) || 0,
        });
      }
      resetForm();
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  };

  const startEdit = (course) => {
    setEditing(course);
    setForm({
      title: course.title || '',
      description: course.description || '',
      price: String(course.price ?? ''),
      imageUrl: course.imageUrl || '',
    });
    setShowForm(true);
  };

  if (!isAdmin) return null;

  return (
    <div>
      <div className="admin-header">
        <h1 className="page-title">My Courses</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>
      {error && <div className="form-error">{error}</div>}

      {showForm && (
        <div className="form-card" style={{ marginBottom: '2rem' }}>
          <h2>{editing ? 'Edit Course' : 'New Course'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editing ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <div className="course-grid">
          {courses.length === 0 ? (
            <p className="empty-state">No courses yet. Create one above.</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="course-card admin-card">
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
                  <span className="course-price">${course.price ?? 0}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => startEdit(course)}>
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
