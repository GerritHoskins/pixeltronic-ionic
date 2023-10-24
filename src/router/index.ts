import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { Preferences } from '@capacitor/preferences';
import ErrorView from '@/views/ErrorView.vue';
import useStore from '@/stores/store';

const isAuthenticated = async () => !!(await Preferences.get({ key: 'jwt' })).value;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/project/list',
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/project/list',
      },
      {
        path: '/login-register',
        name: 'LoginRegister',
        component: () => import('@/views/LoginRegister.vue'),
        meta: { requiresUnauth: true },
      },
      {
        path: '/project',
        name: 'Project',
        component: () => import('@/views/ProjectView.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: 'list',
            name: 'ProjectList',
            component: () => import('@/views/project/ProjectList.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'details/:projectId',
            name: 'ProjectDetails',
            component: () => import('@/views/project/ProjectDetail.vue'),
            props: true,
            meta: { requiresAuth: true },
          },
          {
            path: 'add-project',
            name: 'AddProject',
            component: () => import('@/views/project/ProjectCreate.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'milestone/:projectId',
            name: 'Milestones',
            component: () => import('@/views/MilestoneManagement.vue'),
            props: true,
            meta: { requiresAuth: true },
          },
        ],
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
        component: () => import('@/views/MaterialManagement.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/community-showcase',
        name: 'CommunityShowCase',
        component: () => import('@/views/CommunityShowcase.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/progress-tracking',
        name: 'ProgressTracking',
        component: () => import('@/views/ProgressTracking.vue'),
        meta: { requiresAuth: true },
      },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorView },
      // will match anything starting with `/user-` and put it under `$route.params.afterUser`
      //{ path: '/user-:afterUser(.*)', component: UserGeneric },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();

  if (!store.initialized) {
    try {
      await store.initialize();
    } catch (error) {
      console.error('Initialization failed:', error);
      next('/error');
      return;
    }
  }

  const authenticated = await isAuthenticated();
  if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
    next('/login-register');
  } else if (to.matched.some(record => record.meta.requiresUnauth) && authenticated) {
    next('/project');
  } else {
    next();
  }
});

export default router;
