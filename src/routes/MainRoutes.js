import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from 'guards/PrivateRoute';

import Projects from 'views/pages/projects/Projects';
import AddProject from 'views/pages/projects/AddProject';
import { element } from 'prop-types';
import ProjectDetailed from 'views/pages/projects/ProjectDetailed';
import Blogs from 'views/pages/blogs/Blogs';
import AddBlog from 'views/pages/blogs/AddBlog';
import BlogDetailed from 'views/pages/blogs/BlogDetailed';
import NewsEvents from 'views/pages/newsevents/NewsEvents';
import NewsEventsList from 'views/pages/newsevents/NewsEventsList';
import AddNewEvents from 'views/pages/newsevents/AddNewsEvents';
import EditProject from 'views/pages/projects/EditProject';
import EditBlog from 'views/pages/blogs/EditBlog';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: 'dashboard',
      element: (
        <PrivateRoute>
          <DashboardDefault />
        </PrivateRoute>
      )
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
      // children: [
      //   {
      //     path: '',

      //   }
      // ]
    },
    {
      path: 'projects',
      element: <Projects />
    },
    {
      path: 'projects/addproject',
      element: <AddProject />
    },
    {
      path: 'projects/detailed/:id',
      element: <ProjectDetailed />
    },
    {
      path: 'projects/edit/:id',
      element: <EditProject />
    },
    {
      path: 'blogs',
      element: <Blogs />
    },

    {
      path: 'blogs/addblog',
      element: <AddBlog />
    },
    {
      path: 'blogs/edit/:id',
      element: <EditBlog />
    },
    {
      path: 'newsevents',
      element: <NewsEvents />
    },

    {
      path: 'newsevents/addnewsevents',
      element: <AddNewEvents />
    },
    {
      path: 'blogs/detailed/:id',
      element: <BlogDetailed />
    },

    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
