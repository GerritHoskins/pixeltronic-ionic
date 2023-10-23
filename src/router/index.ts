import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { Preferences } from '@capacitor/preferences';
import { useProjectsStore } from '@/stores/projects';

const isAuthenticated = async () => !!(await Preferences.get({ key: 'jwt' })).value;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/project-list',
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/project-list',
      },
      {
        path: '/login-register',
        name: 'LoginRegister',
        component: () => import('@/views/LoginRegisterView.vue'),
        meta: { requiresUnauth: true },
      },
      {
        path: '/project-list',
        name: 'ProjectsListView',
        component: () => import('@/views/project/ListView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/add-project',
        name: 'AddProject',
        component: () => import('@/views/project/CreateView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/project/:projectId',
        name: 'ProjectDetailView',
        component: () => import('@/views/project/DetailView.vue'),
        meta: { requiresAuth: true },
        props: route => ({ projectId: Number(route.params.projectId) }), // Convert projectId to a number
        children: [],
      },
      {
        path: '/project/:projectId/milestones',
        name: 'Milestones',
        component: () => import('@/views/MilestoneManagementView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/project/:projectId/comments',
        name: 'Comments',
        component: () => import('@/components/CommentAccordion.vue'),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: '/material-management',
        name: 'MaterialManagement',
        component: () => import('@/views/MaterialManagementView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/community-showcase',
        name: 'CommunityShowCase',
        component: () => import('@/views/CommunityShowcaseView.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/progress-tracking',
        name: 'ProgressTracking',
        component: () => import('@/views/ProgressTrackingView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useProjectsStore();
  if (!store.initialized) {
    await store.initialize();
  }

  const authenticated = await isAuthenticated();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authenticated) {
      next('/login-register');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresUnauth)) {
    if (authenticated) {
      next('/project-list');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
