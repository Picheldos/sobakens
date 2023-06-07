import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import RandomDogs from './components/RandomDogs.vue';
import RandomDog from './components/RandomDog.vue';
import './styles/global-styles.scss';

const routes = [
    { path: '/', component: RandomDogs },
    { path: '/random-dog', component: RandomDog },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');