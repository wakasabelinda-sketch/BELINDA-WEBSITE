import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ServicesPage = lazy(() => import('../pages/services/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const ArticlesPage = lazy(() => import('../pages/articles/page'));
const ArticleDetailPage = lazy(() => import('../pages/articles/detail/page'));
const TemplatesPage = lazy(() => import('../pages/templates/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/articles',
    element: <ArticlesPage />,
  },
  {
    path: '/articles/:slug',
    element: <ArticleDetailPage />,
  },
  {
    path: '/templates',
    element: <TemplatesPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
