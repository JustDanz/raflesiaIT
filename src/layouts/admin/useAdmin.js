import { ref } from 'vue';
import axios from 'axios';

export function useAdmin() {
  // State management
  const isLoading = ref(false);
  const errors = ref([]);
  const dashboardMessage = ref('Welcome back, Admin! Ready to manage your platform today?');
  const stats = ref([
    { title: 'Total Courses', value: 0, icon: 'fas fa-book', trend: '↑ 12%' },
    { title: 'Active Users', value: 0, icon: 'fas fa-users', trend: '↑ 5%' },
    { title: 'New Posts', value: 0, icon: 'fas fa-blog', trend: '↑ 3%' },
    { title: 'Upcoming Events', value: 0, icon: 'fas fa-calendar-alt', trend: '↑ 8%' },
  ]);

  // Data stores
  const dataCache = ref({
    users: [],
    blogs: [],
    courses: [],
    instructors: [],
    events: [],
  });

  // Form states
  const newUser = ref({ username: '', email: '', password: '', role: 'user' });
  const editingUser = ref(null);

  const newBlog = ref({ title: '', content: '', image: null });
  const editingBlog = ref(null);

  const newCourse = ref({
    title: '', price: 0, level: 'Beginner', instructor_id: '', description: '',
    syllabus: [{ title: '', description: '', video_url: '', duration: '', order: 0 }],
    thumbnail: null
  });
  const editingCourse = ref(null);
  const previewImage = ref(null);

  const newInstructor = ref({ name: '', expertise: '', photo: null });
  const editingInstructor = ref(null);
  const instructorPreviewImage = ref(null);
  const editInstructorPreviewImage = ref(null);

  const newEvent = ref({ title: '', event_datetime: '', location: '', description: '' });
  const editingEvent = ref(null);

  // Fetch data with retry logic
  const fetchData = async (endpoint, state, retries = 3, delay = 1000) => {
    try {
      const response = await axios.get(`/api/${endpoint}`);
      state.value = response.data;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchData(endpoint, state, retries - 1, delay * 2);
      }
      errors.value.push(`Failed to fetch ${endpoint} after retries: ${error.message}`);
    }
  };

  // Initialize all data
  const initializeData = async () => {
    isLoading.value = true;
    errors.value = [];
    await Promise.all([
      fetchData('users', dataCache.value.users),
      fetchData('blogs', dataCache.value.blogs),
      fetchData('courses', dataCache.value.courses),
      fetchData('instructors', dataCache.value.instructors),
      fetchData('events', dataCache.value.events),
    ]);
    stats.value[0].value = dataCache.value.courses.length;
    stats.value[1].value = dataCache.value.users.length;
    stats.value[2].value = dataCache.value.blogs.length;
    stats.value[3].value = dataCache.value.events.length;
    isLoading.value = false;
  };

  // File upload handler
  const handleFileUpload = (event, target, isEditing = false) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (target === 'blog') {
        if (isEditing) {
          editingBlog.value.newImage = file;
        } else {
          newBlog.value.image = file;
        }
      } else if (target === 'course') {
        if (isEditing) {
          editingCourse.value.thumbnail = file;
          editingCourse.value.thumbnailPreview = e.target.result;
        } else {
          newCourse.value.thumbnail = file;
          previewImage.value = e.target.result;
        }
      } else if (target === 'instructor') {
        if (isEditing) {
          editingInstructor.value.photo = file;
          editInstructorPreviewImage.value = e.target.result;
        } else {
          newInstructor.value.photo = file;
          instructorPreviewImage.value = e.target.result;
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // YouTube URL handling for courses
  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYoutubeEmbedUrl = (url) => {
    const videoId = extractYoutubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  // User Management Functions
  const addUser = async () => {
    try {
      const response = await axios.post('/api/users', newUser.value);
      dataCache.value.users.push(response.data);
      newUser.value = { username: '', email: '', password: '', role: 'user' };
      errors.value = [];
      stats.value[1].value = dataCache.value.users.length;
    } catch (error) {
      errors.value.push(`Failed to add user: ${error.message}`);
    }
  };

  const startEditingUser = (user) => {
    editingUser.value = { ...user, password: '' };
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(`/api/users/${editingUser.value.user_id}`, editingUser.value);
      const index = dataCache.value.users.findIndex(u => u.user_id === editingUser.value.user_id);
      dataCache.value.users[index] = response.data;
      editingUser.value = null;
      errors.value = [];
    } catch (error) {
      errors.value.push(`Failed to update user: ${error.message}`);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        dataCache.value.users = dataCache.value.users.filter(u => u.user_id !== id);
        errors.value = [];
        stats.value[1].value = dataCache.value.users.length;
      } catch (error) {
        errors.value.push(`Failed to delete user: ${error.message}`);
      }
    }
  };

  // Blog Management Functions
  const addBlog = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newBlog.value.title);
      formData.append('content', newBlog.value.content);
      if (newBlog.value.image) {
        formData.append('image', newBlog.value.image);
      }
      const response = await axios.post('/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dataCache.value.blogs.push(response.data);
      newBlog.value = { title: '', content: '', image: null };
      errors.value = [];
      stats.value[2].value = dataCache.value.blogs.length;
    } catch (error) {
      errors.value.push(`Failed to add blog: ${error.message}`);
    }
  };

  const startEditingBlog = (blog) => {
    editingBlog.value = { ...blog, newImage: null };
  };

  const updateBlog = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editingBlog.value.title);
      formData.append('content', editingBlog.value.content);
      if (editingBlog.value.newImage) {
        formData.append('image', editingBlog.value.newImage);
      }
      formData.append('_method', 'PUT');
      const response = await axios.post(`/api/blogs/${editingBlog.value.blog_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const index = dataCache.value.blogs.findIndex(b => b.blog_id === editingBlog.value.blog_id);
      dataCache.value.blogs[index] = response.data;
      editingBlog.value = null;
      errors.value = [];
    } catch (error) {
      errors.value.push(`Failed to update blog: ${error.message}`);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        dataCache.value.blogs = dataCache.value.blogs.filter(b => b.blog_id !== id);
        errors.value = [];
        stats.value[2].value = dataCache.value.blogs.length;
      } catch (error) {
        errors.value.push(`Failed to delete blog: ${error.message}`);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', { dateStyle: 'medium' });
  };

  // Course Management Functions
  const addCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCourse.value.title);
      formData.append('price', newCourse.value.price);
      formData.append('level', newCourse.value.level);
      formData.append('instructor_id', newCourse.value.instructor_id);
      formData.append('description', newCourse.value.description);
      formData.append('syllabus', JSON.stringify(newCourse.value.syllabus));
      if (newCourse.value.thumbnail) {
        formData.append('thumbnail', newCourse.value.thumbnail);
      }
      const response = await axios.post('/api/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dataCache.value.courses.push(response.data);
      resetNewCourseForm();
      errors.value = [];
      stats.value[0].value = dataCache.value.courses.length;
    } catch (error) {
      errors.value.push(`Failed to add course: ${error.message}`);
    }
  };

  const resetNewCourseForm = () => {
    newCourse.value = {
      title: '', price: 0, level: 'Beginner', instructor_id: '', description: '',
      syllabus: [{ title: '', description: '', video_url: '', duration: '', order: 0 }],
      thumbnail: null
    };
    previewImage.value = null;
  };

  const startEditingCourse = (course) => {
    editingCourse.value = {
      ...course,
      syllabus: course.syllabus ? JSON.parse(course.syllabus) : [{ title: '', description: '', video_url: '', duration: '', order: 0 }],
      thumbnailPreview: course.thumbnail_url || null
    };
  };

  const updateCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editingCourse.value.title);
      formData.append('price', editingCourse.value.price);
      formData.append('level', editingCourse.value.level);
      formData.append('instructor_id', editingCourse.value.instructor_id);
      formData.append('description', editingCourse.value.description);
      formData.append('syllabus', JSON.stringify(editingCourse.value.syllabus));
      formData.append('_method', 'PUT');
      if (editingCourse.value.thumbnail) {
        formData.append('thumbnail', editingCourse.value.thumbnail);
      }
      const response = await axios.post(`/api/courses/${editingCourse.value.course_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const index = dataCache.value.courses.findIndex(c => c.course_id === editingCourse.value.course_id);
      dataCache.value.courses[index] = response.data;
      editingCourse.value = null;
      errors.value = [];
    } catch (error) {
      errors.value.push(`Failed to update course: ${error.message}`);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/courses/${id}`);
        dataCache.value.courses = dataCache.value.courses.filter(c => c.course_id !== id);
        errors.value = [];
        stats.value[0].value = dataCache.value.courses.length;
      } catch (error) {
        errors.value.push(`Failed to delete course: ${error.message}`);
      }
    }
  };

  const addSyllabusItem = () => {
    newCourse.value.syllabus.push({
      title: '', description: '', video_url: '', duration: '', order: newCourse.value.syllabus.length
    });
  };

  const removeSyllabusItem = (index) => {
    newCourse.value.syllabus.splice(index, 1);
    newCourse.value.syllabus.forEach((item, idx) => { item.order = idx; });
  };

  const addEditSyllabusItem = () => {
    editingCourse.value.syllabus.push({
      title: '', description: '', video_url: '', duration: '', order: editingCourse.value.syllabus.length
    });
  };

  const removeEditSyllabusItem = (index) => {
    editingCourse.value.syllabus.splice(index, 1);
    editingCourse.value.syllabus.forEach((item, idx) => { item.order = idx; });
  };

  // Instructor Management Functions
  const addInstructor = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newInstructor.value.name);
      formData.append('expertise', newInstructor.value.expertise);
      if (newInstructor.value.photo) {
        formData.append('photo', newInstructor.value.photo);
      }
      const response = await axios.post('/api/instructors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dataCache.value.instructors.push(response.data);
      resetNewInstructorForm();
      errors.value = [];
    } catch (error) {
      errors.value.push(`Failed to add instructor: ${error.message}`);
    }
  };

  const resetNewInstructorForm = () => {
    newInstructor.value = { name: '', expertise: '', photo: null };
    instructorPreviewImage.value = null;
  };

  const startEditingInstructor = (instructor) => {
    editingInstructor.value = { ...instructor, photo: null };
    editInstructorPreviewImage.value = instructor.photo_url || null;
  };

  const updateInstructor = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editingInstructor.value.name);
      formData.append('expertise', editingInstructor.value.expertise);
      formData.append('_method', 'PUT');
      if (editingInstructor.value.photo) {
        formData.append('photo', editingInstructor.value.photo);
      }
      const response = await axios.post(`/api/instructors/${editingInstructor.value.instructors_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const index = dataCache.value.instructors.findIndex(i => i.instructors_id === editingInstructor.value.instructors_id);
      dataCache.value.instructors[index] = response.data;
      editingInstructor.value = null;
      editInstructorPreviewImage.value = null;
      errors.value = [];
    } catch (error) {
      errors.value.push(`Failed to update instructor: ${error.message}`);
    }
  };

  const deleteInstructor = async (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await axios.delete(`/api/instructors/${id}`);
        dataCache.value.instructors = dataCache.value.instructors.filter(i => i.instructors_id !== id);
        errors.value = [];
      } catch (error) {
        errors.value.push(`Failed to delete instructor: ${error.message}`);
      }
    }
  };

  // Event Management Functions
  const addEvent = async () => {
    try {
      const response = await axios.post('/api/events', newEvent.value);
      dataCache.value.events.push(response.data);
      newEvent.value = { title: '', event_datetime: '', location: '', description: '' };
      errors.value = [];
      stats.value[3].value = dataCache.value.events.length;
    } catch (error) {
      errors.value.push(`Failed to add event: ${error.message}`);
    }
  };

  const startEditingEvent = (event) => {
    editingEvent.value = { ...event, event_datetime: event.event_datetime.slice(0, 16) };
  };

  const updateEvent = async () => {
    try {
      const response = await axios.put(`/api/events/${editingEvent.value.event_id}`, editingEvent.value);
      const index = dataCache.value.events.findIndex(e => e.event_id === editingEvent.value.event_id);
      dataCache.value.events[index] = response.data;
      editingEvent.value = null;
      errors.value = [];
    } catch (error) {
      errors.value.push(`Failed to update event: ${error.message}`);
    }
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${id}`);
        dataCache.value.events = dataCache.value.events.filter(e => e.event_id !== id);
        errors.value = [];
        stats.value[3].value = dataCache.value.events.length;
      } catch (error) {
        errors.value.push(`Failed to delete event: ${error.message}`);
      }
    }
  };

  // Utility function for section title
  const getPageTitle = (section) => {
    const titles = {
      dashboard: 'Admin Dashboard',
      users: 'User Management',
      blogs: 'Blog Management',
      courses: 'Course Management',
      instructors: 'Instructor Management',
      events: 'Event Management'
    };
    return titles[section] || 'Admin Dashboard';
  };

  return {
    isLoading,
    errors,
    dashboardMessage,
    stats,
    dataCache,
    newUser,
    editingUser,
    newBlog,
    editingBlog,
    newCourse,
    editingCourse,
    previewImage,
    newInstructor,
    editingInstructor,
    instructorPreviewImage,
    editInstructorPreviewImage,
    newEvent,
    editingEvent,
    initializeData,
    handleFileUpload,
    getYoutubeEmbedUrl,
    addUser,
    startEditingUser,
    updateUser,
    deleteUser,
    addBlog,
    startEditingBlog,
    updateBlog,
    deleteBlog,
    formatDate,
    addCourse,
    resetNewCourseForm,
    startEditingCourse,
    updateCourse,
    deleteCourse,
    addSyllabusItem,
    removeSyllabusItem,
    addEditSyllabusItem,
    removeEditSyllabusItem,
    addInstructor,
    resetNewInstructorForm,
    startEditingInstructor,
    updateInstructor,
    deleteInstructor,
    addEvent,
    startEditingEvent,
    updateEvent,
    deleteEvent,
    getPageTitle
  };
}