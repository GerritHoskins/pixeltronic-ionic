import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import VueVirtualScroller from 'vue-virtual-scroller';
import { RecycleScroller } from 'vue-virtual-scroller';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueVirtualScroller);

app.component('RecycleScroller', RecycleScroller);
router.isReady().then(() => {
  app.mount('#app');
});