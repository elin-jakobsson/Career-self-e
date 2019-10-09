import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vueFirebase, { FirebaseConfig } from 'vuetyfire';
import * as firebase from 'firebase/app';
import { routeGuard } from './route-guard';

import './styles/reset.scss';
import './styles/main.scss';

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
};

const firebaseUIOptions = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
  ],
  signInSuccessUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://sigma-pg.firebaseapp.com/'
      : 'http://localhost:8080/',
  tosUrl: () => router.push({ name: 'terms' }),
  privacyPolicyUrl: () => router.push({ name: 'terms' }),
};

const firestoreConfig = {
  firestoreReferences: [
    {
      key: 'allUsers',
      path: 'users',
    },
  ],
};

// IF you are developing with Typescript it can be a good idea to declare the typings for your collections and documents to have a smoother development.
declare module 'vue/types/vue' {
  interface Vue {
    allUsers: firebase.firestore.CollectionReference;
  }
}

Vue.use(vueFirebase, {
  firebaseConfig,
  firebaseUIOptions,
  firestoreConfig,
});

router.beforeEach(routeGuard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
