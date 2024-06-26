// assets
import { IconBrandChrome, IconHelp, IconDashboard } from '@tabler/icons';
// constant
const icons = { IconBrandChrome, IconHelp, IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },

    {
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/projects',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'blogs',
      title: 'Blogs',
      type: 'item',
      url: '/blogs',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
    ,
    {
      id: 'newsnevents',
      title: 'News & Events',
      type: 'item',
      url: '/newsevents',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default other;
