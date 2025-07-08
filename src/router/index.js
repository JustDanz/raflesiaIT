import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/index.vue';
import AcademyPage from '../views/academypage.vue';
import AboutUsPage from '../views/aboutuspage.vue';
import LoginPage from '../views/loginpage.vue';
import RegisterPage from '../views/registerpage.vue';
import CoursesPage from '../views/coursespage.vue';
import CourseDetailPage from '../views/coursedetailpage.vue';
import BlogPage from '../views/blogpage.vue';
import EventsPage from '../views/eventspage.vue';
import EventDetailPage from '../views/eventsdetailpage.vue';
import AdminDashboard from '../layouts/admin/admindashboard.vue';
import MentorDashboard from '../layouts/mentor/mentordashboard.vue';
import UserDashboard from '../layouts/user/userdashboard.vue';
import CourseInformation from '../layouts/Course/CourseInformation.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/academy',
    name: 'Academy',
    component: AcademyPage,
    meta: { title: 'Academy - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUsPage,
    meta: { title: 'About Us - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { title: 'Login - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { title: 'Register - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesPage,
    meta: { title: 'Courses - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetailPage,
    meta: { title: 'Course Detail - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
    meta: { title: 'Blog - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/events',
    name: 'Events',
    component: EventsPage,
    meta: { title: 'Events - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetailPage,
    meta: { title: 'Event Detail - RaflesiaIT', layout: 'default' },
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'Admin Dashboard - RaflesiaIT', layout: 'admin' },
  },
  {
    path: '/mentor-dashboard',
    name: 'MentorDashboard',
    component: MentorDashboard,
    meta: { title: 'Mentor Dashboard - RaflesiaIT', layout: 'mentor' },
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { title: 'User Dashboard - RaflesiaIT', layout: 'user' },
  },
 {
  path: '/course-info/:id?',
  name: 'CourseInformation',
  component: CourseInformation,
  props: true,
  meta: { title: 'Course Information - RaflesiaIT', layout: 'user' },
},
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 - Page Not Found - RaflesiaIT', layout: 'default' },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'RaflesiaIT';
  next();
});

router.onError((error) => {
  console.error('Router error:', error);
  window.location.reload();
});

export default router;
