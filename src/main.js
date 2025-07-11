import { createApp, h, provide } from 'vue';
import App from './App.vue';
import router from './router';
import apolloClient from './apollo/apolloClient'; // asegúrate del nombre
import { DefaultApolloClient } from '@vue/apollo-composable';

import './assets/styles/base.css';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount('#app');
