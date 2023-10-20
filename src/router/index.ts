import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

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
        path: '/project-list',
        name: 'ProjectsListView',
        component: () => import('@/views/project/ListView.vue'),
      },
      {
        path: '/add-project',
        name: 'AddProject',
        component: () => import('@/views/project/CreateView.vue'),
      },
      // Project Details
      {
        path: '/project/:projectId',
        name: 'ProjectDetailView',
        component: () => import('@/views/project/DetailView.vue'),
        props: route => ({ projectId: Number(route.params.projectId) }), // Convert projectId to a number
        children: [
          {
            path: 'share',
            name: 'ShareProject',
            component: () => import('@/components/modals/ShareProjectModal.vue'),
          },
        ],
      },
      {
        path: '/project/:projectId/milestones',
        name: 'Milestones',
        component: () => import('@/views/MilestoneManagementView.vue'),
        props: true,
      },
      {
        path: '/project/:projectId/comments',
        name: 'Comments',
        component: () => import('@/components/modals/CommentModal.vue'),
        props: true,
      },
      {
        path: '/material-management',
        name: 'MaterialManagement',
        component: () => import('@/views/MaterialManagementView.vue'),
      },
      {
        path: '/community-showcase',
        name: 'CommunityShowCase',
        component: () => import('@/views/CommunityShowcaseView.vue'),
      },
      {
        path: '/progress-tracking',
        name: 'ProgressTracking',
        component: () => import('@/views/ProgressTrackingView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
