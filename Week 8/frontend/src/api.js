import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');
  const token = userToken || adminToken;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// User API
export const userApi = {
  signup: (data) => api.post('/user/signup', data),
  signin: (data) => api.post('/user/signin', data),
  getCoursePreview: () => api.get('/user/course/preview'),
  getPurchasedCourses: () => api.get('/user/course/bulk'),
  purchaseCourse: (courseId) => api.post('/user/purchases', { courseId }),
};

// Admin API (admin signin uses email - backend Admin model has email field)
export const adminApi = {
  signup: (data) => api.post('/admin/signup', data),
  signin: (data) => api.post('/admin/signin', { username: data.email, password: data.password }),
  createCourse: (data) => api.post('/admin/course', data),
  updateCourse: (data) => api.put('/admin/course/update', data),
  getMyCourses: () => api.get('/admin/course/bulk'),
};
