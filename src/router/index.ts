import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { useProjectsStore } from '@/stores/projects';
import { Preferences } from '@capacitor/preferences';

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
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.projects.length <= 0 && !store.initialized) {
            await store.fetchProjects();
            store.initialized = true;
          }
          next();
        },
      },
      {
        path: '/add-project',
        name: 'AddProject',
        component: () => import('@/views/project/CreateView.vue'),
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.projects.length <= 0 && !store.initialized) {
            await store.fetchProjects();
            store.initialized = true;
          }
          next();
        },
      },
      {
        path: '/project/:projectId',
        name: 'ProjectDetailView',
        component: () => import('@/views/project/DetailView.vue'),
        meta: { requiresAuth: true },
        props: route => ({ projectId: Number(route.params.projectId) }), // Convert projectId to a number
        children: [],
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.projects.length <= 0 || !store.initialized) {
            next('/');
            return;
          }
          next();
        },
      },
      {
        path: '/project/:projectId/milestones',
        name: 'Milestones',
        component: () => import('@/views/MilestoneManagementView.vue'),
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.milestones.length <= 0 && store.initialized) {
            await store.fetchMilestones();
          }
          next();
        },
      },
      {
        path: '/project/:projectId/comments',
        name: 'Comments',
        component: () => import('@/components/CommentAccordion.vue'),
        meta: { requiresAuth: true },
        props: true,
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.comments.length <= 0 && store.initialized) {
            await store.fetchComments();
          }
          next();
        },
      },
      {
        path: '/material-management',
        name: 'MaterialManagement',
        component: () => import('@/views/MaterialManagementView.vue'),
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.materials.length <= 0 && store.initialized) {
            await store.fetchMaterials();
          }
          if (store.projects.length <= 0 && !store.initialized) {
            await store.fetchProjects();
            store.initialized = true;
          }
          next();
        },
      },
      {
        path: '/community-showcase',
        name: 'CommunityShowCase',
        component: () => import('@/views/CommunityShowcaseView.vue'),
        meta: { requiresAuth: false },
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.projects.length <= 0 && store.initialized) {
            await store.fetchProjects();
          }
          next();
        },
      },
      {
        path: '/progress-tracking',
        name: 'ProgressTracking',
        component: () => import('@/views/ProgressTrackingView.vue'),
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
          const store = useProjectsStore();
          if (store.projects.length <= 0 && !store.initialized) {
            await store.fetchProjects();
            store.initialized = true;
          }
          if (store.milestones.length <= 0) {
            await store.fetchMilestones();
          }
          next();
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authenticated = await isAuthenticated();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth, check if logged in
    if (!authenticated) {
      // Not authenticated, redirect to login
      next('/login-register');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresUnauth)) {
    // Route is for unauthenticated users only
    if (authenticated) {
      // User is authenticated, redirect to a protected route or dashboard
      next('/project-list');
    } else {
      next();
    }
  } else {
    // No specific authentication requirement
    next();
  }
});

export default router;
