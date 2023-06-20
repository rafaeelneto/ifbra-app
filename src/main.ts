import Vue, { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { custom } from './plugins/custom';
import vuetify from '@/plugins/vuetify';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.prototype.$custom = custom;

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');
