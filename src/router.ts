import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import Approval from './views/Approval.vue';
import UserApproval from './views/UserApproval.vue';
import Home from './views/Home.vue';
import TeamStats from './views/TeamStats.vue';
import Welcome from './views/Welcome.vue';
import Terms from './views/Terms.vue';
import SelfEvaluation from './views/SelfEvaluation.vue';
import NotFound from './views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/team-stats',
      name: 'team-stats',
      component: TeamStats,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/self-evaluation',
      name: 'self-evaluation',
      component: SelfEvaluation,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/approval',
      name: 'approval',
      component: Approval,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user-approval',
      name: 'user-approval',
      component: UserApproval,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/terms-and-privacy',
      name: 'terms',
      component: Terms,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
